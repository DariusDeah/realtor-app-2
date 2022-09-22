import React from "react";

type Props = {
  icon: any;
  title?: string;
};

function HeaderItem({ icon, title }: Props) {
  return (
    <div
      className="selectable flex flex-col tooltip hover:tooltip-open tooltip-right z-50 py-1.5 "
      data-tip={title}
    >
      <div>{icon}</div>
    </div>
  );
}

export default HeaderItem;
