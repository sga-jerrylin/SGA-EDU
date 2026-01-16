"use client";

import { useState } from "react";

const questionsData = [
  { id: 1, options: [{ type: 1, text: "A. 天生的领导者，同时也会要求领导地位和他人的追随。" }, { type: 3, text: "B. 衣着整洁，并时时坚持自己举止合乎公认的道德规范。" }, { type: 4, text: "C. 易于接受和理解别人的想法，不愿反对或改变他人。" }, { type: 2, text: "D. 希望成为人们注意力的中心，喜欢在别人面前展示自己。" }] },
  { id: 2, options: [{ type: 2, text: "A. 从不掩饰自己的情感和喜好，别人与自己相处充满乐趣。" }, { type: 4, text: "B. 愿意听别人的倾诉，非常好的倾听者。" }, { type: 1, text: "C. 行动力强，闲不住，常被高效率的需要所推动。" }, { type: 3, text: "D. 善解人意，会从别人的立场看问题。" }] },
  { id: 3, options: [{ type: 3, text: "A. 头脑冷静，不易冲动。" }, { type: 1, text: "B. 天生的带领者，自信不低头。" }, { type: 2, text: "C. 喜欢与周围的人不断的说话讲笑，觉得应避免沉默而使他人尴尬。" }, { type: 4, text: "D. 在任何冲突中不受干扰，保持平静。为他人利益愿放弃自己意见。" }] },
  { id: 4, options: [{ type: 2, text: "A. 待人主动热情，充满活力，并将快乐感染他人。" }, { type: 4, text: "B. 安静，善于控制自己的情感，会自我约束情绪和热忱。" }, { type: 3, text: "C. 深沉，思想深刻并常常内省，对肤浅的交谈和消遣感到厌恶。" }, { type: 1, text: "D. 行动迅捷，有很快做出判断与结论的能力，对任何情况都能给予快速回应。" }] },
  { id: 5, options: [{ type: 1, text: "A. 当机立断，坚决果敢。不怕冒险，无所畏惧。" }, { type: 3, text: "B. 喜欢在工作前做详尽计划，宁愿按计划进行工作，而不喜欢临时变化。" }, { type: 2, text: "C. 积极参与活动，并能尽量将每件事都变得有趣味性。" }, { type: 4, text: "D. 易于接受他人，不愿说或做可能会引起别人不满和反对的事。" }] },
  { id: 6, options: [{ type: 3, text: "A. 以自己完美的标准来设想和衡量事情。" }, { type: 4, text: "B. 有令人回味深长的幽默诙谐的表述，不鸣则已，一鸣惊人。" }, { type: 2, text: "C. 风趣，有很强的幽默感，能把任何事情演绎成精彩的故事。" }, { type: 1, text: "D. 深信自己的个人能力与成功，极少犹豫或动摇。" }] },
  { id: 7, options: [{ type: 4, text: "A. 经常居中调解不同的意见，以避免双方冲突。" }, { type: 1, text: "B. 意志坚强，决心依自己的方式做事。" }, { type: 3, text: "C. 敏感，对周围的人和事非常注意，能记住特别的日子。" }, { type: 2, text: "D. 开心且充满乐趣，并能将快乐感染他人。" }] },
  { id: 8, options: [{ type: 1, text: "A. 不达目标，誓不罢休。" }, { type: 3, text: "B. 对自己和别人都订立高标准，觉得一切事情都应该有秩序。" }, { type: 2, text: "C. 喜欢帮助别人或经常热心地自告奋勇。" }, { type: 4, text: "D. 满足自己所拥有的，甚少羡慕别人。" }] },
  { id: 9, options: [{ type: 4, text: "A. 待人得体有耐心，易于相处，让人接近。" }, { type: 2, text: "B. 擅长于语言表达，充满生命力与兴奋。" }, { type: 1, text: "C. 毫于保留，坦率发言。" }, { type: 3, text: "D. 谦虚且对人诚实尊重。" }] },
  { id: 10, options: [{ type: 2, text: "A. 童心未泯，对事物充满了好奇心，相信任何事都会好转。" }, { type: 4, text: "B. 稳定，常走中间路线。" }, { type: 3, text: "C. 对事情记忆清晰，做事有条不紊。" }, { type: 1, text: "D. 不停地工作以完成任务，不愿休息。" }] },
  { id: 11, options: [{ type: 4, text: "A. 调整自己，使自己与周围协调，适应能力强。" }, { type: 3, text: "B. 相信一件事未完成之前，是无法做好下一件事的。" }, { type: 1, text: "C. 独立性强，依靠自己的能力，断与才智而少借助他人。" }, { type: 2, text: "D. 经常冒出新点子和想法，做事起动快，往往是想干就干。" }] },
  { id: 12, options: [{ type: 1, text: "A. 把一切都当作竞赛，总是有强烈的赢的欲望。" }, { type: 4, text: "B. 不会因延误码而懊恼，总代表且能容忍。" }, { type: 2, text: "C. 喜欢结交很多朋友，认为与人交往是有趣的事情。" }, { type: 3, text: "D. 对自已的理想、朋友和工作都绝对忠实，有时甚至无需任何理由。" }] },
  { id: 13, options: [{ type: 4, text: "A. 容易适应并接受任何环境或情况。" }, { type: 2, text: "B. 聚会场合的快乐人物，受欢迎的宾客。" }, { type: 3, text: "C. 热爱艺术（如文学、音乐、绘画等），并有较高的思想性和鉴赏力。" }, { type: 1, text: "D. 为了成就感，设立大目标在不断设立目标的过程中享受快乐。" }] },
  { id: 14, options: [{ type: 3, text: "A. 注重细节，喜欢研究事物各部分之间的逻辑和关系。" }, { type: 1, text: "B. 自给自足，独立性强，通常无需他人帮忙。" }, { type: 2, text: "C. 说话时表情生动，手势多，善于鼓动和渲染。" }, { type: 4, text: "D. 愿意听别人的倾诉，很有耐心。" }] },
  { id: 15, options: [{ type: 2, text: "A. 爱用新颖有趣的方式完成工作，不喜欢实现计划或受计划牵制，崇尚五任何束缚的自由。" }, { type: 1, text: "B. 乐意面对挑战和变革，并敢于下决心掌握，不喜欢墨守成规。" }, { type: 3, text: "C. 喜欢用图表、数字来解决问题，生活处事均依照计划，不喜欢被人干扰。" }, { type: 4, text: "D. 情绪平稳，乐于一成不变。在冲突中可不受干扰，保持平静。" }] },
  { id: 16, options: [{ type: 4, text: "A. 因缺乏主张，常草率听从别人而行动。" }, { type: 3, text: "B. 易感到被疏离，缺少安全感或担心别人对自己的看法。" }, { type: 1, text: "C. 喜欢命令支配，有时略显傲慢。" }, { type: 2, text: "D. 总想要吸引人，让自己成为别人注意力的中心。" }] },
  { id: 17, options: [{ type: 1, text: "A. 乐于推动或表现强势，而常使周围的人倍感压力。" }, { type: 3, text: "B. 过于谨慎而使行动缓慢，常需要别人推动。" }, { type: 2, text: "C. 注意力短暂，需经常变化燃烧自己的激情。" }, { type: 4, text: "D. 无自信心，少安全感或担心别人不喜欢与自己相处。" }] },
  { id: 18, options: [{ type: 4, text: "A. 不愿卷入是非，宁作旁观者。" }, { type: 2, text: "B. 滔滔不绝，说话声和笑声总是盖过别人，喜欢表达胜于倾听。" }, { type: 3, text: "C. 思想与兴趣深藏在自己心中，活在自己人的世界里。" }, { type: 1, text: "D. 易与人产生冲突，不管怎样总感到自己是对的。" }] },
  { id: 19, options: [{ type: 3, text: "A. 常感到情绪忧郁，强烈地期待别人能够理解自己的心思。" }, { type: 1, text: "B. 当别人行动不够快，不能完成指定任务时，易发怒或感到不耐烦。" }, { type: 2, text: "C. 情绪变化快，时而兴奋，时而低落。" }, { type: 4, text: "D. 迟迟才有行动，不易参与。" }] },
  { id: 20, options: [{ type: 2, text: "A. 无法专心或集中精力，做事缺少一贯性。" }, { type: 1, text: "B. 抗拒或拒不接受别人的建议或方法，有时显得固执。" }, { type: 3, text: "C. 不断地衡量和判断，经常考虑并提出反对意见。" }, { type: 4, text: "D. 为避免矛盾和冲突，即使有时是对的也不惜放弃自己的立场。" }] },
  { id: 21, options: [{ type: 1, text: "A. 自我评价高，认为自己是最好的人选" }, { type: 3, text: "B. 被人认为清高或与人相处严肃冷漠，而拒人千里之外" }, { type: 4, text: "C. 对多数事情均漠不关心，中间性格，无高低之分" }, { type: 2, text: "D. 乐于表现，经常开玩笑，有时会无意中让别人不高兴" }] },
  { id: 22, options: [{ type: 2, text: "A. 任性，易激动，但过后遗忘也快" }, { type: 4, text: "B. 调解冲突时，最重要的是大事化小，小事化无" }, { type: 1, text: "C. 决心以自己的意愿行事，不易被说服" }, { type: 3, text: "D. 非常敏感，对事情过分反应，被人误解时会觉得被冒犯" }] },
  { id: 23, options: [{ type: 3, text: "A. 因要求过高，而使别人难以达成自己的标准" }, { type: 1, text: "B. 有时不能忍受他人的态度、观点及做事的方式" }, { type: 2, text: "C. 情绪起伏很大，让人感觉不够稳重，或经常兑现不了自己的诺言" }, { type: 4, text: "D. 不喜欢订目标，也无意订目标" }] },
  { id: 24, options: [{ type: 2, text: "A. 说话时注重言语的色彩胜过精确，为达成效果有时会紧张" }, { type: 4, text: "B. 面上极少流露真实情感，说话低声" }, { type: 3, text: "C. 情绪不易高涨，当感到自己不被欣赏时很容易低落" }, { type: 1, text: "D. 直言不讳地坦率表达自己的看法，即使冒犯别人也不在乎" }] },
  { id: 25, options: [{ type: 1, text: "A. 抗压能力强，压力之下毫无惧色" }, { type: 3, text: "B. 不易相信别人，怀疑论者" }, { type: 2, text: "C. 自控力弱，有时说话过多影响自己的倾听" }, { type: 4, text: "D. 行动和思想较慢，不易兴奋和冲动" }] },
  { id: 26, options: [{ type: 3, text: "A. 常因追求完美导致反复考虑，做决定速度慢" }, { type: 4, text: "B. 总是先估量做每一件事要耗多少精力，遇到困难退缩" }, { type: 2, text: "C. 做事持久力不强，当觉得看不到收获或收到新的吸引时就放弃" }, { type: 1, text: "D. 会冲动地控制事情或别人，经常毫不犹豫地表示自己的正确" }] },
  { id: 27, options: [{ type: 4, text: "A. 对多数事情漠不关心，得过且过" }, { type: 1, text: "B. 非常不喜欢等待别人，对别人的生活也不感兴趣" }, { type: 3, text: "C. 不易宽恕或忘记别人对自己的伤害，常把别人的冒犯放在心中" }, { type: 2, text: "D. 经常健忘，反复变化，情绪与行动有时不合逻辑" }] },
  { id: 28, options: [{ type: 1, text: "A. 设立雄伟目标不断工作，认为休息是浪费时间" }, { type: 3, text: "B. 感到需要大量时间独处，避开人群，不喜成为众人瞩目的焦点" }, { type: 2, text: "C. 需要别人的认同和赞美，就如同演员需要观众的掌声和笑声" }, { type: 4, text: "D. 常因自己不愿打断别人，而耐心地听别人唠叨" }] },
  { id: 29, options: [{ type: 4, text: "A. 生活中事事不确定，对所做之事缺乏信心" }, { type: 2, text: "B. 生活规律和秩序性不强，时常找不到东西" }, { type: 1, text: "C. 处事精明，喜控制事情的进展，使自己达成目标" }, { type: 3, text: "D. 过于坚持细节和整洁，有时略显死板" }] },
  { id: 30, options: [{ type: 2, text: "A. 喜新厌旧，不喜欢长期做相同的事" }, { type: 4, text: "B. 行动迟缓，难以下定决定" }, { type: 3, text: "C. 尽管期待最好的结果，但往往看到事物的不利之处" }, { type: 1, text: "D. 因缺少耐性，思考不够缜密，行动有时草率" }] },
];

const colorMap: Record<number, { name: string; id: string; theme: string; title: string; description: string }> = {
  1: {
    name: "黄色",
    id: "yellow",
    theme: "#f1c40f",
    title: "天生的领航者",
    description:
      "<h3>性格优势</h3><p>您是天生的领导者，目标明确，行动力强。您享受挑战，并能驱使自己和他人朝着共同的目标前进。在混乱中，您能快速找到方向，并做出果断的决策。您的核心驱动力是“成就”，渴望通过自己的努力改变世界。</p><h3>潜在挑战</h3><p>有时，您对目标的过度专注可能会让他人感到压力。在高速前进时，请留意是否忽略了过程中的细节和团队成员的感受。学会倾听与合作，将使您的领导力更具温度和韧性。</p>",
  },
  2: {
    name: "红色",
    id: "red",
    theme: "#e74c3c",
    title: "热情的连接者",
    description:
      "<h3>性格优势</h3><p>您是天生的社交家，热情、乐观，充满活力。您善于表达，能轻松地与他人建立联系，并用您的积极情绪感染身边的人。您的核心驱动力是“快乐”，享受与人互动，并乐于成为众人关注的焦点。</p><h3>潜在挑战</h3><p>您对新鲜事物的追求可能导致注意力分散，有时会显得缺乏条理。请学会有意识地聚焦，将您的无限创意和热情投入到有始有终的项目中。在承诺之前稍作思考，将让您的个人魅力更加可靠。</p>",
  },
  3: {
    name: "蓝色",
    id: "blue",
    theme: "#3498db",
    title: "深邃的构建者",
    description:
      "<h3>性格优势</h3><p>您是天生的思想家和完美主义者，严谨、自律、富有条理。您追求深度和卓越，在行动前会进行周密的思考和计划。您的核心驱动力是“完美”，致力于让每一个细节都无懈可击，并对朋友和事业都报以极大的忠诚。</p><h3>潜在挑战</h3><p>您的高标准有时可能让自己和他人感到疲惫，并可能因为过度分析而错失良机。请学会在恰当的时候“放手”，允许不完美的存在。尝试更多地表达自己的情感，而不是期待他人能读懂您的内心，这会为您带来更和谐的人际关系。</p>",
  },
  4: {
    name: "绿色",
    id: "green",
    theme: "#2ecc71",
    title: "和谐的稳固者",
    description:
      "<h3>性格优势</h3><p>您是天生的和平缔造者，随和、稳定、极富耐心。您追求内在的宁静与人际的和谐，是团队中最可靠的倾听者和支持者。您的核心驱动力是“稳定”，善于化解冲突，让周围的人感到舒适和安全。</p><h3>潜在挑战</h3><p>您对冲突的回避有时可能会让您压抑自己的真实需求，显得缺乏主张。请勇敢地表达您的观点和立场，即使这可能带来暂时的不和谐。学会说“不”，并为自己设立目标，将帮助您的人生更加主动和精彩。</p>",
  },
};

type Step = "start" | "quiz" | "result";

export default function FpaPage() {
  const [step, setStep] = useState<Step>("start");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [answers, setAnswers] = useState<Record<number, number[]>>({});
  const [scores, setScores] = useState<Record<number, number> | null>(null);
  const [dominantType, setDominantType] = useState<number | null>(null);

  const handleStart = () => {
    if (!name.trim()) {
      alert("为了生成您的专属报告，请输入姓名或昵称。");
      return;
    }
    setStep("quiz");
  };

  const handleScoreChange = (questionId: number, optionIndex: number, value: number) => {
    setAnswers(prev => {
      const current = prev[questionId] ?? [0, 0, 0, 0];
      const next = [...current];
      next[optionIndex] = value;
      for (let i = 0; i < next.length; i += 1) {
        if (i !== optionIndex && next[i] === value) {
          next[i] = 0;
        }
      }
      return { ...prev, [questionId]: next };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    for (let i = 1; i <= 30; i += 1) {
      const ans = answers[i];
      if (!ans || ans.some(v => v === 0)) {
        alert(`第 ${i} 题尚未完成评分，请完成所有题目。`);
        const el = document.getElementById(`q${i}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        return;
      }
    }

    const finalScores: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };
    questionsData.forEach(q => {
      const ans = answers[q.id];
      q.options.forEach((opt, index) => {
        finalScores[opt.type] += ans[index];
      });
    });

    let maxScore = -Infinity;
    let selectedType = 1;
    (Object.keys(finalScores) as unknown as number[]).forEach(t => {
      const score = finalScores[t];
      if (score > maxScore) {
        maxScore = score;
        selectedType = t;
      }
    });

    setScores(finalScores);
    setDominantType(selectedType);
    setStep("result");

    try {
      await fetch("/api/fpa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          age,
          gender,
          scores: {
            yellow: finalScores[1],
            red: finalScores[2],
            blue: finalScores[3],
            green: finalScores[4],
          },
          dominantType: selectedType,
        }),
      });
    } catch (error) {
      console.error("FPA submit failed", error);
    }
  };

  const renderQuestion = (q: (typeof questionsData)[number]) => {
    const current = answers[q.id] ?? [0, 0, 0, 0];
    const usedScores = current.filter(v => v !== 0);

    return (
      <div
        key={q.id}
        id={`q${q.id}`}
        className="bg-slate-900/60 border border-slate-700 rounded-xl p-5 mb-5"
      >
        <p className="font-medium text-lg mb-4">{q.id})</p>
        {q.options.map((opt, index) => (
          <div key={index} className="flex flex-col md:flex-row md:items-center gap-3 py-2 border-t border-slate-800 first:border-t-0">
            <span className="flex-1 text-slate-100">{opt.text}</span>
            <select
              className="w-32 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100"
              value={current[index] || 0}
              onChange={e => handleScoreChange(q.id, index, Number(e.target.value))}
            >
              <option value={0}>请选择</option>
              {[4, 3, 2, 1].map(score => {
                const disabled = usedScores.includes(score) && current[index] !== score;
                return (
                  <option key={score} value={score} disabled={disabled}>
                    {score}分
                  </option>
                );
              })}
            </select>
          </div>
        ))}
      </div>
    );
  };

  const renderResult = () => {
    if (!scores || dominantType == null) return null;
    const dominantColor = colorMap[dominantType];
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    const entries = Object.entries(scores).sort(([, a], [, b]) => (b as number) - (a as number));

    return (
      <div className="mt-10 bg-slate-900/80 border border-slate-700 rounded-2xl p-6 md:p-8">
        <div className="text-slate-300 text-lg mb-3">
          {name}，您的核心性格密码是
        </div>
        <div
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ color: dominantColor.theme }}
        >
          {dominantColor.name} · {dominantColor.title}
        </div>
        <div
          className="text-slate-100 text-base leading-relaxed border-l-4 pl-4 mb-8"
          style={{ borderColor: dominantColor.theme }}
          dangerouslySetInnerHTML={{ __html: dominantColor.description }}
        />
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-slate-100 border border-slate-700 rounded-lg overflow-hidden">
            <thead className="bg-slate-900">
              <tr>
                <th className="px-4 py-2 border-b border-slate-700">性格色彩</th>
                <th className="px-4 py-2 border-b border-slate-700">得分</th>
                <th className="px-4 py-2 border-b border-slate-700">得分占比</th>
              </tr>
            </thead>
            <tbody>
              {entries.map(([typeKey, score]) => {
                const type = Number(typeKey);
                const color = colorMap[type];
                const percentage = total > 0 ? ((score as number / total) * 100).toFixed(1) : "0.0";
                return (
                  <tr key={typeKey} className="border-t border-slate-800">
                    <td
                      className="px-4 py-2 font-semibold"
                      style={{ color: color.theme }}
                    >
                      {color.name}
                    </td>
                    <td className="px-4 py-2 font-semibold text-center">{score as number}</td>
                    <td className="px-4 py-2">
                      <div className="w-full bg-slate-900 rounded-full h-4 overflow-hidden">
                        <div
                          className="h-4 text-xs flex items-center justify-center text-slate-900"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: color.theme,
                          }}
                        >
                          {percentage}%
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-[#1a1e23] text-slate-50 flex justify-center px-4 py-8">
      <div className="w-full max-w-3xl">
        <header className="text-center mb-8 border-b border-slate-700 pb-6">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-emerald-400 bg-clip-text text-transparent">
            FPA 性格色彩探索
          </h1>
          <p className="mt-3 text-sm md:text-base text-slate-400">
            本次探索将帮助您洞察天性，找到最适合您的成功路径。
          </p>
        </header>

        {step === "start" && (
          <section className="bg-slate-900/80 border border-slate-700 rounded-2xl p-6 md:p-8">
            <div className="space-y-4 max-w-md mx-auto">
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="请输入您的姓名或昵称"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-sm md:text-base outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
              />
              <input
                type="number"
                value={age}
                onChange={e => setAge(e.target.value)}
                placeholder="请输入您的年龄"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-sm md:text-base outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
              />
              <select
                value={gender}
                onChange={e => setGender(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-sm md:text-base text-slate-100 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
              >
                <option value="">选择性别</option>
                <option value="男性">男性</option>
                <option value="女性">女性</option>
                <option value="保密">保密</option>
              </select>
            </div>
            <div className="mt-8 text-center">
              <button
                onClick={handleStart}
                className="inline-flex items-center justify-center w-1/2 min-w-[200px] px-6 py-3 rounded-xl text-base md:text-lg font-semibold text-slate-900 bg-gradient-to-r from-yellow-400 to-amber-500 hover:shadow-lg hover:shadow-yellow-500/30 active:scale-95 transition-transform"
              >
                开始探索
              </button>
            </div>
          </section>
        )}

        {step === "quiz" && (
          <form onSubmit={handleSubmit}>
            <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-6 md:p-8 mb-6">
              <h3 className="text-lg font-semibold mb-2">测试说明</h3>
              <p className="text-sm text-slate-300">
                4分 - 最像我；3分 - 比较像我；2分 - 有点像我；1分 - 最不像我。
              </p>
              <p className="text-sm text-amber-300 mt-2">
                在每道题中，4、3、2、1分必须且只能各使用一次。
              </p>
            </div>
            <div>{questionsData.map(renderQuestion)}</div>
            <div className="mt-8 mb-10 flex justify-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full md:w-1/2 px-6 py-3 rounded-xl text-base md:text-lg font-semibold text-slate-900 bg-gradient-to-r from-emerald-400 to-sky-400 hover:shadow-lg hover:shadow-emerald-500/30 active:scale-95 transition-transform"
              >
                生成我的性格报告
              </button>
            </div>
          </form>
        )}

        {step === "result" && renderResult()}
      </div>
    </main>
  );
}

