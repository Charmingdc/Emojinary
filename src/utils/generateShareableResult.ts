import type { InternalDifficulty } from "@/types";

interface ShareableResult {
  mode: "classic" | "daily";
  score: number;
  bestScore: number | undefined;
  solvedCount: number;
  totalPuzzles: number;
  difficulty: InternalDifficulty;
}

const generateShareableResult = ({
  mode,
  score,
  bestScore,
  solvedCount,
  totalPuzzles,
  difficulty
}: ShareableResult): string => {
  return `
  🤹 EMOJINARY - ${mode.toUpperCase()} MODE 🤹
   
  ⚡ SCORE: ${score}
  ⚔️ DIFFICULTY: ${difficulty.toUpperCase()}${
    difficulty === "hard" ? " 🔥" : ""
  }
  🧩 SOLVES: ${solvedCount} / ${totalPuzzles}
  🏆 BESTSCORE: ${bestScore ?? score}
  
 #Emojis #Puzzles #BrainTeaser
 Can you beat this stats? Play now at 👇🏼
  `;
};

export default generateShareableResult;
