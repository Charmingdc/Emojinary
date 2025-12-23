import { useQuery } from "@tanstack/react-query";
import generatePuzzles, {
  type GeneratePuzzlesParams
} from "@/api/generatePuzzles";

const useGeneratedPuzzles = (params: GeneratePuzzlesParams = {}) => {
  return useQuery({
    queryKey: [
      "generated-puzzles",
      params.count ?? "default",
      params.difficulty ?? "any"
    ],
    queryFn: () => generatePuzzles(params),
    staleTime: Infinity,
    retry: 1
  });
};

export default useGeneratedPuzzles;
