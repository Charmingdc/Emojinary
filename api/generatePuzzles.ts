import { ChatGroq } from "@langchain/groq";
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
Use slightly different puzzles each time — consider this seed: ${Date.now()}

Rules:
- emojis: 3+ emojis
- letters: answer letters + up to 3 distractors (shuffle them randomly)
- answer: lowercase, single English word, 2–10 chars, no spaces
- hint: string, a vague sentence about the puzzle
- difficulty: ${difficulty ?? `"easy", "medium", or "hard"`}

Return only a JSON object like:
{ "puzzles": [ ... ] }
`;

  try {
    const model = new ChatGroq({
      model: "llama-3.1-8b-instant",
      apikey: process.env.GROQ_API_KEY,
      temperature: 0.4,
      maxRetries: 3
    });

    const modelWithStructure = model.withStructuredOutput(puzzlesSchema);
    const response = await modelWithStructure.invoke(prompt);

    return res.status(200).json({
      success: true,
      data: response.puzzles
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
