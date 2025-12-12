import { Github } from "lucide-react";

const socials = [
  { icon: Github, url: "https://github.com/Charmingdc/Emojinary" }
];

const Topbar = () => {
  return (
    <ul className="w-screen flex flex-row items-center justify-between bg-background border-b px-4 pt-5 pb-3">
      <li>
        <h1 className="text-2xl"> Emojinary </h1>
      </li>

      <li className="flex items-center justify-center gap-2 -mt-1">
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
