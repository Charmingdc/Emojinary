import useLocalStorage from "@/hooks/useLocalStorage";

const useBestScore = () => {
  const { getItem, setItem } = useLocalStorage("best_score");

  const bestScore: number = getItem() ?? 0;

  const updateBestScore = (newBestScore: number) => {
    if (newBestScore > bestScore) setItem(newBestScore);
  };

  return { bestScore, updateBestScore };
};

export default useBestScore;
