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
import useHasPlayedToday from "@/hooks/useHasPlayedToday";

import type { AudioType, GamePuzzle } from "@/types";

type AnswerState = "neutral" | "correct" | "wrong";

type DailyModeGameProps = {
  puzzle: GamePuzzle;
  play: (sound: AudioType) => void;
  navigate: (path: string) => void;
};

const DailyModeGame = ({ puzzle, play, navigate }: DailyModeGameProps) => {
  const { markPlayedToday } = useHasPlayedToday();
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

  const handleTimerExpire = () => {
    markPlayedToday();
    setPuzzleState("skipped");
    setGameCompleted(true);
  };

  const {
    seconds: remainingTime,
    formatTime,
    reset: resetTimer
  } = usePerPuzzleTimer({
    difficulty,
    trigger: 0,
    onExpire: handleTimerExpire
  });

  const setPuzzleState = (state: "solved" | "skipped" | "unsolved") => {
    puzzle.puzzleState = state;
    if (state === "skipped") puzzle.hintUsed = usedHint;
  };

  const handleCorrectAnswer = () => {
    const earned = calculatePoints(puzzle.difficulty, remainingTime, usedHint);

    setPoints(earned);
    setAnswerState("correct");
    setPuzzleState("solved");
    play("correct");
    markPlayedToday();

    setTimeout(() => setGameCompleted(true), 600);
  };

  const handleLetterPickWrapper = (letter: string, index: number) => {
    const inserted = handleLetterClick(letter);
    if (!inserted) return;

    setLetterPool(prev => {
      const next = [...prev];
      next.splice(index, 1);
      return next;
    });
  };

  const handleLetterRemoveWrapper = (slotIdx: number) => {
    const removed = handleSlotClick(slotIdx);
    if (!removed) return;

    setLetterPool(prev => shuffleArray([...prev, removed]));
  };

  useEffect(() => {
    resetSlots();
    setLetterPool(shuffleArray(puzzle.letters));
    setAnswerState("neutral");
  }, [puzzle]);

  useEffect(() => {
    if (!isComplete || gameCompleted) return;

    const userAnswer = selectedLetters.join("").toLowerCase();
    if (userAnswer === puzzle.answer.toLowerCase()) {
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
        onSlotClick={handleLetterRemoveWrapper}
        answerState={answerState}
      />

      <LetterPool
        letters={letterPool}
        onLetterClick={handleLetterPickWrapper}
      />

      {answerState === "correct" && <CorrectAnswerBanner />}

      {gameCompleted && (
        <GameCompleteModal
          score={points}
          puzzles={puzzle}
          handleGoHome={() => navigate("/")}
        />
      )}
    </main>
  );
};

export default DailyModeGame;
