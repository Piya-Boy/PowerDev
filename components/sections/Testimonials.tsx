'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Link from 'next/link';
import { Testimonial } from '@/lib/types/testimonial';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/forms');
        const data = await response.json();
        setTestimonials(data.forms);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, [refreshKey]);

  const refreshData = () => {
    setRefreshKey(prev => prev + 1);
  };

  useEffect(() => {
    const handleDataChange = () => {
      refreshData();
    };

    window.addEventListener('testimonialDataChanged', handleDataChange);
    return () => {
      window.removeEventListener('testimonialDataChanged', handleDataChange);
    };
  }, []);
  
  const showPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };
  
  const showNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const scrollX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        scrollX.set(containerRef.current.scrollLeft);
      }
    };  

    if (containerRef.current) {
      containerRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scrollProgress = useTransform(
    scrollX,
    [0, containerRef.current?.scrollWidth ?? 1],
    [0, 1]
  );

  // auto scroll if hovered stop
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered && testimonials.length > 0) {
        showNext();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [showNext, isHovered, testimonials.length]);
      
  if (isLoading) {
    return (
      <section className="section-padding bg-gradient-to-b from-[#0D0D0D] to-[#0A0F1F]">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-300">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="section-padding bg-gradient-to-b from-[#0D0D0D] to-[#0A0F1F]">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-300">No testimonials available.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-gradient-to-b from-[#0D0D0D] to-[#0A0F1F]">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Client Testimonials</h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-300">
            Hear from our clients about their experience working with PowerDev.
          </p>
        </motion.div>

        <div className="relative">
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 border-[hsl(var(--neon-blue))] text-[hsl(var(--neon-blue))] hover:bg-[hsl(var(--neon-blue)/0.1)] -ml-4 hidden md:flex"
            onClick={showPrev}
            asChild
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.div>
          </Button>
          
          <div className="overflow-hidden py-8">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              className="flex justify-center"
            >
              <Card className="max-w-4xl border-0 bg-[#131628] animated-gradient-border cursor-pointer hover:bg-[#131628]/80 transition-colors" 
                onMouseEnter={() => setIsHovered(true)} 
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => window.open(testimonials[currentIndex].profile_link, '_blank')}
              >
                <CardContent className="p-8">
                  <motion.div 
                    className="flex flex-col md:flex-row gap-6 items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.div 
                      className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-[hsl(var(--neon-blue))]"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <img 
                        src={testimonials[currentIndex].image} 
                        alt={testimonials[currentIndex].user.name} 
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <div className="flex-1">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <Quote className="w-8 h-8 text-[hsl(var(--neon-blue))/0.3] mb-2" />
                        <p className="text-lg text-gray-300 italic mb-4">"{testimonials[currentIndex].content}"</p>
                        <div>
                          <h3 className="text-xl font-semibold text-white">{testimonials[currentIndex].user.name}</h3>
                          <p className="text-[hsl(var(--neon-blue))]">
                            {testimonials[currentIndex].position.join(' & ')}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 border-[hsl(var(--neon-blue))] text-[hsl(var(--neon-blue))] hover:bg-[hsl(var(--neon-blue)/0.1)] -mr-4 hidden md:flex"
            onClick={showNext}
            asChild
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="h-6 w-6" />
            </motion.div>
          </Button>
        </div>
        
        <div className="flex justify-center gap-2 mt-4 md:hidden">
          <Button 
            variant="outline" 
            size="icon" 
            className="border-[hsl(var(--neon-blue))] text-[hsl(var(--neon-blue))] hover:bg-[hsl(var(--neon-blue)/0.1)]"
            onClick={showPrev}
            asChild
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.div>
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="border-[hsl(var(--neon-blue))] text-[hsl(var(--neon-blue))] hover:bg-[hsl(var(--neon-blue)/0.1)]"
            onClick={showNext}
            asChild
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="h-5 w-5" />
            </motion.div>
          </Button>
        </div>
        
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex 
                  ? "bg-[hsl(var(--neon-blue))]" 
                  : "bg-gray-600 hover:bg-gray-400"
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Testimonials);