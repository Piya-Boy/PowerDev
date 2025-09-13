'use client';

import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create gradient
    const createGradient = () => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(10, 5, 32, 0.8)');
      gradient.addColorStop(0.5, 'rgba(46, 10, 58, 0.8)');
      gradient.addColorStop(1, 'rgba(10, 5, 32, 0.8)');
      return gradient;
    };

    // Animation loop
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      time += 0.005;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw animated gradient
      const gradient = createGradient();
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw animated circles
      for (let i = 0; i < 3; i++) {
        const x = Math.sin(time + i * Math.PI * 2 / 3) * 100 + canvas.width / 2;
        const y = Math.cos(time + i * Math.PI * 2 / 3) * 100 + canvas.height / 2;
        const radius = 50 + Math.sin(time * 2 + i) * 20;
        
        const circleGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        circleGradient.addColorStop(0, `rgba(${i === 0 ? '0, 255, 255' : i === 1 ? '255, 0, 255' : '0, 255, 0'}, 0.1)`);
        circleGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = circleGradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ opacity: 0.5 }}
    />
  );
};

export default AnimatedBackground; 