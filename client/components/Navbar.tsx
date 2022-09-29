import Link from "next/link";
import React from "react";

type Props = {};
const navItems = ["Explore", "New", "Featured", "For Rent", "For Sale"];
function Navbar({}: Props) {
  return (
    <div className="navbar hidden lg:flex justify-center   ">
      {navItems.map((item) => (
        <a
          href={`#${item.split(" ").join("")}`}
          className="selectable text-2xl font-semibold mx-20 "
        >
          {item}
        </a>
      ))}
    </div>
  );
}

export default Navbar;
