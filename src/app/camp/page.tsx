"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Zap, Globe, Code, Video, Layout } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import GlitchText from "@/components/GlitchText";
import HolographicLogo from "@/components/HolographicLogo";
import MatrixRain from "@/components/MatrixRain";

export default function CampPage() {
  return (
    <main className="min-h-screen bg-black text-white font-mono selection:bg-cyber-blue selection:text-black overflow-x-hidden">
      <MatrixRain opacity={0.2} />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center p-4 pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-0"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 text-center max-w-4xl mx-auto space-y-8"
        >
          <div className="flex justify-center mb-8 gap-8">
             <HolographicLogo text="AIUNI" color="pink" className="text-4xl md:text-6xl" />
             <HolographicLogo text="SGA" color="blue" className="text-4xl md:text-6xl" />
          </div>

          <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-r from-cyber-blue via-white to-cyber-pink">
            <GlitchText text="AI创造者训练营" />
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 font-light tracking-wide max-w-2xl mx-auto">
            从玩家到造物主的进化之旅
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-12">
            <Link href="#register" className="cyber-button px-12 py-4 text-xl font-bold flex items-center gap-2 group">
              立即报名 <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="#details" className="text-cyber-blue hover:text-white transition-colors underline decoration-1 underline-offset-4">
              查看详情
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Value Proposition */}
      <section id="details" className="py-20 px-4 md:px-12 relative z-10 bg-black/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-cyber-blue">拒绝&ldquo;玩具&rdquo;，只做&ldquo;产品&rdquo;</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              在这个AI重新定义一切的时代，你是选择做被算法喂养的消费者，还是做驾驭算法的创造者？
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: <Code size={32} />, 
                title: "写代码", 
                desc: "用 AI IDE 实现 'Vibe Coding'，不懂代码也能全栈开发。" 
              },
              { 
                icon: <Video size={32} />, 
                title: "搞视觉", 
                desc: "集结 Gemini + AutoGLM，让你的AI看懂世界、操控界面。" 
              },
              { 
                icon: <Layout size={32} />, 
                title: "拼审美", 
                desc: "用 SeaDream 和 Minimax 生成电影级素材，不仅好用，更要好看。" 
              },
              { 
                icon: <Globe size={32} />, 
                title: "上线", 
                desc: "你的作品不会躺在硬盘里，而是部署在线上，全球可见。" 
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-900/50 border border-cyber-blue/20 p-8 rounded-xl hover:border-cyber-blue/60 transition-colors group"
              >
                <div className="mb-6 text-cyber-blue group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-20 px-4 md:px-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-cyber-pink/30 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyber-pink/10 blur-[100px] rounded-full"></div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white relative z-10">
              &ldquo;3+1&rdquo; 硬核进阶模式
            </h2>

            <div className="space-y-12 relative z-10">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="bg-cyber-blue/10 text-cyber-blue px-6 py-2 rounded-full font-bold whitespace-nowrap">
                  线上 3 周 (预科)
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-white">觉醒与武装</h3>
                  <p className="text-gray-400 mb-4">这不是看视频打卡。你将完成 20+ 个AI微项目，手握三大件报到：</p>
                  <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['个人作品网站', '智能图像分析', '数字人分身'].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                        <Check size={16} className="text-cyber-pink" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="bg-cyber-pink/10 text-cyber-pink px-6 py-2 rounded-full font-bold whitespace-nowrap">
                  线下 5 天 (实战)
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-white">创造与发布</h3>
                  <p className="text-gray-400 mb-6">
                    直接对标硅谷前沿 AI Engineer 标准。从零打造一款真正上线的 AI 产品。
                    最终在产品发布会上路演。
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300 bg-gray-900/50 p-4 rounded-lg border border-gray-800">
                     <div>
                        <span className="text-cyber-pink font-bold block mb-1">Day 1-2:</span> 
                        <span className="text-gray-400">MVP构建与原型验证</span>
                     </div>
                     <div>
                        <span className="text-cyber-pink font-bold block mb-1">Day 3-4:</span> 
                        <span className="text-gray-400">产品迭代与增长黑客</span>
                     </div>
                     <div className="col-span-1 md:col-span-2">
                        <span className="text-cyber-pink font-bold block mb-1">Day 5:</span> 
                        <span className="text-white">产品发布会 (Demo Day) + 路演</span>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tutors & FAQ */}
      <section className="py-20 px-4 md:px-12 relative z-10 bg-black/80">
         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
               <h2 className="text-3xl font-bold mb-8 text-white">先人一步的 SGA 方法论</h2>
               <div className="space-y-6">
                  {[
                     { title: "Sourcing (资源整合)", desc: "不仅仅是写代码，更是学会如何调用全球最顶尖的 API 和模型能力。" },
                     { title: "Leverage (AI杠杆)", desc: "一个人就是一支队伍。学会用 AI 放大你的创造力，实现指数级产出。" },
                     { title: "Speed (唯快不破)", desc: "天下武功，唯快不破。在 AI 时代，速度就是最大的护城河。" }
                  ].map((item, i) => (
                     <div key={i} className="flex gap-4">
                        <div className="w-1 h-full bg-cyber-blue rounded-full"></div>
                        <div>
                           <h4 className="text-lg font-bold text-cyber-blue mb-1">{item.title}</h4>
                           <p className="text-gray-400 text-sm">{item.desc}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            <div>
               <h2 className="text-3xl font-bold mb-8 text-white">常见问题 (FAQ)</h2>
               <div className="space-y-4">
                  {[
                     { q: "需要编程基础吗？", a: "不需要。我们使用最新的 AI 辅助编程工具 (Vibe Coding)，只要你有逻辑思维，就能创造产品。" },
                     { q: "适合多大的孩子？", a: "建议 12-18 岁。我们需要你不甘平庸，拥有一颗不安分的灵魂。" },
                     { q: "线上课程怎么上？", a: "直播 + 录播 + 实时答疑。不是枯燥的网课，而是实战任务驱动的闯关游戏。" }
                  ].map((faq, i) => (
                     <div key={i} className="bg-gray-900/30 p-4 rounded-lg border border-gray-800">
                        <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                           <span className="text-cyber-pink">Q.</span> {faq.q}
                        </h4>
                        <p className="text-gray-400 text-sm pl-6">{faq.a}</p>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* Registration & Payment */}
      <section id="register" className="py-20 px-4 md:px-12 relative z-10 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-white">立即加入</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Payment QR */}
            <div className="bg-white p-6 rounded-2xl max-w-sm mx-auto w-full shadow-[0_0_30px_rgba(0,243,255,0.15)]">
               <div className="aspect-square relative w-full mb-4 bg-gray-100 flex items-center justify-center rounded-xl overflow-hidden">
                 <img src="/payment-qr.png" alt="Payment QR Code" className="w-full h-full object-contain" />
               </div>
               <p className="text-black font-bold text-lg">扫码支付锁定名额</p>
               <p className="text-gray-500 text-sm mt-2">支持微信支付 / 信用卡</p>
            </div>

            {/* Steps */}
            <div className="text-left space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-cyber-blue mb-6">报名流程</h3>
                
                {[
                  { step: "01", text: "扫描左侧二维码完成支付" },
                  { step: "02", text: "保存支付截图" },
                  { step: "03", text: "填写下方报名表 (学生/家长)" },
                  { step: "04", text: "等待助教联系入群" }
                ].map((s) => (
                  <div key={s.step} className="flex items-center gap-4 group">
                    <span className="text-3xl font-black text-gray-800 group-hover:text-cyber-pink transition-colors duration-300">{s.step}</span>
                    <span className="text-gray-300 text-lg">{s.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4 pt-8">
                <Link href="/student" className="cyber-button py-4 text-center font-bold">
                  填写学生报名表
                </Link>
                <Link href="/parent" className="border border-gray-700 hover:border-cyber-blue text-gray-400 hover:text-white py-4 text-center rounded-sm transition-colors font-mono">
                  填写家长意向书
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-gray-600 text-xs tracking-widest font-mono border-t border-gray-900">
        © 2026 SGA X AIUNI • GENESIS SYSTEM
      </footer>
    </main>
  );
}
