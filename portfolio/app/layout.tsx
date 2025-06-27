import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rohit Kumar | Backend-Focused Fullstack Developer',
  description:
    'Fullstack developer with a focus on backend systems, API design, and infrastructure. I build reliable software with clean architecture and efficient data flow.',
  keywords: [
    'backend developer',
    'fullstack developer',
    'API design',
    'TypeScript',
    'Node.js',
    'Bun',
    'Fastify',
    'MongoDB',
    'PostgreSQL',
    'Docker',
    'Redis',
    'system design',
    'developer portfolio',
  ],
  authors: [{ name: 'Rohit Kumar', url: 'https://github.com/itisrohit' }],
  creator: 'Rohit Kumar',
  publisher: 'Rohit Kumar',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://rohx.vercel.app/'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Rohit Kumar | Backend-Focused Fullstack Developer',
    description:
      'Focused on clean APIs, stable infrastructure, and practical systems that scale.',
    url: 'https://rohx.vercel.app/',
    siteName: 'Rohit Kumar Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rohit Kumar Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rohit Kumar | Backend-Focused Fullstack Developer',
    description:
      'Focused on clean APIs, stable infrastructure, and practical systems that scale.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  )
}
