import { useState, useEffect } from "react";

import StatsBar from "@/components/ui/StatsBar";
import GameControls from "@/components/GameControls";
import PuzzleBox from "@/components/ui/PuzzleBox";
import AnswerSlots from "@/components/ui/AnswerSlots";
import LetterPool from "@/components/ui/LetterPool";

import { shuffleArray, calculatePoints, vibrate } from "@/utils";
import usePerPuzzleTimer from "@/hooks/usePerPuzzleTimer";

import puzzles from "@/puzzles";

const ClassicModeScreen = () => {
  const [currentPuzzleIdx, setCurrentPuzzleIdx] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [letterPool, setLetterPool] = useState<string[]>([]);
  const [points, setPoints] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [usedHint, setUsedHint] = useState(false);
  const [isWrongAnswer, setIsWrongAnswer] = useState(false);

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
    setIsWrongAnswer(false); // reset wrong answer on new puzzle
  };

  /* Input */
  const handleSlotClick = (index: number) => {
    const next = [...selectedLetters];
    next[index] = "";
    setSelectedLetters(next);
    setIsWrongAnswer(false); // reset wrong answer when slot is emptied
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
    goToNextPuzzle();
  };

  /* Puzzle Init */
  useEffect(() => {
    setSelectedLetters(Array(currentPuzzle.answer.length).fill(""));
    setLetterPool(shuffleArray(currentPuzzle.letters));
    setIsWrongAnswer(false); // reset wrong answer when puzzle changes
  }, [currentPuzzle]);

  /* Answer Check */
  useEffect(() => {
    if (selectedLetters.includes("")) {
      setIsWrongAnswer(false); // incomplete answer, can't be wrong yet
      return;
    }

    const userAnswer = selectedLetters.join("").toLowerCase();
    const correctAnswer = currentPuzzle.answer.toLowerCase();

    if (userAnswer === correctAnswer) {
      handleCorrectAnswer();
    } else {
      setIsWrongAnswer(true); // full answer but incorrect
      vibrate([60, 30, 60]);
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
        isWrongAnswer={isWrongAnswer}
      />

      <LetterPool letters={letterPool} onLetterClick={handleLetterClick} />
    </main>
  );
};

export default ClassicModeScreen;
