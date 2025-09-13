'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Code2, Zap } from 'lucide-react';
import HeroCanvas from '@/components/3d/HeroCanvas';
import Link from 'next/link';
import Image from 'next/image';
const Hero = () => {
  const [text, setText] = useState('');
  const fullText = '{ creating innovative tech solutions }';
  const typingSpeed = 50;
  const typingRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let index = 0;
    
    const startTyping = () => {
      typingRef.current = setInterval(() => {
        setText(fullText.substring(0, index + 1));
        index++;
        
        if (index === fullText.length) {
          if (typingRef.current) clearInterval(typingRef.current);
          
          // Reset and start again after a pause
          setTimeout(() => {
            index = 0;
            setText('');
            startTyping();
          }, 3000);
        }
      }, typingSpeed);
    };
    
    startTyping();
    
    return () => {
      if (typingRef.current) clearInterval(typingRef.current);
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-20">
      <HeroCanvas />
      
      <div className="container mx-auto px-4 z-10 text-center">
        <div className="flex items-center justify-center mb-6">
          {/* <Zap className="w-10 h-10 mr-2 text-[hsl(var(--neon-green))]" /> */}
            <Image src="images/logo.png" alt="PowerDevs Logo" width={120} height={40} className="h-15 w-auto" />
          <h1 className="text-4xl md:text-6xl font-bold gradient-text">
            Power<span className="text-[hsl(var(--neon-blue))]">{"{Dev}"}</span>
          </h1>
        </div>
        
        <h2 className="text-xl md:text-3xl mb-6 text-white text-shadow-glow">
          Empowering Dreams with Technology
        </h2>
        
        <div className="font-mono text-sm md:text-base text-[hsl(var(--neon-blue))] mb-8 h-6">
          {text}
          <span className="typing-cursor"></span>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link href="#contact">
            <Button 
              className="px-8 py-6 bg-[hsl(var(--neon-green))] text-black hover:bg-[hsl(var(--neon-green)/0.8)] cyberpunk-green-glow"
            >
              Contact Us
            </Button>
          </Link>
          <Link href="#portfolio">
            <Button 
              variant="outline" 
              className="px-8 py-6 border-[hsl(var(--neon-blue))] text-[hsl(var(--neon-blue))] hover:bg-[hsl(var(--neon-blue)/0.1)] cyberpunk-glow"
            >
              View Portfolio
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
        <ArrowDown className="w-6 h-6 text-white/70" />
      </div>
    </section>
  );
};

export default React.memo(Hero);