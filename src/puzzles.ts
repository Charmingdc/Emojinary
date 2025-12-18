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
  },
  {
    emojis: ["📜", "➰", "🧩"],
    answer: "algorithm",
    letters: ["A", "L", "G", "O", "R", "I", "T", "H", "M", "X", "E"],
    hint: "Step-by-step instructions to solve a problem",
    difficulty: "medium"
  },
  {
    emojis: ["🔐", "🛡️", "🔑"],
    answer: "encryption",
    letters: ["E", "N", "C", "R", "Y", "P", "T", "I", "O", "N", "S"],
    hint: "Securing data from unauthorized access",
    difficulty: "hard"
  },
  {
    emojis: ["🌐", "💻", "🖥️"],
    answer: "network",
    letters: ["N", "E", "T", "W", "O", "R", "K", "A", "X"],
    hint: "Connected computers sharing data",
    difficulty: "medium"
  },
  {
    emojis: ["🗄️", "💾", "📂"],
    answer: "database",
    letters: ["D", "A", "T", "A", "B", "A", "S", "E", "X", "L"],
    hint: "Stores structured information",
    difficulty: "medium"
  },
  {
    emojis: ["🖥️", "⚙️", "🔄"],
    answer: "software",
    letters: ["S", "O", "F", "T", "W", "A", "R", "E", "X"],
    hint: "Programs that run on computers",
    difficulty: "easy"
  },
  {
    emojis: ["📦", "📤", "🌐"],
    answer: "deployment",
    letters: ["D", "E", "P", "L", "O", "Y", "M", "E", "N", "T", "A"],
    hint: "Releasing code to production",
    difficulty: "medium"
  },
  {
    emojis: ["🐛", "🔍", "🛠️"],
    answer: "debugging",
    letters: ["D", "E", "B", "U", "G", "G", "I", "N", "G", "X"],
    hint: "Finding and fixing errors in code",
    difficulty: "medium"
  }
];

export default puzzles;
