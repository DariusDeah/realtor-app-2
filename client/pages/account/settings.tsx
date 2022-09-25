import React, { useEffect } from "react";
import Header from "../../components/Header";
import { useAppSelector } from "../../redux";
import { selectUser } from "../../redux/user.reducer";

type Props = {};

function settings({}: Props) {
  const user = useAppSelector(selectUser);
  useEffect(() => {
    console.log("settings");
  }, []);
  return (
    <div className="lg:flex">
      <Header />
      <section className="w-full flex flex-col items-center space-y-10">
        <div className="w-full flex flex-col  items-center mt-6 space-y-6 ">
          <h1 className="text-4xl font-semibold text-center  "> My Settings</h1>

          <div className="rounded-md flex text-white lg:w-2/5 justify-between bg-black p-3   ">
            <span className="flex items-center space-x-3 ">
              <img
                className="w-14 h-16 rounded-full"
                src={
                  user.user.photoUrl ||
                  "https://images.unsplash.com/photo-1536164261511-3a17e671d380?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=982&q=80"
                }
                alt="avatar"
              />
              <span>
                <p className="text-xl font-semibold">
                  Tommy Gennin{user.user.fullName}
                </p>
                <p>Dommy@gmail.com</p>
              </span>
              <p>{user.user.membershipStatus}</p>
            </span>
            <button className=" w-fit">Logout</button>
          </div>
        </div>

        <div className="w-full flex flex-col  items-center space-y-3  ">
          <h1 className="text-4xl font-semibold ">Location </h1>
          <div className="rounded-md  grid lg:grid-cols-3 grid-cols-2 lg:flex-col lg:w-2/5 justify-between bg-black p-3 ">
            <span>
              <label htmlFor="">Address</label>
              <input
                type="text"
                value="8966 w candlebrook way"
                className="input"
              />
            </span>
            <span>
              <label htmlFor="city">City</label>
              <input type="text" value="Eugene" className="input" id="city" />
            </span>
            <span>
              <label htmlFor="state">State</label>
              <input type="text" value="Oregon" className="input" id="state" />
            </span>
          </div>
        </div>

        <h1 className="text-4xl font-semibold">Preferences</h1>
        <div className="rounded-md flex text-white lg:w-2/5 w-full justify-between bg-black p-3">
          <div className="btn-group ">
            <button className="btn-square btn hover:bg-white ">Light☀️</button>
            <button className="btn-square btn hover:bg-white">Dark🌙</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default settings;
