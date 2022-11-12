import { NextPage } from "next";
import Image from "next/image";
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
            <div className="flex ">
              <div className="w-1/3 h-[70vh] relative">
                <Image
                  layout="fill"
                  objectFit="cover"
                  src="https://images.unsplash.com/photo-1505819244306-ef53954f9648?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=699&q=80"
                />
              </div>
              <div className="flex-1 lg:mx-20">
                <SignupForm />
              </div>
            </div>
          </AuthCard>
        </div>
      </div>
    </div>
  );
}

export default Signup;
