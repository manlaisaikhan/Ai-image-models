import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const geminiApi = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_MY_GEMINI_TOKEN!,
});

export const POST = async (req: NextRequest) => {
  try {
    const { food } = await req.json();
    if (!food) {
      return NextResponse.json({ err: "No food name" }, { status: 400 });
    }
    const prompt = `Хоолны нэр: ${food}
                    Үүнд тохирох орцуудын жагсаалтыг богино, ойлгомжтойгоор гарга.
                    Хэмжээ, грамаар өгөх албагүй, зөвхөн орцын нэрнүүд байхад болно.`;
    const res = await geminiApi.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    });

    return NextResponse.json({ response: res }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ err }, { status: 400 });
  }
};
