import { useParams } from "react-router-dom";
import NoModeScreen from "@/components/NoModeScreen";
import InvalidModeScreen from "@/components/InvalidModeScreen";

const PlayPage = () => {
  const { mode } = useParams<{ mode?: string }>();

  if (!mode) return <NoModeScreen />;

  if (mode === "classic") return <h1>Classic Game</h1>;
  if (mode === "daily") return <h1>Daily Mode</h1>;

  return <InvalidModeScreen />;
};

export default PlayPage;
