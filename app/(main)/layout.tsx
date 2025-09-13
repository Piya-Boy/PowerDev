import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import { Toaster } from '@/components/ui/toaster';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Toaster />
      <ChatWidget />
    </>
  );
}
