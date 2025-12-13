import React from "react";
import { useNavigate } from "react-router-dom";
import useGameAudio from "@/hooks/useGameAudio";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  wrapperClassName?: string;
  className?: string;
  to?: string;
};

const NavButton: React.FC<ButtonProps> = ({
  wrapperClassName = "",
  className = "",
  children,
  to,
  ...props
}) => {
  const { play } = useGameAudio();
  const navigate = useNavigate();

  const defaultClasses = `
    w-full bg-primary py-4 px-6 rounded-xl
    shadow-xl hover:shadow-2xl active:shadow-none active:scale-95 transition-all duration-150
  `;

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = e => {
    play("click");

    if (to) setTimeout(() => navigate(to), 50);

    props.onClick?.(e);
  };

  return (
    <div
      className={`w-40 flex items-center justify-center bg-accent p-2 rounded-2xl -rotate-3 ${wrapperClassName}`}
    >
      <button
        {...props}
        onClick={handleClick}
        className={`${defaultClasses} ${className}`}
      >
        {children}
      </button>
    </div>
  );
};

export default NavButton;
