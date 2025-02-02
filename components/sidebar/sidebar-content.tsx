"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import NewChatButton from "./new-chat-button";
import ConversationHistory from "./conversation-history";
import { PiCircleDashedBold as DashedCircleIcon } from "react-icons/pi";
import { TbMessageChatbot as ConversationIcon } from "react-icons/tb";

export default function SidebarContent() {
  const [user, loading] = useAuthState(auth);
  return (
    <>
      <ConversationHistory />
    </>
  );
}
