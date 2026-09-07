/** Versioned phone/TV wire crypto. Keys never enter relay bodies or URL queries. */
export interface Packet { iv: string; data: string; }
function cryptoApi(): Crypto { return typeof window !== 'undefined' ? window.crypto : globalThis.crypto; }
export function randomHex(bytes = 32): string {
  const data = new Uint8Array(bytes); cryptoApi().getRandomValues(data);
  return Array.from(data).map(v => v.toString(16).padStart(2, '0')).join('');
}
function raw(hex: string): Uint8Array {
  if (!/^[0-9a-f]{64}$/.test(hex)) throw new Error('Invalid session key');
  return new Uint8Array(hex.match(/../g)!.map(v => parseInt(v, 16)));
}
function b64(bytes: Uint8Array): string { let s = ''; for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]); return btoa(s); }
function unb64(value: string): Uint8Array { return Uint8Array.from(atob(value), c => c.charCodeAt(0)); }
export async function hashToken(token: string): Promise<string> {
  const digest = new Uint8Array(await cryptoApi().subtle.digest('SHA-256', new TextEncoder().encode(token)));
  return Array.from(digest).map(v => v.toString(16).padStart(2, '0')).join('');
}
export async function encrypt(key: string, context: string, value: unknown): Promise<Packet> {
  const bytes = new TextEncoder().encode(JSON.stringify(value));
  if (bytes.length > 150_000) throw new Error('Message too large');
  const imported = await cryptoApi().subtle.importKey('raw', raw(key), 'AES-GCM', false, ['encrypt']);
  const iv = cryptoApi().getRandomValues(new Uint8Array(12));
  const data = await cryptoApi().subtle.encrypt({ name: 'AES-GCM', iv, additionalData: new TextEncoder().encode(context) }, imported, bytes);
  return { iv: b64(iv), data: b64(new Uint8Array(data)) };
}
export async function decrypt(key: string, context: string, packet: Packet): Promise<unknown> {
  if (!packet || typeof packet.iv !== 'string' || typeof packet.data !== 'string' || packet.data.length > 220_000) throw new Error('Invalid packet');
  const iv = unb64(packet.iv); if (iv.length !== 12) throw new Error('Invalid nonce');
  const imported = await cryptoApi().subtle.importKey('raw', raw(key), 'AES-GCM', false, ['decrypt']);
  const data = await cryptoApi().subtle.decrypt({ name: 'AES-GCM', iv, additionalData: new TextEncoder().encode(context) }, imported, unb64(packet.data));
  return JSON.parse(new TextDecoder().decode(data));
}
