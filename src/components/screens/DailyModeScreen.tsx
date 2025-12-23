import { useNavigate } from "react-router-dom";

import useGeneratedPuzzles from "@/hooks/useGeneratedPuzzles";
import useGameAudio from "@/hooks/useGameAudio";
import DailyModeGame from "@/components/DailyModeGame";

const DailyModeScreen = () => {
  const navigate = useNavigate();
  const { play } = useGameAudio();

  const {
    data: puzzles,
    isLoading,
    isError,
    error
  } = useGeneratedPuzzles({ count: 1, difficulty: "hard" });

  if (isLoading) return <p>Loading puzzles…</p>;
  if (isError || !puzzles || puzzles.length === 0)
    return (
      <div>
        Failed to load puzzles, {error?.message && <pre> {error.message} </pre>}
      </div>
    );

  return <DailyModeGame puzzle={puzzles[0]} play={play} navigate={navigate} />;
};

export default DailyModeScreen;
