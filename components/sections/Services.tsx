'use client';

import React from 'react';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Code, Globe, Database, HelpCircle } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Code className="w-10 h-10 text-[hsl(var(--neon-blue))]" />,
      title: "Custom System Development",
      description: "We build tailored software solutions that address your specific business needs, from internal tools to complex enterprise systems.",
      color: "blue"
    },
    {
      icon: <Globe className="w-10 h-10 text-[hsl(var(--neon-purple))]" />,
      title: "Website Creation",
      description: "Full-service website development with a focus on modern design, accessibility, and performance optimization.",
      color: "purple"
    },
    {
      icon: <Database className="w-10 h-10 text-[hsl(var(--neon-green))]" />,
      title: "Tech Product Development",
      description: "We create innovative tech products from concept to completion, using cutting-edge technologies and methodologies.",
      color: "green"
    },
    {
      icon: <HelpCircle className="w-10 h-10 text-[hsl(var(--neon-pink))]" />,
      title: "Tech Consulting",
      description: "Expert guidance on technology decisions, digital transformation, and accessibility implementation for your organization.",
      color: "pink"
    }
  ];

  return (
    <section id="services" className="section-padding bg-gradient-to-b from-[#0A0F1F] to-[#0D0D0D]">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">What We Do</h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-300">
            We provide end-to-end technology solutions that help businesses and organizations 
            thrive in the digital landscape.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card className={`border-0 bg-[#131628] h-full overflow-hidden ${
                service.color === "blue" ? "cyberpunk-glow" : 
                service.color === "purple" ? "cyberpunk-purple-glow" :
                service.color === "green" ? "cyberpunk-green-glow" : 
                "cyberpunk-pink-glow"
              }`}>
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-4">{service.icon}</div>
                  <h3 className={`text-xl font-bold mb-3 ${
                    service.color === "blue" ? "text-[hsl(var(--neon-blue))] text-glow" : 
                    service.color === "purple" ? "text-[hsl(var(--neon-purple))] purple-text-glow" :
                    service.color === "green" ? "text-[hsl(var(--neon-green))] green-text-glow" : 
                    "text-[hsl(var(--neon-pink))]"
                  }`}>
                    {service.title}
                  </h3>
                  <p className="text-gray-300 mt-auto">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Services);