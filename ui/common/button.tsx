import { ListButton, Preloader } from "konsta/react";
import * as React from "react";

interface ButtonProps {
  type?: string;
  text: string;
  textLoading?: string;
  onClick?: () => void;
  isLoading?: boolean;
}

export const Button = ({
  type = "button",
  text,
  textLoading,
  onClick,
  isLoading,
}: ButtonProps) => {
  return (
    <ListButton onClick={isLoading ? undefined : onClick} type={type}>
      {isLoading && <Preloader size="w-5 h-5" className="mr-0.5" />}
      <span>{isLoading ? textLoading : text}</span>
    </ListButton>
  );
};
