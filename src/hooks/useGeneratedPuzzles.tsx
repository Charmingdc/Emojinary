import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";

import generatePuzzles, {
  type GeneratePuzzlesParams
} from "@/api/generatePuzzles";

const generateGameKey = () => {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0];
};

const useGeneratedPuzzles = (params: GeneratePuzzlesParams = {}) => {
  const gameKeyRef = useRef<number>(generateGameKey());

  const query = useQuery({
    queryKey: [
      "generated-puzzles",
      gameKeyRef.current,
      params.count ?? "default",
      params.difficulty ?? "any"
    ],
    queryFn: () => generatePuzzles(params),
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
