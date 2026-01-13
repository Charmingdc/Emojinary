# Emojinary

## Overview

![Emojinary Playing Interface](/public/emojinary-screenshot-1.jpg)
![Emojinary Game End Interface](/public/emojinary-screenshot-2.jpg)

Emojinary is a high-performance puzzle application built with TypeScript and React, featuring a robust Node.js backend deployed as Vercel Serverless Functions. It leverages the Groq LPU™ Inference Engine via LangChain to dynamically generate context-aware emoji word puzzles across multiple difficulty tiers and thematic categories.

## Features

- **AI-Driven Generation**: Utilizes Large Language Models to create unique, non-repetitive puzzles based on sixty distinct thematic "flavors."
- **Serverless Architecture**: Implements scalable backend logic using Vercel Node.js functions for on-demand puzzle delivery.
- **Strict Data Integrity**: Employs Zod for runtime schema validation of AI-generated content to ensure application stability.
- **Custom Game Engine**: Features specialized React hooks for puzzle input logic, high-precision timers, and sound management.
- **Responsive Neumorphic UI**: A modern, tactile interface built with Tailwind CSS and Framer Motion for high-quality user engagement.

## Getting Started

### Installation

1. **Clone the Repository**:
   ```bash
   git clone git@github.com:Charmingdc/Emojinary.git
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Start Development Server**:
   ```bash
   npm run dev
   ```

### Environment Variables

To enable AI puzzle generation, you must provide a Groq API key in your environment configuration.

```env
GROQ_API_KEY=gsk_your_actual_key_here
```

## API Documentation

### Base URL

`/api`

### Endpoints

#### GET /generatePuzzles

**Request**:
Query parameters used to define the quantity and complexity of the puzzles.

- `count` (Optional): Integer (Default: 8). The number of puzzles to generate.
- `difficulty` (Optional): "easy" | "medium" | "hard". Forces a specific difficulty level.

**Response**:
Returns a JSON object containing a success flag and an array of puzzle objects.

```json
{
  "success": true,
  "data": [
    {
      "emojis": ["⛴️", "🌊", "🏙️"],
      "letters": ["b", "h", "r", "e", "a", "t", "o", "n", "s", "r"],
      "answer": "harbor",
      "hint": "A safe haven for vessels.",
      "difficulty": "easy"
    }
  ]
}
```

**Errors**:

- 405: Method Not Allowed (If request is not GET)
- 500: Failed to generate puzzles (Internal AI or validation error)

## Usage

Emojinary offers two primary modes of interaction. In **Classic Mode**, users solve a sequence of puzzles generated on-the-fly, earning points based on speed and accuracy. **Daily Mode** provides a curated, singular challenge shared by all users for that calendar day, tracked via local storage. Players can use the "Hint" system to reveal clues at the cost of potential points or "Skip" difficult puzzles in Classic mode.

## Technologies Used

| Technology                                          | Purpose                                        |
| :-------------------------------------------------- | :--------------------------------------------- |
| [TypeScript](https://www.typescriptlang.org/)       | Type-safe application development              |
| [React 19](https://react.dev/)                      | Component-based UI architecture                |
| [LangChain](https://js.langchain.com/)              | AI orchestration and LLM integration           |
| [Groq](https://groq.com/)                           | High-speed LPU inference for puzzle generation |
| [TanStack Query](https://tanstack.com/query/latest) | Asynchronous state management and caching      |
| [Tailwind CSS](https://tailwindcss.com/)            | Utility-first styling and Neumorphic design    |
| [Vite](https://vitejs.dev/)                         | Frontend tooling and build optimization        |
| [Zod](https://zod.dev/)                             | Type-safe schema validation                    |

## Contributing

Contributions are welcome to enhance the puzzle generation algorithms or UI components.

- 💡 Fork the repository and create your branch.
- 🛠️ Ensure all TypeScript types are correctly defined.
- 🧪 Verify that any API changes maintain the existing Zod schema integrity.
- 🚀 Submit a Pull Request with a detailed description of changes.

## Author Info

**Adebayo Muis**

- GitHub: [Charmingdc](https://github.com/Charmingdc)
- Twitter/X: [@Charmingdc01](https://x.com/Charmingdc01)

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)
