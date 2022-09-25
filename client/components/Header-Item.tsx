import React from "react";

type Props = {
  icon: any;
  title?: string;
  onClick?: () => void;
};

function HeaderItem({ icon, title, onClick }: Props) {
  return (
    <div
      className="selectable flex flex-col tooltip hover:tooltip-open tooltip-right z-50 py-1.5 "
      data-tip={title}
      onClick={onClick}
    >
      <div>{icon}</div>
    </div>
  );
}

export default HeaderItem;
