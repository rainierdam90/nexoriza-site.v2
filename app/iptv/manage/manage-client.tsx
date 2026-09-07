'use client'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { encrypt, decrypt, randomHex, type Packet } from '@/lib/iptv-companion-crypto'
import './manage.css'

interface Session { id: string; token: string; key: string }
interface Source { id: string; name: string; type: string; enabled: boolean }
interface Group { id: string; name: string; ids: string[] }
interface Overview { profile: string; sources: Source[]; groups: Group[]; settings: { appLanguage: string; preferredAudioLangs: string[]; preferredSubtitleLang: string } }
interface Item { id: string; title: string; group?: string; year?: number; hidden?: boolean; favorite?: boolean; listed?: boolean }
type CatalogKind = 'channels' | 'movie' | 'series'
function Choice({ value, options, label, onChange }: { value: string; options: Array<[string, string]>; label: string; onChange: (v: string) => void }) {
  return <div className="manage-field"><Label>{label}</Label><Select value={value} onValueChange={onChange}><SelectTrigger aria-label={label}><SelectValue /></SelectTrigger><SelectContent>{options.map(([v, title]) => <SelectItem value={v} key={v}>{title}</SelectItem>)}</SelectContent></Select></div>
}
export function ManageClient() {
  const session = useRef<Session | null>(null); const mounted = useRef(false); const started = useRef(false); const working = useRef(false)
  const [busy, setBusy] = useState(false); const [notice, setNotice] = useState('Connect through the QR code on your TV.')
  const [overview, setOverview] = useState<Overview | null>(null)
  const [kind, setKind] = useState<CatalogKind>('channels'); const [query, setQuery] = useState(''); const [items, setItems] = useState<Item[]>([])
  const [offset, setOffset] = useState(0); const [total, setTotal] = useState(0); const [group, setGroup] = useState('none'); const [groupName, setGroupName] = useState('')
  const [sourceId, setSourceId] = useState('new'); const [sourceKind, setSourceKind] = useState('xtream'); const [name, setName] = useState('')
  const [server, setServer] = useState(''); const [username, setUsername] = useState(''); const [password, setPassword] = useState(''); const [epg, setEpg] = useState('')
  const [audio, setAudio] = useState('en'); const [subtitle, setSubtitle] = useState('off'); const [language, setLanguage] = useState('en')

  async function request(method: string, body?: unknown): Promise<Response> {
    const current = session.current; if (!current) throw new Error('Session closed. Scan the TV QR again.')
    return fetch('/iptv/api/manage/' + current.id, { method, cache: 'no-store', credentials: 'omit', signal: AbortSignal.timeout(15000),
      headers: { Authorization: 'Bearer ' + current.token, 'X-Tivexo-Role': 'phone', 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined })
  }
  async function send(command: object): Promise<unknown> {
    if (working.current) throw new Error('Wait until the previous request finishes.')
    const current = session.current; if (!current) throw new Error('Scan the QR code in Phone management on your TV.')
    working.current = true; setBusy(true); setNotice('Waiting for your TV… Keep the TV management screen open.')
    const seq = randomHex(16)
    try {
      const packet = await encrypt(current.key, current.id + ':' + seq + ':command', command)
      // Retry an uncertain POST with the SAME sequence; the TV will never apply it twice.
      let sent: Response
      try { sent = await request('POST', { seq, packet }) } catch { sent = await request('POST', { seq, packet }) }
      if (!sent.ok && sent.status !== 409) throw new Error(sent.status === 404 ? 'Session expired. Scan the TV QR again.' : 'The server could not accept this request. Try again shortly.')
      const deadline = Date.now() + 1800_000
      let lastSend = Date.now()
      while (mounted.current && session.current === current && Date.now() < deadline) {
        await new Promise(r => setTimeout(r, 3500))
        let response: Response
        try { response = await request('GET') } catch { setNotice('Connection interrupted. Waiting safely for the TV…'); continue }
        if (response.status === 404) throw new Error('The session has ended. Scan the QR code on the TV again.')
        if (response.status === 429) { await new Promise(r => setTimeout(r, Math.min(60000, (Number(response.headers.get('retry-after')) || 15) * 1000))); continue }
        if (response.status === 204 || !response.ok) {
          if (Date.now() - lastSend > 15000) { await request('POST', { seq, packet }).catch(() => {}); lastSend = Date.now() }
          continue
        }
        const raw = await response.text(); if (raw.length > 225000) throw new Error('Response is too large.')
        const reply = JSON.parse(raw) as { seq: string; packet: Packet }
        if (reply.seq !== seq) continue
        const result = await decrypt(current.key, current.id + ':' + seq + ':reply', reply.packet) as { ok: boolean; error?: string; result?: unknown }
        if (!result.ok) throw new Error(result.error || 'The TV could not complete this request.')
        if (!mounted.current || session.current !== current) throw new Error('Session closed')
        setNotice('Connected · Your changes are saved on the TV.'); return result.result
      }
      throw new Error('Session closed. Scan the TV QR again.')
    } finally { working.current = false; if (mounted.current) setBusy(false) }
  }
  const fail = (error: unknown) => { if (mounted.current) setNotice(error instanceof Error ? error.message : 'Something went wrong.') }
  async function loadOverview() {
    const data = await send({ action: 'overview' }) as Overview
    if (!mounted.current) return
    setOverview(data); setAudio(data.settings.preferredAudioLangs[0] || 'en'); setSubtitle(data.settings.preferredSubtitleLang || 'off'); setLanguage(data.settings.appLanguage)
  }
  useEffect(() => {
    mounted.current = true
    if (!started.current) {
      started.current = true
      const parts = window.location.hash.slice(1).split('.')
      window.history.replaceState(null, '', '/iptv/manage')
      if (/^[a-f0-9]{32}$/.test(parts[0]) && /^[a-f0-9]{64}$/.test(parts[1]) && /^[a-f0-9]{64}$/.test(parts[2]) && globalThis.crypto?.subtle) {
        session.current = { id: parts[0], token: parts[1], key: parts[2] }; void loadOverview().catch(fail)
      }
    }
    return () => { mounted.current = false }
    // Credentials intentionally remain only in memory; refresh requires a new QR scan.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  async function disconnect() {
    try {
      const current = session.current
      await request('DELETE')
      if (current) { const seq = randomHex(16); const packet = await encrypt(current.key, current.id + ':' + seq + ':command', { action: 'disconnect' }); await request('POST', { seq, packet }) }
    } catch { /* TV screen can revoke too; relay has a hard TTL. */ }
    session.current = null; setOverview(null); setItems([]); setPassword(''); setNotice('Disconnected. Close the management screen on your TV too.'); setBusy(false)
  }
  async function catalog(nextOffset = 0, nextKind = kind) {
    const data = await send({ action: 'catalog', kind: nextKind, query, offset: nextOffset }) as { items: Item[]; total: number }
    setItems(data.items); setTotal(data.total); setOffset(nextOffset)
  }
  async function change(command: object) { await send(command); await catalog(offset) }
  const langs: Array<[string, string]> = [['nl', 'Nederlands'], ['en', 'English'], ['de', 'Deutsch'], ['zh', '中文 / Chinese']]
  return <main className="tivexo-manage">
    <header><div><p className="manage-eyebrow">TIVEXO · TV COMPANION</p><h1>{overview ? overview.profile : 'Phone management'}</h1></div><Button variant="outline" onClick={() => void disconnect()} disabled={!session.current}>Disconnect</Button></header>
    <div role="status" aria-live="polite" className={'manage-notice' + (busy ? ' is-busy' : '')}>{busy && <span className="manage-spinner" aria-hidden="true" />}{notice}</div>
    {!overview ? <section className="manage-panel"><h2>Your TV, easier to manage</h2><p>Open <strong>Phone management</strong> in Tivexo on your television and scan the QR code. Leave that screen open while making changes.</p><p>The encrypted session expires after 30 minutes. Refreshing this page requires scanning again.</p></section> :
    <Tabs defaultValue="catalog">
      <TabsList className="manage-tabs"><TabsTrigger value="catalog">Library</TabsTrigger><TabsTrigger value="sources">Sources</TabsTrigger><TabsTrigger value="settings">Preferences</TabsTrigger><TabsTrigger value="backup">Backup</TabsTrigger></TabsList>
      <TabsContent value="catalog"><section className="manage-panel"><fieldset disabled={busy}>
        <div className="manage-grid"><Choice label="Browse" value={kind} options={[[ 'channels', 'TV channels' ], ['movie', 'Movies'], ['series', 'Series']]} onChange={v => { setKind(v as CatalogKind); setItems([]); setOffset(0); setTotal(0) }} />
          <div className="manage-field"><Label htmlFor="catalog-search">Search</Label><Input id="catalog-search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Title or channel name" maxLength={100} /></div></div>
        <Button onClick={() => void catalog(0).catch(fail)}>Show results</Button>
        {kind === 'channels' && <div className="manage-groups"><Choice label="Favorite group (tap Group on a channel to add/remove)" value={group} options={[[ 'none', 'Choose group' ], ...overview.groups.map(g => [g.id, g.name] as [string,string])]} onChange={setGroup} />
          <div className="manage-inline"><Input aria-label="New favorite group" placeholder="New group name" maxLength={60} value={groupName} onChange={e => setGroupName(e.target.value)} /><Button variant="outline" disabled={!groupName.trim()} onClick={() => { void send({ action: 'group', id: 'personal:' + randomHex(8), name: groupName.trim() }).then(() => { setGroupName(''); return loadOverview() }).catch(fail) }}>Create group</Button></div></div>}
        <p className="manage-muted">{total ? `${offset + 1}–${offset + items.length} of ${total}` : 'Search your TV library to begin.'}</p>
        <ul className="manage-results">{items.map((item, index) => <li key={item.id}><div><strong>{item.title}</strong><small>{item.group || item.year || ''}</small></div><div className="manage-row-actions">
          {kind === 'channels' ? <><Button variant="outline" aria-pressed={item.favorite} onClick={() => void change({ action: 'channel', id: item.id, favorite: !item.favorite }).catch(fail)}>{item.favorite ? '★ Saved' : '☆ Favorite'}</Button>
            <Button variant="outline" onClick={() => void change({ action: 'channel', id: item.id, hidden: !item.hidden }).catch(fail)}>{item.hidden ? 'Show' : 'Hide'}</Button>
            {index > 0 && <Button variant="outline" aria-label={'Move ' + item.title + ' up'} onClick={() => void change({ action: 'channel', id: item.id, before: items[index - 1].id }).catch(fail)}>↑</Button>}
            {group !== 'none' && <Button variant="outline" onClick={() => void send({ action: 'group', id: group, channelId: item.id }).then(loadOverview).catch(fail)}>{overview.groups.find(g => g.id === group)?.ids.includes(item.id) ? '− Group' : '+ Group'}</Button>}</> :
            <Button variant="outline" aria-pressed={item.listed} onClick={() => void change({ action: 'watchlist', kind, id: item.id, listed: !item.listed }).catch(fail)}>{item.listed ? '✓ In watchlist' : '+ Watchlist'}</Button>}
        </div></li>)}</ul>
        <div className="manage-inline"><Button variant="outline" disabled={!offset} onClick={() => void catalog(Math.max(0, offset - 60)).catch(fail)}>Previous</Button><Button variant="outline" disabled={offset + items.length >= total} onClick={() => void catalog(offset + 60).catch(fail)}>Next</Button></div>
      </fieldset></section></TabsContent>
      <TabsContent value="sources"><section className="manage-panel"><h2>Source details</h2><p>Changes require approval on your TV. Existing passwords are never sent back to this page. When editing, enter the complete connection details again.</p><fieldset disabled={busy}><form onSubmit={e => {
        e.preventDefault(); const source = sourceKind === 'xtream' ? { kind: 'xtream', server, username, password } : sourceKind === 'm3u' ? { kind: 'm3u', playlistUrl: server, epgUrl: epg } : { kind: 'direct', streamUrl: server }
        void send({ action: 'source', id: sourceId === 'new' ? undefined : sourceId, name, payload: { v: 1, type: 'source', source } }).then(() => { setPassword(''); return loadOverview() }).catch(fail)
      }}><Choice label="Source" value={sourceId} options={[[ 'new', 'Add a new source' ], ...overview.sources.map(s => [s.id, s.name] as [string,string])]} onChange={setSourceId} />
        <div className="manage-field"><Label htmlFor="source-name">Display name</Label><Input id="source-name" value={name} onChange={e => setName(e.target.value)} maxLength={100} required /></div>
        <Choice label="Connection type" value={sourceKind} options={[[ 'xtream', 'Xtream Codes' ], ['m3u', 'M3U playlist'], ['direct', 'Direct stream']]} onChange={setSourceKind} />
        <div className="manage-field"><Label htmlFor="source-server">{sourceKind === 'xtream' ? 'Server address' : 'Playlist / stream URL'}</Label><Input id="source-server" value={server} onChange={e => setServer(e.target.value)} autoCapitalize="none" autoCorrect="off" maxLength={4096} required /></div>
        {sourceKind === 'xtream' && <><div className="manage-field"><Label htmlFor="source-user">Username</Label><Input id="source-user" value={username} onChange={e => setUsername(e.target.value)} autoCapitalize="none" autoComplete="off" maxLength={256} required /></div><div className="manage-field"><Label htmlFor="source-pass">Password</Label><Input id="source-pass" type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="new-password" maxLength={256} required /></div></>}
        {sourceKind === 'm3u' && <div className="manage-field"><Label htmlFor="source-epg">EPG URL (optional)</Label><Input id="source-epg" value={epg} onChange={e => setEpg(e.target.value)} maxLength={4096} /></div>}
        <Button type="submit">Send to TV for approval</Button>
      </form></fieldset></section></TabsContent>
      <TabsContent value="settings"><section className="manage-panel"><h2>Preferences for {overview.profile}</h2><fieldset disabled={busy}><Choice label="Audio language" value={audio} options={langs} onChange={setAudio} /><Choice label="Subtitle language" value={subtitle} options={[[ 'off', 'Off' ], ...langs]} onChange={setSubtitle} /><Choice label="App language" value={language} options={[[ 'en', 'English' ], ['nl', 'Nederlands']]} onChange={setLanguage} /><Button onClick={() => void send({ action: 'settings', settings: { appLanguage: language, preferredAudioLangs: [audio], preferredSubtitleLang: subtitle } }).catch(fail)}>Save preferences</Button></fieldset></section></TabsContent>
      <TabsContent value="backup"><section className="manage-panel"><h2>Backup & restore</h2><p>Download your sources, favorites and preferences directly on your phone. The file contains your IPTV passwords: keep it private. Approve each transfer on your TV.</p><fieldset disabled={busy}><Button onClick={() => {
        void send({ action: 'backup' }).then(value => {
          const backup = (value as { backup: string }).backup; const url = URL.createObjectURL(new Blob([backup], { type: 'text/plain' }));
          const link = document.createElement('a'); link.href = url; link.download = 'tivexo-backup-' + new Date().toISOString().slice(0,10) + '.txt'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 30000)
        }).catch(fail)
      }}>Download backup</Button><div className="manage-field"><Label htmlFor="backup-file">Restore a Tivexo backup file</Label><Input id="backup-file" type="file" accept=".txt,text/plain" onChange={e => {
        const file = e.target.files?.[0]; if (!file) return; if (file.size > 20000) { setNotice('Backup is too large.'); return }
        void file.text().then(code => send({ action: 'restore', code: code.trim() })).then(loadOverview).catch(fail); e.target.value = ''
      }} /></div></fieldset></section></TabsContent>
    </Tabs>}
    <footer>Encrypted phone ↔ TV session · No account or permanent remote access · Close on the TV to revoke access.</footer>
  </main>
}
