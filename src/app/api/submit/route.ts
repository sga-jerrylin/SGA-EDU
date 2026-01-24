import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Received submission:', data);
    const { type, ...payload } = data;

    // We'll use the student_name as a key to link student and parent data if submitted separately
    // In a real app, we'd use a session or a unique ID passed between routes.
    // For this demo, we'll try to find an existing submission with the same name/phone or create a new one.

    const allSubmissions = await db.submission.findMany();
    
    // Simple matching logic: find by student_name or phone (if available)
    // For parent submission, we look for child_name matching an existing student_name
    let existing = allSubmissions.find(s => 
      (payload.student_id && s.id === payload.student_id) ||
      (payload.student_name && s.student_name === payload.student_name) ||
      (payload.child_name && s.student_name === payload.child_name) || // Parent provided child name
      (payload.phone_number && s.phone === payload.phone_number) ||
      (payload.wechat_id && s.wechat === payload.wechat_id)
    );

    let submission;

    if (type === 'student') {
      const now = new Date().toISOString();
      const studentProfile = processStudentData(payload);
      if (existing) {
        const task_progress = existing.task_progress && Object.keys(existing.task_progress).length > 0
          ? existing.task_progress
          : Object.fromEntries(Array.from({ length: 8 }, (_, i) => {
              const id = i + 1;
              return [id, { status: id === 1 ? 'unlocked' : 'locked', ...(id === 1 ? { unlocked_at: now } : {}) }];
            }));
        // Update existing (though usually student comes first)
        submission = await db.submission.update(existing.id, {
          ...studentProfile,
          ...payload,
          phone: payload.phone_number,
          wechat: payload.wechat_id,
          school: payload.school_name,
          grade: payload.grade_level,
          task_progress,
          mission_started_at: existing.mission_started_at || now
        });
      } else {
        submission = await db.submission.create({
          ...studentProfile,
          ...payload,
          student_name: payload.student_name,
          phone: payload.phone_number,
          wechat: payload.wechat_id,
          school: payload.school_name,
          grade: payload.grade_level,
          task_progress: Object.fromEntries(Array.from({ length: 8 }, (_, i) => {
            const id = i + 1;
            return [id, { status: id === 1 ? 'unlocked' : 'locked', ...(id === 1 ? { unlocked_at: now } : {}) }];
          })),
          mission_started_at: now
        });
      }
    } else if (type === 'parent') {
      const bSideProfile = processParentData(payload);
      // Parent data often comes after student data
      if (existing) {
        submission = await db.submission.update(existing.id, {
          ...bSideProfile,
          ...payload,
          resource_tags: JSON.stringify(payload.resource_supply),
          pain_point: payload.corp_pain_point,
        });
      } else {
        // Create new submission if no student found
        // Use child_name as student_name for the record
        submission = await db.submission.create({
          ...bSideProfile,
          ...payload,
          student_name: payload.child_name, // Store child name as student name
          resource_tags: JSON.stringify(payload.resource_supply),
          pain_point: payload.corp_pain_point,
        });
      }
    }

    return NextResponse.json({ success: true, id: submission?.id });
  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

function processStudentData(data: any) {
  const profile: any = {};
  
  // 角色原型
  if (data.talent_point === 'A') profile.role_archetype = 'Sales_Warrior';
  else if (data.talent_point === 'B') profile.role_archetype = 'Tech_Wizard';
  else if (data.talent_point === 'C') profile.role_archetype = 'Marketing_Bard';
  else profile.role_archetype = 'Ops_Commander';
  
  // 极客指数 (Geek Score)
  let geek_score = 0;
  if (data.crisis_reaction === 'C') geek_score += 40;
  if (data.logic_test === 'C') geek_score += 30;
  if (data.weapon_choice === 'D') geek_score += 30;
  profile.tech_score = geek_score;
  
  // 领导力风格
  profile.leadership_style = data.loot_distribution || 'Unknown';

  // 武器/赛道
  if (data.weapon_choice === 'A') profile.preferred_track = 'Content';
  else if (data.weapon_choice === 'B') profile.preferred_track = 'Service';
  else if (data.weapon_choice === 'C') profile.preferred_track = 'E-commerce';
  else if (data.weapon_choice === 'D') profile.preferred_track = 'SaaS';

  return profile;
}

function processParentData(data: any) {
  const profile: any = {};
  let b_score = 0;

  // 身份加权
  if (['Owner', 'Executive'].includes(data.parent_job_level)) b_score += 30;
  
  // 行业加权 (实体行业更缺AI) - Simple check
  if (data.parent_industry && (data.parent_industry.includes('制造') || data.parent_industry.includes('外贸'))) {
    b_score += 20;
  }

  // 资源加权
  const resources = data.resource_supply || [];
  if (resources.includes('SupplyChain')) b_score += 40;
  if (resources.includes('DataAssets')) b_score += 40;
  
  profile.b_side_score = Math.min(b_score, 100);
  profile.is_hot_lead = b_score > 60;

  return profile;
}
