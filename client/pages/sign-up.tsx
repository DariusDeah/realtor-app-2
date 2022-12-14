import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import AuthCard from "../components/AuthCard";
import Header from "../components/Header";
import SignupForm from "../components/SignupForm/Signup-Form";

type Props = {};

function Signup({}: Props) {
  const router = useRouter();
  return (
    <div className="lg:flex ">
      <section>
        <Header />
      </section>
      <div className="flex w-full flex-col justify-center items-center">
        <div className=" flex justify-center items-end mt-5">
          <img
            className="object-contain w-20 h-20"
            src="https://cdn-icons-png.flaticon.com/512/2159/2159323.png"
          />
          <div>
            <h1 className="text-4xl font-semibold">Pillow</h1>
            <p>where you rest your head</p>
          </div>
        </div>
        {/* TODO only the form component should be in the sign up form */}
        <div className="my-10 ">
          <AuthCard>
            <SignupForm />
          </AuthCard>
        </div>
      </div>
    </div>
  );
}

export default Signup;
