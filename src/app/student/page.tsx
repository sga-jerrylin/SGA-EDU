"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Terminal, Cpu, Zap, Sword, Save, ArrowRight, ArrowLeft, ShieldCheck } from "lucide-react";
import MatrixRain from "@/components/MatrixRain";
import Typewriter from "@/components/Typewriter";

const STEPS = [
  { id: 'intro', title: '系统引导' },
  { id: 'identity', title: '身份认证' },
  { id: 'potential', title: '潜能评估' },
  { id: 'final', title: '数据同步' }
];

export default function StudentPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    student_name: "",
    gender: "",
    birthday: "",
    wechat_id: "",
    phone_number: "",
    school_name: "",
    grade_level: "",
    talent_point: "",
    crisis_reaction: "",
    weapon_choice: "",
    logic_test: "",
    loot_distribution: "",
    time_commitment: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(s => Math.min(s + 1, STEPS.length - 1));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'student', ...formData })
      });
      const data = await res.json();
      if (res.ok && data?.success) {
        setStep(4);
      } else {
        console.error("Student submit failed", data);
        alert("提交失败，服务器返回错误");
      }
    } catch (error) {
      console.error(error);
      alert("同步失败，请检查网络连接");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-4 font-mono relative overflow-hidden">
      {/* Matrix-like background effect - Increased opacity for better visibility */}
      <MatrixRain opacity={0.35} />
      
      <div className="max-w-3xl mx-auto relative z-10 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 border-b border-cyber-blue/30 pb-4 sticky top-0 bg-black/90 backdrop-blur-md z-50 pt-4 px-4 -mx-4 md:px-0 md:mx-0">
          <div className="flex items-center gap-2 text-cyber-blue">
            <Terminal size={20} />
            <span className="text-lg font-bold tracking-tighter">SGA <span className="text-white mx-1">X</span> AIUNI</span>
          </div>
          <div className="flex gap-1.5">
            {STEPS.map((s, i) => (
              <div 
                key={s.id} 
                className={`h-1.5 w-6 md:w-10 rounded-full transition-colors duration-300 ${i <= step ? 'bg-cyber-blue shadow-[0_0_8px_#00f3ff]' : 'bg-gray-800'}`}
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-black text-cyber-blue mb-4 leading-tight">
                <Typewriter text="欢迎来到创世纪" speed={100} />
              </h2>
              <div className="cyber-card bg-gray-900/80 border-l-4 border-l-cyber-blue">
                <p className="text-base md:text-lg leading-relaxed mb-4 text-gray-300">
                  <span className="text-cyber-blue font-bold">[系统检测中...]</span> <br />
                  目标确认：<span className="text-white font-bold">未来 CEO</span> <br />
                  当前环境：SGA 寒假班 <br />
                  任务：创建你的元宇宙角色，完成潜能评估。
                </p>
                <button onClick={nextStep} className="cyber-button w-full mt-6 py-4 flex items-center justify-center gap-2 text-lg active:scale-95 transition-transform">
                  开始初始化 <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-cyber-blue flex items-center gap-2 mb-6">
                <Cpu size={24} /> 基础档案
              </h2>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-xs text-cyber-blue mb-2 uppercase tracking-widest">输入你的地球ID (真实姓名)</label>
                  <input 
                    type="text" 
                    value={formData.student_name}
                    onChange={(e) => updateField('student_name', e.target.value)}
                    className="w-full bg-gray-900 border border-cyber-blue/30 p-3 md:p-4 text-base rounded focus:border-cyber-blue focus:shadow-[0_0_10px_rgba(0,243,255,0.3)] outline-none transition-all placeholder-gray-700 appearance-none"
                    placeholder="NAME..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-cyber-blue mb-2 uppercase tracking-widest">性别</label>
                    <select 
                      value={formData.gender}
                      onChange={(e) => updateField('gender', e.target.value)}
                      className="w-full bg-gray-900 border border-cyber-blue/30 p-3 md:p-4 text-base rounded focus:border-cyber-blue outline-none appearance-none"
                    >
                      <option value="">SELECT...</option>
                      <option value="男">男 (MALE)</option>
                      <option value="女">女 (FEMALE)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-cyber-blue mb-2 uppercase tracking-widest">出生年代</label>
                    <select 
                      value={formData.birthday}
                      onChange={(e) => updateField('birthday', e.target.value)}
                      className="w-full bg-gray-900 border border-cyber-blue/30 p-3 md:p-4 text-base rounded focus:border-cyber-blue outline-none appearance-none"
                    >
                      <option value="">SELECT...</option>
                      <option value="15后 (2015-2019)">15后 (Alpha世代 - 原住民)</option>
                      <option value="10后 (2010-2014)">10后 (Alpha世代 - 崛起者)</option>
                      <option value="05后 (2005-2009)">05后 (Z世代 - 破壁者)</option>
                      <option value="00后 (2000-2004)">00后 (Z世代 - 创变者)</option>
                      <option value="90后">90后 (千禧一代 - 经典款)</option>
                      <option value="80后">80后 (黄金一代 - 传奇)</option>
                      <option value="70后">70后 (中流砥柱 - 宗师)</option>
                      <option value="60后">60后 (开拓者 - 传说)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-cyber-blue mb-2 uppercase tracking-widest">联络暗号 (微信号)</label>
                  <input 
                    type="text" 
                    value={formData.wechat_id}
                    onChange={(e) => updateField('wechat_id', e.target.value)}
                    className="w-full bg-gray-900 border border-cyber-blue/30 p-3 md:p-4 text-base rounded focus:border-cyber-blue outline-none placeholder-gray-700 appearance-none"
                    placeholder="必填！这是私域运营的命脉..."
                  />
                </div>

                <div>
                  <label className="block text-xs text-cyber-blue mb-2 uppercase tracking-widest">紧急通讯 (手机号)</label>
                  <input 
                    type="tel" 
                    value={formData.phone_number}
                    onChange={(e) => updateField('phone_number', e.target.value)}
                    className="w-full bg-gray-900 border border-cyber-blue/30 p-3 md:p-4 text-base rounded focus:border-cyber-blue outline-none placeholder-gray-700 appearance-none"
                    placeholder="用于短信通知和销售回访..."
                  />
                </div>

                <div>
                  <label className="block text-xs text-cyber-blue mb-2 uppercase tracking-widest">所属基地 (学校全称)</label>
                  <input 
                    type="text" 
                    value={formData.school_name}
                    onChange={(e) => updateField('school_name', e.target.value)}
                    className="w-full bg-gray-900 border border-cyber-blue/30 p-3 md:p-4 text-base rounded focus:border-cyber-blue outline-none placeholder-gray-700 appearance-none"
                    placeholder="输入学校全称..."
                  />
                </div>

                <div>
                  <label className="block text-xs text-cyber-blue mb-2 uppercase tracking-widest">当前等级 (年级)</label>
                  <select 
                    value={formData.grade_level}
                    onChange={(e) => updateField('grade_level', e.target.value)}
                    className="w-full bg-gray-900 border border-cyber-blue/30 p-3 md:p-4 text-base rounded focus:border-cyber-blue outline-none appearance-none"
                  >
                    <option value="">SELECT...</option>
                    <option value="初中">初中 (G7-G9)</option>
                    <option value="高中">高中 (G10-G12)</option>
                    <option value="大学">大学 (Undergrad)</option>
                    <option value="研究生及以上">研究生及以上 (Master/PhD)</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 mt-8 pb-8">
                <button onClick={prevStep} className="flex-1 px-4 py-4 border border-gray-700 text-gray-500 hover:text-white transition-colors flex items-center justify-center gap-2 active:bg-gray-800">
                  <ArrowLeft size={18} /> 返回
                </button>
                <button onClick={nextStep} className="cyber-button flex-1 flex items-center justify-center gap-2 active:scale-95">
                  下一步 <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-cyber-blue flex items-center gap-2 mb-6">
                <Zap size={24} /> 潜能测试
              </h2>

              <div className="space-y-6">
                <div className="cyber-card">
                  <p className="text-base mb-4 text-white font-bold">Q8. 开局10点天赋，你会全加在？</p>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { id: 'A', label: '口才 (我要说服所有人买单)' },
                      { id: 'B', label: '智力 (我要研究最强代码/产品)' },
                      { id: 'C', label: '魅力 (我要让世界成为我的粉丝)' },
                      { id: 'D', label: '均衡 (我要做六边形战士)' }
                    ].map(opt => (
                      <button 
                        key={opt.id}
                        onClick={() => updateField('talent_point', opt.id)}
                        className={`p-4 text-left border rounded transition-all active:scale-[0.98] ${formData.talent_point === opt.id ? 'border-cyber-blue bg-cyber-blue/20 text-white shadow-[0_0_10px_rgba(0,243,255,0.2)]' : 'border-gray-800 text-gray-400'}`}
                      >
                        <span className="font-bold text-cyber-blue mr-2">{opt.id}.</span> {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="cyber-card">
                  <p className="text-base mb-4 text-white font-bold">Q9. AI员工突然报错乱码，你会？</p>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { id: 'A', label: '安抚 (输入"你还好吗？")' },
                      { id: 'B', label: '暴击 (不管了，强制重启)' },
                      { id: 'C', label: '解剖 (复制乱码查Bug)' },
                      { id: 'D', label: '求救 (喊"妈！电脑坏了")' }
                    ].map(opt => (
                      <button 
                        key={opt.id}
                        onClick={() => updateField('crisis_reaction', opt.id)}
                        className={`p-4 text-left border rounded transition-all active:scale-[0.98] ${formData.crisis_reaction === opt.id ? 'border-cyber-blue bg-cyber-blue/20 text-white shadow-[0_0_10px_rgba(0,243,255,0.2)]' : 'border-gray-800 text-gray-400'}`}
                      >
                        <span className="font-bold text-cyber-blue mr-2">{opt.id}.</span> {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="cyber-card">
                  <p className="text-base mb-4 text-white font-bold">Q10. 创业路上怪兽横行，你选什么？</p>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { id: 'A', label: '大喇叭 (声波攻击/搞流量)' },
                      { id: 'B', label: '万能计算器 (算出弱点/卖服务)' },
                      { id: 'C', label: '自动售货机 (卖药水/做电商)' },
                      { id: 'D', label: '绝世代码剑 (写程序自动打怪)' }
                    ].map(opt => (
                      <button 
                        key={opt.id}
                        onClick={() => updateField('weapon_choice', opt.id)}
                        className={`p-4 text-left border rounded transition-all active:scale-[0.98] ${formData.weapon_choice === opt.id ? 'border-cyber-blue bg-cyber-blue/20 text-white shadow-[0_0_10px_rgba(0,243,255,0.2)]' : 'border-gray-800 text-gray-400'}`}
                      >
                        <span className="font-bold text-cyber-blue mr-2">{opt.id}.</span> {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="cyber-card">
                  <p className="text-base mb-4 text-white font-bold">Q11. 把大象放进冰箱，指令是？</p>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { id: 'A', label: '"把大象塞进去" (抽象派)' },
                      { id: 'B', label: '"1.开门 2.放入 3.关门" (SOP派)' },
                      { id: 'C', label: '"IF V(象) < V(箱) THEN Open()..." (算法派)' }
                    ].map(opt => (
                      <button 
                        key={opt.id}
                        onClick={() => updateField('logic_test', opt.id)}
                        className={`p-4 text-left border rounded transition-all active:scale-[0.98] ${formData.logic_test === opt.id ? 'border-cyber-blue bg-cyber-blue/20 text-white shadow-[0_0_10px_rgba(0,243,255,0.2)]' : 'border-gray-800 text-gray-400'}`}
                      >
                        <span className="font-bold text-cyber-blue mr-2">{opt.id}.</span> {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="cyber-card">
                  <p className="text-base mb-4 text-white font-bold">Q12. 组队打怪掉落1000金币，作为队长你怎么分？</p>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { id: 'A', label: '平分 (大家一样多)' },
                      { id: 'B', label: '按劳 (谁输出高给谁)' },
                      { id: 'C', label: '独吞 (我是队长我说了算)' },
                      { id: 'D', label: 'Re-invest (不分了，买装备打下一个怪)' }
                    ].map(opt => (
                      <button 
                        key={opt.id}
                        onClick={() => updateField('loot_distribution', opt.id)}
                        className={`p-4 text-left border rounded transition-all active:scale-[0.98] ${formData.loot_distribution === opt.id ? 'border-cyber-blue bg-cyber-blue/20 text-white shadow-[0_0_10px_rgba(0,243,255,0.2)]' : 'border-gray-800 text-gray-400'}`}
                      >
                        <span className="font-bold text-cyber-blue mr-2">{opt.id}.</span> {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="cyber-card">
                  <p className="text-base mb-4 text-white font-bold">Q13. 你这5天能投入多少时间？</p>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { id: 'A', label: '全天在线 (All in)' },
                      { id: 'B', label: '每天晚上 (Part-time)' },
                      { id: 'C', label: '随缘上线 (Casual)' }
                    ].map(opt => (
                      <button 
                        key={opt.id}
                        onClick={() => updateField('time_commitment', opt.id)}
                        className={`p-4 text-left border rounded transition-all active:scale-[0.98] ${formData.time_commitment === opt.id ? 'border-cyber-blue bg-cyber-blue/20 text-white shadow-[0_0_10px_rgba(0,243,255,0.2)]' : 'border-gray-800 text-gray-400'}`}
                      >
                        <span className="font-bold text-cyber-blue mr-2">{opt.id}.</span> {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8 pb-8">
                <button onClick={prevStep} className="flex-1 px-4 py-4 border border-gray-700 text-gray-500 hover:text-white transition-colors flex items-center justify-center gap-2 active:bg-gray-800">
                  <ArrowLeft size={18} /> 返回
                </button>
                <button onClick={nextStep} className="cyber-button flex-1 flex items-center justify-center gap-2 active:scale-95">
                  确认评估 <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="mb-8 inline-block p-6 rounded-full bg-cyber-blue/20 text-cyber-blue animate-pulse">
                <Save size={64} />
              </div>
              <h2 className="text-4xl font-black mb-4">角色档案已就绪</h2>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                正在准备将你的数据同步至 SGA “创世纪” 中心服务器。此操作不可逆。
              </p>
              
              <div className="cyber-card text-left mb-8 max-w-md mx-auto border-dashed">
                <p className="text-xs text-cyber-blue font-mono mb-2">/SUMMARY_DATA</p>
                <div className="space-y-1 text-sm">
                  <p><span className="text-gray-500">ID:</span> {formData.student_name}</p>
                  <p><span className="text-gray-500">SCHOOL:</span> {formData.school_name}</p>
                  <p><span className="text-gray-500">TALENT:</span> {formData.talent_point}</p>
                </div>
              </div>

              <div className="flex flex-col gap-4 max-w-md mx-auto">
                <button 
                  onClick={handleSubmit} 
                  disabled={isSubmitting}
                  className="cyber-button w-full py-4 text-xl flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isSubmitting ? "SYNCING..." : "确认并同步数据"} <Sword size={24} />
                </button>
                <button onClick={prevStep} className="text-gray-500 hover:text-white transition-colors text-sm">
                  返回修改
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="mb-8 inline-block p-6 rounded-full bg-cyber-blue/20 text-cyber-blue animate-pulse">
                <ShieldCheck size={64} />
              </div>
              <h2 className="text-4xl font-black text-cyber-blue mb-4 leading-tight">
                <Typewriter text="系统同步完成" speed={100} />
              </h2>
              <p className="text-gray-400 mb-8 max-w-md mx-auto text-lg">
                你的元宇宙角色已成功创建。
                <br />
                SGA 创世纪系统已接收你的潜能数据。
              </p>
              
              <div className="cyber-card max-w-md mx-auto mb-8 border-green-500/30 bg-green-900/10">
                <p className="text-green-400 font-bold mb-2">STATUS: ONLINE</p>
                <p className="text-sm text-gray-400">你的代号: <span className="text-white">{formData.student_name}</span></p>
                <p className="text-sm text-gray-400">你的角色: <span className="text-white">{formData.talent_point === 'A' ? 'Sales Warrior' : formData.talent_point === 'B' ? 'Tech Wizard' : formData.talent_point === 'C' ? 'Marketing Bard' : 'Ops Commander'}</span></p>
              </div>

              <button 
                onClick={() => window.location.reload()}
                className="text-gray-500 hover:text-white transition-colors text-sm"
              >
                [ 返回首页 ]
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
