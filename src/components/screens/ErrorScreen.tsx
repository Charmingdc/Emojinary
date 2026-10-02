import { useNavigate } from "react-router-dom";
import { GameButton, Panel } from "@/components/ui/GamePrimitives";

type ErrorScreenProps = {
  message?: string;
};

const errorMessages = [
  "Oops! Something went wrong",
  "Puzzle generation failed",
  "Well, this is awkward…",
  "Couldn’t fetch your puzzle",
];

const ErrorScreen = ({ message }: ErrorScreenProps) => {
  const navigate = useNavigate();

  const randomMessage =
    message || errorMessages[Math.floor(Math.random() * errorMessages.length)];

  return (
    <main className="fixed inset-0 flex h-svh w-full items-center justify-center bg-background p-6 text-center">
      <Panel className="flex w-full max-w-md flex-col items-center gap-5 p-8">
        <h2 className="text-2xl">{randomMessage}</h2>
        <div className="flex w-full flex-col gap-3">
          <GameButton
            className="w-full"
            onClick={() => window.location.reload()}
          >
            Retry
          </GameButton>
          <GameButton
            variant="neutral"
            className="w-full"
            onClick={() => navigate("/")}
          >
            Home
          </GameButton>
        </div>
      </Panel>
    </main>
  );
};

export default ErrorScreen;
