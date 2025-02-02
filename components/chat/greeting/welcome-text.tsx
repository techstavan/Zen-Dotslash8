"use client";

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import useWelcomeTextAnimationStore from "@/stores/welcomeTextAnimationStore";

export default function WelcomeText() {
  const welcomeText = "What skill would you like to improve today?";
  const className = "text-center text-xl md:text-2xl lg:text-3xl mb-4 md:mb-6 lg:mb-8 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 drop-shadow-lg";

  return <h1 className={className}>{welcomeText}</h1>;
}