import React from "react";

type Props = {};
const navItems = ["Explore", "New", "Featured", "For Rent", "For Sale"];
function Navbar({}: Props) {
  return (
    <nav className="navbar  lg:border-b-2 bg-white flex justify-center   ">
      {navItems.map((item) => (
        <>
          <a
            href={`#${item.split(" ").join("")}`}
            className="selectable text-sm lg:text-2xl font-semibold lg:mx-20 "
          >
            {item}
          </a>
        </>
      ))}
    </nav>
  );
}

export default Navbar;
