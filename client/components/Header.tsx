import Image from "next/image";
import React from "react";
import HeaderItem from "./Header-Item";

function Header() {
  return (
    <div className="flex bg-indigo-600 lg:justify-center p-5 lg:flex-col lg:h-full justify-between lg:space-y-9 border-r-2 border-slate-200 align-middle ">
      <div className="lg:align-top text-start">
        <img
          className="object-contain w-10 h-10"
          src="https://cdn-icons-png.flaticon.com/512/2159/2159323.png"
        />
        <p>Pillow</p>
      </div>
      <div className=" mt-0 md:space-y-4 md:align-middle flex lg:grid ">
        <HeaderItem
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          }
          title="gallery"
        />
        <HeaderItem
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
          title="Search"
        />
        <HeaderItem
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          }
          title="Favs"
        />
      </div>
      <div className="align-bottom">
        <HeaderItem
          icon={
            <div className="avatar">
              <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="https://placeimg.com/192/192/people" />
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}

export default Header;
