import useGameAudio from "@/hooks/useGameAudio";

interface LetterPoolProps {
  letters: string[];
  onLetterClick: (letter: string, index: number) => void;
}

const LetterPool: React.FC<LetterPoolProps> = ({ letters, onLetterClick }) => {
  const { play } = useGameAudio();

  return (
    <div className="w-full flex flex-col items-center mt-8 gap-3">
      <p className="text-sm text-gray-500 select-none">
        Tap letters to build the word
      </p>

      <div className="w-full max-w-md p-4 rounded-xl bg-card border shadow-neumorphic flex flex-wrap justify-center gap-4">
        {letters.map((letter, idx) => (
          <button
            key={idx}
            onClick={() => {
              onLetterClick(letter, idx); // pass index
              play("click");
            }}
            className="w-12 h-12 rounded-lg bg-[rgb(249,245,233)] border
              shadow-neumorphic active:shadow-neumorphic-pressed flex
              justify-center items-center uppercase text-lg font-medium transition-shadow
              duration-150"
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LetterPool;
