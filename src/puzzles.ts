import type { Puzzle } from "@/types";

const puzzles: Puzzle[] = [
  {
    emojis: ["☁️", "⬆️", "📤"],
    answer: "upload",
    letters: ["U", "P", "L", "O", "A", "D", "X", "T"],
    hint: "Sending files to the cloud or server",
    difficulty: "easy"
  },
  {
    emojis: ["💻", "👨‍💻", "⚡"],
    answer: "developer",
    letters: ["D", "E", "V", "E", "L", "O", "P", "E", "R", "X", "A"],
    hint: "Person who writes code",
    difficulty: "easy"
  },
  {
    emojis: ["🤖", "🧠", "📊"],
    answer: "AI",
    letters: ["A", "I", "X", "Y", "Z"],
    hint: "Machines that can learn and think",
    difficulty: "medium"
  }
];

export default puzzles;
