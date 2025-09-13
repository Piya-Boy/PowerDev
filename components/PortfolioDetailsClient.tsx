'use client';
import React, { useState, useEffect, useRef } from 'react';
import type { Portfolio } from '@/lib/types/portfolio';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Code, Star, BadgeCheck, Share2, X } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ProjectDetailsSkeleton } from '@/components/ui/ProjectDetailsSkeleton';

interface PortfolioDetailsClientProps {
  id: string;
}

export default function PortfolioDetailsClient({ id }: PortfolioDetailsClientProps) {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [popupImg, setPopupImg] = useState<string | null>(null);
  const [slideIdx, setSlideIdx] = useState(0);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);

  // Fetch portfolio data
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`/api/portfolio/${id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Portfolio not found');
          } else {
            setError('Failed to load portfolio');
          }
          return;
        }
        
        const data = await response.json();
        setPortfolio(data);
      } catch (err) {
        setError('Failed to load portfolio');
        console.error('Error fetching portfolio:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolio();
  }, [id]);

  // Auto slide for multiple images
  useEffect(() => {
    if (portfolio && Array.isArray(portfolio.image) && portfolio.image.length > 1 && !popupImg) {
      if (slideInterval.current) clearInterval(slideInterval.current);
      slideInterval.current = setInterval(() => {
        setSlideIdx(idx => (idx + 1) % portfolio.image.length);
      }, 3000);
      return () => {
        if (slideInterval.current) clearInterval(slideInterval.current);
      };
    } else {
      setSlideIdx(0);
      if (slideInterval.current) clearInterval(slideInterval.current);
    }
  }, [portfolio?.image, popupImg]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative flex items-center justify-center rounded-3xl bg-gradient-to-br from-[#0a0520cc] via-[#1a1a2ecc] to-[#2e0a3acc] backdrop-blur-[2px] overflow-hidden"
    >
      {/* Glassmorphism background effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-[#5a7fff99] to-[#dbaaff33] rounded-full blur-3xl opacity-60 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#f9d71c33] to-[#5a7fff33] rounded-full blur-2xl opacity-50 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-br from-[#ffffff0a] to-[#5a7fff11] rounded-full blur-2xl opacity-40" />
      </div>
      <div className="relative z-10 p-8 lg:p-12 max-w-6xl w-full">
        {/* Loading State */}
        {isLoading ? (
          <ProjectDetailsSkeleton />
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-400 text-lg font-semibold mb-4">{error}</div>
            <Button onClick={() => window.location.reload()} className="bg-[#5a7fff] hover:bg-[#4a6fef]">
              Try Again
            </Button>
          </div>
        ) : !portfolio ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">Portfolio not found</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Project Image & Badges */}
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-5 flex flex-col items-center gap-4"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="rounded-3xl overflow-hidden w-full max-w-md max-h-[260px] shadow-2xl border-2 border-[#2a2a4e] bg-[#1a1a2e]/70 backdrop-blur-lg hover:scale-105 transition-transform duration-300"
              >
                {Array.isArray(portfolio.image) ? (
                  <div className="w-full h-[220px] flex items-center relative">
                    {/* Simple slider for multiple images */}
                    {portfolio.image.map((img: string, idx: number) => (
                      <Image
                        key={idx}
                        src={img}
                        alt={portfolio.title + ' ' + (idx + 1)}
                        width={600}
                        height={220}
                        style={{
                          opacity: slideIdx === idx ? 1 : 0,
                          zIndex: slideIdx === idx ? 2 : 1,
                          transition: 'opacity 0.7s',
                          position: 'absolute',
                          left: 0, top: 0, right: 0, bottom: 0,
                        }}
                        className="w-full h-[220px] object-cover object-center transition-transform duration-500 hover:scale-110 rounded-2xl cursor-pointer"
                        onClick={() => setPopupImg(img)}
                      />
                    ))}
                    {/* Dots indicator */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                      {portfolio.image.map((_: string, idx: number) => (
                        <button
                          key={idx}
                          className={`w-2 h-2 rounded-full ${slideIdx === idx ? 'bg-[#5a7fff]' : 'bg-[#8886]'} border border-white/30`}
                          onClick={() => setSlideIdx(idx)}
                          aria-label={`Go to image ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <Image
                    src={portfolio.image}
                    alt={portfolio.title}
                    width={600}
                    height={220}
                    className="w-full h-[220px] object-cover object-center transition-transform duration-500 hover:scale-110 cursor-pointer"
                    onClick={() => {
                      if (typeof portfolio.image === 'string') setPopupImg(portfolio.image);
                    }}
                  />
                )}
              </motion.div>
              {/* Badges */}
              <div className="flex flex-wrap gap-2 justify-center mt-2">
                <span className="flex items-center gap-1 bg-gradient-to-r from-[#5a7fff] to-[#dbaaff] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                  <BadgeCheck className="w-4 h-4" /> {portfolio.category}
                </span>
                <span className="flex items-center gap-1 bg-[#1a1a2e]/80 border border-[#2a2a4e] text-[#5a7fff] px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                  <Star className="w-4 h-4" /> {portfolio.technologies.length} Techs
                </span>
              </div>
            </motion.div>

            {/* Right: Project Info & Actions */}
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-7 space-y-6"
            >
              <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#5a7fff] to-[#dbaaff] leading-tight drop-shadow-lg">
                {portfolio.title}
              </h1>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "5rem" }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="h-1 rounded-full bg-gradient-to-r from-[#5a7fff] to-[#f9d71c] mb-2"
              ></motion.div>
              <p className="text-[#e0e0e0] text-base leading-relaxed max-w-2xl bg-[#1a1a2e]/60 rounded-lg p-3 shadow-inner backdrop-blur-md border border-[#2a2a4e]/40">
                {portfolio.description}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-2 flex-wrap">
                {portfolio.demo && (
                  <Button
                    asChild
                    variant="outline"
                    className="border-2 border-[#5a7fff] text-[#5a7fff] bg-white/10 hover:bg-[#5a7fff]/10 hover:scale-105 transition-transform shadow-lg backdrop-blur-md font-bold px-6 py-2"
                  >
                    <a href={portfolio.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                )}
                {portfolio.github && (
                  <Button
                    asChild
                    className="bg-gradient-to-r from-[#4a2a6e] to-[#6a3a8e] text-[#dbaaff] hover:brightness-110 hover:scale-105 transition-transform shadow-lg backdrop-blur-md font-bold px-6 py-2"
                  >
                    <a href={portfolio.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Github
                    </a>
                  </Button>
                )}
                <Button variant="ghost" className="text-[#f9d71c] hover:bg-[#f9d71c]/10 hover:text-[#5a7fff] transition-colors font-bold px-6 py-2">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>

              {/* Technologies Used */}
              {portfolio.technologies && portfolio.technologies.length > 0 && (
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-4 max-w-2xl"
                >
                  <h2 className="flex items-center space-x-2 font-semibold text-[#d9d9d9] mb-4 text-sm">
                    <Code className="w-4 h-4" />
                    <span>Technologies Used</span>
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {portfolio.technologies.map((tech: string, index: number) => (
                      <motion.span
                        key={index}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.8 + index * 0.08 }}
                        className="flex items-center space-x-1 bg-[#1a1a2e]/80 border border-[#2a2a4e] rounded-md py-1 px-3 text-xs text-[#5a7fff] font-semibold shadow-sm hover:scale-110 transition-transform cursor-pointer"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Key Features */}
              {portfolio.features && portfolio.features.length > 0 && (
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="bg-[#0f0c1f]/80 border border-[#2a2a4e] rounded-2xl p-5 max-w-2xl shadow-xl backdrop-blur-lg mt-4"
                >
                  <h3 className="flex items-center space-x-2 font-semibold text-[#f9d71c] mb-4 text-base">
                    <Star className="w-5 h-5" />
                    <span>Key Features</span>
                  </h3>
                  <ul className="list-disc list-inside space-y-4 text-sm text-[#e0e0e0] max-w-xl">
                    {portfolio.features.map((feature: string, index: number) => (
                      <motion.li
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.9 + index * 0.08 }}
                        className="hover:text-[#f9d71c] transition-colors duration-200"
                      >
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </div>

      {/* Popup Image Modal */}
      {popupImg && portfolio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setPopupImg(null)}>
          <div className="relative max-w-3xl w-full p-4 flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <button className="cursor-pointer absolute top-5 right-5 text-white bg-black/60 rounded-full p-2 hover:bg-black/80 z-10" onClick={() => setPopupImg(null)}>
              <X className="w-5 h-5" />
            </button>
            {/* Prev/Next buttons for multiple images */}
            {Array.isArray(portfolio.image) && portfolio.image.length > 1 && (
              <>
                <button
                  className="cursor-pointer absolute left-5 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 z-10"
                  onClick={() => {
                    const idx = portfolio.image.indexOf(popupImg!);
                    setPopupImg(portfolio.image[(idx - 1 + portfolio.image.length) % portfolio.image.length]);
                  }}
                  aria-label="Previous image"
                >
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
                </button>
                <button
                  className="cursor-pointer absolute right-5 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 z-10"
                  onClick={() => {
                    const idx = portfolio.image.indexOf(popupImg!);
                    setPopupImg(portfolio.image[(idx + 1) % portfolio.image.length]);
                  }}
                  aria-label="Next image"
                >
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
                </button>
              </>
            )}
            <img src={popupImg} alt="popup" className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border-2 border-[#2a2a4e] bg-[#1a1a2e]" />
          </div>
        </div>
      )}
    </motion.div>
  );
}