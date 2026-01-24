"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Table, User, Briefcase, Zap, Star, Shield, Search, RefreshCw, Lock, ArrowRight, X } from "lucide-react";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const formatDateTime = (value?: string) => {
    if (!value) return "—";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleString();
  };

  const formatDuration = (start?: string, end?: string) => {
    if (!start || !end) return "—";
    const s = new Date(start).getTime();
    const e = new Date(end).getTime();
    if (Number.isNaN(s) || Number.isNaN(e) || e < s) return "—";
    const totalSeconds = Math.floor((e - s) / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  const getLastCompletedAt = (progress?: Record<string, any>) => {
    if (!progress) return undefined;
    const times = Object.values(progress)
      .map((t: any) => t?.completed_at)
      .filter(Boolean)
      .map((t: string) => new Date(t).getTime())
      .filter((t: number) => !Number.isNaN(t));
    if (times.length === 0) return undefined;
    return new Date(Math.max(...times)).toISOString();
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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "sga" && password === "aiuni") {
      setIsLoggedIn(true);
      fetchData();
    } else {
      setError("Invalid credentials");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin');
      const data = await res.json();
      setSubmissions(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("确认删除该记录？删除后统计会自动更新。");
    if (!confirmed) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        console.error("Failed to delete submission");
        return;
      }
      if (selectedStudent && selectedStudent.id === id) {
        setSelectedStudent(null);
      }
      await fetchData();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  const filtered = submissions.filter(s => 
    (s.student_name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (s.phone?.includes(searchTerm)) ||
    (s.school?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-4 font-mono">
        <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/U3qYN8S0j3bpK/giphy.gif')] opacity-10 pointer-events-none bg-cover"></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-gray-900/80 border border-green-500/30 p-8 rounded-lg shadow-[0_0_30px_rgba(0,255,0,0.1)] backdrop-blur-sm relative z-10"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-green-500 mb-2 tracking-widest">SGA GENESIS</h1>
            <p className="text-gray-400 text-xs uppercase tracking-[0.2em]">Restricted Area // Level 10 Access</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs text-green-500 mb-2 uppercase tracking-widest">Operator ID</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black/50 border border-green-500/30 p-3 text-green-400 rounded focus:border-green-500 focus:shadow-[0_0_10px_rgba(0,255,0,0.3)] outline-none transition-all placeholder-green-900/50"
                placeholder="ENTER ID..."
              />
            </div>
            
            <div>
              <label className="block text-xs text-green-500 mb-2 uppercase tracking-widest">Passcode</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-green-500/30 p-3 text-green-400 rounded focus:border-green-500 focus:shadow-[0_0_10px_rgba(0,255,0,0.3)] outline-none transition-all placeholder-green-900/50"
                placeholder="ENTER CODE..."
              />
            </div>

            {error && (
              <div className="text-red-500 text-xs font-bold text-center bg-red-900/20 py-2 border border-red-500/30 rounded animate-pulse">
                ⚠ ACCESS DENIED: {error}
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-green-900/20 border border-green-500 text-green-500 py-3 font-bold uppercase tracking-widest hover:bg-green-500 hover:text-black transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <Lock size={16} /> Authenticate
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-slate-900 flex items-center gap-2">
              <span className="w-3 h-8 bg-slate-900 inline-block"></span>
              SGA Genesis Dashboard
            </h1>
            <p className="text-slate-500 mt-1">寒假班学员画像与 B 端线索分析系统</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="搜索姓名/手机/学校..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-900 w-64 shadow-sm"
              />
            </div>
            <button 
              onClick={fetchData}
              className="p-2 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors shadow-sm bg-white"
            >
              <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "总提交量", value: submissions.length, icon: User, color: "blue", bg: "bg-blue-50" },
            { label: "高潜线索 (Hot)", value: submissions.filter(s => s.is_hot_lead).length, icon: Star, color: "amber", bg: "bg-amber-50" },
            { label: "技术极客 (Tech)", value: submissions.filter(s => s.tech_score > 60).length, icon: Zap, color: "purple", bg: "bg-purple-50" },
            { label: "企业主/高管", value: submissions.filter(s => ['Owner', 'Executive'].includes(s.parent_job_level)).length, icon: Briefcase, color: "indigo", bg: "bg-indigo-50" }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`text-${stat.color}-600`} size={24} />
                </div>
                <span className="text-3xl font-bold text-slate-800">{stat.value}</span>
              </div>
              <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 font-semibold text-slate-700">学员信息</th>
                  <th className="px-6 py-4 font-semibold text-slate-700">角色画像</th>
                  <th className="px-6 py-4 font-semibold text-slate-700">技术潜能</th>
                  <th className="px-6 py-4 font-semibold text-slate-700">家长背景</th>
                  <th className="px-6 py-4 font-semibold text-slate-700">B端评分</th>
                  <th className="px-6 py-4 font-semibold text-slate-700">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 text-base">{s.student_name || s.fpa_name || "未知"}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{s.phone}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{s.school} ({s.grade})</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {s.role_archetype || "N/A"}
                      </span>
                      <div className="text-[10px] text-slate-400 mt-1.5 uppercase tracking-wider font-semibold">
                        {s.preferred_track || "未选赛道"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${s.tech_score >= 80 ? 'bg-green-500' : s.tech_score >= 60 ? 'bg-purple-500' : 'bg-slate-400'}`}
                            style={{ width: `${s.tech_score}%` }}
                          />
                        </div>
                        <span className="font-mono font-bold text-slate-700 w-6 text-right">{s.tech_score}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs font-medium text-slate-700">{s.parent_role}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{s.parent_industry}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{s.parent_job_level}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${s.is_hot_lead ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>
                          {s.b_side_score} {s.is_hot_lead && "★"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => setSelectedStudent(s)}
                        className="text-blue-600 hover:text-blue-800 font-medium text-xs border border-blue-200 hover:bg-blue-50 px-3 py-1.5 rounded transition-colors"
                      >
                        查看详情
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="ml-2 text-red-600 hover:text-red-800 font-medium text-xs border border-red-200 hover:bg-red-50 px-3 py-1.5 rounded transition-colors"
                      >
                        删除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="py-20 text-center text-slate-400">
              <div className="flex justify-center mb-4">
                <Search className="text-slate-200" size={48} />
              </div>
              <p>暂无匹配数据</p>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedStudent && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedStudent(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{selectedStudent.student_name}</h2>
                  <p className="text-slate-500 text-sm">提交时间: {new Date(selectedStudent.createdAt).toLocaleString()}</p>
                </div>
                <button 
                  onClick={() => setSelectedStudent(null)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X size={24} className="text-slate-400" />
                </button>
              </div>
              
              <div className="p-6 space-y-8">
                {/* Section 1: Student Basic */}
                <section>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b pb-2">基础档案</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-slate-500">性别:</span> {selectedStudent.gender}</div>
                    <div><span className="text-slate-500">出生日期:</span> {selectedStudent.birthday}</div>
                    <div><span className="text-slate-500">学校:</span> {selectedStudent.school}</div>
                    <div><span className="text-slate-500">年级:</span> {selectedStudent.grade}</div>
                    <div><span className="text-slate-500">微信:</span> {selectedStudent.wechat}</div>
                    <div><span className="text-slate-500">手机:</span> {selectedStudent.phone}</div>
                  </div>
                </section>

                {/* Section 2: AI & Tech */}
                <section>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b pb-2 flex items-center gap-2">
                    <Zap size={16} className="text-purple-500" /> 技术画像 (Score: {selectedStudent.tech_score})
                  </h3>
                  <div className="grid grid-cols-1 gap-3 text-sm">
                    <div className="bg-slate-50 p-3 rounded">
                      <span className="text-slate-500 block text-xs mb-1">角色原型 (Archetype):</span>
                      <span className="font-medium text-purple-700">{selectedStudent.role_archetype}</span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded">
                      <span className="text-slate-500 block text-xs mb-1">天赋加点 (Talent):</span>
                      {selectedStudent.talent_point}
                    </div>
                    <div className="bg-slate-50 p-3 rounded">
                      <span className="text-slate-500 block text-xs mb-1">武器选择 (Track):</span>
                      {selectedStudent.weapon_choice} ({selectedStudent.preferred_track})
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-50 p-3 rounded">
                        <span className="text-slate-500 block text-xs mb-1">危机反应:</span>
                        {selectedStudent.crisis_reaction}
                      </div>
                      <div className="bg-slate-50 p-3 rounded">
                        <span className="text-slate-500 block text-xs mb-1">逻辑测试:</span>
                        {selectedStudent.logic_test}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-50 p-3 rounded">
                        <span className="text-slate-500 block text-xs mb-1">分赃风格:</span>
                        {selectedStudent.leadership_style}
                      </div>
                      <div className="bg-slate-50 p-3 rounded">
                        <span className="text-slate-500 block text-xs mb-1">投入时间:</span>
                        {selectedStudent.time_commitment}
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b pb-2 flex items-center gap-2">
                    <Shield size={16} className="text-green-500" /> 任务进度与耗时
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                    <div className="bg-slate-50 p-3 rounded">
                      <span className="text-slate-500 block text-xs mb-1">任务开始时间:</span>
                      {formatDateTime(
                        selectedStudent.mission_started_at ||
                        selectedStudent.task_progress?.[1]?.unlocked_at ||
                        getFirstCompletedAt(selectedStudent.task_progress)
                      )}
                    </div>
                    <div className="bg-slate-50 p-3 rounded">
                      <span className="text-slate-500 block text-xs mb-1">任务结束时间:</span>
                      {formatDateTime(
                        selectedStudent.mission_completed_at ||
                        getLastCompletedAt(selectedStudent.task_progress)
                      )}
                    </div>
                    <div className="bg-slate-50 p-3 rounded">
                      <span className="text-slate-500 block text-xs mb-1">总耗时:</span>
                      {formatDuration(
                        selectedStudent.mission_started_at ||
                          selectedStudent.task_progress?.[1]?.unlocked_at ||
                          getFirstCompletedAt(selectedStudent.task_progress),
                        selectedStudent.mission_completed_at ||
                          getLastCompletedAt(selectedStudent.task_progress)
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    {Array.from({ length: 8 }, (_, i) => {
                      const id = i + 1;
                      const progress = selectedStudent.task_progress?.[id];
                      return (
                        <div key={id} className="bg-slate-50 p-3 rounded flex items-center justify-between">
                          <span className="text-slate-700 font-medium">任务 {id}</span>
                          <span className="text-slate-500">{formatDateTime(progress?.completed_at)}</span>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* Section 3: Parent & B-Side */}
                <section>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b pb-2 flex items-center gap-2">
                    <Briefcase size={16} className="text-blue-500" /> B端背景 (Score: {selectedStudent.b_side_score})
                  </h3>
                  <div className="grid grid-cols-1 gap-3 text-sm">
                    <div className="bg-blue-50/50 p-3 rounded border border-blue-100">
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <div><span className="text-slate-500 text-xs">家长角色:</span> {selectedStudent.parent_role}</div>
                        <div><span className="text-slate-500 text-xs">职级:</span> {selectedStudent.parent_job_level}</div>
                      </div>
                      <div className="mb-2"><span className="text-slate-500 text-xs">所在行业:</span> {selectedStudent.parent_industry}</div>
                      <div className="flex gap-2">
                        <span className="text-slate-500 text-xs">投资风格:</span> 
                        <span className="font-bold">{selectedStudent.invest_style}</span>
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 p-3 rounded">
                      <span className="text-slate-500 block text-xs mb-1">资源支持 (Resources):</span>
                      {selectedStudent.resource_tags ? selectedStudent.resource_tags.replace(/[\[\]"]/g, ' ') : 'None'}
                    </div>
                    
                    <div className="bg-slate-50 p-3 rounded">
                      <span className="text-slate-500 block text-xs mb-1">企业痛点 (Pain Point):</span>
                      {selectedStudent.pain_point}
                    </div>

                    <div className="bg-slate-50 p-3 rounded">
                      <span className="text-slate-500 block text-xs mb-1">成功定义 (ROI Goal):</span>
                      {selectedStudent.success_goal}
                    </div>
                  </div>
                </section>

                {(selectedStudent.fpa_name ||
                  selectedStudent.fpa_score_yellow != null ||
                  selectedStudent.fpa_score_red != null ||
                  selectedStudent.fpa_score_blue != null ||
                  selectedStudent.fpa_score_green != null) && (
                  <section>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b pb-2 flex items-center gap-2">
                      <Shield size={16} className="text-green-500" /> FPA 测试结果
                    </h3>
                    <div className="grid grid-cols-1 gap-3 text-sm">
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <span className="text-slate-500 block text-xs mb-1">姓名:</span>
                          {selectedStudent.fpa_name}
                        </div>
                        <div>
                          <span className="text-slate-500 block text-xs mb-1">年龄:</span>
                          {selectedStudent.fpa_age}
                        </div>
                        <div>
                          <span className="text-slate-500 block text-xs mb-1">性别:</span>
                          {selectedStudent.fpa_gender}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-yellow-50 p-3 rounded border border-yellow-100">
                          <span className="text-xs text-yellow-700 block mb-1">黄色:</span>
                          <span className="font-bold text-yellow-800">{selectedStudent.fpa_score_yellow}</span>
                        </div>
                        <div className="bg-red-50 p-3 rounded border border-red-100">
                          <span className="text-xs text-red-700 block mb-1">红色:</span>
                          <span className="font-bold text-red-800">{selectedStudent.fpa_score_red}</span>
                        </div>
                        <div className="bg-blue-50 p-3 rounded border border-blue-100">
                          <span className="text-xs text-blue-700 block mb-1">蓝色:</span>
                          <span className="font-bold text-blue-800">{selectedStudent.fpa_score_blue}</span>
                        </div>
                        <div className="bg-green-50 p-3 rounded border border-green-100">
                          <span className="text-xs text-green-700 block mb-1">绿色:</span>
                          <span className="font-bold text-green-800">{selectedStudent.fpa_score_green}</span>
                        </div>
                      </div>
                      <div className="bg-slate-50 p-3 rounded">
                        <span className="text-slate-500 block text-xs mb-1">主导类型:</span>
                        {selectedStudent.fpa_dominant_type}
                      </div>
                    </div>
                  </section>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
