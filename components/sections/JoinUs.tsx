'use client';

import React from 'react';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Building, Users, Zap } from 'lucide-react';

const JoinUs = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-[#0A0F1F] to-[#0D0D0D] overflow-hidden relative">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-[hsl(var(--neon-blue))/0.1] blur-[100px]"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-[hsl(var(--neon-purple))/0.1] blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Join Our Mission</h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-300">
            Be part of a team that's empowering dreams through technology. We welcome talent from all backgrounds.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-[#131628] p-6 rounded-lg border border-[hsl(var(--neon-blue))/0.2] cyberpunk-glow"
          >
            <Building className="w-10 h-10 mb-4 text-[hsl(var(--neon-blue))]" />
            <h3 className="text-xl font-bold mb-3 text-white">Join Our Team</h3>
            <p className="text-gray-300 mb-4">
              We're always looking for talented individuals who share our vision of making technology accessible to everyone.
            </p>
            <Button variant="outline" className="border-[hsl(var(--neon-blue))] text-[hsl(var(--neon-blue))] hover:bg-[hsl(var(--neon-blue)/0.1)]">
              View Openings
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-[#131628] p-6 rounded-lg border border-[hsl(var(--neon-purple))/0.2] cyberpunk-purple-glow"
          >
            <Users className="w-10 h-10 mb-4 text-[hsl(var(--neon-purple))]" />
            <h3 className="text-xl font-bold mb-3 text-white">Partner With Us</h3>
            <p className="text-gray-300 mb-4">
              Let's collaborate to create innovative solutions that make a positive impact in the world of accessibility.
            </p>
            <Button variant="outline" className="border-[hsl(var(--neon-purple))] text-[hsl(var(--neon-purple))] hover:bg-[hsl(var(--neon-purple)/0.1)]">
              Become a Partner
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-[#131628] p-6 rounded-lg border border-[hsl(var(--neon-green))/0.2] cyberpunk-green-glow"
          >
            <Zap className="w-10 h-10 mb-4 text-[hsl(var(--neon-green))]" />
            <h3 className="text-xl font-bold mb-3 text-white">Support Our Mission</h3>
            <p className="text-gray-300 mb-4">
              Help us continue developing innovative technology solutions that empower people with disabilities.
            </p>
            <Button variant="outline" className="border-[hsl(var(--neon-green))] text-[hsl(var(--neon-green))] hover:bg-[hsl(var(--neon-green)/0.1)]">
              Learn How
            </Button>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-[#131628] p-8 md:p-12 rounded-lg text-center max-w-3xl mx-auto border border-[hsl(var(--neon-blue))/0.5] animated-gradient-border"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">Ready to make a difference?</h3>
          <p className="text-gray-300 mb-6">
            Join our community of innovators and help us build technology that empowers everyone.
          </p>
          <Button className="px-8 py-6 bg-[hsl(var(--neon-green))] text-black hover:bg-[hsl(var(--neon-green)/0.8)] cyberpunk-green-glow">
            Get Started Today
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(JoinUs);