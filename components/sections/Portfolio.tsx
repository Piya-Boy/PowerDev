'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import type { Portfolio } from '@/lib/types/portfolio';
import Image from 'next/image';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog';
import ProjectDetailsClient from '@/components/PortfolioDetailsClient';

const Portfolio = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch portfolios from API
  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('/api/portfolio');
        
        if (!response.ok) {
          setError('Failed to load portfolios');
          return;
        }
        
        const data = await response.json();
        setPortfolios(data);
      } catch (err) {
        setError('Failed to load portfolios');
        console.error('Error fetching portfolios:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolios();
  }, []);
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

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-[#131628] rounded-lg h-64"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-400 text-lg font-semibold mb-4">{error}</div>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-[#5a7fff] hover:bg-[#4a6fef] text-white px-6 py-2 rounded-lg"
            >
              Try Again
            </button>
          </div>
        ) : (
          <Dialog open={!!selectedPortfolio} onOpenChange={(open) => !open && setSelectedPortfolio(null)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolios.map((portfolio, index) => (
              <motion.div
                key={portfolio.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <DialogTrigger asChild>
                  <div onClick={() => setSelectedPortfolio(portfolio)}>
                    <Card className="border-0 bg-[#131628] overflow-hidden animated-gradient-border cursor-pointer hover:scale-[1.02] transition-transform duration-300">
                      <div className="h-48 overflow-hidden relative">
                        <Image
                          src={Array.isArray(portfolio.image) ? portfolio.image[0] : portfolio.image}
                          alt={portfolio.title}
                          width={500}
                          height={300}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#131628] to-transparent opacity-60"></div>
                        <div className="absolute bottom-0 left-0 p-4">
                          <span className="text-xs font-medium bg-[hsl(var(--neon-blue))/0.2] text-[hsl(var(--neon-blue))] px-2 py-1 rounded-full">
                            {portfolio.category}
                          </span>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="text-xl font-bold mb-2 text-white">{portfolio.title}</h3>
                        <p className="text-gray-300 text-sm line-clamp-2">{portfolio.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </DialogTrigger>
              </motion.div>
            ))}
          </div>
          <DialogContent className="max-w-3xl w-full bg-transparent border-0 shadow-none p-0">
            {selectedPortfolio && (
              <>
                <DialogTitle className="sr-only">{selectedPortfolio.title}</DialogTitle>
                <ProjectDetailsClient id={selectedPortfolio.id} />
              </>
            )}
          </DialogContent>
        </Dialog>
        )}
      </div>
    </section>
  );
};

export default React.memo(Portfolio);