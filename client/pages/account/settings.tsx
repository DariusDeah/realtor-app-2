import React, { useEffect } from "react";
import Header from "../../components/Header";

type Props = {};

function settings({}: Props) {
  useEffect(() => {
    console.log("settings");
  }, []);
  return (
    <div className="flex">
      <Header />
      <section className="w-full">
        <h1 className="text-white text-4xl font-semibold text-center bg-red-400 ">
          {" "}
          My Settings
        </h1>
        <div className="btn-group ">
          <button className="btn-square btn hover:bg-white ">Light☀️</button>
          <button className="btn-sqaure btn hover:bg-white">Dark🌙</button>
        </div>
      </section>
    </div>
  );
}

export default settings;
