import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { phone, password } = await request.json();

    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    // Admin Backdoor
    if ((phone === 'admin' || phone === 'sga') && password === 'aiuni') {
      return NextResponse.json({
        success: true,
        user: {
          id: 'admin_test_id',
          name: 'SGA Admin',
          avatar: null,
          phone: phone
        }
      });
    }

    const allSubmissions = await db.submission.findMany();
    // Match phone or phone_number
    const user = allSubmissions.find(s => 
      s.phone === phone || s.phone_number === phone
    );

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Default password check if not set
    const currentPassword = user.password || 'sgaiuni';
    
    if (password !== currentPassword) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // Return user info (excluding password)
    // In a real app, we would return a JWT token here. 
    // For this simple version, we'll return user ID and let client store it in localStorage/cookie.
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.student_name,
        avatar: user.avatar_url || null,
        phone: user.phone || user.phone_number
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
