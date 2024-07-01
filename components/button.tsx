"use client";
import clsx from "clsx";

interface buttonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<buttonProps> = ({
  type,
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        "flex justify-center rounded-md px-3 py-2 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 capitalize hover:bg-gray-900 hover:text-white transition",
        disabled && "opacity-50 cursor-default",
        fullWidth && "w-full",
        secondary
          ? "text-gray-900 border border-input transition hover:bg-gray-900 hover:text-white hover:border-white dark:text-accent-1 dark:bg-primary"
          : "text-white",
        danger &&
          "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
        !secondary &&
          !danger &&
          "bg-gray-950 hover:bg-gray-900 hover:opacity-85 focus-visible:outline-gray-900",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
