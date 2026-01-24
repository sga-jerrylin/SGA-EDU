"use client";

import { useEffect, useRef } from "react";

export const initVoice = () => {
  // Silent init
  if (typeof window !== 'undefined') {
    window.speechSynthesis.getVoices();
  }
};

export const speakSequence = async (texts: string[]) => {
  if (typeof window === 'undefined') return;
  
  const voices = window.speechSynthesis.getVoices();
  // Try to find a robotic/Google/Microsoft voice
  const preferredVoice = voices.find(v => 
    v.name.includes('Google') || v.name.includes('Microsoft') || v.lang === 'en-US'
  );

  for (const text of texts) {
    await new Promise<void>(resolve => {
      const u = new SpeechSynthesisUtterance(text);
      if (preferredVoice) u.voice = preferredVoice;
      u.rate = 1.0;
      u.pitch = 0.8; // Lower pitch for Jarvis feel
      u.volume = 1;
      u.onend = () => resolve();
      window.speechSynthesis.speak(u);
    });
  }
};

export const playBootSound = () => {
  const audio = new Audio('/sounds/boot.mp3'); // We'll need to mock this or use synthesis
  // Using AudioContext for a generated sci-fi sound if file doesn't exist
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.5);
    
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch (e) {}
};

export const playClickSound = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch (e) {}
};

// Add user interaction unlock
export const unlockAudio = () => {
  if (typeof window !== 'undefined') {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
  }
};
