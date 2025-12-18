type Difficulty = "easy" | "medium" | "hard";

interface Puzzle {
  emojis: string[];
  answer: string;
  letters: string[];
  hint: string;
  difficulty: Difficulty;
}

export type { Difficulty, Puzzle };
