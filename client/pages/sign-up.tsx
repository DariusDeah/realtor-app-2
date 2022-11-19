import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
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
        {/* TODO only the form component should be in the sign up form */}
        <div className="my-10 ">
          <AuthCard>
            <div className="flex ">
              <div className="w-[35%] h-[90vh] relative ">
                <Image
                  layout="fill"
                  objectFit="cover"
                  className="rounded-l-3xl"
                  src="https://images.unsplash.com/photo-1505819244306-ef53954f9648?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=699&q=80"
                />
              </div>
              <div className="flex-1 lg:mx-20 ">
                <SignupForm />
                <div className="flex items-center justify-center">
                  <p className="text-sm">Already a member? </p>
                  <Link href="/login">
                    <button className="underline btn-ghost selectable">
                      sign in now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </AuthCard>
        </div>
      </div>
    </div>
  );
}

export default Signup;
