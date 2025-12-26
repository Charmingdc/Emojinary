import { ChatGroq } from "@langchain/groq";
import { z } from "zod";

import { pickFlavors, buildPrompt, shuffleArray } from "./utils/index.ts";

import flavors from "./constants/flavors.ts";
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

const generatePuzzles = async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed" });
  }

  const count = Number(req.query.count ?? 7);
  const difficulty = req.query.difficulty as
    | "easy"
    | "medium"
    | "hard"
    | undefined;

  const { primary, secondary } = pickFlavors(flavors);
  const prompt = buildPrompt({
    count,
    primaryFlavor: primary,
    secondaryFlavor: secondary,
    difficulty
  });

  console.log("prompt:", prompt);

  try {
    const model = new ChatGroq({
      model: "openai/gpt-oss-120b",
      apikey: process.env.GROQ_API_KEY,
      temperature: 0.5,
      maxRetries: 3
    });

    const response = await model
      .withStructuredOutput(puzzlesSchema)
      .invoke(prompt);

    const puzzles = shuffleArray(response.puzzles);

    return res.status(200).json({
      success: true,
      data: puzzles
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
