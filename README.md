# 🧩 Emojinary: Solve Emoji Puzzles!

## Overview
Emojinary is a fun and engaging web-based puzzle game where players decipher words from a series of emojis. Built with **React** and **TypeScript** using **Vite**, the application offers a seamless and interactive experience with visually appealing animations and responsive design powered by **Tailwind CSS**.

## Features
-   **Classic Mode**: Tackle a curated set of emoji puzzles, testing your vocabulary and wit against a timer.
-   **Daily Mode**: A fresh challenge every day to keep the fun going.
-   **Interactive UI**: Intuitive drag-and-drop or tap interface for selecting letters and forming answers.
-   **Hints System**: Stuck on a puzzle? Use a hint to nudge you in the right direction (with a small score penalty!).
-   **Dynamic Letter Pool**: Letters are shuffled and presented for each puzzle, ensuring variety.
-   **Scoring System**: Earn points based on correct answers, remaining time, and hint usage.
-   **Sound Controls**: Toggle in-game sounds and haptic feedback for a personalized experience.
-   **Responsive Design**: Enjoy the game across various devices, from desktops to mobile phones.

## Getting Started
To get Emojinary up and running on your local machine, follow these simple steps.

### Installation
1.  **Clone the repository**:
    ```bash
    git clone git@github.com:Charmingdc/Emojinary
    ```
2.  **Navigate into the project directory**:
    ```bash
    cd Emojinary
    ```
3.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```
4.  **Start the development server**:
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    ✨ The application will be accessible at `http://localhost:5173` (or another port if 5173 is in use).

### Environment Variables
This project does not require any specific environment variables beyond the standard ones handled by Vite for client-side applications.

## Usage
Emodinary offers a straightforward and enjoyable gameplay experience. Here's how to play:

1.  **Welcome Screen**: Upon launching the game, you'll be greeted by the welcome screen. Here, you can choose your desired game mode:
    *   **Classic Mode**: Play through a series of pre-defined puzzles.
    *   **Daily Mode**: (Coming soon/placeholder as per code) A new puzzle challenge each day.
    *   **How to Play**: (Placeholder as per code) Detailed instructions on gameplay.
    *   **Sound Toggle**: Switch game sounds on or off.

2.  **Playing a Puzzle**:
    *   Each puzzle presents a set of emojis in the "Puzzle Box". Your goal is to combine their meanings to form a single word.
    *   Below the emojis, you'll see "Answer Slots" – empty spaces representing the letters of the answer.
    *   The "Letter Pool" provides a collection of letters you can use. Tap on letters to place them into the empty answer slots.
    *   If you make a mistake, tap on a letter in an answer slot to remove it.

3.  **Game Controls**:
    *   **Sound Toggle**: Mute or unmute game audio.
    *   **Hint Button**: Tap the lightbulb icon to reveal a hint for the current puzzle. Using a hint will affect your final score.
    *   **Skip Button**: If you're stuck, use the skip button to move to the next puzzle. This will count the current puzzle as unsolved.

4.  **Scoring and Timer**:
    *   A timer is active for each puzzle, adding urgency to your guesses.
    *   Points are awarded based on the puzzle's difficulty, how quickly you solve it, and whether you used a hint.

5.  **Game Progression**:
    *   Solve a puzzle correctly, and you'll automatically advance to the next.
    *   The game tracks your overall score and progress through the puzzle set.

## Technologies Used

| Category   | Technology                                                                                                  | Description                                                                  |
| :--------- | :---------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------- |
| **Frontend** | [React](https://react.dev/)                                                                                 | A JavaScript library for building user interfaces.                           |
|            | [TypeScript](https://www.typescriptlang.org/)                                                               | Strongly typed superset of JavaScript that compiles to plain JavaScript.     |
|            | [Vite](https://vitejs.dev/)                                                                                 | Next-generation frontend tooling for a fast development experience.          |
|            | [Tailwind CSS](https://tailwindcss.com/)                                                                    | A utility-first CSS framework for rapidly building custom designs.           |
|            | [React Router DOM](https://reactrouter.com/en/main)                                                         | Declarative routing for React applications.                                  |
| **State/Data** | [@tanstack/react-query](https://tanstack.com/query/latest)                                                | Powerful asynchronous state management for React.                            |
| **UI/UX**  | [@phosphor-icons/react](https://phosphoricons.com/)                                                         | Flexible icon family for interfaces.                                         |
|            | [Lucide React](https://lucide.dev/)                                                                         | Beautifully simple and consistent icon toolkit.                              |
|            | [Motion](https://www.framer.com/motion/)                                                                    | A production-ready animation library for React.                              |
| **Linting**| [ESLint](https://eslint.org/)                                                                               | Pluggable JavaScript linter.                                                 |
| **Build Tools**| [Autoprefixer](https://github.com/postcss/autoprefixer)                                                   | PostCSS plugin to parse CSS and add vendor prefixes to CSS rules.            |
|            | [PostCSS](https://postcss.org/)                                                                             | A tool for transforming CSS with JavaScript plugins.                         |

## Contributing
We welcome contributions to Emojinary! If you'd like to improve the game, here's how you can help:

*   💡 **Suggest Features**: Have an idea for a new game mode or a cool new feature? Open an issue to discuss it.
*   🐛 **Report Bugs**: Encountered a bug? Please open an issue with detailed steps to reproduce it.
*   🛠️ **Submit Pull Requests**: Feel free to fork the repository, make your changes, and submit a pull request. Please ensure your code adheres to the existing style and conventions.

## License
This project is not currently covered by an open-source license. All rights reserved.

## Author Info
- **Charmingdc**
  - [Twitter](https://x.com/Charmingdc01)
  - [LinkedIn](https://linkedin.com/in/charmingdc) (Placeholder)
  - [Portfolio](https://charmingdc.com) (Placeholder)

---
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)