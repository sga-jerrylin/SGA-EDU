"use client";

import { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { ShieldCheck, Briefcase, TrendingUp, Users, CheckCircle, ArrowRight } from "lucide-react";

function ParentForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const studentId = searchParams.get('student_id');
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    child_name: "",
    parent_role: "",
    parent_age_range: "",
    parent_education: "",
    parent_industry: "",
    parent_job_level: "",
    invest_style: "",
    resource_supply: [] as string[],
    corp_pain_point: "",
    success_goal: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleResource = (resource: string) => {
    setFormData(prev => ({
      ...prev,
      resource_supply: prev.resource_supply.includes(resource)
        ? prev.resource_supply.filter(r => r !== resource)
        : [...prev.resource_supply, resource]
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'parent', student_id: studentId, ...formData })
      });
      if (res.ok) {
        setStep(2); // Success step
      }
    } catch (error) {
      console.error(error);
      alert("提交失败，请检查网络连接");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f9fa] text-slate-900 font-sans p-4 md:p-12">
      <div className="max-w-2xl mx-auto pb-16">
        {/* Progress Bar */}
        <div className="mb-8 md:mb-12 sticky top-0 bg-[#f8f9fa]/95 backdrop-blur-md z-50 py-4 border-b border-slate-200/50 -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex justify-between mb-2 items-center">
            <span className="text-xs md:text-sm font-medium text-slate-500 uppercase tracking-widest">
              {step === 0 ? "板块三：投资人背景" : step === 1 ? "板块四：资源与B端线索" : "完成"}
            </span>
            <span className="text-xs md:text-sm font-medium text-slate-500 bg-slate-200 px-2 py-1 rounded-full">{step + 1} / 3</span>
          </div>
          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-slate-900"
              initial={{ width: "33%" }}
              animate={{ width: step === 0 ? "33%" : step === 1 ? "66%" : "100%" }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="text-center mb-6 md:mb-10">
                <div className="inline-block p-4 rounded-full bg-white shadow-sm mb-4">
                  <ShieldCheck className="w-10 h-10 md:w-12 md:h-12 text-slate-900" />
                </div>
                <h1 className="text-2xl md:text-3xl font-serif font-medium mb-3">天使投资人意向书</h1>
                <p className="text-sm md:text-base text-slate-500 leading-relaxed px-4">为了更好地协助学员在 SGA 寒假班的成长，<br className="hidden md:block" />我们需要了解您的背景与支持意向。</p>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">您是学员的？</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['父亲', '母亲', '其他监护人'].map(role => (
                      <button
                        key={role}
                        onClick={() => updateField('parent_role', role)}
                        className={`py-3 md:py-4 border rounded-xl transition-all text-sm md:text-base active:scale-[0.98] ${formData.parent_role === role ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-white hover:border-slate-300'}`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">您的年龄段</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['30-39岁', '40-49岁', '50岁+'].map(age => (
                      <button
                        key={age}
                        onClick={() => updateField('parent_age_range', age)}
                        className={`py-3 md:py-4 border rounded-xl transition-all text-sm md:text-base active:scale-[0.98] ${formData.parent_age_range === age ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-white hover:border-slate-300'}`}
                      >
                        {age}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">最高学历</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['高中及以下', '本科', '硕士', '博士'].map(edu => (
                      <button
                        key={edu}
                        onClick={() => updateField('parent_education', edu)}
                        className={`py-3 md:py-4 border rounded-xl transition-all text-sm md:text-base active:scale-[0.98] ${formData.parent_education === edu ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-white hover:border-slate-300'}`}
                      >
                        {edu}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">所在行业</label>
                  <input 
                    type="text"
                    value={formData.parent_industry}
                    onChange={(e) => updateField('parent_industry', e.target.value)}
                    placeholder="如：制造业、外贸、互联网、金融..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 outline-none focus:bg-white focus:border-slate-900 transition-all text-base placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">职位级别</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { id: 'Owner', label: '创始人/企业主' },
                      { id: 'Executive', label: '高管/合伙人' },
                      { id: 'Manager', label: '中层管理' },
                      { id: 'Staff', label: '专业人士/职员' }
                    ].map(job => (
                      <button
                        key={job.id}
                        onClick={() => updateField('parent_job_level', job.id)}
                        className={`py-4 px-5 border rounded-xl transition-all text-left flex justify-between items-center active:scale-[0.99] ${formData.parent_job_level === job.id ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-white hover:border-slate-300'}`}
                      >
                        <span className="font-medium">{job.label}</span>
                        {formData.parent_job_level === job.id && <CheckCircle size={18} />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setStep(1)}
                disabled={!formData.child_name || !formData.parent_role || !formData.parent_job_level}
                className="w-full bg-slate-900 text-white py-4 md:py-5 rounded-xl text-lg font-medium flex items-center justify-center gap-2 hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-slate-200 active:scale-[0.98]"
              >
                继续下一步 <ArrowRight size={20} />
              </button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 space-y-8">
                <div>
                  <label className="block text-base font-medium text-slate-900 mb-4 flex items-start gap-2">
                    <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded mt-0.5">Q19</span>
                    投资风格：这笔学费您的心态是？
                  </label>
                  <div className="space-y-3">
                    {[
                      { id: 'VC', label: 'VC (风投)', desc: '允许失败，博一个大未来。' },
                      { id: 'PE', label: 'PE (私募)', desc: '务实，最好马上看到回本/赚钱。' },
                      { id: 'Charity', label: 'Charity (慈善)', desc: '纯支持体验，开心就好。' }
                    ].map(style => (
                      <button
                        key={style.id}
                        onClick={() => updateField('invest_style', style.id)}
                        className={`w-full p-4 md:p-5 border rounded-xl transition-all text-left active:scale-[0.99] ${formData.invest_style === style.id ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-white hover:border-slate-300'}`}
                      >
                        <div className="font-bold text-lg mb-1">{style.label}</div>
                        <div className={`text-sm ${formData.invest_style === style.id ? 'text-slate-300' : 'text-slate-500'}`}>{style.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-base font-medium text-slate-900 mb-4 flex items-start gap-2">
                    <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded mt-0.5">Q20</span>
                    资源注入：您能为孩子的公司提供什么支持？(多选)
                  </label>
                  <div className="space-y-3">
                    {[
                      { id: 'SupplyChain', label: '供应链/货源', desc: '自家工厂/店铺库存' },
                      { id: 'DataAssets', label: '数据/案例', desc: '过往合同/文档/知识库' },
                      { id: 'Traffic', label: '私域/人脉', desc: '客户群/朋友圈流量' },
                      { id: 'None', label: '仅资金支持', desc: '' }
                    ].map(res => (
                      <button
                        key={res.id}
                        onClick={() => toggleResource(res.id)}
                        className={`w-full p-4 md:p-5 border rounded-xl transition-all text-left flex justify-between items-center active:scale-[0.99] ${formData.resource_supply.includes(res.id) ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-white hover:border-slate-300'}`}
                      >
                        <div>
                          <div className="font-bold text-lg">{res.label}</div>
                          {res.desc && <div className={`text-sm mt-1 ${formData.resource_supply.includes(res.id) ? 'text-slate-300' : 'text-slate-500'}`}>{res.desc}</div>}
                        </div>
                        {formData.resource_supply.includes(res.id) && <CheckCircle size={24} />}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-base font-medium text-slate-900 mb-4 flex items-start gap-2">
                    <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded mt-0.5">Q21</span>
                    企业痛点：您工作中哪个环节最想交给AI？
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { id: 'A', label: '销售/客服 (回消息累)' },
                      { id: 'B', label: '财务/行政 (报销/审合同烦)' },
                      { id: 'C', label: '内容/营销 (写文案没灵感)' },
                      { id: 'D', label: '无需求' }
                    ].map(pain => (
                      <button
                        key={pain.id}
                        onClick={() => updateField('corp_pain_point', pain.id)}
                        className={`p-4 md:p-5 border rounded-xl transition-all text-left text-base active:scale-[0.98] ${formData.corp_pain_point === pain.id ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-white hover:border-slate-300'}`}
                      >
                        {pain.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-base font-medium text-slate-900 mb-4 flex items-start gap-2">
                    <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded mt-0.5">Q22</span>
                    成功定义 (ROI)
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { id: 'A', label: '实战变现 (赚到钱)' },
                      { id: 'B', label: '背景提升 (拿BP/证书)' },
                      { id: 'C', label: '思维升级 (懂AI逻辑)' }
                    ].map(goal => (
                      <button
                        key={goal.id}
                        onClick={() => updateField('success_goal', goal.id)}
                        className={`p-4 md:p-5 border rounded-xl transition-all text-left text-base active:scale-[0.98] ${formData.success_goal === goal.id ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-white hover:border-slate-300'}`}
                      >
                        {goal.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4 pb-12">
                <button onClick={() => setStep(0)} className="flex-1 py-4 border border-slate-200 rounded-xl text-slate-500 font-medium hover:bg-slate-50 transition-colors active:scale-[0.98]">
                  返回
                </button>
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.invest_style || !formData.success_goal}
                  className="flex-[2] bg-slate-900 text-white py-4 rounded-xl text-lg font-medium flex items-center justify-center gap-2 hover:bg-slate-800 transition-all disabled:opacity-50 shadow-lg shadow-slate-200 active:scale-[0.98]"
                >
                  {isSubmitting ? "正在提交..." : "签署并提交"} <CheckCircle size={20} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100"
            >
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} />
              </div>
              <h2 className="text-3xl font-serif font-medium mb-4">提交成功</h2>
              <p className="text-slate-500 mb-8 max-w-sm mx-auto">
                您的“天使投资人意向书”已签署。数据已同步至 SGA 寒假班 “创世纪” 系统。
              </p>
              <button 
                onClick={() => router.push('/')}
                className="bg-slate-900 text-white px-8 py-3 rounded-full font-medium hover:bg-slate-800 transition-colors"
              >
                返回首页
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="mt-20 text-center text-slate-400 text-xs tracking-widest uppercase">
          © 2026 SGA X AIUNI • GENESIS SYSTEM
        </footer>
      </div>
    </main>
  );
}

export default function ParentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] text-slate-500">Loading...</div>}>
      <ParentForm />
    </Suspense>
  );
}
