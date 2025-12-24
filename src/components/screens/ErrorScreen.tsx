import { useNavigate } from "react-router-dom";

type ErrorScreenProps = {
  message?: string;
};

const errorMessages = [
  "Oops! Something went wrong",
  "Puzzle generation failed",
  "Well, this is awkward…",
  "Couldn’t fetch your puzzle"
];

const ErrorScreen = ({ message }: ErrorScreenProps) => {
  const navigate = useNavigate();

  const randomMessage =
    message || errorMessages[Math.floor(Math.random() * errorMessages.length)];

  return (
    <div className="w-full h-screen fixed top-0 flex flex-col items-center justify-center px-6 -pt-6 text-center gap-6 bg-red-50">
      <div className="text-7xl animate-bounce -mt-20 mb-6"> 🤹 </div>

      <h2 className="w-[80%] text-2xl font-semibold">{randomMessage}</h2>

      <div className="w-full flex items-center justify-center flex-wrap gap-2">
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-10 py-4 bg-red-500 text-white rounded-xl shadow-[4px_4px_0px_rgb(254,202,202)] active:shadow-[inset_6px_6px_2px_rgb(254,202,202),inset_-1px_-1px_2px_rgb(254,202,202)] transition"
        >
          Retry
        </button>

        <button
          onClick={() => navigate("/")}
          className="mt-4 px-10 py-4 bg-primary rounded-xl shadow-[4px_4px_0px_rgb(138,235,230)] active:shadow-[inset_6px_6px_2px_rgb(138,235,230),inset_-1px_-1px_2px_rgb(138,235,230)] transition"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default ErrorScreen;
