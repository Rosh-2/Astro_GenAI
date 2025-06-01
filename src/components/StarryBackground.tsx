import React, { useEffect, useRef } from 'react';

const StarryBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    interface Star {
      x: number;
      y: number;
      radius: number;
      color: string;
      velocity: {
        x: number;
        y: number;
      };
      alpha: number;
      alphaChange: number;
      distanceFromCenter: number;
      angle: number;
      angularVelocity: number;
    }
    
    const stars: Star[] = [];
    const starColors = ['#ffffff', '#fffccc', '#ffe3bf', '#ffd9e6'];
    const blackHoleCenter = {
      x: canvas.width * 0.85,
      y: canvas.height * 0.2,
    };
    
    for (let i = 0; i < 150; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 1.5;
      const color = starColors[Math.floor(Math.random() * starColors.length)];
      
      const dx = x - blackHoleCenter.x;
      const dy = y - blackHoleCenter.y;
      const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);
      
      const star: Star = {
        x,
        y,
        radius,
        color,
        velocity: {
          x: (Math.random() - 0.5) * 0.1,
          y: (Math.random() - 0.5) * 0.1
        },
        alpha: 0.1 + Math.random() * 0.9,
        alphaChange: 0.005 + Math.random() * 0.01,
        distanceFromCenter,
        angle,
        angularVelocity: 0.0001 + Math.random() * 0.0002
      };
      
      stars.push(star);
    }
    
    // Black hole effect
    const drawBlackHole = () => {
      const gradient = ctx.createRadialGradient(
        blackHoleCenter.x,
        blackHoleCenter.y,
        0,
        blackHoleCenter.x,
        blackHoleCenter.y,
        200
      );
      
      gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
      gradient.addColorStop(0.2, 'rgba(75, 0, 130, 0.3)');
      gradient.addColorStop(0.4, 'rgba(138, 43, 226, 0.2)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(blackHoleCenter.x, blackHoleCenter.y, 200, 0, Math.PI * 2);
      ctx.fill();
    };
    
    let animationId: number;
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 17, 40, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      drawBlackHole();
      
      stars.forEach(star => {
        // Black hole gravitational effect
        const dx = star.x - blackHoleCenter.x;
        const dy = star.y - blackHoleCenter.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 300) {
          star.distanceFromCenter = distance;
          star.angle += star.angularVelocity * (300 / distance);
          
          star.x = blackHoleCenter.x + Math.cos(star.angle) * star.distanceFromCenter;
          star.y = blackHoleCenter.y + Math.sin(star.angle) * star.distanceFromCenter;
          
          if (distance < 50) {
            star.alpha *= 0.95;
            if (star.alpha < 0.01) {
              star.x = Math.random() * canvas.width;
              star.y = Math.random() * canvas.height;
              star.alpha = 1;
              star.distanceFromCenter = Math.sqrt(
                Math.pow(star.x - blackHoleCenter.x, 2) + 
                Math.pow(star.y - blackHoleCenter.y, 2)
              );
              star.angle = Math.atan2(
                star.y - blackHoleCenter.y,
                star.x - blackHoleCenter.x
              );
            }
          }
        }
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        ctx.fill();
        
        star.x += star.velocity.x;
        star.y += star.velocity.y;
        
        star.alpha += star.alphaChange;
        if (star.alpha > 1 || star.alpha < 0.1) {
          star.alphaChange = -star.alphaChange;
        }
        
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
      });
      
      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default StarryBackground;