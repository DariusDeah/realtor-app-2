import React from "react";

type Props = {
  style?: string;
  title: string;
  onClick?: (e: any) => void;
  disabled?: boolean;
};

function FormButton({ style, title, onClick, disabled }: Props) {
  return disabled ? (
    <button
      aria-disabled
      disabled
      className={` btn btn-primary text-white btn-sm lg:btn-md  ${style} `}
      onClick={onClick}
    >
      {title}
    </button>
  ) : (
    <button
      className={` btn btn-primary text-white btn-sm lg:btn-md  ${style} `}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default FormButton;
