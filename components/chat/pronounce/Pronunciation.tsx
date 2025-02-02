"use client";

import { useState, useRef } from "react";

interface Mistake {
  word: string;
  isCorrect: boolean;
  correctPronunciation: string;
}

interface Response {
  transcription: string;
  mistakes: Mistake[];
}

const PronounceTestComponent = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [response, setResponse] = useState<Response | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleStartRecording = () => {
    setIsRecording(true);

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        setAudioBlob(blob);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();

      // setTimeout(() => {
      //   if (mediaRecorder.state === "recording") {
      //     mediaRecorder.stop();
      //     setIsRecording(false);
      //   }
      // }, 300000);
    });
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSendAudio = async () => {
    if (!audioBlob) return;

    const formData = new FormData();
    formData.append("file", audioBlob, "audio.wav");

    const res = await fetch("/api/transcribe", { method: "POST", body: formData });
    const result = await res.json();
    setResponse(result);
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-mute rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Pronunciation Evaluator</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2" onClick={handleStartRecording} disabled={isRecording}>
        {isRecording ? "Recording..." : "Start Recording"}
      </button>
      <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={handleStopRecording} disabled={!isRecording}>
        Stop Recording
      </button>
      <button className="bg-green-500 text-white px-4 py-2 rounded-lg ml-2" onClick={handleSendAudio} disabled={!audioBlob}>
        Send Audio
      </button>

      {response && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Results</h2>
          <p>Transcription: {response.transcription}</p>
        </div>
      )}
    </div>
  );
};

export default PronounceTestComponent;
