import { useNavigate } from "react-router-dom";

import useGeneratedPuzzles from "@/hooks/useGeneratedPuzzles";
import useGameAudio from "@/hooks/useGameAudio";
import useBestScore from "@/hooks/useBestScore";

import LoadingScreen from "@/components/screens/LoadingScreen";
import ErrorScreen from "@/components/screens/ErrorScreen";
import ClassicModeGame from "@/components/ClassicModeGame";

const ClassicModeScreen = () => {
  const navigate = useNavigate();
  const { play } = useGameAudio();
  const { bestScore, updateBestScore } = useBestScore();

  const { data: puzzles, isLoading, isError, newGame } = useGeneratedPuzzles();

  if (isLoading) return <LoadingScreen />;
  if (isError || !puzzles || puzzles.length === 0) return <ErrorScreen />;

  return (
    <ClassicModeGame
      puzzles={puzzles}
      play={play}
      bestScore={bestScore}
      updateBestScore={updateBestScore}
      newGame={newGame}
      navigate={navigate}
    />
  );
};

export default ClassicModeScreen;
