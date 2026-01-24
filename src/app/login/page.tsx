"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Terminal, Lock, ArrowRight, User } from "lucide-react";
import MatrixRain from "@/components/MatrixRain";
import GlitchText from "@/components/GlitchText";
import HolographicLogo from "@/components/HolographicLogo";
import { initVoice, speakSequence, playBootSound, playClickSound, unlockAudio } from "@/lib/jarvis";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    initVoice();
    
    // Play welcome sequence on mount (with user interaction check in real app, here auto-play might be blocked)
    const welcome = async () => {
        await new Promise(r => setTimeout(r, 1000));
        speakSequence([
            "Welcome to SGA Winter Camp. 欢迎来到SGA冬令营。",
            "System online. 系统已上线。",
            "Please authenticate identity. 请验证身份。"
        ]);
    };
    welcome();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    unlockAudio();
    playClickSound();
    
    setLoading(true);
    setError("");

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        // Jarvis success voice
        playBootSound();
        speakSequence(["Access granted. 访问已授权。", "Welcome back, Commander. 欢迎回来，指挥官。"]);
        
        // Store user info
        localStorage.setItem('sga_user', JSON.stringify(data.user));
        
        setTimeout(() => {
             router.push('/dashboard');
        }, 2000);
      } else {
        setError(data.error || 'Login failed');
        speakSequence(["Access denied. 拒绝访问。", "Identity verification failed. 身份验证失败。"]);
      }
    } catch (err) {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-4 font-mono relative overflow-hidden" onClick={unlockAudio}>
      <MatrixRain opacity={0.2} />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Holographic Card Effect */}
        <div className="bg-gray-900/80 backdrop-blur-xl border border-cyber-blue/30 p-8 rounded-2xl shadow-[0_0_50px_rgba(0,243,255,0.1)] relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-blue to-transparent opacity-50" />
          
          <div className="text-center mb-10">
            <HolographicLogo />
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs text-cyber-blue uppercase tracking-widest font-bold ml-1">Phone Number</label>
              <div className="relative group/input">
                <input 
                  type="text" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-black/50 border border-gray-700 text-white px-4 py-3 rounded-lg focus:border-cyber-blue focus:shadow-[0_0_15px_rgba(0,243,255,0.2)] outline-none transition-all placeholder-gray-700"
                  placeholder="ENTER PHONE ID..."
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-cyber-blue/30 group-focus-within/input:text-cyber-blue transition-colors">
                  <Terminal size={18} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-cyber-blue uppercase tracking-widest font-bold ml-1">Password</label>
              <div className="relative group/input">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/50 border border-gray-700 text-white px-4 py-3 rounded-lg focus:border-cyber-blue focus:shadow-[0_0_15px_rgba(0,243,255,0.2)] outline-none transition-all placeholder-gray-700"
                  placeholder="••••••••"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-cyber-blue/30 group-focus-within/input:text-cyber-blue transition-colors">
                  <Lock size={18} />
                </div>
              </div>
              <p className="text-[10px] text-gray-500 text-right">Default: sgaiuni</p>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-red-500/10 border border-red-500/50 text-red-400 text-xs p-3 rounded text-center font-bold"
              >
                ⚠ ACCESS DENIED: {error}
              </motion.div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-cyber-blue text-black font-black py-4 rounded-lg uppercase tracking-wider hover:bg-white transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:shadow-[0_0_30px_rgba(0,243,255,0.5)]"
            >
              {loading ? "AUTHENTICATING..." : "INITIALIZE SESSION"} <ArrowRight size={20} />
            </button>
          </form>
        </div>
        
        <div className="text-center mt-8 text-gray-600 text-xs font-mono">
          SECURE CONNECTION // ENCRYPTED
        </div>
      </motion.div>
    </main>
  );
}
