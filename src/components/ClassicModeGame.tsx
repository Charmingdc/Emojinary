import { useState, useEffect } from "react";

import StatsBar from "@/components/ui/StatsBar";
import GameControls from "@/components/GameControls";
import PuzzleBox from "@/components/ui/PuzzleBox";
import AnswerSlots from "@/components/ui/AnswerSlots";
import LetterPool from "@/components/ui/LetterPool";
import CorrectAnswerBanner from "@/components/ui/CorrectAnswerBanner";
import GameCompleteModal from "@/components/ui/GameCompleteModal";

import { shuffleArray, calculatePoints, vibrate } from "@/utils";
import usePerPuzzleTimer from "@/hooks/usePerPuzzleTimer";
import usePuzzleInput from "@/hooks/usePuzzleInput";

import type { AudioType, Puzzle } from "@/types";
type AnswerState = "neutral" | "correct" | "wrong";

type ClassicModeGameProps = {
  puzzles: Puzzle[];
  play: (sound: AudioType) => void;
  bestScore: number;
  updateBestScore: (score: number) => void;
  newGame: () => void;
  navigate: (path: string) => void;
};

const ClassicModeGame = ({
  puzzles,
  play,
  bestScore,
  updateBestScore,
  newGame,
  navigate
}: ClassicModeGameProps) => {
  const [currentPuzzleIdx, setCurrentPuzzleIdx] = useState(0);
  const [letterPool, setLetterPool] = useState<string[]>([]);
  const [points, setPoints] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [usedHint, setUsedHint] = useState(false);
  const [puzzleSkipCount, setPuzzleSkipCount] = useState(0);
  const [answerState, setAnswerState] = useState<AnswerState>("neutral");
  const [gameCompleted, setGameCompleted] = useState(false);

  const puzzleCount = puzzles.length;
  const currentPuzzle = puzzles[currentPuzzleIdx];
  const difficulty = currentPuzzle.difficulty;

  const {
    slots: selectedLetters,
    reset: resetSlots,
    insert: handleLetterClick,
    removeAt: handleSlotClick,
    isComplete
  } = usePuzzleInput(currentPuzzle.answer.length);

  const handleTimerExpire = () => goToNextPuzzle();

  const {
    seconds: remainingTime,
    formatTime,
    reset
  } = usePerPuzzleTimer({
    difficulty,
    trigger: currentPuzzleIdx,
    onExpire: handleTimerExpire
  });

  const goToNextPuzzle = () => {
    if (currentPuzzleIdx === puzzleCount - 1) {
      setGameCompleted(true);
      return;
    }

    setCurrentPuzzleIdx(prev => (prev < puzzleCount - 1 ? prev + 1 : prev));

    resetSlots();
    setShowHint(false);
    setUsedHint(false);
    setAnswerState("neutral");
  };

  const handleCorrectAnswer = () => {
    const earned = calculatePoints(
      currentPuzzle.difficulty,
      remainingTime,
      usedHint
    );

    setPoints(prev => prev + earned);
    setAnswerState("correct");
    play("correct");

    const isLastPuzzle = currentPuzzleIdx === puzzleCount - 1;

    if (isLastPuzzle) {
      setGameCompleted(true);
      return;
    }

    setTimeout(goToNextPuzzle, 500);
  };

  useEffect(() => {
    resetSlots();
    setLetterPool(shuffleArray(currentPuzzle.letters));
    setAnswerState("neutral");
  }, [currentPuzzle]);

  useEffect(() => {
    if (!isComplete) {
      setAnswerState("neutral");
    }
  }, [isComplete]);

  useEffect(() => {
    if (!isComplete || gameCompleted) return;

    const userAnswer = selectedLetters.join("").toLowerCase();
    const correctAnswer = currentPuzzle.answer.toLowerCase();

    if (userAnswer === correctAnswer) {
      handleCorrectAnswer();
    } else {
      setAnswerState("wrong");
      vibrate([80, 10, 80]);
    }
  }, [isComplete]);

  useEffect(() => {
    if (!gameCompleted) return;
    if (points <= bestScore) return;

    updateBestScore(points);
  }, [gameCompleted, points, bestScore]);

  return (
    <main className="w-full flex flex-col items-center gap-3 p-4 pb-12">
      <h2 className="self-start -mt-4">🕹️ Classic Mode</h2>

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
        <h3 className="text-lg">Can you guess the word?</h3>

        <div className="w-full flex items-center justify-center gap-3">
          <GameControls
            {...{
              showHint,
              setShowHint,
              setUsedHint,
              currentPuzzleIdx,
              setCurrentPuzzleIdx,
              setPuzzleSkipCount,
              setGameCompleted,
              puzzleCount,
              resetTimer: reset
            }}
          />

          <PuzzleBox puzzle={currentPuzzle} />
        </div>

        {showHint && (
          <p className="mt-2">
            <strong className="text-primary">Hint:</strong> {currentPuzzle.hint}
          </p>
        )}
      </div>

      <AnswerSlots
        slots={selectedLetters}
        onSlotClick={handleSlotClick}
        answerState={answerState}
      />

      <LetterPool letters={letterPool} onLetterClick={handleLetterClick} />

      {answerState === "correct" && <CorrectAnswerBanner />}

      {gameCompleted && (
        <GameCompleteModal
          score={points}
          bestScore={bestScore}
          puzzlesSolved={puzzleCount - puzzleSkipCount}
          puzzleCount={puzzleCount}
          handleReplay={newGame}
          handleGoHome={() => navigate("/")}
        />
      )}
    </main>
  );
};

export default ClassicModeGame;
