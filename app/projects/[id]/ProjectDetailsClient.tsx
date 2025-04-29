'use client';

import { Project } from '@/data/projects';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, ArrowLeft, Code, Layers, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Loader } from '@/components/ui/loader';

interface ProjectDetailsClientProps {
  project: Project;
}
// ฟันชัน ย้อนกลับไปที่หน้าโปรเจค

export default function ProjectDetailsClient({ project }: ProjectDetailsClientProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-[#0a0520] via-[#0a0520] to-[#2e0a3a] text-[#d9d9d9] min-h-screen"
    >
      <div className="max-w-[1200px] mx-auto px-6 py-20">
        <motion.nav 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center space-x-2 text-[#a3a3a3] text-sm mb-8 select-none"
        >
          <Link 
            href="/"
            className="flex items-center space-x-2 bg-[#1a1a2e] hover:bg-[#2a2a4e] transition-colors duration-300 rounded-md py-2 px-4 text-[#d9d9d9]"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Back</span>
          </Link>
          <span>Projects</span>
          <span className="select-text">&gt;</span>
          <span className="font-semibold text-[#d9d9d9] select-text">
            {project.title}
          </span>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-6 space-y-6"
          >
            <h1 className="text-4xl font-extrabold text-[#cbd5e1] leading-tight">
              {project.title}
            </h1>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "4rem" }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="h-1 rounded-full bg-gradient-to-r from-[#5a7fff] to-[#dbaaff]"
            ></motion.div>
            <p className="text-[#c9c9c9] text-sm leading-relaxed max-w-xl">
              {project.description}
            </p>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex space-x-4 max-w-xl"
            >
              <div className="flex items-center space-x-3 border border-[#2a2a4e] rounded-md p-4 w-1/2">
                <div className="flex items-center justify-center w-10 h-10 rounded-md bg-[#2a3a6e] text-[#a3b1ff] text-lg">
                  <Code className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-lg text-[#d9d9d9]">{project.technologies.length}</div>
                  <div className="text-xs text-[#7a7a9a]">Total Teknologi</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 border border-[#4a3a6e] rounded-md p-4 w-1/2 bg-gradient-to-r from-[#2a1a3a] to-[#3a2a5a]">
                <div className="flex items-center justify-center w-10 h-10 rounded-md bg-[#5a3a8e] text-[#dbaaff] text-lg">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-lg text-[#d9d9d9]">4</div>
                  <div className="text-xs text-[#a07a9a]">Fitur Utama</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex space-x-4 max-w-xl"
            >
              <Button variant="outline" className="border-[#2a2a4e] text-[#5a7fff] hover:bg-[#2a2a4e]">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </Button>
              <Button className="bg-gradient-to-r from-[#4a2a6e] to-[#6a3a8e] text-[#dbaaff] hover:brightness-110">
                <Github className="w-4 h-4 mr-2" />
                Github
              </Button>
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-8 max-w-xl"
            >
              <h2 className="flex items-center space-x-2 font-semibold text-[#d9d9d9] mb-4 text-sm">
                <Code className="w-4 h-4" />
                <span>Technologies Used</span>
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <motion.span
                    key={index}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-center space-x-1 bg-[#1a1a2e] border border-[#2a2a4e] rounded-md py-1 px-3 text-xs text-[#5a7fff] font-semibold"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-6 space-y-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="rounded-xl overflow-hidden max-w-full max-h-[280px] lg:max-h-[320px] shadow-lg shadow-[#1a1a2e]"
            >
              <Image
                src={project.image}
                alt={project.title}
                width={600}
                height={320}
                className="w-full h-auto object-cover"
              />
            </motion.div>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-[#0f0c1f] border border-[#2a2a4e] rounded-xl p-6 max-w-full"
            >
              <h3 className="flex items-center space-x-2 font-semibold text-[#f9d71c] mb-4 text-sm">
                <Star className="w-4 h-4" />
                <span>Key Features</span>
              </h3>
              <ul className="list-disc list-inside space-y-4 text-xs text-[#c9c9c9] max-w-xl">
                {project.features?.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
} 