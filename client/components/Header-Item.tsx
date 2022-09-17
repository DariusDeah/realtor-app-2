import React from "react";

type Props = {
  icon: any;
  title: string;
};

function HeaderItem({ icon, title }: Props) {
  return (
    <div>
      {icon}
      {title}
    </div>
  );
}

export default HeaderItem;
