'use client';

import React from 'react';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Brain, Lightbulb } from 'lucide-react';

const About = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="about" className="section-padding bg-gradient-to-b from-[#0D0D0D] to-[#0A0F1F]">
      <div className="container mx-auto px-4">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <motion.h2 
            variants={fadeIn} 
            className="text-3xl md:text-4xl font-bold mb-4 gradient-text"
          >
            About PowerDev
          </motion.h2>
          <motion.p 
            variants={fadeIn}
            className="text-lg max-w-3xl mx-auto text-gray-300"
          >
            We are a team of passionate developers with disabilities who believe in the power of technology 
            to transform lives. Our unique perspectives drive innovation and create solutions that bridge gaps 
            in the digital world.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Card className="border-0 bg-[#131628] animated-gradient-border h-full">
              <CardContent className="pt-6 flex flex-col items-center text-center h-full">
                <div className="w-16 h-16 rounded-full bg-[hsl(var(--neon-blue)/0.2)] flex items-center justify-center mb-4">
                  <Lightbulb className="w-8 h-8 text-[hsl(var(--neon-blue))]" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[hsl(var(--neon-blue))] text-glow">Creativity</h3>
                <p className="text-gray-300">
                  We approach challenges with fresh perspectives, thinking outside the box to create 
                  innovative solutions that stand out in the digital landscape.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Card className="border-0 bg-[#131628] animated-gradient-border h-full">
              <CardContent className="pt-6 flex flex-col items-center text-center h-full">
                <div className="w-16 h-16 rounded-full bg-[hsl(var(--neon-purple)/0.2)] flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-[hsl(var(--neon-purple))]" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[hsl(var(--neon-purple))] purple-text-glow">Accessibility</h3>
                <p className="text-gray-300">
                  We believe technology should empower everyone. We design with accessibility at the core, 
                  ensuring our solutions work for all users regardless of ability.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Card className="border-0 bg-[#131628] animated-gradient-border h-full">
              <CardContent className="pt-6 flex flex-col items-center text-center h-full">
                <div className="w-16 h-16 rounded-full bg-[hsl(var(--neon-green)/0.2)] flex items-center justify-center mb-4">
                  <Brain className="w-8 h-8 text-[hsl(var(--neon-green))]" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[hsl(var(--neon-green))] green-text-glow">Innovation</h3>
                <p className="text-gray-300">
                  We're constantly exploring new technologies and methodologies to push boundaries and 
                  deliver cutting-edge solutions that help our clients stay ahead.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(About);