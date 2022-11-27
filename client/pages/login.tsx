import Image from "next/image";
import Link from "next/link";
import React from "react";
import AuthCard from "../components/AuthCard";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";

type Props = {};

function login({}: Props) {
  return (
    <div className="lg:flex ">
      <section>
        <Header />
      </section>
      <div className="flex w-full flex-col justify-center items-center">
        {/* TODO only the form component should be in the sign up form */}
        <div className=" ">
          <AuthCard>
            <div className=" flex  justify-center">
              <div>
                <h1 className="text-4xl font-semibold">Pillow</h1>
                <p>where you rest your head</p>
              </div>
            </div>
            <div className="lg:mx-20 ">
              <LoginForm />
              <div className="flex items-center justify-center">
                <p className="text-sm">New to Pillow? </p>
                <Link href="/sign-up">
                  <button className="underline btn-ghost selectable">
                    sign up now
                  </button>
                </Link>
              </div>
            </div>
          </AuthCard>
        </div>
      </div>
    </div>
  );
}

export default login;
