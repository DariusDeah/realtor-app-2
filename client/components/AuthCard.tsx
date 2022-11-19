import React from "react";

type Props = {
  children: JSX.Element[] | JSX.Element;
};

function AuthCard({ children }: Props) {
  return (
    <div className="border-[2px]  lg:max-w-screen-xl w-screen rounded-3xl lg:mx-4  max-h-full shadow-lg ">
      {children}
    </div>
  );
}

export default AuthCard;
