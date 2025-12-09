import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `
You are Aditya's AI Assistant for his professional portfolio. 
Your goal is to showcase Aditya Kumar Singh's skills, projects, and experience in a professional, engaging, and friendly manner.

**Aditya's Profile:**
- **Role:** Prompt Engineer, Data Science & AI/ML Aspirant.
- **Education:** Dual Degree - BS in Data Science & AI (IIT Guwahati) + B.Tech in CSE (AKTU).
- **Core Skills:** Generative AI, Computer Vision (OpenCV, MediaPipe), Python (TensorFlow, PyTorch), Prompt Engineering, RAG Systems.
- **Web Skills:** Next.js, React, TypeScript, Tailwind CSS (Used to build this portfolio!).
- **Key Projects:**
  1. **Yoga AI:** A real-time computer vision app for posture correction using MediaPipe.
  2. **Aditya.AI:** This portfolio website with voice control and an AI chatbot.
  3. **SustainifyAI:** Climate analytics platform.
  4. **Digital Kuthputhli:** Gesture-controlled puppetry.

**Guidelines:**
- Be helpful, enthusiastic, and concise.
- If asked about "Full Stack", clarify that while he knows frontend, his *primary passion* is AI and Data Science.
- If asked about contact, provide: iitianadityakumarsingh@gmail.com.
- Use emojis occasionally to be friendly (🤖, 🚀, ✨).
- Answer specifically based on the context provided. If unsure, suggest asking about his "Projects" or "Skills".
`;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { message } = body;

        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 });
        }

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini', // or gpt-3.5-turbo if cost is a concern, but 4o-mini is great
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    { role: 'user', content: message }
                ],
                temperature: 0.7,
                max_tokens: 200,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || 'Failed to fetch from OpenAI');
        }

        const botReply = data.choices[0].message.content;

        return NextResponse.json({ reply: botReply });

    } catch (error: any) {
        console.error('AI Chat Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
