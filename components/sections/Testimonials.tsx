'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '@/data/testimonials';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
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
      if (!isHovered) {
        showNext();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [showNext, isHovered]);
      
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
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <div className="overflow-hidden py-8">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center"
            >
              <Card className="max-w-4xl border-0 bg-[#131628] animated-gradient-border" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-[hsl(var(--neon-blue))]">
                      <img 
                        src={testimonials[currentIndex].image} 
                        alt={testimonials[currentIndex].name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <Quote className="w-8 h-8 text-[hsl(var(--neon-blue))/0.3] mb-2" />
                      <p className="text-lg text-gray-300 italic mb-4">"{testimonials[currentIndex].content}"</p>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{testimonials[currentIndex].name}</h3>
                        <p className="text-[hsl(var(--neon-blue))]">{testimonials[currentIndex].position}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 border-[hsl(var(--neon-blue))] text-[hsl(var(--neon-blue))] hover:bg-[hsl(var(--neon-blue)/0.1)] -mr-4 hidden md:flex"
            onClick={showNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="flex justify-center gap-2 mt-4 md:hidden">
          <Button 
            variant="outline" 
            size="icon" 
            className="border-[hsl(var(--neon-blue))] text-[hsl(var(--neon-blue))] hover:bg-[hsl(var(--neon-blue)/0.1)]"
            onClick={showPrev}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="border-[hsl(var(--neon-blue))] text-[hsl(var(--neon-blue))] hover:bg-[hsl(var(--neon-blue)/0.1)]"
            onClick={showNext}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
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

export default Testimonials;