import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import OpenAI from "openai";
import * as fs from "fs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Load API key from environment variable
});

export const runtime = "nodejs"; // Ensure server-side execution
export const dynamic = "force-dynamic"; // Avoid caching issues

async function saveFile(fileData: Buffer) {
  const tempFilePath = "/tmp/uploaded_audio.wav";
  await writeFile(tempFilePath, fileData);
  return tempFilePath;
}

export async function POST(req: Request) {
  try {
    const fileData = await req.arrayBuffer();
    if (!fileData) {
      return NextResponse.json({ error: "No audio file uploaded" }, { status: 400 });
    }

    // Save file temporarily
    const filePath = await saveFile(Buffer.from(fileData));

    // Transcribe audio using OpenAI's Whisper API
    const fileBuffer = await fs.promises.readFile(filePath);
    const file = new File([fileBuffer], "uploaded_audio.wav", { type: "audio/wav" });
    const transcription = await openai.audio.transcriptions.create({
      file: file, // Pass the file object
      model: "whisper-1",
    });

    console.log("Transcription result:", transcription);
    return NextResponse.json(transcription);
  } catch (error) {
    console.error("Error processing audio:", error);
    return NextResponse.json({ error: "Failed to transcribe audio" }, { status: 500 });
  }
}
