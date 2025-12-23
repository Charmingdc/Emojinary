import { useNavigate } from "react-router-dom";

import useGeneratedPuzzles from "@/hooks/useGeneratedPuzzles";
import useGameAudio from "@/hooks/useGameAudio";
import useBestScore from "@/hooks/useBestScore";

import ClassicModeGame from "@/components/ClassicModeGame";

const ClassicModeScreen = () => {
  const navigate = useNavigate();
  const { play } = useGameAudio();
  const { bestScore, updateBestScore } = useBestScore();

  const { data: puzzles, isLoading, isError, error } = useGeneratedPuzzles();

  if (isLoading) return <p>Loading puzzles…</p>;
  if (isError || !puzzles || puzzles.length === 0)
    return (
      <div>
        Failed to load puzzles, {error?.message && <pre> {error.message} </pre>}
      </div>
    );

  return (
    <ClassicModeGame
      puzzles={puzzles}
      play={play}
      bestScore={bestScore}
      updateBestScore={updateBestScore}
      navigate={navigate}
    />
  );
};

export default ClassicModeScreen;
