import { useMemo } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

const DAILY_KEY = "daily_played_date";

const getTodayKey = () => {
  const now = new Date();
  return now.toISOString().split("T")[0];
};

const getNextMidnight = () => {
  const now = new Date();
  const next = new Date(now);
  next.setHours(24, 0, 0, 0);
  return next.getTime();
};

const useHasPlayedToday = () => {
  const { getItem, setItem, removeItem } = useLocalStorage(DAILY_KEY);

  const today = getTodayKey();
  const storedDate = getItem<string>();

  const hasPlayedToday = storedDate === today;

  const markPlayedToday = () => {
    setItem(today);
  };

  const resetIfNewDay = () => {
    if (storedDate && storedDate !== today) {
      removeItem();
    }
  };

  const timeUntilNextPuzzle = useMemo(() => {
    const diff = getNextMidnight() - Date.now();
    return diff > 0 ? diff : 0;
  }, []);

  return {
    hasPlayedToday,
    markPlayedToday,
    resetIfNewDay,
    timeUntilNextPuzzle
  };
};

export default useHasPlayedToday;
