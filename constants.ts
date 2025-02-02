import { Skill, WritingSkill } from "@/types/skills";
import { IconType } from "react-icons/lib";
import { PiUserBold as PersonIcon } from "react-icons/pi";
import { FaRegListAlt as NotesIcon } from "react-icons/fa";
import { PiBuildingsBold as CityIcon } from "react-icons/pi";
import { FaChartLine as GraphIcon } from "react-icons/fa";
import { BiWorld as GlobeIcon } from "react-icons/bi";

export const SKILL_DESCRIPTION: { [key in Skill]: string } = {
  "Speaking Part 1": "Answer general questions about yourself",
  "Speaking Part 2": "Speak for 2 minutes on a given topic after 1-minute preparation.",
  "Speaking Part 3": "Discuss on abstract and opinion-based questions.",
  "Writing Task 1": "Describe visual information (graph, chart, table, map, or diagram)",
  "Writing Task 2": "Write an essay on an opinion, discussion, or problem-solution topic",
};

export const SKILL_ICON: { [key in Skill]: IconType } = {
  "Speaking Part 1": PersonIcon,
  "Speaking Part 2": NotesIcon,
  "Speaking Part 3": CityIcon,
  "Writing Task 1": GraphIcon,
  "Writing Task 2": GlobeIcon,
};

export const MAX_QUESTION_WORD_COUNT = 100;
export const MAX_ESSAY_WORD_COUNT: { [key in WritingSkill]: number } = {
  "Writing Task 1": 300,
  "Writing Task 2": 500,
};
export const MIN_ESSAY_WORD_COUNT: { [key in WritingSkill]: number } = {
  "Writing Task 1": 150,
  "Writing Task 2": 250,
};

export const DEFAULT_CONVERSATION_NAME = "New chat";