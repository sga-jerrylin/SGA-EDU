import { Atom, Zap } from "lucide-react";

export default function HolographicLogo() {
  return (
    <div className="relative w-32 h-32 mx-auto mb-6 flex items-center justify-center">
      {/* Outer Rotating Rings */}
      <div className="absolute inset-0 border-2 border-cyber-blue/30 rounded-full animate-[spin_10s_linear_infinite]" />
      <div className="absolute inset-2 border border-cyber-blue/20 rounded-full animate-[spin_8s_linear_infinite_reverse]" />
      <div className="absolute inset-4 border border-dashed border-cyber-blue/40 rounded-full animate-[spin_12s_linear_infinite]" />
      
      {/* Core Glow */}
      <div className="absolute inset-0 bg-cyber-blue/10 rounded-full blur-xl animate-pulse" />
      
      {/* Text Logo */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="flex items-center gap-1 text-3xl font-black italic tracking-tighter text-white drop-shadow-[0_0_10px_rgba(0,243,255,0.8)]">
          <span>SGA</span>
          <span className="text-cyber-blue">
             <Atom size={24} className="animate-spin" />
          </span>
          <span>AIUNI</span>
        </div>
        <div className="text-[0.5rem] tracking-[0.4em] text-cyber-blue mt-1 uppercase">Genesis System</div>
      </div>
    </div>
  );
}
