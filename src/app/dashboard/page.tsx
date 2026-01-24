"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, Shield, Sword, Cpu, Globe, Upload, 
  CheckCircle, Lock, Camera, Settings, LogOut, ChevronRight, 
  Eye, Hand, MoveHorizontal, Maximize2, Minimize2, GripHorizontal,
  Activity, Radio, Zap, Target
} from "lucide-react";
import MatrixRain from "@/components/MatrixRain";
import { createGestureRecognizer, recognizeGestures } from "@/lib/gesture";

interface Task {
  id: number;
  title: string;
  description: string;
  detail: string;
  icon: any;
  hint?: string;
}

const TASKS: Task[] = [
  { 
    id: 1, 
    title: "Identity Origin", 
    description: "注册一个 Google / GitHub 账号",
    detail: "这是你进入开源世界的通行证。GitHub 是全球最大的代码托管平台，Google 账号则用于登录各类 AI 服务。\n\nStep 1: 访问 github.com 创建账号。\nStep 2: 完善个人资料。\nStep 3: 记住你的用户名和密码。",
    icon: Globe, 
    hint: "github.com / accounts.google.com" 
  },
  { 
    id: 2, 
    title: "Containerization", 
    description: "下载并安装 Docker Desktop",
    detail: "Docker 能让应用在任何环境中一致运行。\n\nStep 1: 访问 docker.com 下载 Docker Desktop。\nStep 2: 安装并启动。\nStep 3: 确保左下角状态为绿色 Running。",
    icon: Shield, 
    hint: "需开启 BIOS 虚拟化支持" 
  },
  { 
    id: 3, 
    title: "Version Control", 
    description: "下载并配置 Git",
    detail: "Git 是代码的时间机器。\n\nStep 1: 下载 Git SCM。\nStep 2: 终端运行 git --version。\nStep 3: 配置 user.name 和 user.email。",
    icon: Terminal, 
    hint: "git config --global user.name" 
  },
  { 
    id: 4, 
    title: "Target Acquired", 
    description: "登录 GitHub 并找到 Dify 项目",
    detail: "在 GitHub 搜索 'langgenius/dify'。\n\nStep 1: 点亮 Star。\nStep 2: Fork 到你自己的仓库。\nStep 3: Clone 到本地。",
    icon: Sword, 
    hint: "Star & Fork & Clone" 
  },
  { 
    id: 5, 
    title: "Local Deployment", 
    description: "下载并在本地部署 Dify",
    detail: "部署你的 AI 武器库。\n\nStep 1: 进入 dify/docker 目录。\nStep 2: 复制 .env.example 为 .env。\nStep 3: 运行 docker compose up -d。",
    icon: Cpu, 
    hint: "docker compose up -d" 
  },
  { 
    id: 6, 
    title: "Model Matrix", 
    description: "配置自己的第一个大模型底座",
    detail: "接入大模型能力。\n\nStep 1: 登录 Dify 后台。\nStep 2: 设置 -> 模型供应商。\nStep 3: 添加 Ollama 或 OpenAI Key。",
    icon: Settings, 
    hint: "Settings -> Model Providers" 
  },
  { 
    id: 7, 
    title: "Tool Forging", 
    description: "创建自己的第一个 Tool",
    detail: "打造你的专属工具。\n\nStep 1: 创建自定义工具。\nStep 2: 编写 OpenAPI Schema。\nStep 3: 测试工具调用。",
    icon: Sword, 
    hint: "Tools -> Create Custom Tool" 
  },
  { 
    id: 8, 
    title: "Knowledge Core", 
    description: "创建自己的知识库 (RAG)",
    detail: "建立外部记忆体。\n\nStep 1: 创建知识库。\nStep 2: 上传文档 (PDF/MD)。\nStep 3: 设置分段和索引。",
    icon: Shield, 
    hint: "Datasets -> Create from file" 
  }
];

// Rotating Arc Reactor Widget
const ArcReactor = ({ task, isGrabbing, onEngage }: { task: Task, isGrabbing: boolean, onEngage: () => void }) => {
    return (
        <div className="relative w-96 h-96 flex items-center justify-center cursor-grab active:cursor-grabbing group">
            {/* Outer Ring 1 */}
            <div className="absolute inset-0 rounded-full border-4 border-cyber-blue/30 border-dashed animate-spin-slower" />
            {/* Outer Ring 2 */}
            <div className="absolute inset-4 rounded-full border-2 border-cyber-blue/20 border-dotted animate-reverse-spin" />
            
            {/* Core Reactor */}
            <motion.div 
                className="relative z-10 w-48 h-48 rounded-full bg-black/80 border-4 border-cyber-blue shadow-[0_0_50px_rgba(0,243,255,0.4)] flex flex-col items-center justify-center backdrop-blur-md"
                animate={{ 
                    scale: isGrabbing ? 1.1 : 1,
                    boxShadow: isGrabbing ? "0 0 80px rgba(0,243,255,0.8)" : "0 0 50px rgba(0,243,255,0.4)"
                }}
                whileHover={{ scale: 1.05 }}
                onClick={onEngage}
            >
                <div className="absolute inset-0 rounded-full border-t-4 border-cyber-blue animate-spin-slow opacity-50" />
                <task.icon size={64} className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                <div className="mt-2 text-xs font-black tracking-widest text-cyber-blue">MISSION {String(task.id).padStart(2, '0')}</div>
                
                {/* Grab Hint */}
                <div className="absolute -bottom-16 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-cyber-blue text-xs tracking-[0.5em] animate-pulse">GRAB TO ENGAGE</div>
                    <div className="w-px h-8 bg-cyber-blue/50 mx-auto mt-2" />
                </div>
            </motion.div>

            {/* Connecting Lines */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-cyber-blue/10 -z-10" />
            <div className="absolute top-0 left-1/2 h-full w-px bg-cyber-blue/10 -z-10" />
        </div>
    );
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Logic State
  const [taskProgress, setTaskProgress] = useState<any>({});
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [missionState, setMissionState] = useState<'ORBITING' | 'ENGAGED' | 'COMPLETED'>('ORBITING');
  const [uploadingTask, setUploadingTask] = useState<number | null>(null);

  // Gesture State
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastGestureTime = useRef(0);
  const [gestureStatus, setGestureStatus] = useState("INIT");
  const [detectedGesture, setDetectedGesture] = useState<string | null>(null);
  const [handPosition, setHandPosition] = useState<{x: number, y: number} | null>(null);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const lastGestureActionTime = useRef(0);
  const lastGesture = useRef<string | null>(null);

  // AI Analysis State
  const [aiAnalysis, setAiAnalysis] = useState<any>({
      neural_sync: 100,
      cognitive_load: 10,
      threat_level: "LOW",
      pilot_status: "OPTIMAL"
  });

  // Audio Feedback System
  const playVoice = (text: string) => {
      if (typeof window === 'undefined') return;
      // Cancel previous
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      // Try to find a cool voice
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.name.includes('Google') || v.name.includes('Microsoft'));
      if (preferredVoice) utterance.voice = preferredVoice;
      
      utterance.pitch = 0.8; // Deeper
      utterance.rate = 1.1; // Faster
      window.speechSynthesis.speak(utterance);
  };

  const formatDurationFromStart = (start?: string, end?: string) => {
      if (!start || !end) return "";
      const s = new Date(start).getTime();
      const e = new Date(end).getTime();
      if (Number.isNaN(s) || Number.isNaN(e) || e < s) return "";
      const totalSeconds = Math.floor((e - s) / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      const pad = (n: number) => String(n).padStart(2, "0");
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  const getFirstCompletedAt = (progress?: Record<string, any>) => {
      if (!progress) return undefined;
      const times = Object.values(progress)
        .map((t: any) => t?.completed_at)
        .filter(Boolean)
        .map((t: string) => new Date(t).getTime())
        .filter((t: number) => !Number.isNaN(t));
      if (times.length === 0) return undefined;
      return new Date(Math.min(...times)).toISOString();
  };

  const mergeTaskProgress = (local: any, remote: any) => {
      if (!remote || Object.keys(remote).length === 0) return local || {};
      if (!local || Object.keys(local).length === 0) return remote;
      const merged: any = { ...remote };
      const allIds = new Set([...Object.keys(local), ...Object.keys(remote)]);
      allIds.forEach((id) => {
          const l = local?.[id];
          const r = remote?.[id];
          if (!r) {
              merged[id] = l;
              return;
          }
          if (!l) return;
          const lCompleted = l.status === 'completed';
          const rCompleted = r.status === 'completed';
          if (lCompleted && !rCompleted) {
              merged[id] = l;
              return;
          }
          if (lCompleted && rCompleted) {
              const lt = l.completed_at ? new Date(l.completed_at).getTime() : 0;
              const rt = r.completed_at ? new Date(r.completed_at).getTime() : 0;
              merged[id] = lt >= rt ? l : r;
              return;
          }
          if (r.status === 'locked' && l.status === 'unlocked') {
              merged[id] = l;
          }
      });
      return merged;
  };

  // Capture & Analyze Logic
  const captureAndAnalyze = async () => {
      if (!videoRef.current) return;
      
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      ctx.drawImage(videoRef.current, 0, 0);
      const base64Image = canvas.toDataURL('image/jpeg', 0.7);
      
      try {
          const res = await fetch('/api/analyze-student', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ image: base64Image })
          });
          const data = await res.json();
          if (data.success && data.analysis) {
              setAiAnalysis(data.analysis);
              const shouldWarn = data.analysis.cognitive_load > 80 || data.analysis.neural_sync < 50;
              if (shouldWarn) {
                  playVoice(`Warning. Pilot status abnormal.`);
              }
          }
      } catch (e) {
          console.error("AI Analysis Failed", e);
      }
  };

  useEffect(() => {
    // Client-side only
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('sga_user');
    if (!stored) { router.push('/login'); return; }
    
    playVoice("System Online. Welcome back, Commander. 系统上线，欢迎回来，指挥官。");

    try {
        const userData = JSON.parse(stored);
        fetchUserProfile(userData.id);
        
        createGestureRecognizer().then(() => {
           setGestureStatus("ONLINE");
           startCamera();
        });

        const interval = setInterval(captureAndAnalyze, 10 * 60 * 1000);
        return () => clearInterval(interval);

    } catch (e) { router.push('/login'); }
  }, []);

  // Update Current Task Index based on Progress
  useEffect(() => {
      if (Object.keys(taskProgress).length > 0) {
          const firstIncomplete = TASKS.findIndex(t => {
              const status = taskProgress[t.id]?.status;
              return status !== 'completed';
          });
          
          if (firstIncomplete !== -1) {
              if (firstIncomplete !== currentTaskIndex) {
                  setCurrentTaskIndex(firstIncomplete);
                  setMissionState('ORBITING'); // Default to orbiting for new task
                  playVoice(`Mission ${firstIncomplete + 1} Initiated. ${TASKS[firstIncomplete].title}. 任务${firstIncomplete + 1}启动。`);
              }
          } else {
              // All completed? Show last one or a summary
              setCurrentTaskIndex(TASKS.length - 1);
              setMissionState('COMPLETED');
              playVoice("All Missions Completed. Systems Standby. 所有任务完成，系统待机。");
          }
      }
  }, [taskProgress]);

  const startCamera = async () => {
    if (!videoRef.current) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      setTimeout(captureAndAnalyze, 1000);
      requestAnimationFrame(predictWebcam);
    } catch (e) {
      console.error("Camera access denied", e);
    }
  };

  const predictWebcam = () => {
    const video = videoRef.current;
    if (!video) return;

    const now = Date.now();
    if (now - lastGestureTime.current < 120) {
      requestAnimationFrame(predictWebcam);
      return;
    }
    lastGestureTime.current = now;

    const results = recognizeGestures(video);
    const gesture = results?.gestures?.[0]?.[0]?.categoryName || null;
    setDetectedGesture(gesture);
    setIsGrabbing(gesture === "Closed_Fist");

    if (gesture && gesture !== lastGesture.current) {
      const now = Date.now();
      if (now - lastGestureActionTime.current > 800) {
        if (gesture === "Open_Palm") {
          setMissionState("ENGAGED");
        }
        if (gesture === "Closed_Fist") {
          if (missionState === "ENGAGED") {
            setMissionState("ORBITING");
          }
        }
        lastGestureActionTime.current = now;
        lastGesture.current = gesture;
      }
    }

    const landmark = results?.landmarks?.[0]?.[0];
    if (landmark) {
      setHandPosition({ x: landmark.x * 100, y: landmark.y * 100 });
    } else {
      setHandPosition(null);
    }

    requestAnimationFrame(predictWebcam);
  };

  const fetchUserProfile = async (id: string) => {
    try {
      // Add timestamp to prevent caching
      const res = await fetch(`/api/student/profile?userId=${id}&t=${Date.now()}`);
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        setTaskProgress((prev: any) => mergeTaskProgress(prev, data.task_progress));
      }
    } catch (error) {} finally { setLoading(false); }
  };

  const handleTaskSubmit = async (taskId: number, file: File) => {
    setUploadingTask(taskId);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData });
      const uploadData = await uploadRes.json();
      if (uploadData.url) {
        // Optimistic Update: Mark current as completed and next as unlocked
        const now = new Date().toISOString();
        setTaskProgress((prev: any) => {
            const nextId = taskId + 1;
            return {
                ...prev,
                [taskId]: { ...prev[taskId], status: 'completed', screenshot_url: uploadData.url, completed_at: prev[taskId]?.completed_at || now },
                [nextId]: { ...prev[nextId], status: prev[nextId]?.status === 'locked' ? 'unlocked' : (prev[nextId]?.status || 'unlocked'), unlocked_at: prev[nextId]?.unlocked_at || now }
            };
        });

        const taskRes = await fetch('/api/student/tasks', {
          method: 'POST',
          body: JSON.stringify({ userId: user.id, taskId: taskId.toString(), screenshotUrl: uploadData.url })
        });
        if (taskRes.ok) {
            const taskData = await taskRes.json();
            if (taskData?.user?.task_progress) {
                setUser(taskData.user);
                setTaskProgress((prev: any) => mergeTaskProgress(prev, taskData.user.task_progress));
            }
        }
        playVoice("Data Uploaded. Analyzing... 数据已上传，正在分析...");
        // Force refresh profile with delay to ensure DB update
        setTimeout(() => fetchUserProfile(user.id), 1000); 
      }
    } catch (error) { alert("Submission failed"); } finally { setUploadingTask(null); }
  };

  if (loading) return <div className="min-h-screen bg-black text-cyber-blue flex items-center justify-center font-mono">LOADING SYSTEM...</div>;

  const currentTask = TASKS[currentTaskIndex];
  const completedTasks = TASKS.filter(t => taskProgress[t.id]?.status === 'completed');
  const missionStartTime = user?.mission_started_at || taskProgress?.[1]?.unlocked_at || getFirstCompletedAt(taskProgress);

  return (
    <main className="min-h-screen bg-black text-white font-mono relative overflow-hidden select-none">
      {completedTasks.length > 0 && (
        <div className="fixed top-0 left-0 w-full z-30 pointer-events-none">
          <div className="max-w-6xl mx-auto px-8 pt-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyber-blue shadow-[0_0_12px_rgba(0,243,255,0.8)]" />
                <span className="text-xs text-cyber-blue font-bold tracking-widest">START</span>
              </div>
              {completedTasks.map((task) => {
                const progress = taskProgress[task.id];
                return (
                  <div key={task.id} className="flex items-center gap-4">
                    <div className="relative flex items-center">
                      <div className="h-px w-20 bg-cyber-blue/40" />
                      <div className="absolute -top-5 left-0 w-full text-center text-[10px] text-cyber-blue/80">
                        {formatDurationFromStart(missionStartTime, progress?.completed_at)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-black/60 border border-cyber-blue/30 rounded-lg px-2 py-1">
                      {progress?.screenshot_url ? (
                        <Image src={progress.screenshot_url} alt={`task-${task.id}`} width={48} height={48} unoptimized className="w-12 h-12 object-cover rounded" />
                      ) : (
                        <div className="w-12 h-12 bg-gray-800 rounded" />
                      )}
                      <div className="text-xs text-white font-bold">TASK {task.id}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {/* 1. Background Layer (Camera + HUD Mask) */}
      <div className="fixed inset-0 z-0">
         <video 
            ref={videoRef} 
            className="w-full h-full object-cover opacity-30 grayscale contrast-125 brightness-75" 
            muted playsInline 
         />
         {/* Iron Man Mask HUD Overlay */}
         <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-80" viewBox="0 0 100 100" preserveAspectRatio="none">
             {/* Left Eye Frame */}
             <path d="M 10 10 L 30 10 L 35 20 L 10 20 Z" fill="none" stroke="rgba(0, 243, 255, 0.3)" strokeWidth="0.2" />
             <path d="M 10 90 L 30 90 L 35 80 L 10 80 Z" fill="none" stroke="rgba(0, 243, 255, 0.3)" strokeWidth="0.2" />
             {/* Right Eye Frame */}
             <path d="M 90 10 L 70 10 L 65 20 L 90 20 Z" fill="none" stroke="rgba(0, 243, 255, 0.3)" strokeWidth="0.2" />
             <path d="M 90 90 L 70 90 L 65 80 L 90 80 Z" fill="none" stroke="rgba(0, 243, 255, 0.3)" strokeWidth="0.2" />
         </svg>
         <div className="absolute inset-0 bg-[url('/grid.png')] opacity-10 pointer-events-none" />
         <MatrixRain opacity={0.15} />
      </div>

      {/* 2. Peripheral HUD Data (Left & Right Columns) */}
      <div className="fixed inset-y-0 left-0 w-[400px] p-12 flex flex-col justify-center gap-16 pointer-events-none z-10">
          {/* VITALS PANEL - Updated with AI Analysis */}
          <div className="hud-panel-glow bg-black/60 p-8 rounded-xl backdrop-blur-md hud-clip-top-left transform scale-110 origin-left">
              <div className="flex items-center gap-3 mb-6 text-cyber-blue border-b border-cyber-blue/30 pb-3">
                  <Activity size={24} />
                  <span className="text-lg font-black tracking-[0.2em]">NEURO_SYNC</span>
              </div>
              
              {/* Neural Sync Level (formerly Attention) */}
              <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2 font-bold tracking-wider">
                      <span className="text-gray-400">NEURAL SYNC</span>
                      <span className="text-cyber-blue text-lg">{aiAnalysis.neural_sync}%</span>
                  </div>
                  <div className="h-3 w-full bg-gray-800/50 border border-gray-700 rounded-full overflow-hidden p-0.5">
                      <motion.div 
                          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyber-blue shadow-[0_0_15px_#00f3ff]" 
                          animate={{ width: `${aiAnalysis.neural_sync}%` }}
                          transition={{ duration: 1 }}
                      />
                  </div>
              </div>

              {/* Cognitive Load (formerly Fatigue) */}
              <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2 font-bold tracking-wider">
                      <span className="text-gray-400">COGNITIVE LOAD</span>
                      <span className={`text-lg ${aiAnalysis.cognitive_load > 80 ? "text-red-500" : "text-green-500"}`}>
                          {aiAnalysis.cognitive_load}%
                      </span>
                  </div>
                  <div className="h-3 w-full bg-gray-800/50 border border-gray-700 rounded-full overflow-hidden p-0.5">
                      <motion.div 
                          className={`h-full rounded-full ${aiAnalysis.cognitive_load > 80 ? 'bg-gradient-to-r from-orange-600 to-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]' : 'bg-gradient-to-r from-emerald-600 to-green-500 shadow-[0_0_15px_rgba(34,197,94,0.8)]'}`}
                          animate={{ width: `${aiAnalysis.cognitive_load}%` }}
                          transition={{ duration: 1 }}
                      />
                  </div>
              </div>

              {/* Status Tags */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="px-4 py-2 bg-cyber-blue/10 border border-cyber-blue/50 rounded-lg text-xs text-center text-cyber-blue font-black tracking-widest uppercase">
                      {aiAnalysis.threat_level || "CALIBRATING"}
                  </div>
                  <div className="px-4 py-2 bg-cyber-blue/10 border border-cyber-blue/50 rounded-lg text-xs text-center text-cyber-blue font-black tracking-widest uppercase">
                      {aiAnalysis.pilot_status || "SCANNING"}
                  </div>
              </div>
          </div>

          {/* TARGET PANEL */}
          <div className="hud-panel-glow bg-black/60 p-8 rounded-xl backdrop-blur-md transform scale-110 origin-left">
              <div className="flex items-center gap-3 mb-6 text-cyber-blue border-b border-cyber-blue/30 pb-3">
                  <Target size={24} />
                  <span className="text-lg font-black tracking-[0.2em]">MISSION_LOG</span>
              </div>
              <div className="text-base font-mono text-white/90 space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                      <span className="text-gray-500 text-xs tracking-widest">OPERATIVE</span>
                      <span className="text-white font-bold text-lg uppercase">{user?.student_name}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                      <span className="text-gray-500 text-xs tracking-widest">RANK</span>
                      <span className="text-yellow-500 font-bold text-lg tracking-widest">RECRUIT</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                      <span className="text-gray-500 text-xs tracking-widest">PROGRESS</span>
                      <span className="text-cyber-blue font-black text-2xl">{Math.round(((currentTaskIndex) / TASKS.length) * 100)}%</span>
                  </div>
              </div>
          </div>
      </div>

      <div className="fixed inset-y-0 right-0 w-[400px] p-12 flex flex-col justify-center gap-16 pointer-events-none z-10 text-right">
          <div className="hud-panel-glow bg-black/60 p-8 rounded-xl backdrop-blur-md hud-clip-corners transform scale-110 origin-right">
              <div className="flex items-center justify-end gap-3 mb-4 text-cyber-blue">
                  <span className="text-lg font-black tracking-[0.2em]">SYSTEM</span>
                  <Cpu size={24} />
              </div>
              <div className="text-6xl font-black text-white hud-text-glow tracking-tighter">
                  {new Date().toLocaleTimeString('en-US', { hour12: false, minute: '2-digit' })}
              </div>
              <div className="text-xs text-cyber-blue mt-2 font-bold tracking-[0.5em] animate-pulse">ONLINE</div>
          </div>
          
          <div className="hud-panel-glow bg-black/60 p-8 rounded-xl backdrop-blur-md transform scale-110 origin-right">
              <div className="flex items-center justify-end gap-3 mb-6 text-cyber-blue border-b border-cyber-blue/30 pb-3">
                  <span className="text-lg font-black tracking-[0.2em]">SENSORS</span>
                  <Radio size={24} />
              </div>
              <div className="flex flex-col items-end gap-4">
                   <div className={`px-6 py-3 rounded-lg text-sm font-black tracking-widest border-2 ${detectedGesture ? 'border-green-500 text-green-500 bg-green-500/10 shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 'border-gray-700 text-gray-600'}`}>
                       {detectedGesture || "SCANNING..."}
                   </div>
                   <div className={`px-6 py-3 rounded-lg text-sm font-black tracking-widest border-2 ${isGrabbing ? 'border-yellow-500 text-yellow-500 bg-yellow-500/10 shadow-[0_0_15px_rgba(234,179,8,0.5)]' : 'border-gray-700 text-gray-600'}`}>
                       {isGrabbing ? "GRIP LOCKED" : "IDLE"}
                   </div>
              </div>
          </div>
      </div>

      {/* 3. Center Stage - Main Interaction */}
      <div className="relative z-20 w-full h-full min-h-screen flex items-center justify-center">
          <AnimatePresence mode="wait">
              {missionState === 'ORBITING' && (
                  <motion.div
                      key="orbiting"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 2, opacity: 0 }}
                      transition={{ duration: 0.8, ease: "backOut" }}
                      className="flex flex-col items-center"
                  >
                      <ArcReactor 
                          task={currentTask} 
                          isGrabbing={isGrabbing} 
                          onEngage={() => setMissionState('ENGAGED')}
                      />
                      <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1 }}
                          className="mt-12 text-center"
                      >
                          <h2 className="text-3xl font-black text-white hud-text-glow uppercase tracking-widest">{currentTask.title}</h2>
                          <p className="text-cyber-blue text-sm mt-2 font-mono">GRAB THE CORE TO INITIATE MISSION</p>
                      </motion.div>
                  </motion.div>
              )}

              {missionState === 'ENGAGED' && (
                  <motion.div
                      key="engaged"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full max-w-6xl px-8 grid grid-cols-2 gap-12"
                  >
                      {/* Left: Operational Guide */}
                      <motion.div 
                          initial={{ x: -100, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="bg-black/60 backdrop-blur-md hud-clip-corners border-2 border-cyber-blue/30 p-1"
                      >
                          <div className="h-[60vh] border border-cyber-blue/10 p-8 flex flex-col">
                              <div className="flex items-center gap-4 mb-8 border-b border-cyber-blue/20 pb-4">
                                  <div className="p-3 bg-cyber-blue/20 rounded border border-cyber-blue text-cyber-blue">
                                      <currentTask.icon size={32} />
                                  </div>
                                  <div>
                                      <div className="text-xs text-cyber-blue font-bold tracking-widest">MISSION {String(currentTask.id).padStart(2, '0')}</div>
                                      <h1 className="text-3xl font-black text-white uppercase">{currentTask.title}</h1>
                                  </div>
                              </div>
                              <div className="flex-1 overflow-y-auto custom-scrollbar prose prose-invert max-w-none">
                                  <p className="text-gray-300 whitespace-pre-wrap leading-loose text-lg">{currentTask.detail}</p>
                                  {currentTask.hint && (
                                      <div className="mt-8 p-4 bg-green-900/10 border border-green-500/30 rounded font-mono text-sm text-green-400">
                                          &gt; {currentTask.hint}
                                      </div>
                                  )}
                              </div>
                          </div>
                      </motion.div>

                      {/* Right: Upload Interface */}
                      <motion.div 
                          initial={{ x: 100, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="bg-black/60 backdrop-blur-md hud-clip-corners border-2 border-cyber-blue/30 p-1"
                      >
                          <div className="h-[60vh] border border-cyber-blue/10 p-8 flex flex-col items-center justify-center relative">
                               {/* Holographic lines */}
                               <div className="absolute inset-0 border border-cyber-blue/5 pointer-events-none" />
                               <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyber-blue" />
                               <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyber-blue" />

                               <div className="mb-8 text-center">
                                   <div className="text-cyber-blue font-black tracking-widest text-xl mb-2">EVIDENCE UPLINK</div>
                                   <div className="text-gray-500 text-xs">SECURE CHANNEL ESTABLISHED</div>
                               </div>

                               <label className={`
                                   relative w-full max-w-md aspect-square flex flex-col items-center justify-center border-2 border-dashed rounded-xl cursor-pointer transition-all duration-500 group
                                   ${uploadingTask === currentTask.id 
                                       ? 'border-cyber-blue bg-cyber-blue/10' 
                                       : 'border-gray-700 hover:border-cyber-blue hover:bg-cyber-blue/5'}
                               `}>
                                   {uploadingTask === currentTask.id ? (
                                       <div className="text-center">
                                           <div className="w-24 h-24 border-4 border-t-cyber-blue rounded-full animate-spin mb-4 mx-auto" />
                                           <div className="text-cyber-blue font-black animate-pulse">UPLOADING...</div>
                                       </div>
                                   ) : (
                                       <div className="text-center group-hover:scale-105 transition-transform">
                                           <Upload size={64} className="text-gray-500 group-hover:text-cyber-blue mb-4 mx-auto transition-colors" />
                                           <div className="text-white font-bold text-lg">CLICK TO UPLOAD</div>
                                       </div>
                                   )}
                                   <input 
                                       type="file" 
                                       className="hidden" 
                                       accept="image/*"
                                       disabled={uploadingTask === currentTask.id}
                                       onChange={(e) => e.target.files?.[0] && handleTaskSubmit(currentTask.id, e.target.files[0])}
                                   />
                               </label>
                          </div>
                      </motion.div>
                  </motion.div>
              )}
          </AnimatePresence>
      </div>

      {/* 4. Hand Cursor Overlay */}
      {handPosition && (
         <div 
            className="fixed w-12 h-12 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
            style={{ left: `${handPosition.x}%`, top: `${handPosition.y}%` }}
         >
             <div className={`absolute inset-0 border-2 rounded-full transition-all duration-200 ${isGrabbing ? 'border-green-500 scale-75 bg-green-500/20' : 'border-cyber-blue animate-spin-slow'}`} />
             <div className="absolute inset-0 flex items-center justify-center">
                 <div className={`w-2 h-2 rounded-full ${isGrabbing ? 'bg-green-500' : 'bg-white'}`} />
             </div>
             {/* Dynamic Crosshair */}
             <div className={`absolute top-1/2 left-[-100%] w-[300%] h-[1px] bg-cyber-blue/30 transition-all ${isGrabbing ? 'opacity-0' : 'opacity-100'}`} />
             <div className={`absolute left-1/2 top-[-100%] h-[300%] w-[1px] bg-cyber-blue/30 transition-all ${isGrabbing ? 'opacity-0' : 'opacity-100'}`} />
         </div>
      )}
    </main>
  );
}
