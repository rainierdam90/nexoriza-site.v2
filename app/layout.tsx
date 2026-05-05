import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import CrispChat from '@/components/crisp-chat'

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'Next Horizons | Software & Web Design',
  description: 'AI-powered website redesign and intelligent due diligence software. Based in Dubai, serving clients across MENA and Europe. Request a free redesign mockup today.',
  generator: 'Next Horizons',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${geist.className} antialiased`}>
        {children}
        <CrispChat />
      </body>
    </html>
  )
}
