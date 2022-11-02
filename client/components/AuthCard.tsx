import React from "react";

type Props = {
  children: JSX.Element[] | JSX.Element;
};

function AuthCard({ children }: Props) {
  return (
    <div className=" border-2 lg:max-w-screen-lg w-screen rounded-lg lg:mx-4  max-h-screen">
      {children}
    </div>
  );
}

export default AuthCard;
