import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useGeneratedPuzzles from "@/hooks/useGeneratedPuzzles";
import useGameAudio from "@/hooks/useGameAudio";
import useBestScore from "@/hooks/useBestScore";

import LoadingScreen from "@/components/screens/LoadingScreen";
import ErrorScreen from "@/components/screens/ErrorScreen";
import ClassicModeGame from "@/components/ClassicModeGame";

import type { Puzzle, GamePuzzle } from "@/types";

const ClassicModeScreen = () => {
  const [gamePuzzles, setGamePuzzles] = useState<GamePuzzle[]>([]);

  const navigate = useNavigate();
  const { play } = useGameAudio();
  const { bestScore, updateBestScore } = useBestScore();

  const {
    data: puzzles,
    isLoading,
    isError,
    error,
    newGame,
  } = useGeneratedPuzzles();

  useEffect(() => {
    if (puzzles) {
      setGamePuzzles(
        puzzles.map((puzzle: Puzzle) => ({
          ...puzzle,
          puzzleState: "unsolved",
          hintUsed: false,
        })),
      );
    }
  }, [puzzles]);

  if (isLoading) return <LoadingScreen />;
  if (isError || !gamePuzzles || gamePuzzles.length === 0)
    return (
      <ErrorScreen
        message={error instanceof Error ? error.message : undefined}
      />
    );

  return (
    <ClassicModeGame
      puzzles={gamePuzzles}
      setPuzzles={setGamePuzzles}
      play={play}
      bestScore={bestScore}
      updateBestScore={updateBestScore}
      newGame={newGame}
      navigate={navigate}
    />
  );
};

export default ClassicModeScreen;
