import { useState, useEffect } from "react";

import StatsBar from "@/components/ui/StatsBar";
import GameControls from "@/components/GameControls";
import PuzzleBox from "@/components/ui/PuzzleBox";
import AnswerSlots from "@/components/ui/AnswerSlots";
import LetterPool from "@/components/ui/LetterPool";
import CorrectAnswerBanner from "@/components/ui/CorrectAnswerBanner";

import { shuffleArray, calculatePoints, vibrate } from "@/utils";
import usePerPuzzleTimer from "@/hooks/usePerPuzzleTimer";
import useGameAudio from "@/hooks/useGameAudio";

import puzzles from "@/puzzles";

type AnswerState = "neutral" | "correct" | "wrong";

const ClassicModeScreen = () => {
  const { play } = useGameAudio();

  const [currentPuzzleIdx, setCurrentPuzzleIdx] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [letterPool, setLetterPool] = useState<string[]>([]);
  const [points, setPoints] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [usedHint, setUsedHint] = useState(false);
  const [answerState, setAnswerState] = useState<AnswerState>("neutral");

  const puzzleCount = puzzles.length;
  const currentPuzzle = puzzles[currentPuzzleIdx];
  const difficulty = currentPuzzle.difficulty;

  /* Timer */
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

  /* Navigation */
  const goToNextPuzzle = () => {
    setCurrentPuzzleIdx(prev => (prev < puzzleCount - 1 ? prev + 1 : prev));
    setSelectedLetters(Array(currentPuzzle.answer.length).fill(""));
    setShowHint(false);
    setUsedHint(false);
    setAnswerState("neutral");
  };

  /* Input */
  const handleSlotClick = (index: number) => {
    const next = [...selectedLetters];
    next[index] = "";
    setSelectedLetters(next);
    setAnswerState("neutral");
  };

  const handleLetterClick = (letter: string) => {
    const emptyIndex = selectedLetters.indexOf("");
    if (emptyIndex === -1) return;

    const next = [...selectedLetters];
    next[emptyIndex] = letter;
    setSelectedLetters(next);
  };

  /* Answer Handling */
  const handleCorrectAnswer = () => {
    const earned = calculatePoints(
      currentPuzzle.difficulty,
      remainingTime,
      usedHint
    );
    setPoints(prev => prev + earned);
    setAnswerState("correct");

    setTimeout(() => {
      goToNextPuzzle();
    }, 500);
  };

  /* Puzzle Init */
  useEffect(() => {
    setSelectedLetters(Array(currentPuzzle.answer.length).fill(""));
    setLetterPool(shuffleArray(currentPuzzle.letters));
    setAnswerState("neutral");
  }, [currentPuzzle]);

  /* Answer Check */
  useEffect(() => {
    if (selectedLetters.includes("")) {
      setAnswerState("neutral");
      return;
    }

    const userAnswer = selectedLetters.join("").toLowerCase();
    const correctAnswer = currentPuzzle.answer.toLowerCase();

    if (userAnswer === correctAnswer) {
      setAnswerState("correct");
      play("correct");
      handleCorrectAnswer();
    } else {
      setAnswerState("wrong");
      vibrate([80, 10, 80]);
    }
  }, [selectedLetters, currentPuzzle]);

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
            showHint={showHint}
            setShowHint={setShowHint}
            setUsedHint={setUsedHint}
            currentPuzzleIdx={currentPuzzleIdx}
            setCurrentPuzzleIdx={setCurrentPuzzleIdx}
            puzzleCount={puzzleCount}
            resetTimer={reset}
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
    </main>
  );
};

export default ClassicModeScreen;
