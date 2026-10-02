import { useQuery } from "@tanstack/react-query";
import generatePuzzles from "@/api/generatePuzzles";

const getTodayKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
    2,
    "0",
  )}-${String(now.getDate()).padStart(2, "0")}`;
};

const useDailyPuzzle = ({ enabled = true }: { enabled?: boolean } = {}) => {
  const todayKey = getTodayKey();

  return useQuery({
    queryKey: ["daily-puzzles", todayKey],
    enabled,
    queryFn: () =>
      generatePuzzles({
        count: 1,
        difficulty: "hard",
      }),
    staleTime: Infinity,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

export default useDailyPuzzle;
