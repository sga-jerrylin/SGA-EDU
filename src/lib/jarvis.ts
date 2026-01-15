let audioContext: AudioContext | null = null;
let speakQueue: Promise<void> = Promise.resolve();

const getAudioContext = () => {
  if (!audioContext) {
    const Ctx = window.AudioContext || (window as any).webkitAudioContext;
    audioContext = new Ctx();
  }
  return audioContext;
};

export const unlockAudio = () => {
  const ctx = getAudioContext();
  if (ctx.state === "suspended") ctx.resume();

  const buffer = ctx.createBuffer(1, 1, 22050);
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(ctx.destination);
  source.start(0);
};

export const playBootSound = () => {
  const ctx = getAudioContext();
  unlockAudio();

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
  if (ctx.state === "suspended") ctx.resume();

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

const waitForVoices = (timeoutMs: number) =>
  new Promise<SpeechSynthesisVoice[]>((resolve) => {
    const synth = window.speechSynthesis;
    const existing = synth.getVoices();
    if (existing.length) return resolve(existing);

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      synth.removeEventListener("voiceschanged", onVoicesChanged);
      resolve(synth.getVoices());
    };

    const onVoicesChanged = () => finish();
    synth.addEventListener("voiceschanged", onVoicesChanged);
    window.setTimeout(finish, timeoutMs);
  });

const pickVoice = (voices: SpeechSynthesisVoice[], lang?: string) => {
  if (!lang) return undefined;
  const primary = lang.split("-")[0]?.toLowerCase();
  return (
    voices.find((v) => v.lang.toLowerCase() === lang.toLowerCase()) ||
    voices.find((v) => v.lang.toLowerCase().startsWith(`${primary}-`)) ||
    voices.find((v) => v.lang.toLowerCase().startsWith(primary))
  );
};

const speakOnce = async (text: string, lang?: string) => {
  if (typeof window === "undefined") return;
  if (!("speechSynthesis" in window)) return;

  const synth = window.speechSynthesis;
  if (synth.paused) synth.resume();
  if (synth.speaking) synth.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.pitch = 0.9;
  utterance.rate = 1.0;
  utterance.volume = 1;
  if (lang) utterance.lang = lang;

  const voices = synth.getVoices();
  const resolvedVoices = voices.length ? voices : await waitForVoices(1200);
  const voice = pickVoice(resolvedVoices, lang);
  if (voice) utterance.voice = voice;

  await new Promise<void>((resolve) => {
    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();
    synth.speak(utterance);
  });
};

export const speak = (text: string, lang?: string) => {
  speakQueue = speakQueue.then(() => speakOnce(text, lang));
  return speakQueue;
};

export const speakSequence = (items: Array<{ text: string; lang?: string }>) => {
  speakQueue = speakQueue.then(async () => {
    for (const item of items) {
      await speakOnce(item.text, item.lang);
    }
  });
  return speakQueue;
};

export const initVoice = () => {
  if (typeof window === "undefined") return;
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.getVoices();
};
