import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

const HomeNavBtn: React.FC<ButtonProps> = ({
  className = "",
  children,
  ...props
}) => {
  const defaultClasses = `
    w-full bg-primary py-4 px-6 rounded-xl
    shadow-xl hover:shadow-2xl active:shadow-none active:border active:scale-95  transition-all duration-150
  `;

  return (
    <button className={`${defaultClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default HomeNavBtn;
