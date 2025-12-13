import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import PlayPage from "@/pages/PlayPage";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<PlayPage />} />
        <Route path="/play/:mode" element={<PlayPage />} />
      </Route>
    </Routes>
  );
};

export default App;
