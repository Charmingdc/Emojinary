export type GeneratePuzzlesParams = {
  count?: number;
  difficulty?: "easy" | "medium" | "hard";
};

const generatePuzzles = async (params: GeneratePuzzlesParams) => {
  const url = new URL("/api/generatePuzzles", window.location.origin);

  if (params.count) url.searchParams.append("count", params.count.toString());
  if (params.difficulty)
    url.searchParams.append("difficulty", params.difficulty);

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error("Failed to generate puzzles");
  }

  const json = await res.json();
  return json.data;
};

export default generatePuzzles;
