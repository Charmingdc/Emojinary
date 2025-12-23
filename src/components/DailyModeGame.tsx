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

type DailyModeGameProps = {
  puzzle: Puzzle;
  play: (sound: AudioType) => void;
  navigate: (path: string) => void;
};

const DailyModeGame = ({ puzzle, play, navigate }: DailyModeGameProps) => {
  const difficulty = puzzle.difficulty;

  const [letterPool, setLetterPool] = useState<string[]>([]);
  const [points, setPoints] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [usedHint, setUsedHint] = useState(false);
  const [answerState, setAnswerState] = useState<AnswerState>("neutral");
  const [gameCompleted, setGameCompleted] = useState(false);

  const {
    slots: selectedLetters,
    reset: resetSlots,
    insert: handleLetterClick,
    removeAt: handleSlotClick,
    isComplete
  } = usePuzzleInput(puzzle.answer.length);

  const handleTimerExpire = () => setGameCompleted(true);

  const {
    seconds: remainingTime,
    formatTime,
    reset: resetTimer
  } = usePerPuzzleTimer({
    difficulty,
    trigger: 0,
    onExpire: handleTimerExpire
  });

  const handleCorrectAnswer = () => {
    const earned = calculatePoints(puzzle.difficulty, remainingTime, usedHint);

    setPoints(earned);
    setAnswerState("correct");
    play("correct");

    setTimeout(() => setGameCompleted(true), 600);
  };

  useEffect(() => {
    resetSlots();
    setLetterPool(shuffleArray(puzzle.letters));
    setAnswerState("neutral");
  }, [puzzle]);

  useEffect(() => {
    if (gameCompleted || !isComplete) return;

    const userAnswer = selectedLetters.join("").toLowerCase();
    const correctAnswer = puzzle.answer.toLowerCase();

    if (userAnswer === correctAnswer) {
      handleCorrectAnswer();
    } else {
      setAnswerState("wrong");
      vibrate([80, 10, 80]);
    }
  }, [isComplete]);

  return (
    <main className="w-full flex flex-col items-center gap-3 p-4 pb-12">
      <h2 className="self-start -mt-4">🕹️ Daily Mode</h2>

      <StatsBar
        stats={{
          currentPuzzleIdx: 1,
          puzzleCount: 1,
          points,
          time: formatTime(),
          difficulty
        }}
      />

      <div className="w-full flex flex-col items-center gap-3 mt-6">
        <h3 className="text-lg">Can you guess the word?</h3>

        <div className="w-full flex items-center justify-center gap-3">
          <GameControls
            showHint={showHint}
            setShowHint={setShowHint}
            setUsedHint={setUsedHint}
            resetTimer={resetTimer}
          />

          <PuzzleBox puzzle={puzzle} />
        </div>

        {showHint && (
          <p className="mt-2">
            <strong className="text-primary">Hint:</strong> {puzzle.hint}
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
          bestScore={points}
          puzzlesSolved={answerState === "correct" ? 1 : 0}
          puzzleCount={1}
          handleReplay={() => window.location.reload()}
          handleGoHome={() => navigate("/")}
        />
      )}
    </main>
  );
};

export default DailyModeGame;
