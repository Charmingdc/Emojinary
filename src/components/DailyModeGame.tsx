import { useState, useEffect } from "react";
import { LayoutGroup } from "motion/react";

import StatsBar from "@/components/ui/StatsBar";
import GameControls from "@/components/GameControls";
import PuzzleBox from "@/components/ui/PuzzleBox";
import AnswerSlots from "@/components/ui/AnswerSlots";
import LetterPool from "@/components/ui/LetterPool";
import CorrectAnswerBanner from "@/components/ui/CorrectAnswerBanner";
import GameCompleteModal from "@/components/ui/GameCompleteModal";
import type { LetterToken } from "@/components/ui/GamePrimitives";

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

  const [letterPool, setLetterPool] = useState<LetterToken[]>([]);
  const [slotIds, setSlotIds] = useState<Array<string | null>>(
    Array(puzzle.answer.length).fill(null),
  );
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
    isComplete,
  } = usePuzzleInput(puzzle.answer.length);

  const handleTimerExpire = () => {
    markPlayedToday();
    setPuzzleState("skipped");
    setGameCompleted(true);
  };

  const {
    seconds: remainingTime,
    formatTime,
    reset: resetTimer,
  } = usePerPuzzleTimer({
    difficulty,
    trigger: 0,
    onExpire: handleTimerExpire,
  });

  const setPuzzleState = (state: "solved" | "skipped" | "unsolved") => {
    puzzle.puzzleState = state;
    if (state === "skipped") puzzle.hintUsed = usedHint;
  };

  useEffect(() => {
    markPlayedToday();
  }, []);

  const handleCorrectAnswer = () => {
    const earned = calculatePoints(puzzle.difficulty, remainingTime, usedHint);

    setPoints(earned);
    setAnswerState("correct");
    setPuzzleState("solved");
    play("correct");
    markPlayedToday();

    setTimeout(() => setGameCompleted(true), 1500);
  };

  const handleLetterPickWrapper = (letter: string, index: number) => {
    const token = letterPool[index];
    const targetSlot = selectedLetters.indexOf("");
    if (!token || targetSlot === -1) return;

    const inserted = handleLetterClick(letter);
    if (!inserted) return;

    setSlotIds((prev) => {
      const next = [...prev];
      next[targetSlot] = token.id;
      return next;
    });
    setLetterPool((prev) => {
      const next = [...prev];
      next.splice(index, 1);
      return next;
    });
  };

  const handleLetterRemoveWrapper = (slotIdx: number) => {
    const removed = handleSlotClick(slotIdx);
    if (!removed) return;
    setAnswerState("neutral");

    const tokenId = slotIds[slotIdx] ?? `daily-${slotIdx}-${Date.now()}`;
    setSlotIds((prev) => {
      const next = [...prev];
      next[slotIdx] = null;
      return next;
    });
    setLetterPool((prev) =>
      shuffleArray([...prev, { id: tokenId, letter: removed }]),
    );
  };

  useEffect(() => {
    resetSlots();
    setLetterPool(
      shuffleArray(
        puzzle.letters.map((letter, index) => ({
          id: `daily-${puzzle.answer}-${index}`,
          letter,
        })),
      ),
    );
    setSlotIds(Array(puzzle.answer.length).fill(null));
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
    <LayoutGroup id="daily-puzzle-letters">
      <main className="mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-4 pb-12 pt-2 sm:px-6 lg:px-8">
        <h2 className="w-full max-w-5xl text-left">🕹️ Daily Mode</h2>

        <div className="w-full max-w-5xl">
          <StatsBar
            stats={{
              currentPuzzleIdx: 1,
              puzzleCount: 1,
              points,
              time: formatTime(),
              difficulty,
            }}
          />
        </div>

        <div className="mx-auto mt-6 flex w-full max-w-4xl flex-col items-center gap-3">
          <h3 className="text-lg">Can you guess the word?</h3>

          <div className="flex w-full items-center justify-center gap-3 sm:gap-5">
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
              <strong className="text-primary-ink">Hint:</strong> {puzzle.hint}
            </p>
          )}
        </div>

        <div className="w-full max-w-4xl">
          <AnswerSlots
            slots={selectedLetters}
            slotIds={slotIds}
            onSlotClick={handleLetterRemoveWrapper}
            answerState={answerState}
          />
        </div>

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
    </LayoutGroup>
  );
};

export default DailyModeGame;
