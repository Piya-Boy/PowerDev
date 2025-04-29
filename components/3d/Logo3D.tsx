'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Logo3D = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(
      75,
      1, // Square aspect ratio for logo
      0.1,
      1000
    );
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(120, 120); // Match the size of the original logo
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    if (canvasRef.current.firstChild) {
      canvasRef.current.removeChild(canvasRef.current.firstChild);
    }
    canvasRef.current.appendChild(renderer.domElement);
    
    // Create logo geometry
    const geometry = new THREE.BoxGeometry(2, 2, 0.2);
    const material = new THREE.MeshPhongMaterial({
      color: 0x00ffff, // Neon blue color
      emissive: 0x00ffff,
      emissiveIntensity: 0.5,
      shininess: 100,
    });
    
    const logo = new THREE.Mesh(geometry, material);
    scene.add(logo);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x00ffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    // Animation
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Rotate logo
      logo.rotation.x = Math.sin(elapsedTime * 0.5) * 0.2;
      logo.rotation.y = elapsedTime * 0.5;
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={canvasRef} 
      className="w-[120px] h-[120px]"
    />
  );
};

export default Logo3D; 