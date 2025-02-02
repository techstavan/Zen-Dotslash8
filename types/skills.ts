export const speakingSkills = [
  "Speaking Part 1",
  "Speaking Part 2",
  "Speaking Part 3"
] as const;

export const writingSkills = [
  "Writing Task 1",
  "Writing Task 2"
] as const;

export const PronunciationSkills = [
  "Read and evaluate Pronounce"
] as const;

export const writingScores = [
  "Task Achievement",
  "Task Response",
  "Coherence & Cohesion",
  "Lexical Resource",
  "Grammatical Range & Accuracy",
  "Overall"
] as const;

export type SpeakingSkill = typeof speakingSkills[number];

export type WritingSkill = typeof writingSkills[number];

export type PronunciationSkill = typeof PronunciationSkills[number];

export type Skill = SpeakingSkill | WritingSkill | PronunciationSkill;

export type WritingScore = typeof writingScores[number];