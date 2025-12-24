import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const puzzleSchema = z.object({
  emojis: z.array(z.string()).min(3),
  letters: z.array(z.string()).min(5),
  answer: z.string().min(2).max(10),
  hint: z.string().min(1),
  difficulty: z.enum(["easy", "medium", "hard"])
});

const puzzlesSchema = z.object({
  puzzles: z.array(puzzleSchema).min(1)
});

const MODELS = [
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
  "gemini-2.0-flash-lite",
  "gemini-2.0-flash",
  "gemini-1.5-flash"
] as const;

type GeminiModel = (typeof MODELS)[number];

const COOLDOWN_MS = 60_000;

const modelCooldowns: Record<GeminiModel, number> = {
  "gemini-2.5-flash": 0,
  "gemini-2.5-flash-lite": 0,
  "gemini-2.0-flash-lite": 0,
  "gemini-2.0-flash": 0,
  "gemini-1.5-flash": 0
};

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!
});

// Utils
function isRateLimitError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;

  return (
    error.message.includes("429") ||
    error.message.toLowerCase().includes("quota") ||
    error.message.toLowerCase().includes("rate")
  );
}

function isInCooldown(model: GeminiModel): boolean {
  return Date.now() < modelCooldowns[model];
}

function setCooldown(model: GeminiModel) {
  modelCooldowns[model] = Date.now() + COOLDOWN_MS;
}

async function generateWithFallback(prompt: string): Promise<{
  puzzles: z.infer<typeof puzzleSchema>[];
  modelUsed: GeminiModel;
}> {
  let lastError: unknown;

  for (const model of MODELS) {
    if (isInCooldown(model)) {
      console.warn(`[AI] Skipping ${model} (cooldown active)`);
      continue;
    }

    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const json = JSON.parse(response.text);
      const parsed = puzzlesSchema.parse(json);

      return {
        puzzles: parsed.puzzles,
        modelUsed: model
      };
    } catch (error) {
      lastError = error;

      console.warn(`[AI] ${model} failed`);

      if (isRateLimitError(error)) {
        console.warn(`[AI] ${model} rate-limited → cooldown`);
        setCooldown(model);
      }
    }
  }

  throw lastError ?? new Error("All models failed");
}

const generatePuzzles = async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed" });
  }

  const count = Number(req.query.count ?? 10);
  const difficulty = req.query.difficulty as
    | "easy"
    | "medium"
    | "hard"
    | undefined;

  const prompt = `
Generate ${count} emoji word puzzles in JSON format ONLY.

Rules:
- emojis: 3+ emojis
- letters: answer letters + up to 3 distractors
- answer: lowercase, single English word, 2–10 chars, no spaces
- hint: string
- difficulty: ${difficulty ?? `"easy", "medium", or "hard"`}

Return ONLY:

{
  "puzzles": [
    {
      "emojis": ["🌈","🌧️","☀️"],
      "letters": ["r","a","i","n","b","o","w"],
      "answer": "rainbow",
      "hint": "Colorful arc in the sky.",
      "difficulty": "easy"
    }
  ]
}
`;

  try {
    const { puzzles, modelUsed } = await generateWithFallback(prompt);

    console.log("model used:", modelUsed);
    return res.status(200).json({
      success: true,
      data: puzzles,
      model: modelUsed
    });
  } catch (error) {
    console.error("[AI] Generation failed", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate puzzles",
      error: error instanceof Error ? error.message : String(error)
    });
  }
};

export default generatePuzzles;
