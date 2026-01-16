import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const scores = data.scores || {};

    const submission = await db.submission.create({
      fpa_name: data.name,
      fpa_age: data.age,
      fpa_gender: data.gender,
      fpa_score_yellow: scores.yellow,
      fpa_score_red: scores.red,
      fpa_score_blue: scores.blue,
      fpa_score_green: scores.green,
      fpa_dominant_type: data.dominantType,
    });

    return NextResponse.json({ success: true, id: submission.id });
  } catch (error) {
    console.error("FPA submission error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

