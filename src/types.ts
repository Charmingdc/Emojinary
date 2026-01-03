type Difficulty = "easy" | "medium" | "hard";

type AudioType = "click" | "correct" | "wrong";

interface Puzzle {
  emojis: string[];
  answer: string;
  letters: string[];
  hint: string;
  difficulty: Difficulty;
}

interface GamePuzzle extends Puzzle {
  puzzleState: "unsolved" | "solved" | "skipped";
  hintUsed: boolean;
}

export type { Difficulty, AudioType, Puzzle, GamePuzzle };
