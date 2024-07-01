import clsx from "clsx";
import { MouseEventHandler } from "react";

interface IconButtonProps {
  icon: React.ReactElement;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  className?: string;
  name?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  className,
  name,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "rounded-full bg-white p-2 flex items-center justify-center border shadow-md hover:scale-110 transition",
        className
      )}
    >
      {icon}
      {name && <span className="sr-only">{name}</span>}
    </button>
  );
};

export default IconButton;
