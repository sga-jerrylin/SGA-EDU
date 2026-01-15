"use client";

import { useEffect, useRef } from "react";

interface MatrixRainProps {
  className?: string;
  opacity?: number;
}

export default function MatrixRain({ className = "", opacity = 0.1 }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    // Binary / Code style characters
    const chars = "01010101010101SGA01AIUNI0101010101010123456789";
    const charArray = chars.split("");
    
    const fontSize = 18;
    const columns = width / fontSize;
    
    // An array of drops - one per column
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const draw = () => {
      // Black BG for the canvas
      // Translucent BG to show trail - Lower opacity means longer trail
      ctx.fillStyle = `rgba(0, 0, 0, 0.03)`;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#0F0"; // Classic Matrix Green
      ctx.shadowBlur = 0; // Disable shadow for performance and crisp look
      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Random color: mostly matrix green, sometimes white (head of the stream)
        if (Math.random() > 0.95) {
           ctx.fillStyle = "#FFF"; 
           ctx.shadowBlur = 8;
           ctx.shadowColor = "#FFF";
        } else {
           ctx.fillStyle = "#0F0";
           ctx.shadowBlur = 0;
        }

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset shadow
        ctx.shadowBlur = 0;

        // Sending the drop back to the top randomly after it has crossed the screen
        // Adding a randomness to the reset to make the drops scattered on the Y axis
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Incrementing Y coordinate
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ opacity }}
    />
  );
}
