import type { Metadata } from 'next'
import { ManageClient } from './manage-client'
export const metadata: Metadata = { title: 'TV management | Tivexo', robots: { index: false, follow: false }, referrer: 'no-referrer' }
export default function ManagePage() { return <ManageClient /> }
