"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface HolographicLogoProps {
  text: string;
  color?: "blue" | "pink";
  className?: string;
}

export default function HolographicLogo({ text, color = "blue", className = "" }: HolographicLogoProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Color configuration
  const mainColor = color === "blue" ? "text-cyber-blue" : "text-cyber-pink";
  const shadowColor = color === "blue" ? "#00f3ff" : "#ff00ff";
  
  return (
    <div 
      className={`relative inline-block group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Base Text */}
      <h1 className={`relative z-10 font-black tracking-tighter ${mainColor} mix-blend-screen`}>
        {text}
        
        {/* Scan line effect */}
        <span className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-30 animate-scan-fast pointer-events-none"></span>
      </h1>

      {/* Glitch Layer 1 - Cyan/Red Offset */}
      <motion.h1 
        className={`absolute top-0 left-0 -z-10 font-black tracking-tighter text-red-500 opacity-70 mix-blend-screen select-none`}
        animate={{ 
          x: isHovered ? [-2, 2, -1, 0] : 0,
          opacity: isHovered ? [0.5, 0.8, 0.5] : 0
        }}
        transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror" }}
      >
        {text}
      </motion.h1>

      {/* Glitch Layer 2 - Blue/Green Offset */}
      <motion.h1 
        className={`absolute top-0 left-0 -z-10 font-black tracking-tighter text-blue-500 opacity-70 mix-blend-screen select-none`}
        animate={{ 
          x: isHovered ? [2, -2, 1, 0] : 0,
          opacity: isHovered ? [0.5, 0.8, 0.5] : 0
        }}
        transition={{ duration: 0.3, repeat: Infinity, repeatType: "mirror" }}
      >
        {text}
      </motion.h1>

      {/* Glow Halo */}
      <div 
        className={`absolute inset-0 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-20`}
        style={{ backgroundColor: shadowColor }}
      ></div>
      
      {/* Tech Decorations */}
      <div className="absolute -top-2 -right-2 w-2 h-2 border-t-2 border-r-2 border-white/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute -bottom-2 -left-2 w-2 h-2 border-b-2 border-l-2 border-white/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  );
}
