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

  const res = await fetch(url.toString());
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
    throw new Error(
      detail ??
        (proxyError
          ? "The local puzzle API is not running on port 3000. Start the Vercel development server with `npx vercel dev`."
          : `Puzzle API returned ${res.status}${responseText && !responseText.includes("<html") ? `: ${responseText.slice(0, 180)}` : ""}`),
    );
  }

  if (!json?.data) throw new Error("Puzzle API response did not include puzzle data.");
  return json.data;
};

export default generatePuzzles;
