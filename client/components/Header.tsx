import Image from "next/image";
import React from "react";
import HeaderItem from "./Header-Item";

type Props = {};

function Header({}: Props) {
  return (
    <div className="flex p-5 bg-slate-200 flex-col ">
      <Image
        width={200}
        height={200}
        layout="responsive"
        src="https://cdn-icons.flaticon.com/png/512/951/premium/951793.png?token=exp=1660498396~hmac=3c1a560bcbfb8e2a64319bb0050a11da"
      />
      <div className="space-y-4">
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
      </div>
    </div>
  );
}

export default Header;
