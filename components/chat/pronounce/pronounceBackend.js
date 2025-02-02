import { IncomingForm } from "formidable";
import fs from "fs";
import fetch from "node-fetch";

const WHISPER_API_URL = "https://api.openai.com/v1/whisper/transcribe"; // Whisper API URL
const WHISPER_API_KEY = "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"; // Replace with your Whisper API key

export const config = {
  api: {
    bodyParser: false,
  },
};

const transcribeAudio = async (filePath) => {
  const audio = fs.readFileSync(filePath);

  const res = await fetch(WHISPER_API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${WHISPER_API_KEY}`,
      "Content-Type": "audio/wav",
    },
    body: audio,
  });

  const data = await res.json();
  return data.transcription; // Adjust based on the actual response structure
};

const handler = async (req, res) => {
  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: "Error processing the file" });
      return;
    }

    const audioFilePath = files.audio[0].filepath;

    try {
      const transcription = await transcribeAudio(audioFilePath);

      // Simulate comparing pronunciation
      const words = transcription.split(" ");
      const mistakes = words.map((word) => ({
        word,
        isCorrect: Math.random() > 0.5, // Randomize correctness for the example
        correctPronunciation: word,
      }));

      res.status(200).json({ transcription, mistakes });
    } catch (error) {
      res.status(500).json({ error: "Error transcribing the audio" });
    }
  });
};

export default handler;