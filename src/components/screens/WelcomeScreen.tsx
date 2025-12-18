import useSound from "@/hooks/useSound";
import NavButton from "@/components/ui/NavButton";

interface Route {
  text: string;
  path: string;
}

const routes: Route[] = [
  { text: "Classic", path: "/play/classic" },
  { text: "Daily", path: "/play/daily" },
  { text: "How to Play", path: "/how-to-play" }
];

const WelcomeScreen = () => {
  const { isSoundOn, toggleSound } = useSound();

  return (
    <main className="w-full flex flex-col items-center gap-4 mt-14">
      <h1
        className="inline-block text-center text-accent text-4xl
         [-webkit-text-stroke:2px_rgb(var(--foreground))]
         [text-shadow:4px_4px_8px_rgba(0,0,0,0.3)]
         -rotate-3"
      >
        Solve <br />
        Emoji <br />
        Puzzles!
      </h1>

      <div className="w-full flex flex-col items-center gap-2 mt-16">
        {routes.map(route => (
          <NavButton key={route.path} to={route.path}>
            {route.text}
          </NavButton>
        ))}

        <NavButton onClick={toggleSound}>
          sound: <strong>{isSoundOn ? "on" : "off"}</strong>
        </NavButton>
      </div>
    </main>
  );
};

export default WelcomeScreen;
