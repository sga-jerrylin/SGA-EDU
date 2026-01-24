import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { userId, password, avatarUrl } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const updateData: any = {};
    if (password) updateData.password = password;
    if (avatarUrl) updateData.avatar_url = avatarUrl;

    const updatedUser = await db.submission.update(userId, updateData);

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    if (userId === 'admin_test_id') {
      const now = new Date().toISOString();
      return NextResponse.json({
        id: 'admin_test_id',
        student_name: 'SGA Admin',
        mission_started_at: now,
        task_progress: {
            1: { status: 'unlocked', unlocked_at: now },
            2: { status: 'locked' },
            3: { status: 'locked' },
            4: { status: 'locked' },
            5: { status: 'locked' },
            6: { status: 'locked' },
            7: { status: 'locked' },
            8: { status: 'locked' },
        }
      });
    }

    const user = await db.submission.findById(userId);
    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const now = new Date().toISOString();
    const hasProgress = user.task_progress && Object.keys(user.task_progress).length > 0;

    if (!hasProgress) {
        const task_progress: any = {};
        for (let i = 1; i <= 8; i += 1) {
            task_progress[i] = { status: i === 1 ? 'unlocked' : 'locked', ...(i === 1 ? { unlocked_at: now } : {}) };
        }
        const updated = await db.submission.update(userId, {
            task_progress,
            mission_started_at: user.mission_started_at || now
        });
        return NextResponse.json(updated);
    }

    if (!user.mission_started_at) {
        const firstUnlocked = user.task_progress?.[1]?.unlocked_at;
        const firstCompleted = Object.values(user.task_progress || {})
          .map((t: any) => t?.completed_at)
          .filter(Boolean)
          .sort()[0];
        const updated = await db.submission.update(userId, {
          mission_started_at: firstUnlocked || firstCompleted || now
        });
        return NextResponse.json(updated);
    }

    return NextResponse.json(user);
}
