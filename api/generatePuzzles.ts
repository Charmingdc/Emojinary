import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
// import { zodToJsonSchema } from "zod-to-json-schema";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const puzzleSchema = z.object({
  emojis: z.array(z.string()).min(3).describe("Emojis that hint at the word"),
  letters: z
    .array(z.string())
    .min(5)
    .describe("Shuffled letters including the answer"),
  answer: z.string().min(2).max(10).describe("The correct answer"),
  hint: z.string().min(1).describe("A hint for the puzzle"),
  difficulty: z
    .enum(["easy", "medium", "hard"])
    .describe("Puzzle difficulty level")
});

const puzzlesSchema = z.object({
  puzzles: z.array(puzzleSchema).min(1).describe("Array of generated puzzles")
});

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!
});

const generatePuzzles = async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed" });
  }

  const model = "gemini-2.5-flash-lite";
  const count = parseInt((req.query.count as string) ?? "10", 10);
  const difficulty = req.query.difficulty as
    | "easy"
    | "medium"
    | "hard"
    | undefined;

  const prompt = `
Generate ${count} emoji word puzzles in JSON format ONLY.

Each puzzle MUST be an object with these fields:
- emojis: array of 3 or more emojis
- letters: array of letters including the answer plus maximum of three extra distractors
- answer: string, lowercase, must be a single word (no spaces)
- answer MUST be a single English word
- answer MUST NOT contain spaces, hyphens, or underscores
- answer length MUST be between 2 and 10 characters
- hint: string
- difficulty:  ${
    difficulty ? difficulty : 'difficulty: "easy", "medium", or "hard"'
  }

Return a JSON object with a "puzzles" key containing all puzzles as an array.
Here is an exact example format you must follow (replace example data with real puzzles):

{
  "puzzles": [
    {
      "emojis": ["🌈","🌧️","☀️"],
      "letters": ["r","a","i","n","b","o","w","z","x","c"],
      "answer": "rainbow",
      "hint": "Colorful arc in the sky.",
      "difficulty": "easy"
    },
    {
      "emojis": ["⭐","🐠","🌊"],
      "letters": ["s","t","a","r","f","i","h","j","k","l","p"],
      "answer": "starfish",
      "hint": "A sea creature with arms.",
      "difficulty": "medium"
    }
  ]
}

DO NOT include any extra text outside the JSON.
`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const parsed = puzzlesSchema.parse(JSON.parse(response.text));

    return res.status(200).json({
      success: true,
      data: parsed.puzzles,
      message: "Puzzles generated successfully"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate puzzles",
      error: error instanceof Error ? error.message : String(error)
    });
  }
};

export default generatePuzzles;
