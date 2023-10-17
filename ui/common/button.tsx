import { ListButton, Preloader } from "konsta/react";
import * as React from "react";

interface ButtonProps {
  type?: string;
  text: string;
  textLoading?: string;
  isLoading?: boolean;
  isFetching?: boolean;
  onClick?: () => void;
}

export const Button = ({
  type = "button",
  text,
  textLoading,
  isLoading,
  isFetching,
  onClick,
}: ButtonProps) => {
  return (
    <ListButton
      onClick={isLoading || isFetching ? undefined : onClick}
      type={type}
    >
      {(isLoading || isFetching) && (
        <Preloader size="w-5 h-5" className="mr-0.5" />
      )}
      {!isFetching && <span>{isLoading ? textLoading : text}</span>}
    </ListButton>
  );
};
