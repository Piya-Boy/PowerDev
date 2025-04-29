'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { projects } from '@/data/projects';
import Image from 'next/image';

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="portfolio" className="section-padding bg-gradient-to-b from-[#0A0F1F] to-[#0D0D0D]">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Our Portfolio</h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-300">
            Explore some of our most impactful projects and see how we've helped clients achieve their goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Link href={`/projects/${project.id}`}>
                <Card className="border-0 bg-[#131628] overflow-hidden animated-gradient-border cursor-pointer hover:scale-[1.02] transition-transform duration-300">
                  <div className="h-48 overflow-hidden relative">
                    <Image
                      src={project.image} 
                      alt={project.title}
                      width={500}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#131628] to-transparent opacity-60"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <span className="text-xs font-medium bg-[hsl(var(--neon-blue))/0.2] text-[hsl(var(--neon-blue))] px-2 py-1 rounded-full">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                    <p className="text-gray-300 text-sm line-clamp-2">{project.description}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;