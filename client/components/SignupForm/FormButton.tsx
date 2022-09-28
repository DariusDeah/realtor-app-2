import React from "react";

type Props = {
  style: string;
  title: string;
  onClick: (e: any) => void;
};

function FormButton({ style, title, onClick }: Props) {
  return (
    <button className={`btn `} onClick={onClick}>
      {title}
    </button>
  );
}

export default FormButton;
