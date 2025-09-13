'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import { Mail, Github, Linkedin, Twitter, Facebook } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full bg-black/50 backdrop-blur-sm border-t border-[hsl(var(--neon-blue)/0.2)]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">PowerDev</h3>
            <p className="text-gray-400">
              Empowering dreams with innovative technology solutions.
            </p>
            <div className="flex space-x-4">
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Github className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Twitter className="h-5 w-5" />
                </Button>
              </Link>
              {/* facebook */}
              <Link href="https://www.facebook.com/profile.php?id=61575847232619" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Facebook className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link href="#about" className="text-gray-400 hover:text-white transition-colors">
                About Us
              </Link>
              <Link href="#services" className="text-gray-400 hover:text-white transition-colors">
                Services
              </Link>
              <Link href="#products" className="text-gray-400 hover:text-white transition-colors">
                Products
              </Link>
              <Link href="#portfolio" className="text-gray-400 hover:text-white transition-colors">
                Portfolio
              </Link>
              <Link href="#contact" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Contact Us</h3>
            <div className="flex items-center space-x-2 text-gray-400">
              <Mail className="h-5 w-5" />
              <span>powerdev.tech@hotmail.com</span>
            </div>
            <Link href="#contact">
              <Button className="mt-4 bg-[hsl(var(--neon-green))] text-black hover:bg-[hsl(var(--neon-green)/0.8)]">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[hsl(var(--neon-blue)/0.2)] text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} PowerDev. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);