interface ShareableResult {
  mode: "classic" | "daily";
  score: number;
  bestScore: number | undefined;
  solvedCount: number;
  totalPuzzles: number;
}

const generateShareableResult = ({
  mode,
  score,
  bestScore,
  solvedCount,
  totalPuzzles
}: ShareableResult): string => {
  return `
  🤹 EMOJINARY - ${mode.toUpperCase()} MODE 🤹
   
  ⚡ SCORE: ${score}
  🧩 SOLVES: ${solvedCount} / ${totalPuzzles}
  🏆 BESTSCORE: ${bestScore ?? score}
  
 #Emojis #Puzzles #BrainTeaser
 
  Can you beat this stats? Play now at 👇🏼
  `;
};

export default generateShareableResult;
