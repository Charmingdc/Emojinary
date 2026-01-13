import useLocalStorage from "@/hooks/useLocalStorage";
import type { InternalDifficulty } from "@/types";

const usePuzzlesDifficulty = () => {
  const { getItem, setItem } = useLocalStorage("difficulty");

  const difficulty: InternalDifficulty = getItem() ?? "random";

  const updateDifficulty = (selectedDifficulty: InternalDifficulty) => {
    if (selectedDifficulty !== difficulty) setItem(selectedDifficulty);
  };

  return { difficulty, updateDifficulty };
};

export default usePuzzlesDifficulty;
