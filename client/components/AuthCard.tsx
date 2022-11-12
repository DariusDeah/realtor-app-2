import React from "react";

type Props = {
  children: JSX.Element[] | JSX.Element;
};

function AuthCard({ children }: Props) {
  return (
    <div className="border-[2px]  lg:max-w-screen-xl w-screen rounded-lg lg:mx-4  max-h-screen shadow-lg">
      {children}
    </div>
  );
}

export default AuthCard;
