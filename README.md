# Emojinary 🧩

## Description

![Emojinary Playing Interface](/public/emojinary-screenshot-1.jpg)
![Emojinary Game End Interface](/public/emojinary-screenshot-2.jpg)

Emojinary is a high-performance, AI-driven puzzle game that challenges players to decode hidden words from a sequence of emojis. Built with **TypeScript** and **React**, it leverages the **Groq AI** model to dynamically generate unique puzzles across varying difficulty levels. The project features a refined neubrutalist UI, custom sound effects, and persistent progress tracking, providing an immersive experience for word-game enthusiasts.

# Emojinary API

## Overview

A Node.js backend hosted via Vercel Serverless Functions that interfaces with the Groq AI model to generate contextually relevant word puzzles.

## Features

- LangChain / Groq AI: Dynamic puzzle and hint generation
- Zod: Strict schema validation for AI responses
- Vercel Functions: Serverless API deployment
- Custom Logic: Flavor-based thematic randomization

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:Charmingdc/Emojinary.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Add your Groq key to `.env` as shown below, then run the app and its API functions with Vercel CLI:
   ```bash
   npx vercel dev
   ```

`npm run dev` starts Vite only. Its `/api` requests are proxied to `localhost:3000`, so puzzle generation fails unless the Vercel Functions development server is running there.

### Environment Variables

Create a `.env` file in the root directory and include:

```env
GROQ_API_KEY=your_groq_api_key_here
```

## API Documentation

### Base URL

`/api`

### Endpoints

#### GET /generatePuzzles

**Request**:
Query Parameters:

- `count` (required): Number of puzzles to generate (e.g., 8)
- `difficulty` (required): Skill level. Options: `easy`, `medium`, `hard`, `random`

**Response**:

```json
{
  "success": true,
  "data": [
    {
      "emojis": ["⛴️", "🌊", "🏙️"],
      "letters": ["h", "a", "r", "b", "o", "r", "s", "x", "p"],
      "answer": "harbor",
      "hint": "A safe haven for vessels.",
      "difficulty": "easy"
    }
  ],
  "difficulty": "easy"
}
```

**Errors**:

- 405: Method Not Allowed
- 500: Failed to generate puzzles (AI provider or parsing error)

## Game Features

- **Classic Mode**: A continuous gauntlet of puzzles where players aim for the highest score based on speed and accuracy.
- **Daily Challenge**: A synchronized puzzle shared by all users worldwide, resetting every 24 hours.
- **Difficulty Scaling**: Intelligent point calculation that rewards players for harder challenges and penalizes for using hints.
- **Interactive UI**: A neumorphic design system with smooth animations powered by Framer Motion.
- **Audio System**: Context-aware sound effects for correct guesses, errors, and interface interactions.
- **Progress Tracking**: Local storage integration to save high scores and track daily completion status.

## Technologies Used

| Technology            | Purpose                                          |
| :-------------------- | :----------------------------------------------- |
| **React 19**          | Frontend library for building the user interface |
| **TypeScript**        | Type-safe development across the stack           |
| **Tailwind CSS**      | Utility-first styling and neumorphic design      |
| **TanStack Query**    | Asynchronous state management and API caching    |
| **Groq AI**           | Large Language Model (LLM) for puzzle generation |
| **Framer Motion**     | Advanced UI animations and transitions           |
| **Lucide / Phosphor** | Iconography system                               |
| **Vite**              | Frontend build tool and development server       |

## Usage

### Playing the Game

1. **Choose a Mode**: Select "Classic" for a quick session or "Daily" for the global challenge.
2. **Decode Emojis**: Analyze the emoji sequence displayed in the center of the screen.
3. **Select Letters**: Tap the letters from the pool to fill the answer slots.
4. **Use Hints**: If stuck, use the lightbulb icon, but be aware this reduces your potential score for that round.
5. **Share**: Upon completion, use the share feature to copy your stats and challenge friends.

## Contributing

Contributions are what make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

- Fork the Project.
- Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
- Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
- Push to the Branch (`git push origin feature/AmazingFeature`).
- Open a Pull Request.

## Author Info

- **Adebayo Muis**
- Twitter: [@Charmingdc01](https://x.com/Charmingdc01)
- GitHub: [Charmingdc](https://github.com/Charmingdc)

---

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)
