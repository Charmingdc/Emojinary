import { useNavigate } from "react-router-dom";

import useDailyPuzzle from "@/hooks/useDailyPuzzle";
import useGameAudio from "@/hooks/useGameAudio";
import useHasPlayedToday from "@/hooks/useHasPlayedToday";

import LoadingScreen from "@/components/screens/LoadingScreen";
import ErrorScreen from "@/components/screens/ErrorScreen";
import DailyCompletedScreen from "@/components/screens/DailyCompletedScreen";
import DailyModeGame from "@/components/DailyModeGame";

const DailyModeScreen = () => {
  const navigate = useNavigate();
  const { play } = useGameAudio();

  const { hasPlayedToday, timeUntilNextPuzzle } = useHasPlayedToday();

  const { data: puzzles, isLoading, isError } = useDailyPuzzle();

  if (isLoading) return <LoadingScreen />;
  if (isError || !puzzles || puzzles.length === 0) return <ErrorScreen />;

  if (hasPlayedToday) {
    return <DailyCompletedScreen timeUntilNextPuzzle={timeUntilNextPuzzle} />;
  }

  return <DailyModeGame puzzle={puzzles[0]} play={play} navigate={navigate} />;
};

export default DailyModeScreen;
