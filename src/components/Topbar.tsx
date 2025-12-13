import { useNavigate } from "react-router-dom";
import { Github, Twitter } from "lucide-react";

const socials = [
  { icon: Github, url: "https://github.com/Charmingdc/Emojinary" },
  { icon: Twitter, url: "https://x.com/Charmingdc01" }
];

const Topbar = () => {
  const navigate = useNavigate();
  return (
    <ul className="w-screen flex flex-row items-center justify-between bg-background border-b px-4 pt-5 pb-3">
      <li onClick={() => navigate("/")}>
        <h1 className="text-2xl"> Emojinary </h1>
      </li>

      <li className="flex items-center justify-center gap-4 -mt-1">
        {socials.map(social => {
          const Icon = social.icon;

          return (
            <a key={social.url} href={social.url} target="_blank">
              <Icon />
            </a>
          );
        })}
      </li>
    </ul>
  );
};

export default Topbar;
