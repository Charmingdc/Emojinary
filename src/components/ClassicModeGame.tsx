import { useState, useEffect } from "react";
import { LayoutGroup } from "motion/react";
import type { Dispatch, SetStateAction } from "react";

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

import type { AudioType, GamePuzzle } from "@/types";
type AnswerState = "neutral" | "correct" | "wrong";

type ClassicModeGameProps = {
  puzzles: GamePuzzle[];
  setPuzzles: Dispatch<SetStateAction<GamePuzzle[]>>;
  play: (sound: AudioType) => void;
  bestScore: number;
  updateBestScore: (score: number) => void;
  newGame: () => void;
  navigate: (path: string) => void;
};

const ClassicModeGame = ({
  puzzles,
  setPuzzles,
  play,
  bestScore,
  updateBestScore,
  newGame,
  navigate,
}: ClassicModeGameProps) => {
  const [currentPuzzleIdx, setCurrentPuzzleIdx] = useState(0);
  const [letterPool, setLetterPool] = useState<LetterToken[]>([]);
  const [slotIds, setSlotIds] = useState<Array<string | null>>([]);
  const [points, setPoints] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [usedHint, setUsedHint] = useState(false);
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
    isComplete,
  } = usePuzzleInput(currentPuzzle.answer.length);

  const handleTimerExpire = () => goToNextPuzzle();

  const {
    seconds: remainingTime,
    formatTime,
    reset,
  } = usePerPuzzleTimer({
    difficulty,
    trigger: currentPuzzleIdx,
    onExpire: handleTimerExpire,
  });

  const goToNextPuzzle = () => {
    if (currentPuzzleIdx === puzzleCount - 1) {
      setGameCompleted(true);
      return;
    }

    setCurrentPuzzleIdx((prev) => (prev < puzzleCount - 1 ? prev + 1 : prev));
    resetSlots();
    setShowHint(false);
    setUsedHint(false);
    setAnswerState("neutral");
  };

  const handleCorrectAnswer = () => {
    const earned = calculatePoints(
      currentPuzzle.difficulty,
      remainingTime,
      usedHint,
    );

    setPoints((prev) => prev + earned);

    setPuzzles((prev) =>
      prev.map((puzzle, idx) =>
        idx === currentPuzzleIdx
          ? { ...puzzle, puzzleState: "solved" }
          : puzzle,
      ),
    );

    setAnswerState("correct");
    play("correct");

    if (currentPuzzleIdx === puzzleCount - 1) {
      setGameCompleted(true);
      return;
    }

    setTimeout(goToNextPuzzle, 1500);
  };

  const handleLetterPick = (letter: string, index: number) => {
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

  const handleLetterRemove = (slotIdx: number) => {
    const removed = handleSlotClick(slotIdx);
    if (!removed) return;
    setAnswerState("neutral");

    const tokenId =
      slotIds[slotIdx] ?? `${currentPuzzleIdx}-${slotIdx}-${Date.now()}`;
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
        currentPuzzle.letters.map((letter, index) => ({
          id: `${currentPuzzleIdx}-${currentPuzzle.answer}-${index}`,
          letter,
        })),
      ),
    );
    setSlotIds(Array(currentPuzzle.answer.length).fill(null));
    setAnswerState("neutral");
  }, [currentPuzzle, currentPuzzleIdx]);

  useEffect(() => {
    if (!isComplete) setAnswerState("neutral");
  }, [isComplete]);

  useEffect(() => {
    if (!isComplete || gameCompleted) return;

    const userAnswer = selectedLetters.join("").toLowerCase();
    if (userAnswer === currentPuzzle.answer.toLowerCase()) {
      handleCorrectAnswer();
    } else {
      setAnswerState("wrong");
      vibrate([80, 10, 80]);
    }
  }, [isComplete]);

  useEffect(() => {
    if (!gameCompleted || points <= bestScore) return;

    updateBestScore(points);
  }, [gameCompleted, points, bestScore]);

  return (
    <LayoutGroup id="classic-puzzle-letters">
      <main className="mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-4 pb-12 pt-2 sm:px-6 lg:px-8">
        <h2 className="w-full max-w-5xl text-left">🕹️ Classic Mode</h2>

        <div className="w-full max-w-5xl">
          <StatsBar
            stats={{
              currentPuzzleIdx: currentPuzzleIdx + 1,
              puzzleCount,
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
              {...{
                showHint,
                setShowHint,
                setUsedHint,
                currentPuzzleIdx,
                setCurrentPuzzleIdx,
                setPuzzles,
                setGameCompleted,
                puzzleCount,
                resetTimer: reset,
              }}
            />
            <PuzzleBox puzzle={currentPuzzle} />
          </div>

          {showHint && (
            <p className="mt-2">
              <strong className="text-primary-ink">Hint:</strong>{" "}
              {currentPuzzle.hint}
            </p>
          )}
        </div>

        <div className="w-full max-w-4xl">
          <AnswerSlots
            slots={selectedLetters}
            slotIds={slotIds}
            onSlotClick={handleLetterRemove}
            answerState={answerState}
          />
        </div>

        <LetterPool letters={letterPool} onLetterClick={handleLetterPick} />

        {answerState === "correct" && <CorrectAnswerBanner />}

        {gameCompleted && (
          <GameCompleteModal
            score={points}
            bestScore={bestScore}
            puzzles={puzzles}
            handleReplay={newGame}
            handleGoHome={() => navigate("/")}
          />
        )}
      </main>
    </LayoutGroup>
  );
};

export default ClassicModeGame;
