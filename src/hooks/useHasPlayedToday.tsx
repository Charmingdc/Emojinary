import { useEffect, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

const DAILY_KEY = "daily_played_date";

const getDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getNextMidnight = (now: Date) => {
  const next = new Date(now);
  next.setHours(24, 0, 0, 0);
  return next;
};

const useHasPlayedToday = () => {
  const { getItem, setItem, removeItem } = useLocalStorage(DAILY_KEY);
  const [now, setNow] = useState(() => new Date());

  const today = getDateKey(now);
  const storedDate = getItem<string>();

  const hasPlayedToday = storedDate === today;

  const markPlayedToday = () => {
    setItem(getDateKey(new Date()));
  };

  const resetIfNewDay = () => {
    if (storedDate && storedDate !== today) {
      removeItem();
    }
  };

  useEffect(() => {
    const nextMidnight = getNextMidnight(new Date());
    const timeout = window.setTimeout(
      () => setNow(new Date()),
      Math.max(0, nextMidnight.getTime() - Date.now() + 50),
    );

    return () => window.clearTimeout(timeout);
  }, [today]);

  const timeUntilNextPuzzle = Math.max(
    0,
    getNextMidnight(now).getTime() - now.getTime(),
  );

  return {
    hasPlayedToday,
    markPlayedToday,
    resetIfNewDay,
    timeUntilNextPuzzle,
  };
};

export default useHasPlayedToday;
