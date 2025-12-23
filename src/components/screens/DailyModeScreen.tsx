import { useNavigate } from "react-router-dom";

import useGameAudio from "@/hooks/useGameAudio";
import puzzles from "@/puzzles";
import DailyModeGame from "@/components/DailyModeGame";

const DailyModeScreen = () => {
  const navigate = useNavigate();
  const { play } = useGameAudio();

  const puzzle = puzzles[0];
  if (!puzzle) {
    return <p>Daily puzzle unavailable.</p>;
  }

  return <DailyModeGame puzzle={puzzle} play={play} navigate={navigate} />;
};

export default DailyModeScreen;
