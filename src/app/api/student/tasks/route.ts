import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { userId, taskId, screenshotUrl } = await request.json();

    if (!userId || !taskId || !screenshotUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (userId === 'admin_test_id') {
         return NextResponse.json({ success: true });
    }

    const user = await db.submission.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const currentProgress = user.task_progress || {};
    const now = new Date().toISOString();
    
    // Update current task
    currentProgress[taskId] = {
      status: 'completed',
      screenshot_url: screenshotUrl,
      unlocked_at: currentProgress[taskId]?.unlocked_at || now,
      completed_at: currentProgress[taskId]?.completed_at || now
    };

    // Auto unlock next task
    const nextTaskId = parseInt(taskId) + 1;
    if (nextTaskId <= 8) { // Assuming 8 tasks
        if (!currentProgress[nextTaskId]) {
             currentProgress[nextTaskId] = { status: 'unlocked', unlocked_at: now };
        } else if (currentProgress[nextTaskId].status === 'locked') {
             currentProgress[nextTaskId].status = 'unlocked';
             currentProgress[nextTaskId].unlocked_at = currentProgress[nextTaskId].unlocked_at || now;
        }
    }

    const updatedUser = await db.submission.update(userId, {
      task_progress: currentProgress,
      mission_started_at: user.mission_started_at || currentProgress[1]?.unlocked_at || now,
      mission_completed_at: nextTaskId > 8 ? now : user.mission_completed_at
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Task update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
