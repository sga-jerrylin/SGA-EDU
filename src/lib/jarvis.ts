// Global AudioContext to reuse and unlock on mobile
let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioContext) {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    audioContext = new AudioContext();
  }
  return audioContext;
};

// Explicitly unlock audio context on user interaction (Mobile Safari fix)
export const unlockAudio = () => {
  const ctx = getAudioContext();
  if (ctx.state === 'suspended') {
    ctx.resume();
  }
  // Create and play a silent buffer to fully unlock the engine
  const buffer = ctx.createBuffer(1, 1, 22050);
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(ctx.destination);
  source.start(0);
};

export const playBootSound = () => {
  const ctx = getAudioContext();
  unlockAudio(); // Ensure unlocked
  
  // Oscillator 1: Low frequency sweep
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  osc1.connect(gain1);
  gain1.connect(ctx.destination);
  
  osc1.type = "sawtooth";
  osc1.frequency.setValueAtTime(50, ctx.currentTime);
  osc1.frequency.linearRampToValueAtTime(200, ctx.currentTime + 0.5);
  
  gain1.gain.setValueAtTime(0.3, ctx.currentTime);
  gain1.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
  
  osc1.start();
  osc1.stop(ctx.currentTime + 1.5);

  // Oscillator 2: High frequency computer beep
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.connect(gain2);
  gain2.connect(ctx.destination);
  
  osc2.type = "square";
  osc2.frequency.setValueAtTime(800, ctx.currentTime + 0.2);
  osc2.frequency.setValueAtTime(1200, ctx.currentTime + 0.3);
  osc2.frequency.setValueAtTime(800, ctx.currentTime + 0.4);

  gain2.gain.setValueAtTime(0, ctx.currentTime);
  gain2.gain.setValueAtTime(0.1, ctx.currentTime + 0.2);
  gain2.gain.setValueAtTime(0, ctx.currentTime + 0.5);

  osc2.start();
  osc2.stop(ctx.currentTime + 1.0);
};

export const playClickSound = () => {
  const ctx = getAudioContext();
  if (ctx.state === 'suspended') ctx.resume();
  
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.type = "sine";
  osc.frequency.setValueAtTime(800, ctx.currentTime);
  
  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
  
  osc.start();
  osc.stop(ctx.currentTime + 0.1);
};

export const speak = (text: string) => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    // Cancel any current speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 0.9; 
    utterance.rate = 1.0;
    utterance.volume = 1;
    
    // Try to find a good voice
    const voices = window.speechSynthesis.getVoices();
    // Prefer "Google US English" or "Microsoft David" or any male voice
    const preferredVoice = voices.find(v => 
      v.name.includes("Google US English") || 
      v.name.includes("Microsoft David") || 
      (v.name.includes("English") && v.name.includes("Male"))
    );
    
    if (preferredVoice) utterance.voice = preferredVoice;

    window.speechSynthesis.speak(utterance);
  }
};

// Pre-load voices to ensure they are ready on mobile
export const initVoice = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.getVoices();
  }
};
