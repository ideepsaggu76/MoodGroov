import type { Metadata } from 'next'
import { Quicksand } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const quicksand = Quicksand({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'MoodGroove - Your Mood-Based Music Companion',
  description: 'Create personalized playlists based on your mood using Spotify',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={quicksand.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
} 