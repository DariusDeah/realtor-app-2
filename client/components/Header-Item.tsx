import React from "react";

type Props = {
  icon: any;
  title?: string;
};

function HeaderItem({ icon, title }: Props) {
  return (
    <div className="cursor-pointer hover:bg-slate-100 p-2 rounded-md flex flex-col">
      <div className="justify-center align-middle">{icon}</div>
      {title && title}
    </div>
  );
}

export default HeaderItem;
