import type { InternalDifficulty } from "@/types";
import type { Puzzle } from "@/types";

type GeneratePuzzlesResponse = {
  data?: Puzzle[];
  error?: string;
  message?: string;
};

export type GeneratePuzzlesParams = {
  count: number;
  difficulty: InternalDifficulty;
};

const generatePuzzles = async (params: GeneratePuzzlesParams) => {
  const url = new URL("/api/generatePuzzles", window.location.origin);

  if (params.count) url.searchParams.append("count", params.count.toString());
  if (params.difficulty)
    url.searchParams.append("difficulty", params.difficulty);

  let res: Response;
  try {
    res = await fetch(url.toString());
  } catch (error) {
    console.error("[Puzzle generation] Network request failed:", error);
    throw new Error(
      "We couldn’t reach the puzzle service. Check your connection and try again.",
    );
  }

  const responseText = await res.text();
  let json: GeneratePuzzlesResponse | null = null;

  try {
    json = JSON.parse(responseText) as GeneratePuzzlesResponse;
  } catch {
    // The Vite proxy can return plain text/HTML when its API target is offline.
  }

  if (!res.ok) {
    const proxyError = responseText.match(/ECONNREFUSED|ECONNRESET|ENOTFOUND/i);
    const detail = json?.error ?? json?.message;
    console.error("[Puzzle generation] API request failed:", {
      status: res.status,
      detail: detail ?? responseText.slice(0, 500),
    });
    throw new Error(
      proxyError
        ? "The puzzle service is offline right now. Please try again in a moment."
        : "We couldn’t make a puzzle just now. Please try again.",
    );
  }

  if (!json?.data) {
    console.error("[Puzzle generation] API response is missing puzzle data:", responseText.slice(0, 500));
    throw new Error("We couldn’t load a puzzle just now. Please try again.");
  }
  return json.data;
};

export default generatePuzzles;
