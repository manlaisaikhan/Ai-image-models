import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { InferenceClient } from "@huggingface/inference";

const HF_TOKEN = process.env.NEXT_PUBLIC_MY_TOKEN || process.env.HF_TOKEN;
const inference = new InferenceClient(HF_TOKEN);

export const POST = async (req: NextRequest) => {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: "Cannot provide" }, { status: 400 });
    }
    const result = await inference.textToImage({
      model: "stabilityai/stable-diffusion-xl-base-1.0",
      inputs: prompt,
      parameters: {
        width: 1024,
        height: 1024,
        negative_prompt: "bad quality",
      },
    });
    const blob = result as unknown as Blob;
    const arrayBuffer = await blob.arrayBuffer();
    let binary = "";
    const bytes = new Uint8Array(arrayBuffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64Image = `data:image/png;base64,${btoa(binary)}`;
    return NextResponse.json({ image: base64Image });
  } catch (err) {
    return NextResponse.json(
      {
        err: err instanceof Error ? err.message : "Error",
      },
      {
        status: 500,
      }
    );
  }
};
