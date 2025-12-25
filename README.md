# Emojinary 🧩

## Overview

![Emojinary Playing Interface](/public/emojinary-screenshot-1.jpg)
![Emojinary Game End Interface](/public/emojinary-screenshot-2.jpg)

Emojinary is a high-performance, full-stack puzzle application that leverages Large Language Models (LLMs) to generate dynamic, emoji-based brain teasers. By orchestrating a Vite-powered React frontend with a serverless Node.js backend, the project delivers a seamless, type-safe gaming experience focused on cognitive engagement and interactive design.

## Features

- AI Puzzle Generation: Utilizing the Groq Llama-3.1-8B model to synthesize unique word-based emoji clues on demand.
- Daily & Classic Game Modes: Architected systems for persistent daily challenges and endless procedurally generated sessions.
- Neumorphic UI Design: A sophisticated, tactile interface built with Tailwind CSS, featuring custom animations and responsive layouts.
- Advanced Scoring Engine: Real-time point calculation logic based on difficulty multipliers, time remaining, and hint penalties.
- State Persistence: Robust local storage integration for tracking high scores and daily participation status.

## Getting Started

### Installation

- **Clone the Repository**:
  ```bash
  git clone git@github.com:Charmingdc/Emojinary
  ```
- **Install Dependencies**:
  ```bash
  npm install
  ```
- **Start Development Server**:
  ```bash
  npm run dev
  ```

### Environment Variables

To enable AI puzzle generation, you must provide a Groq API key in your environment configuration:

- `GROQ_API_KEY`: Your API key from the Groq Cloud Console. (Example: `gsk_7jR...`)

# Emojinary API

## Overview

Serverless API architecture built with TypeScript and Vercel Functions. The backend utilizes LangChain and Zod for structured AI output, ensuring all generated puzzles adhere to strict data schemas before reaching the client.

## Features

- LangChain/Groq: Handles LLM inference and prompt orchestration.
- Zod: Validates AI-generated JSON payloads for runtime safety.
- Vercel Serverless: Scalable, event-driven endpoint execution.

## API Documentation

### Base URL

`/api`

### Endpoints

#### GET /generatePuzzles

**Request**:
The endpoint accepts query parameters to customize the puzzle generation batch.

- `count`: (Optional) Integer. Specifies the number of puzzles to return (Default: 10).
- `difficulty`: (Optional) String. Filters generation complexity. Options: `easy`, `medium`, `hard`.

**Response**:

```json
{
  "success": true,
  "data": [
    {
      "emojis": ["🍎", "🥧"],
      "letters": ["a", "p", "p", "l", "e", "p", "i", "e", "s", "w"],
      "answer": "applepie",
      "hint": "A classic American dessert",
      "difficulty": "easy"
    }
  ]
}
```

**Errors**:

- 405: Method Not Allowed (Only GET requests are accepted)
- 500: Failed to generate puzzles (Occurs during AI service timeouts or schema validation failures)

## Usage

### Game Modes

- **Classic Mode**: Solve a series of 10 AI-generated puzzles. Manage your time effectively to maximize your score and set a new personal record.
- **Daily Mode**: Compete in a single, high-difficulty puzzle shared by all users for the day. Once completed, the countdown timer tracks the availability of the next challenge.

### Gameplay Mechanics

- **Building Words**: Tap letters from the pool to fill answer slots. You can remove a letter by tapping the slot again.
- **Utilizing Hints**: If stuck, the hint button reveals a clue about the phrase. Use this sparingly, as it applies a point penalty to your final score.
- **Timer System**: Each difficulty level provides a specific window of time. Solving puzzles quickly grants a significant time bonus.

## Technologies Used

| Technology                                          | Purpose                                      |
| :-------------------------------------------------- | :------------------------------------------- |
| [React 19](https://react.dev/)                      | Component-based UI architecture              |
| [TypeScript](https://www.typescriptlang.org/)       | End-to-end type safety                       |
| [Groq Cloud](https://groq.com/)                     | Llama 3.1 LLM inference                      |
| [TanStack Query](https://tanstack.com/query/latest) | Asynchronous state management and caching    |
| [Tailwind CSS](https://tailwindcss.com/)            | Utility-first styling and neumorphic design  |
| [Framer Motion](https://www.framer.com/motion/)     | Smooth UI transitions and micro-interactions |
| [Vite](https://vitejs.dev/)                         | Modern frontend tooling and bundling         |

## Contributing

We welcome contributions that improve the gameplay experience or optimize the AI prompt engineering.

- 🍴 Fork the repository.
- 🌿 Create a feature branch: `git checkout -b feature/AmazingFeature`.
- 💾 Commit your changes: `git commit -m 'Add some AmazingFeature'`.
- 🚀 Push to the branch: `git push origin feature/AmazingFeature`.
- 📝 Open a Pull Request for review.

## Author Info

**Adebayo Muis**

- GitHub: [Charmingdc](https://github.com/Charmingdc)
- Twitter: [@Charmingdc01](https://x.com/Charmingdc01)

---

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![AI](https://img.shields.io/badge/AI-Groq%20Llama%203.1-orange?style=for-the-badge)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)
