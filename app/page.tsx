"use client";

import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar/sidebar";
import ToggleSidebarButton from "@/components/sidebar/toggle-sidebar-button";
import Greeting from "@/components/chat/greeting/greeting";
import Chat from "@/components/chat/chat";
import { useState, useEffect, useRef } from "react";
import useConversationStore from "@/stores/conversationStore";

export default function Home(): React.ReactNode {
  const [skillField, setSkillField] = useState("Speaking");

  const { skill } = useConversationStore();

  const [position, setPosition] = useState({ left: 0, width: 0 });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs: Record<"Speaking" | "Writing", React.RefObject<HTMLButtonElement>> = {
    Speaking: useRef<HTMLButtonElement>(null),
    Writing: useRef<HTMLButtonElement>(null),
  };

  useEffect(() => {
    const updatePosition = () => {
      const btn = buttonRefs[skillField as keyof typeof buttonRefs]?.current;
      if (btn && containerRef.current) {
        setPosition({
          left: btn.offsetLeft,
          width: btn.offsetWidth,
        });
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
    };
  }, [skillField]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="relative flex min-h-screen flex-1 flex-col bg-black text-white">
        <ToggleSidebarButton className="sticky top-1/2 -mt-10 hidden -translate-y-1/2 lg:block" />
        <Header />
        <main className="mx-auto flex w-full max-w-[800px] flex-1 flex-col px-4 pt-4">
          {skill === undefined && (
            <div ref={containerRef} className="relative flex justify-evenly bg-gray-900 rounded-full p-1 shadow-lg mt-6">
              {/* Animated Background */}
              <div
                className="absolute top-0 bottom-0 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full transition-all duration-300"
                style={{
                  left: `${position.left}px`,
                  width: `${position.width}px`,
                }}
              />

              {/* Buttons */}
              {(["Speaking", "Writing"] as const).map((field) => (
                <button
                  key={field}
                  ref={buttonRefs[field]}
                  onClick={() => setSkillField(field)}
                  className={`relative z-10 p-2 w-full rounded-full text-lg font-semibold transition-all duration-300 ${
                    skillField === field ? "text-white" : "text-gray-400"
                  }`}
                >
                  {field}
                </button>
              ))}
            </div>
          )}
          <Chat greeting={<Greeting skillField={skillField} />} />
        </main>
      </div>
    </div>
  );
}
