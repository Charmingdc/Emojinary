type Difficulty = "easy" | "medium" | "hard" | "random";

type BuildPuzzlePromptArgs = {
  count: number;
  primaryFlavor: string;
  secondaryFlavor: string;
  tertiaryFlavor: string;
  difficulty?: Difficulty;
};

const buildPrompt = ({
  count,
  primaryFlavor,
  secondaryFlavor,
  tertiaryFlavor,
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
- tertiary domain: ${tertiaryFlavor}
- Each puzzle must clearly fit at least ONE of these domains
- Across the full set, use all domains inter-wovenly 

UNIQUENESS REQUIREMENT (CRITICAL):
- Generate ${count} puzzles that are clearly different from each other
- Do NOT reuse:
  - the same answer
  - the same emoji combinations
  - the same core concept

DIFFICULTY GUIDANCE:
- easy:
  - common words
  - strong emoji association
  - hint: clear and direct, guides player almost immediately to the answer
- medium:
  - less direct association, mild abstraction
  - hint: useful but slightly tricky, encourages thinking about the emoji sequence
- hard:
  - abstract association, weaker emoji clues, subtler hints
  - hint: subtle and suggestive, guides player without revealing the answer outright

PUZZLE RULES:
- emojis:
  - 3–6 emojis
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
  - must match difficulty guidance above
  - should NOT include direct synonyms or part of the answer
  - strike a balance: helpful enough to solve but not too obvious
- difficulty:
  - ${difficulty === "random" ? `"easy", "medium", or "hard"` : difficulty}

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
