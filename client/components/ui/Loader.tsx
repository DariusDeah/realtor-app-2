import React from "react";

type Props = {};

function Loader({}: Props) {
  return (
    <div className="w-full flex flex-col justify-center items-center absolute  bottom-1/2">
      <img
        src="https://cdn.dribbble.com/users/93860/screenshots/9710223/media/dfa76676fcbb139505556fd75b40de69.gif"
        alt=""
        className="lg:w-56 w-40 "
      />
      <h1 className="text-2xl font-semibold tracking-widest">
        {" "}
        <span className="bg-indigo-400"> Load </span>ing...
      </h1>
    </div>
  );
}

export default Loader;
