import { useState } from "react";

import StatsBar from "@/components/ui/StatsBar";
import GameControls from "@/components/GameControls";
import PuzzleBox from "@/components/ui/PuzzleBox";

import usePerPuzzleTimer from "@/hooks/usePerPuzzleTimer";
import type { Puzzle } from "@/types";

const puzzles: Puzzle[] = [
  {
    emojis: ["☁️", "⬆️", "📤"],
    answer: "upload",
    letters: ["U", "P", "L", "O", "A", "D", "X", "T"],
    hint: "Sending files to the cloud or server",
    difficulty: "easy"
  },
  {
    emojis: ["💻", "👨‍💻", "⚡"],
    answer: "developer",
    letters: ["D", "E", "V", "E", "L", "O", "P", "E", "R", "X", "A"],
    hint: "Person who writes code",
    difficulty: "easy"
  },
  {
    emojis: ["🤖", "🧠", "📊"],
    answer: "AI",
    letters: ["A", "I", "X", "Y", "Z"],
    hint: "Machines that can learn and think",
    difficulty: "medium"
  },
  {
    emojis: ["📜", "➰", "🧩"],
    answer: "algorithm",
    letters: ["A", "L", "G", "O", "R", "I", "T", "H", "M", "X", "E"],
    hint: "Step-by-step instructions to solve a problem",
    difficulty: "medium"
  },
  {
    emojis: ["🔐", "🛡️", "🔑"],
    answer: "encryption",
    letters: ["E", "N", "C", "R", "Y", "P", "T", "I", "O", "N", "S"],
    hint: "Securing data from unauthorized access",
    difficulty: "hard"
  },
  {
    emojis: ["🌐", "💻", "🖥️"],
    answer: "network",
    letters: ["N", "E", "T", "W", "O", "R", "K", "A", "X"],
    hint: "Connected computers sharing data",
    difficulty: "medium"
  },
  {
    emojis: ["🗄️", "💾", "📂"],
    answer: "database",
    letters: ["D", "A", "T", "A", "B", "A", "S", "E", "X", "L"],
    hint: "Stores structured information",
    difficulty: "medium"
  },
  {
    emojis: ["🖥️", "⚙️", "🔄"],
    answer: "software",
    letters: ["S", "O", "F", "T", "W", "A", "R", "E", "X"],
    hint: "Programs that run on computers",
    difficulty: "easy"
  },
  {
    emojis: ["📦", "📤", "🌐"],
    answer: "deployment",
    letters: ["D", "E", "P", "L", "O", "Y", "M", "E", "N", "T", "A"],
    hint: "Releasing code to production",
    difficulty: "medium"
  },
  {
    emojis: ["🐛", "🔍", "🛠️"],
    answer: "debugging",
    letters: ["D", "E", "B", "U", "G", "G", "I", "N", "G", "X"],
    hint: "Finding and fixing errors in code",
    difficulty: "medium"
  }
];

const ClassicModeScreen = () => {
  const [currentPuzzleIdx, setCurrentPuzzleIdx] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);

  const puzzleCount = puzzles.length;
  const currentPuzzle = puzzles[currentPuzzleIdx];
  const difficulty = currentPuzzle.difficulty;

  const handleTimerExpire = () => {
    setCurrentPuzzleIdx(prev => (prev < puzzleCount - 1 ? prev + 1 : prev));
    setShowHint(false);
  };

  const { formatTime, reset } = usePerPuzzleTimer({
    difficulty,
    trigger: currentPuzzleIdx,
    onExpire: handleTimerExpire
  });

  return (
    <main className="w-full flex flex-col items-center gap-3 p-4">
      <h2 className="self-start -mt-4"> 🕹️ Classic Mode </h2>

      <StatsBar
        stats={{
          currentPuzzleIdx: currentPuzzleIdx + 1,
          puzzleCount,
          points,
          time: formatTime(),
          difficulty
        }}
      />

      <div className="w-full flex flex-col items-center gap-3 mt-6">
        <h3 className="text-lg"> Can you guess the word? </h3>

        <div className="w-full flex items-center justify-center gap-3">
          <GameControls
            showHint={showHint}
            setShowHint={setShowHint}
            currentPuzzleIdx={currentPuzzleIdx}
            setCurrentPuzzleIdx={setCurrentPuzzleIdx}
            puzzleCount={puzzleCount}
            resetTimer={reset}
          />
          <PuzzleBox puzzle={currentPuzzle} />
        </div>

        {showHint && (
          <p className="mt-2">
            <strong className="text-primary"> Hint:</strong>{" "}
            {currentPuzzle.hint}
          </p>
        )}
      </div>
    </main>
  );
};

export default ClassicModeScreen;
