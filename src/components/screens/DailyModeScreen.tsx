import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useDailyPuzzle from "@/hooks/useDailyPuzzle";
import useGameAudio from "@/hooks/useGameAudio";
import useHasPlayedToday from "@/hooks/useHasPlayedToday";

import LoadingScreen from "@/components/screens/LoadingScreen";
import ErrorScreen from "@/components/screens/ErrorScreen";
import DailyCompletedScreen from "@/components/screens/DailyCompletedScreen";
import DailyModeGame from "@/components/DailyModeGame";

import type { GamePuzzle } from "@/types";

const DailyModeScreen = () => {
  const navigate = useNavigate();
  const { play } = useGameAudio();
  const { hasPlayedToday, timeUntilNextPuzzle } = useHasPlayedToday();

  const { data: puzzleData, isLoading, isError } = useDailyPuzzle();
  const [dailyPuzzle, setDailyPuzzle] = useState<GamePuzzle | null>(null);

  useEffect(() => {
    if (!puzzleData) return;

    setDailyPuzzle({
      ...puzzleData[0],
      puzzleState: "unsolved",
      hintUsed: false
    });
  }, [puzzleData]);

  if (isLoading) return <LoadingScreen />;
  if (isError || !dailyPuzzle) return <ErrorScreen />;

  if (hasPlayedToday) {
    return <DailyCompletedScreen timeUntilNextPuzzle={timeUntilNextPuzzle} />;
  }

  return <DailyModeGame puzzle={dailyPuzzle} play={play} navigate={navigate} />;
};

export default DailyModeScreen;
