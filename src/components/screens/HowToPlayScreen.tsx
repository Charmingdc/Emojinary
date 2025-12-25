import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

const container = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 }
};

const HowToPlayScreen = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="min-h-screen px-4 py-6 space-y-10 text-sm"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div
        variants={item}
        className="flex items-center justify-between border-b"
      >
        <h1 className="text-2xl font-semibold">How to Play</h1>
        <button onClick={() => navigate(-1)} className="opacity-70 underline">
          Back
        </button>
      </motion.div>

      {/* Goal */}
      <motion.section variants={item} className="space-y-2">
        <h2 className="text-lg font-semibold">🧩 The Goal</h2>
        <p className="opacity-80">
          Guess the <strong>hidden word</strong> using emoji clues. Each puzzle
          has exactly one correct answer.
        </p>
      </motion.section>

      {/* Emojis */}
      <motion.section variants={item} className="space-y-2">
        <h2 className="text-lg font-semibold">🔍 Read the Emojis</h2>
        <p className="opacity-80">
          Emojis describe an idea or concept. Think about what they mean{" "}
          <strong>together</strong>.
        </p>
      </motion.section>

      {/* Letters */}
      <motion.section variants={item} className="space-y-2">
        <h2 className="text-lg font-semibold">🔤 Build the Word</h2>
        <ul className="list-disc pl-5 opacity-80 space-y-1">
          <li>Select letters from the pool</li>
          <li>Letters fill the empty slots</li>
          <li>Tap a filled slot to remove a letter</li>
          <li>Some letters are distractions</li>
        </ul>
      </motion.section>

      {/* Timer */}
      <motion.section variants={item} className="space-y-2">
        <h2 className="text-lg font-semibold">⏱️ Time Matters</h2>
        <p className="opacity-80">Solving faster earns more points.</p>
      </motion.section>

      {/* Hints */}
      <motion.section variants={item} className="space-y-2">
        <h2 className="text-lg font-semibold">💡 Hints</h2>
        <p className="opacity-80">
          Hints help — but <strong>reduce your score</strong>.
        </p>
      </motion.section>

      {/* Scoring */}
      <motion.section variants={item} className="space-y-2">
        <h2 className="text-lg font-semibold">⭐ Scoring</h2>
        <ul className="list-disc pl-5 opacity-80 space-y-1">
          <li>More time left = more points</li>
          <li>No hints = higher score</li>
          <li>Harder puzzles give bonus points</li>
        </ul>
      </motion.section>

      {/* Modes */}
      <motion.section variants={item} className="space-y-2">
        <h2 className="text-lg font-semibold">🕹️ Game Modes</h2>

        <p className="opacity-80">
          <strong>Classic:</strong> Multiple puzzles per session
        </p>
        <p className="opacity-80">
          <strong>Daily:</strong> One shared puzzle per day
        </p>
      </motion.section>

      {/* CTA */}
      <motion.button
        variants={item}
        whileTap={{ scale: 0.96 }}
        onClick={() => navigate("/play")}
        className="w-full mt-6 py-4 rounded-xl bg-card text-card-foreground font-semibold shadow-neumorphic"
      >
        Start Playing!
      </motion.button>
    </motion.div>
  );
};

export default HowToPlayScreen;
