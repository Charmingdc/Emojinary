import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";

import usePuzzlesDifficulty from "@/hooks/usePuzzlesDifficulty";
import generatePuzzles from "@/api/generatePuzzles";

const generateGameKey = () => {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0];
};

const useGeneratedPuzzles = ({ count = 8 }: { count?: number } = {}) => {
  const { difficulty } = usePuzzlesDifficulty();
  const gameKeyRef = useRef<number>(generateGameKey());

  const query = useQuery({
    queryKey: ["generated-puzzles", gameKeyRef.current, count, difficulty],
    queryFn: () => generatePuzzles({ count, difficulty }),
    staleTime: Infinity,
    retry: 1,
    refetchOnWindowFocus: false
  });

  const newGame = () => {
    gameKeyRef.current = generateGameKey();
    query.refetch();
  };

  return {
    ...query,
    newGame
  };
};

export default useGeneratedPuzzles;
