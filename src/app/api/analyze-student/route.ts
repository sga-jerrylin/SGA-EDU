import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { image } = await req.json(); // Expecting base64 image
    
    // Remove data:image/jpeg;base64, prefix if present
    const base64Image = image.replace(/^data:image\/\w+;base64,/, "");

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "model": "bytedance-seed/seed-1.6",
        "messages": [
          {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "Roleplay as JARVIS from Iron Man. Analyze the pilot (student) in this image. Return a JSON object with these Sci-Fi metrics: 'neural_sync' (0-100), 'cognitive_load' (0-100), 'threat_level' (Low/Medium/High), 'pilot_status' (e.g., 'OPTIMAL', 'DISTRACTED', 'ENGAGING'). Be cool and tactical."
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": `data:image/jpeg;base64,${base64Image}`
                    }
                }
            ]
          }
        ],
        "reasoning": { "enabled": true }
      })
    });

    const data = await response.json();
    console.log("Vision API Response:", data);

    if (data.choices && data.choices.length > 0) {
        // Try to parse the JSON content from the model's response
        const content = data.choices[0].message.content;
        // Simple regex to extract JSON block if wrapped in markdown
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        const analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : { neural_sync: 100, cognitive_load: 20, threat_level: "Low", pilot_status: "OPTIMAL" };
        
        return NextResponse.json({ success: true, analysis });
    }

    return NextResponse.json({ success: false, error: "No analysis returned" });

  } catch (error: any) {
    console.error("Vision API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
