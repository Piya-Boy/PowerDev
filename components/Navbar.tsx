'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Zap, Menu, X } from 'lucide-react';
import { ProductsGrid } from '@/components/sections/ProductsGrid';
import { products } from '@/data/products';
import Image from 'next/image';

// Menu list
const menuList = [
  {
    label: 'About',
    href: '#about',
  },
  {
    label: 'Services',
    href: '#services',
  },
  {
    label: 'Products',
    href: '#products',
  },
  {
    label: 'Portfolio',
    href: '#portfolio',
  },
  {
    label: 'Pricing',
    href: '#pricing',
  },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '0px 0px -90% 0px',
        threshold: 0.1,
      }
    );

    const handleScroll = () => {
      const sections = menuList.map(item => document.querySelector(item.href));
      const scrollPosition = window.scrollY + window.innerHeight * 0.2;

      sections.forEach((section) => {
        if (section) {
          const sectionElement = section as HTMLElement;
          const sectionTop = sectionElement.offsetTop;
          const sectionHeight = sectionElement.offsetHeight;
          const sectionBottom = sectionTop + sectionHeight;

          if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            setActiveSection(section.id);
          }
        }
      });
    };

    menuList.forEach((item) => {
      const element = document.querySelector(item.href);
      if (element) {
        observer.observe(element);
      }
    });

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      menuList.forEach((item) => {
        const element = document.querySelector(item.href);
        if (element) {
          observer.unobserve(element);
        }
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
  }, [activeSection]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#0A0F1F]/95 backdrop-blur-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="/images/full-logo-2.png" 
              alt="Logo" 
              width={120}
              height={40}
              style={{ width: 'auto', height: '40px' }}
              priority
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {menuList.map((item) => (
              <a
                href={item.href}
                key={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`text-gray-300 hover:text-white transition-colors cursor-pointer relative group ${
                  activeSection === item.href.slice(1) ? 'text-white' : ''
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[hsl(var(--neon-green))] transition-all duration-300 group-hover:w-full ${
                  activeSection === item.href.slice(1) ? 'w-full' : ''
                }`}></span>
              </a>
            ))}
            <Button
              asChild
              className="bg-[hsl(var(--neon-green))] text-black hover:bg-[hsl(var(--neon-green)/0.8)] cyberpunk-green-glow"
            >
              <Link href="#contact">Contact Us</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-500 bg-transparent border-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 py-4"
          >
            <div className="flex flex-col space-y-4">
              {menuList.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`text-gray-300 hover:text-white transition-colors px-4 py-2 cursor-pointer relative group ${
                    activeSection === item.href.slice(1) ? 'text-white' : ''
                  }`}
                >
                  {item.label}
                  <span className={`absolute left-0 top-0 w-1 h-full bg-[hsl(var(--neon-green))] transition-all duration-300 ${
                    activeSection === item.href.slice(1) ? 'opacity-100' : 'opacity-0'
                  }`}></span>
                </a>
              ))}
              <div className="px-4">
                <Button
                  asChild
                  className="w-full bg-[hsl(var(--neon-green))] text-black hover:bg-[hsl(var(--neon-green)/0.8)] cyberpunk-green-glow"
                >
                  <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                    Contact Us
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;