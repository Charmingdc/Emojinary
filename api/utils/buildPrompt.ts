type Difficulty = "easy" | "medium" | "hard";

type BuildPuzzlePromptArgs = {
  count: number;
  primaryFlavor: string;
  secondaryFlavor: string;
  difficulty?: Difficulty;
};

const buildPrompt = ({
  count,
  primaryFlavor,
  secondaryFlavor,
  difficulty
}: BuildPuzzlePromptArgs): string => {
  return `
You are generating emoji word puzzles for a game.

REQUEST CONTEXT:
- This request is a fresh game initialization
- Do NOT rely on or repeat past outputs
- Treat creativity as mandatory, not optional

PUZZLE THEME (IMPORTANT):
- Primary domain: ${primaryFlavor}
- Secondary domain: ${secondaryFlavor}
- Each puzzle must clearly fit at least ONE of these domains
- Across the full set, use BOTH domains multiple times

UNIQUENESS REQUIREMENT (CRITICAL):
- Generate ${count} puzzles that are clearly different from each other
- Do NOT reuse:
  - the same answer
  - the same emoji combinations
  - the same core concept
- Avoid overused answers like:
  sun, moon, star, fire, water, love, heart

PUZZLE RULES:
- emojis:
  - 3–6 emojis
  - Use indirect symbolism, not literal emoji-to-word mapping
- letters:
  - Must include all letters of the answer
  - Add 3–4 distractor letters NOT in the answer
  - Shuffle randomly
- answer:
  - lowercase
  - single English word
  - 2–10 characters
  - no spaces, hyphens, or underscores
- hint:
  - vague, indirect, suggestive
  - must NOT contain synonyms of the answer
- difficulty:
  - ${difficulty ?? `"easy", "medium", or "hard"`}

VARIATION ENFORCEMENT:
If a puzzle feels obvious, generic, or similar to common emoji games,
discard it internally and generate a better one.

EXAMPLE OUTPUT FORMAT:
Return ONLY valid JSON:
{
  "puzzles": [
  {
    "emojis": ["⛴️", "🌊", "🏙️"],
    "letters": ["b", "h", "r", "e", "a", "t", "o", "n", "s", "r"],
    "answer": "harbor",
    "hint": "A safe haven for vessels.",
    "difficulty": "easy"
  }
  ]
}`;
};

export default buildPrompt;
