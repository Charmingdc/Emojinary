import { Trophy, X, AlertCircle } from "lucide-react";
import NavButton from "./NavButton";
import type { GamePuzzle } from "@/types";

interface Props {
  score: number;
  bestScore?: number;
  puzzles: GamePuzzle | GamePuzzle[];
  handleReplay?: () => void;
  handleGoHome: () => void;
}

const getResultMessage = (solved: number, total: number) =>
  solved === total
    ? "Wonderful!"
    : solved === total - 1
    ? "Excellent!"
    : solved >= Math.ceil(total * 0.6)
    ? "Great Work!"
    : solved >= Math.ceil(total * 0.4)
    ? "Good Job!"
    : solved > 0
    ? "Nice Try!"
    : "Try Again!";

const getTrophyColor = (solved: number, total: number) =>
  solved === total
    ? "text-yellow-400"
    : solved >= total / 2
    ? "text-accent"
    : "text-gray-400";

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
  const reviewPuzzles = puzzleArray.filter(p => p.puzzleState !== "solved");
  const allSolved = reviewPuzzles.length === 0;
  const resultMessage = getResultMessage(solvedCount, totalPuzzles);
  const trophyColor = getTrophyColor(solvedCount, totalPuzzles);

  return (
    <section className="fixed top-0 left-0 w-screen h-screen bg-black/60 backdrop-blur-xl z-50 flex flex-col items-center justify-start p-6 overflow-hidden">
      <div className="flex flex-col items-center gap-1 mt-4">
        <Trophy size={96} className={`${trophyColor} animate-bounce`} />

        <h1 className="text-3xl font-bold text-white">{resultMessage}</h1>

        {allSolved ? (
          <p className="text-green-400 text-sm mt-1">
            🎉 Perfect score! Nothing to review.
          </p>
        ) : (
          <p className="text-sm text-gray-300 -mt-2">
            You solved {solvedCount} out of {totalPuzzles} puzzles
          </p>
        )}
      </div>

      <div className="flex justify-around w-full max-w-5xl gap-2 text-md font-medium px-6 py-4 text-white mt-2">
        <div className="text-center">
          Score
          <br />
          <span className="text-primary text-xl">{score}</span>
        </div>

        {bestScore !== undefined && (
          <div className="text-center">
            Best
            <br />
            <span className="text-primary text-xl">{bestScore}</span>
          </div>
        )}

        <div className="text-center text-green-400">
          Solved
          <br />
          <span className="text-xl">{solvedCount}</span>
        </div>

        <div className="text-center text-red-400">
          Skipped
          <br />
          <span className="text-xl">{skippedCount}</span>
        </div>

        <div className="text-center text-gray-400">
          Unsolved
          <br />
          <span className="text-xl">{unsolvedCount}</span>
        </div>
      </div>

      {!allSolved && (
        <div
          className={`w-full max-w-5xl mt-2 ${
            isSinglePuzzle
              ? "max-h-auto"
              : "flex-1 overflow-auto max-h-[calc(100vh-240px)] -mt-2"
          }`}
        >
          <div className="grid grid-cols-[2fr_2fr_1fr] gap-4 px-6 py-3 font-semibold text-gray-300 border-b border-gray-500 sticky top-0 bg-black/60 backdrop-blur-lg z-10">
            <span>Emojis</span>
            <span>Answer</span>
            <span>Status</span>
          </div>

          {reviewPuzzles.map((puzzle, idx) => (
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
      )}

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
