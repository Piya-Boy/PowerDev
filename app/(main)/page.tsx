import { Toaster } from 'sonner';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Products from '@/components/sections/Products';
import Portfolio from '@/components/sections/Portfolio';
import Pricing from '@/components/sections/Pricing';
import Testimonials from '@/components/sections/Testimonials';
import JoinUs from '@/components/sections/JoinUs';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ToTopButton } from '@/components/ui/to-top-button';
export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <main className="relative overflow-hidden bg-gradient-to-br from-[#0a0520] via-[#0a0520] to-[#2e0a3a] text-[#d9d9d9]">
        <Hero />
        <About />
        <Services />
        <Products />
        <Portfolio />
        <Pricing />
        <Testimonials />
        <JoinUs />
        <Contact />
        <Footer />
        {/* <ToTopButton /> */}
      </main>
      <Toaster position="top-right" />
    </ThemeProvider>
  );
}