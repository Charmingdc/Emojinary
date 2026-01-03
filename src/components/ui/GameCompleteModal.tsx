import { Trophy, Check, X, AlertCircle } from "lucide-react";
import NavButton from "./NavButton";
import type { GamePuzzle } from "@/types";

interface Props {
  score: number;
  bestScore?: number;
  puzzles: GamePuzzle | GamePuzzle[];
  handleReplay?: () => void;
  handleGoHome: () => void;
}

/* ---------- helpers ---------- */

const getResultMessage = (solved: number, total: number) => {
  if (solved === total) return "Wonderful!";
  if (solved === total - 1) return "Excellent!";
  if (solved >= Math.ceil(total * 0.6)) return "Great Work!";
  if (solved >= Math.ceil(total * 0.4)) return "Good Job!";
  if (solved > 0) return "Nice Try!";
  return "Try Again!";
};

const getTrophyColor = (solved: number, total: number) => {
  if (solved === total) return "text-yellow-400";
  if (solved >= total / 2) return "text-accent";
  return "text-gray-400";
};

/* ---------- component ---------- */

const GameCompleteModal = ({
  score,
  bestScore,
  puzzles,
  handleReplay,
  handleGoHome
}: Props) => {
  const puzzleArray = Array.isArray(puzzles) ? puzzles : [puzzles];

  const solvedCount = puzzleArray.filter(
    p => p.puzzleState === "solved"
  ).length;

  const skippedCount = puzzleArray.filter(
    p => p.puzzleState === "skipped"
  ).length;

  const unsolvedCount = puzzleArray.filter(
    p => p.puzzleState === "unsolved"
  ).length;

  const totalPuzzles = puzzleArray.length;
  const isSinglePuzzle = totalPuzzles === 1;

  const resultMessage = getResultMessage(solvedCount, totalPuzzles);
  const trophyColor = getTrophyColor(solvedCount, totalPuzzles);

  return (
    <section className="fixed top-0 left-0 w-screen h-screen bg-black/60 backdrop-blur-xl z-50 flex flex-col items-center justify-start p-6 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col items-center gap-2 mt-4">
        <Trophy size={96} className={`${trophyColor} animate-bounce`} />
        <h1 className="text-3xl font-bold text-white">{resultMessage}</h1>
        <p className="text-sm text-gray-300">
          You solved {solvedCount} out of {totalPuzzles} puzzles
        </p>
      </div>

      {/* Stats */}
      <div className="flex justify-around w-full max-w-5xl text-lg font-medium px-6 py-4 mt-4 text-white">
        <div className="text-center">
          Score
          <br />
          <span className="text-primary text-2xl">{score}</span>
        </div>

        {bestScore !== undefined && (
          <div className="text-center">
            Best
            <br />
            <span className="text-primary text-2xl">{bestScore}</span>
          </div>
        )}

        <div className="text-center text-green-400">
          Solved
          <br />
          <span className="text-2xl">{solvedCount}</span>
        </div>

        <div className="text-center text-red-400">
          Skipped
          <br />
          <span className="text-2xl">{skippedCount}</span>
        </div>

        <div className="text-center text-gray-400">
          Unsolved
          <br />
          <span className="text-2xl">{unsolvedCount}</span>
        </div>
      </div>

      {/* Puzzle list */}
      <div
        className={`w-full max-w-5xl mt-2 ${
          isSinglePuzzle
            ? "max-h-auto"
            : "flex-1 overflow-auto max-h-[calc(100vh-240px)]"
        }`}
      >
        <div className="grid grid-cols-[2fr_2fr_1fr] gap-4 px-6 py-3 font-semibold text-gray-300 border-b border-gray-500 sticky top-0 bg-black/60 backdrop-blur-lg z-10">
          <span>Emojis</span>
          <span>Answer</span>
          <span>Status</span>
        </div>

        {puzzleArray.map((puzzle, idx) => (
          <div
            key={idx}
            className="grid grid-cols-[2fr_2fr_1fr] gap-4 items-center px-6 py-4 border-b border-gray-700 hover:bg-white/5"
          >
            <div className="flex flex-wrap gap-1 truncate text-white">
              {puzzle.emojis.map((e, i) => (
                <span key={i}>
                  {e}
                  {i < puzzle.emojis.length - 1 ? "+" : ""}
                </span>
              ))}
            </div>

            <div className="text-center truncate font-medium text-white">
              {puzzle.answer}
            </div>

            <div className="flex justify-center items-center">
              {puzzle.puzzleState === "solved" && (
                <Check size={18} className="text-green-400" />
              )}
              {puzzle.puzzleState === "skipped" && (
                <X size={18} className="text-red-400" />
              )}
              {puzzle.puzzleState === "unsolved" && (
                <AlertCircle size={18} className="text-gray-400" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div
        className={`flex flex-wrap justify-center gap-4 mb-4 ${
          isSinglePuzzle ? "mt-16" : "mt-4"
        }`}
      >
        {handleReplay && (
          <NavButton
            wrapperClassName="w-36"
            className="py-3 px-6"
            onClick={handleReplay}
          >
            Replay
          </NavButton>
        )}
        <NavButton
          wrapperClassName="w-36"
          className="py-3 px-6"
          onClick={handleGoHome}
        >
          Go Home
        </NavButton>
      </div>
    </section>
  );
};

export default GameCompleteModal;
