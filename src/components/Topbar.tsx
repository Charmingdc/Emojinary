import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Github, Twitter } from "lucide-react";

const Topbar = () => {
  const navigate = useNavigate();
  return (
    <ul className="w-screen flex flex-row items-center justify-between bg-background border-b px-4 pt-5 pb-3">
      <li onClick={() => navigate("/")}>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          style={{ transformOrigin: "left" }}
          className="overflow-hidden inline-block"
        >
          <h1 className="text-2xl"> Emojinary </h1>
        </motion.div>
      </li>

      <li className="flex items-center justify-center gap-3 text-xs font-extralight -mt-1">
        <a
          key="github"
          href="https://github.com/Charmingdc/Emojinary"
          target="_blank"
          className="flex items-center gap-2 p-2 border rounded-full text-xs"
        >
          <Github size={14} /> Star on Github
        </a>

        <a
          key="twitter"
          href="https://x.com/Charmingdc01"
          target="_blank"
          className="text-xs"
        >
          <Twitter size={19} />
        </a>
      </li>
    </ul>
  );
};

export default Topbar;
