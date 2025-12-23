type Difficulty = "easy" | "medium" | "hard";

type AudioType = "click" | "correct" | "wrong";

interface Puzzle {
  emojis: string[];
  answer: string;
  letters: string[];
  hint: string;
  difficulty: Difficulty;
}

export type { Difficulty, AudioType, Puzzle };
