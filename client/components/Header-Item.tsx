import { useRouter } from "next/router";
import React from "react";

type Props = {
  icon: any;
  title: string;
  onClick?: () => void;
};

function HeaderItem({ icon, title, onClick }: Props) {
  const { asPath } = useRouter();
  return (
    <div className=" relative lg:p-2">
      {/* TODO fix */}
      <div
        className={`${
          // "absolute p-5 w-16  from-primary to-transparent z-50 rounded-full bg-gradient-to-r top-2"
          ""
        }`}
      ></div>
      <div
        className="selectable flex flex-col tooltip hover:tooltip-open tooltip-right z-50 py-1.5   "
        data-tip={title}
        onClick={onClick}
      >
        <div className="p-2">{icon}</div>
        {asPath.includes(title) && (
          <div className="h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
        )}
      </div>
    </div>
  );
}

export default HeaderItem;
