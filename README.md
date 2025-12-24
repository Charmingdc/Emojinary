# Emojinary 🧩

## Overview

![Emojinary Playing Interface](/public/emojinary-screenshot-1.jpg)
![Emojinary Game End Interface](/public/emojinary-screenshot-2.jpg)

Emojinary is a full-stack puzzle application built with TypeScript, React, and Node.js. The system leverages Google's Gemini AI via a Vercel serverless backend to dynamically generate word puzzles from emoji sets, featuring real-time validation, scoring algorithms, and persistent state management.

## Features

- **React & TypeScript**: Type-safe frontend architecture utilizing functional components and custom hooks for game logic.
- **Gemini AI Integration**: Server-side puzzle generation using the `gemini-2.5-flash-lite` model for context-aware word-to-emoji mapping.
- **State Management**: Robust local storage integration for high scores, daily completion tracking, and user preferences.
- **Neumorphic UI**: Custom Tailwind CSS implementation featuring tactile shadows and fluid motion animations.
- **Serverless Backend**: Node.js API routes deployed as Vercel functions to handle secure AI orchestration and Zod-validated data schemas.

## Getting Started

### Installation

Follow these steps to set up the development environment locally:

1. **Clone the Repository**

   ```bash
   git clone git@github.com:Charmingdc/Emojinary
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add your API credentials.

4. **Start Development Server**
   ```bash
   npm run dev
   ```

### Environment Variables

The backend requires the following environment variables to communicate with the Google Generative AI API:

| Variable         | Description                   | Example                     |
| :--------------- | :---------------------------- | :-------------------------- |
| `GEMINI_API_KEY` | Your Google AI Studio API key | `AIzaSyB-EXAMPLE-KEY-12345` |

## API Documentation

### Base URL

`https://[your-domain]/api`

### Endpoints

#### GET /generatePuzzles

Generates a set of emoji-based word puzzles using AI.

**Request**:

- **Query Parameters**:
  - `count` (optional): Number of puzzles to generate. Default: 10.
  - `difficulty` (optional): "easy" | "medium" | "hard".

**Response**:

```json
{
  "success": true,
  "data": [
    {
      "emojis": ["🌈", "🌧️", "☀️"],
      "letters": ["r", "a", "i", "n", "b", "o", "w", "z", "x", "c"],
      "answer": "rainbow",
      "hint": "Colorful arc in the sky.",
      "difficulty": "easy"
    }
  ],
  "message": "Puzzles generated successfully"
}
```

**Errors**:

- `405`: Method Not Allowed
- `500`: Failed to generate puzzles (AI service or validation error)

## Usage

Emojinary offers two primary modes of play:

- **Classic Mode**: A continuous stream of puzzles where difficulty scales and players aim for the highest score.
- **Daily Challenge**: A synchronized daily puzzle available to all users once every 24 hours.

The game uses a points-based system calculated by `(Base Points + Time Bonus) - Hint Penalties`. Users can toggle sound effects and vibration feedback for an immersive experience.

## Technologies Used

| Category      | Tools                                                                                                |
| :------------ | :--------------------------------------------------------------------------------------------------- |
| **Frontend**  | [React](https://react.dev/), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/)   |
| **Backend**   | [Node.js](https://nodejs.org/), [Vercel Functions](https://vercel.com/docs/functions)                |
| **AI**        | [Google Gemini AI](https://ai.google.dev/)                                                           |
| **Libraries** | [Zod](https://zod.dev/), [TanStack Query](https://tanstack.com/query), [Motion](https://motion.dev/) |
| **Icons**     | [Lucide](https://lucide.dev/), [Phosphor Icons](https://phosphoricons.com/)                          |

## Contributing

Contributions are welcome to help improve Emojinary!

- 📥 **Pull Requests**: Please create a new branch for any feature or bug fix.
- 🐛 **Issues**: Report bugs or suggest features via the GitHub issues tab.
- 🎨 **Styling**: Ensure any UI changes adhere to the existing neumorphic design system.

## Author Info

**Adebayo Muis**

- Twitter: [@Charmingdc01](https://x.com/Charmingdc01)
- GitHub: [Charmingdc](https://github.com/Charmingdc)

---

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)
