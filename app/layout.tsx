import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk, Noto_Sans_Thai } from 'next/font/google';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai'],
  variable: '--font-noto-thai',
});

export const metadata: Metadata = {
  title: 'PowerDev - Empowering Dreams with Technology',
  description: 'PowerDev is a startup team founded by people with disabilities, specializing in building systems, websites, and developing innovative products.',
  keywords: [
    'accessible web development', 'inclusive tech team', 'disability tech', 'web accessibility', 'inclusive design', 'PowerDev', 'accessible software', 'inclusive development',
    'การพัฒนาเว็บไซต์ที่เข้าถึงได้', 'ทีมเทคโนโลยีที่ครอบคลุม', 'เทคโนโลยีสำหรับผู้พิการ', 'การเข้าถึงเว็บไซต์', 'การออกแบบที่ครอบคลุม', 'ซอฟต์แวร์ที่เข้าถึงได้', 'การพัฒนาที่ครอบคลุม'
  ],
  authors: [{ name: 'PowerDev Team' }],
  creator: 'PowerDev',
  publisher: 'PowerDev',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://powerdev.netlify.app'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
      'th-TH': '/th',
    },
  },
  openGraph: {
    title: 'PowerDev - Empowering Dreams with Technology',
    description: 'PowerDev is a startup team founded by people with disabilities, specializing in building systems, websites, and developing innovative products.',
    url: 'https://powerdev.netlify.app',
    siteName: 'PowerDev',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PowerDev - Empowering Dreams with Technology',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PowerDev - Empowering Dreams with Technology',
    description: 'PowerDev is a startup team founded by people with disabilities, specializing in building systems, websites, and developing innovative products.',
    images: ['/og-image.png'],
    creator: '@powerdev',
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
  icons: {
    icon: [
      { url: '/favicon.svg', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180' },
    ],
  },
  manifest: '/manifest.json',
  verification: {
    google: 'cq5vzyxqdF0WqAca7cf0o9dJ6MNZ3mcnaAEvnSLNmqU',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${notoSansThai.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}