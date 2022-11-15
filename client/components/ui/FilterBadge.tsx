import React from "react";

type Props = {
  type: "Within Budget" | "Over Budget" | "Perfect Match" | "Recently Viewed";
  onClick?: (...args: any[]) => void;
};

function FilterBadge({ type }: Props) {
  switch (type) {
    case "Within Budget":
      return (
        <div className="badge bg-success  border-none w-fit">
          <p>Within Budget 🥳</p>
        </div>
      );
    case "Over Budget":
      return (
        <div className="badge bg-error border-none w-fit">
          <p>Over Budget 💸</p>
        </div>
      );
    case "Perfect Match":
      return (
        <div className="badge bg-indigo-300  border-none w-fit">
          <p>Perfect Match 🤩</p>
        </div>
      );
    case "Recently Viewed":
      return (
        <div className="badge bg-blue-400 border-none ">
          <p>Recently Viewed 👁️ </p>
        </div>
      );
  }
}

export default FilterBadge;
