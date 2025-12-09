import { GoogleGenAI } from "@google/genai";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const geminiApi = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_MY_GEMINI_TOKEN!,
});

console.log(geminiApi, "can i call api");

export const POST = async (req: NextRequest) => {
  try {
    const { chat } = await req.json();
    if (!chat) {
      return NextResponse.json({ err: "No chat message." }, { status: 400 });
    }
    const systemPrompt = `You are a helpful and friendly AI assistant. 
                          Always respond in fluent Mongolian.
                          Give clear, short, and accurate answers.
                          User message: "${chat}"`;

    const res = await geminiApi.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ parts: [{ text: systemPrompt }] }],
    });

    return NextResponse.json({ res }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 400 });
  }
};
