🚀 PRD: SGA Winter Camp "Genesis" System (完整全量版)
1. 项目概况
产品代号: Genesis (创世纪)

核心逻辑: 前端是“游戏+咨询”，后端是“Doris宽表”。

双线叙事:

Part A (学生线): 赛博朋克风，创建“未来CEO”角色。

Part B (家长线): 极简商务风，签署“天使投资协议”。

2. 完整问卷字段清单 (The Full Field List)
🔴 必须完整实现以下所有字段，不得删减。

Part A: 学生端 —— 《元宇宙角色登陆》
(UI风格: 深色模式，霓虹光效，打字机音效)

板块一：基础档案 (Identity)
Q1. [Text] 代号 (真实姓名)

Field: student_name

Prompt: "输入你的地球ID"

Q2. [Select] 性别

Field: gender

Options: 男 / 女

Q3. [Date] 出生日期

Field: birthday

用于精确计算年龄，判断是早慧少年还是成年大学生

Q4. [Text] 联络暗号 (微信号)

Field: wechat_id

必填！这是私域运营的命脉

Q5. [Text] 紧急通讯 (手机号)

Field: phone_number

用于短信通知和销售回访

Q6. [Text] 所属基地 (学校全称)

Field: school_name

后端逻辑：自动匹配重点学校库

Q7. [Select] 当前等级 (年级)

Field: grade_level

Options:

初中 (G7-G9)

高中 (G10-G12)

大学 (Undergrad)

研究生及以上 (Master/PhD)

板块二：RPG 潜能测试 (Capability & Persona)
Q8. [Radio] 属性加点：开局10点天赋，你会全加在？

Field: talent_point

A. 口才 (我要说服所有人买单) -> Tag: Sales

B. 智力 (我要研究最强代码/产品) -> Tag: Tech

C. 魅力 (我要让世界成为我的粉丝) -> Tag: Marketing

D. 均衡 (我要做六边形战士) -> Tag: Management

Q9. [Radio] 危机应对：AI员工突然报错乱码，你会？

Field: crisis_reaction

A. 安抚 (输入"你还好吗？") -> Tag: Empathy

B. 暴击 (不管了，强制重启) -> Tag: Result-Oriented

C. 解剖 (复制乱码查Bug) -> Tag: Geek (高潜)

D. 求救 (喊"妈！电脑坏了") -> Tag: Dependent

Q10. [Radio] 武器选择：创业路上怪兽横行，你选什么？

Field: weapon_choice

A. 大喇叭 (声波攻击/搞流量) -> Track: Content

B. 万能计算器 (算出弱点/卖服务) -> Track: Service

C. 自动售货机 (卖药水/做电商) -> Track: E-commerce

D. 绝世代码剑 (写程序自动打怪) -> Track: SaaS

Q11. [Radio] 逻辑测试：把大象放进冰箱，指令是？

Field: logic_test

A. "把大象塞进去" (抽象派)

B. "1.开门 2.放入 3.关门" (SOP派)

C. "IF V(象) < V(箱) THEN Open()..." (算法派)

Q12. [Radio] 战利品分配：组队打怪掉落1000金币，作为队长你怎么分？

Field: loot_distribution

A. 平分 (大家一样多) -> Style: Democratic

B. 按劳 (谁输出高给谁) -> Style: Performance

C. 独吞 (我是队长我说了算) -> Style: Dictator

D. Re-invest (不分了，买装备打下一个怪) -> Style: Long-termist

Q13. [Radio] 肝度测试：为了通关，你这5天能投入多少时间？

Field: time_commitment

A. 全天在线 (All in)

B. 每天晚上 (Part-time)

C. 随缘上线 (Casual)

(转场特效：⚠️ 检测到未成年操作，正在呼叫监护人/投资人授权... 界面切换为白色商务风)

Part B: 家长端 —— 《天使投资人意向书》
(UI风格: 极简，高雅，咨询公司风格)

板块三：投资人背景 (Investor Profile)
Q14. [Select] 您是学员的？

Field: parent_role

Options: 父亲 / 母亲 / 其他监护人

Q15. [Radio] 您的年龄段

Field: parent_age_range

Options: 30-39岁 / 40-49岁 / 50岁+

30-40岁是对AI最焦虑也最愿意买单的人群

Q16. [Radio] 最高学历

Field: parent_education

Options: 高中及以下 / 本科 / 硕士 / 博士

Q17. [Text] 所在行业

Field: parent_industry

Prompt: "如：制造业、外贸、互联网、金融..."

Q18. [Radio] 职位级别

Field: parent_job_level

Options:

创始人/企业主 (Owner)

高管/合伙人 (Executive)

中层管理 (Manager)

专业人士/职员 (Staff)

板块四：资源与B端线索 (Resource & Leads)
Q19. [Radio] 投资风格：这笔学费您的心态是？

Field: invest_style

A. VC (风投): 允许失败，博一个大未来。

B. PE (私募): 务实，最好马上看到回本/赚钱。

C. Charity (慈善): 纯支持体验，开心就好。

Q20. [Checkbox] 资源注入：您能为孩子的公司提供什么支持？(多选)

Field: resource_supply

[ ] 供应链/货源 (自家工厂/店铺库存) -> Tag: SupplyChain

[ ] 数据/案例 (过往合同/文档/知识库) -> Tag: DataAssets

[ ] 私域/人脉 (客户群/朋友圈流量) -> Tag: Traffic

[ ] 仅资金支持

Q21. [Radio] 企业痛点：您工作中哪个环节最想交给AI？(重要!)

Field: corp_pain_point

A. 销售/客服 (回消息累)

B. 财务/行政 (报销/审合同烦)

C. 内容/营销 (写文案没灵感)

D. 无需求

Q22. [Radio] 成功定义 (ROI)

Field: success_goal

A. 实战变现 (赚到钱)

B. 背景提升 (拿BP/证书)

C. 思维升级 (懂AI逻辑)

3. ETL 逻辑 (Backend Logic for Doris)
告诉开发/AI：前端传来的是JSON，后端存入Doris前要跑这段Python逻辑。

Python

def process_sga_submission(data):
    profile = {}
    
    # --- 1. 基础信息清洗 ---
    profile['uid'] = generate_uuid()
    profile['name'] = data['student_name']
    profile['contact_wechat'] = data['wechat_id']
    profile['contact_phone'] = data['phone_number']
    
    # --- 2. 学生画像打标 (Student Tagging) ---
    # 角色原型
    if data['talent_point'] == 'A': profile['role'] = 'Sales_Warrior'
    elif data['talent_point'] == 'B': profile['role'] = 'Tech_Wizard'
    elif data['talent_point'] == 'C': profile['role'] = 'Marketing_Bard'
    else: profile['role'] = 'Ops_Commander'
    
    # 极客指数 (Geek Score)
    geek_score = 0
    if data['crisis_reaction'] == 'C': geek_score += 40 # 选解剖Bug加分
    if data['logic_test'] == 'C': geek_score += 30      # 选算法逻辑加分
    if data['weapon_choice'] == 'D': geek_score += 30   # 选代码剑加分
    profile['tech_score'] = geek_score
    
    # 领导力风格
    profile['leadership_style'] = data.get('loot_distribution', 'Unknown')

    # --- 3. B端线索挖掘 (B-Side Lead Scoring) ---
    b_score = 0
    # 身份加权
    if data['parent_job_level'] in ['Owner', 'Executive']: b_score += 30
    # 行业加权 (实体行业更缺AI)
    if '制造' in data['parent_industry'] or '外贸' in data['parent_industry']: b_score += 20
    # 资源加权 (有数据/供应链最值钱)
    resources = data.get('resource_supply', [])
    if 'SupplyChain' in resources: b_score += 40
    if 'DataAssets' in resources: b_score += 40
    
    profile['b_side_score'] = min(b_score, 100)
    profile['is_hot_lead'] = b_score > 60  # 超过60分标记为高潜客户
    
    # --- 4. 推荐产品 (Recommendation) ---
    pain = data.get('corp_pain_point')
    if pain == 'A': profile['rec_product'] = 'SGA_Sales_Agent'
    elif pain == 'B': profile['rec_product'] = 'SGA_Admin_Agent'
    elif pain == 'C': profile['rec_product'] = 'SGA_Marketing_Agent'
    
    return profile
4. Doris 表结构 (Schema)
SQL

CREATE TABLE dws_sga_full_profile (
    `uid` VARCHAR(50) NOT NULL COMMENT "UUID",
    `student_name` VARCHAR(50),
    `gender` VARCHAR(10),
    `age` INT,
    `phone` VARCHAR(20),
    `wechat` VARCHAR(50),
    `school` VARCHAR(100),
    `grade` VARCHAR(20),
    
    -- 学生画像
    `role_archetype` VARCHAR(30) COMMENT "角色原型",
    `tech_score` INT COMMENT "技术极客分",
    `leadership_style` VARCHAR(20) COMMENT "分赃风格",
    `preferred_track` VARCHAR(30) COMMENT "武器/赛道",
    
    -- 家长画像 & B端线索
    `parent_role` VARCHAR(10),
    `parent_industry` VARCHAR(50),
    `parent_job_level` VARCHAR(20),
    `invest_style` VARCHAR(20) COMMENT "VC/PE/Charity",
    `resource_tags` VARCHAR(255) COMMENT "资源标签集合",
    `pain_point` VARCHAR(50) COMMENT "企业痛点",
    `b_side_score` INT COMMENT "B端线索价值分",
    `is_hot_lead` BOOLEAN COMMENT "是否高潜",
    
    `submission_time` DATETIME DEFAULT CURRENT_TIMESTAMP
    
) ENGINE=OLAP
UNIQUE KEY(`uid`)
DISTRIBUTED BY HASH(`uid`) BUCKETS 10;