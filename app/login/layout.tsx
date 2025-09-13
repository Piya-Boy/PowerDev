import '../globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk, Noto_Sans_Thai } from 'next/font/google';

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
  title: 'Login - PowerDev',
  description: 'Login to your PowerDev account.',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      {children}
    </div>
  );
}
