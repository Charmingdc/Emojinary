import { useNavigate } from "react-router-dom";
import useSound from "@/hooks/useSound";
import HomeNavBtn from "@/components/ui/HomeNavBtn";

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
  const navigate = useNavigate();
  const [isSoundOn, toggleSound] = useSound();

  return (
    <main className="w-full flex flex-col items-center gap-4 mt-14">
      <h1
        className="inline-block text-center text-accent text-4xl
      [-webkit-text-stroke:2px_rgb(var(--foreground))] transform scale-x-110 -rotate-3"
      >
        Emoji <br /> Guessing <br /> Game
      </h1>

      <div className="w-full flex flex-col items-center gap-2 mt-16">
        {routes.map(route => (
          <div
            key={route.path}
            className="w-40 flex items-center justify-center bg-accent p-2 rounded-2xl -rotate-3"
          >
            <HomeNavBtn onClick={() => navigate(`${route.path}`)}>
              {route.text}
            </HomeNavBtn>
          </div>
        ))}

        <div className="w-40 flex items-center justify-center bg-accent p-2 rounded-2xl -rotate-3">
          <HomeNavBtn onClick={toggleSound}>
            sound: <strong> {isSoundOn ? "on" : "off"}</strong>
          </HomeNavBtn>
        </div>
      </div>
    </main>
  );
};

export default WelcomeScreen;
