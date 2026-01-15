"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ShieldCheck, Play, X, Atom } from "lucide-react";
import MatrixRain from "@/components/MatrixRain";
import GlitchText from "@/components/GlitchText";
import HolographicLogo from "@/components/HolographicLogo";
import { playBootSound, playClickSound, speak } from "@/lib/jarvis";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [showContent, setShowContent] = useState(false);
  
  // Text alternating state
  const [initText, setInitText] = useState("INITIALIZE SYSTEM");
  const [hintText, setHintText] = useState("CLICK TO START");

  useEffect(() => {
    setMounted(true);
    
    // Alternating text effect
    const interval = setInterval(() => {
      setInitText(prev => prev === "INITIALIZE SYSTEM" ? "系统初始化" : "INITIALIZE SYSTEM");
      setHintText(prev => prev === "CLICK TO START" ? "点击开始" : "CLICK TO START");
    }, 2500);
    
    return () => clearInterval(interval);
  }, []);

  const handleInit = () => {
    playBootSound();
    setInitialized(true);
    
    // Start speaking immediately to bypass mobile browser restrictions
    // Sequence: Show content -> Speak English -> Speak Chinese
    speak("Welcome to S G A, and AI UNI, Genesis System. Please select your identity.");
    
    setTimeout(() => {
        setShowContent(true);
        
        // Wait for English to finish (approx 5-6 seconds) then speak Chinese
        setTimeout(() => {
           speak("欢迎来到 S G A 与 AI UNI 创世纪系统。请选择您的身份。");
        }, 4500); // Reduced delay slightly since we started speaking earlier
    }, 1000);
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden p-4 font-mono">
      {/* Matrix Background */}
      <MatrixRain opacity={0.4} className="z-0" />

      {/* Init Screen */}
      <AnimatePresence>
        {!initialized && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
            className="z-50 flex flex-col items-center gap-8 cursor-pointer"
            onClick={handleInit}
          >
            <div className="relative group">
                <div className="absolute inset-0 bg-cyber-blue blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-pulse"></div>
                <button className="cyber-button text-xl md:text-2xl px-12 py-6 flex items-center gap-4 min-w-[320px] justify-center">
                    <Play size={24} className="animate-pulse" />
                    <GlitchText text={initText} />
                </button>
            </div>
            <p className="text-cyber-blue/50 text-xs tracking-[0.5em] animate-pulse">
              <GlitchText text={hintText} />
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence>
        {showContent && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="z-10 w-full max-w-6xl flex flex-col items-center"
          >
            {/* Header / Logo Area */}
            <div className="mb-12 md:mb-20 flex flex-col items-center text-center">
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-8">
                    <div className="scale-75 md:scale-100 transform transition-transform hover:scale-105 duration-300">
                        <HolographicLogo text="SGA" color="blue" className="text-6xl md:text-8xl" />
                    </div>
                    
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="text-white opacity-50 relative"
                    >
                        <Atom size={64} strokeWidth={1.5} className="text-cyan-400 animate-pulse" />
                        <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-30"></div>
                    </motion.div>

                    <div className="scale-75 md:scale-100 transform transition-transform hover:scale-105 duration-300">
                        <HolographicLogo text="AIUNI" color="pink" className="text-6xl md:text-8xl" />
                    </div>
                </div>
                
                <div className="h-[1px] w-full max-w-2xl bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mb-4"></div>
                <p className="text-xs md:text-sm tracking-[0.8em] text-cyan-500/60 uppercase font-light">
                    <GlitchText text="Strategic Alliance // Genesis Project" />
                </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 w-full px-4">
              <Link href="/student" onClick={playClickSound} className="group perspective-1000">
                <motion.div
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-black/40 backdrop-blur-md border border-cyber-blue/30 p-8 rounded-xl relative overflow-hidden group-hover:border-cyber-blue transition-all duration-300 h-full flex flex-col items-center text-center group-hover:shadow-[0_0_30px_rgba(0,243,255,0.2)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-cyber-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="mb-6 p-4 rounded-full bg-cyber-blue/10 text-cyber-blue group-hover:scale-110 transition-transform duration-300">
                    <Terminal size={48} />
                  </div>
                  
                  <h2 className="text-3xl font-bold mb-3 text-white group-hover:text-cyber-blue transition-colors">
                    <GlitchText text="STUDENT" />
                  </h2>
                  <p className="text-gray-400 mb-6 text-sm md:text-base">
                    未来 CEO 入口 / 元宇宙角色登陆 / 潜能测试
                  </p>
                  
                  <div className="mt-auto border border-cyber-blue/30 px-4 py-1 text-xs text-cyber-blue font-mono rounded opacity-60 group-hover:opacity-100">
                    ACCESS_LEVEL: 1
                  </div>
                </motion.div>
              </Link>

              <Link href="/parent" onClick={playClickSound} className="group perspective-1000">
                <motion.div
                  whileHover={{ scale: 1.02, rotateY: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-black/40 backdrop-blur-md border border-cyber-pink/30 p-8 rounded-xl relative overflow-hidden group-hover:border-cyber-pink transition-all duration-300 h-full flex flex-col items-center text-center group-hover:shadow-[0_0_30px_rgba(255,0,255,0.2)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-cyber-pink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="mb-6 p-4 rounded-full bg-cyber-pink/10 text-cyber-pink group-hover:scale-110 transition-transform duration-300">
                    <ShieldCheck size={48} />
                  </div>
                  
                  <h2 className="text-3xl font-bold mb-3 text-white group-hover:text-cyber-pink transition-colors">
                    <GlitchText text="INVESTOR" />
                  </h2>
                  <p className="text-gray-400 mb-6 text-sm md:text-base">
                    天使投资人入口 / 意向书签署 / 资源注入
                  </p>
                  
                  <div className="mt-auto border border-cyber-pink/30 px-4 py-1 text-xs text-cyber-pink font-mono rounded opacity-60 group-hover:opacity-100">
                    ACCESS_LEVEL: 9
                  </div>
                </motion.div>
              </Link>
            </div>
            
            <div className="mt-16 text-[10px] text-gray-600 font-mono tracking-widest text-center">
                SYSTEM_ID: SGA-AIUNI-2026 // SECURE CONNECTION
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
