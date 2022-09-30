import Link from "next/link";
import React from "react";

type Props = {};

function landing({}: Props) {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src="https://images.unsplash.com/photo-1599777560450-e462cffc5368?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold text-center">Pillow</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <div className="flex justify-center">
            <Link href={"/"}>
              <button className="btn btn-primary ">Find Homes Now!</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default landing;
