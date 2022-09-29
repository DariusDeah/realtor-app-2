import { motion, Variant } from "framer-motion";
import React from "react";

type Props = {
  children: JSX.Element[];
  className: string;
  onClick: (...params: any[]) => void;
};
const variants: Variant = {
  translateY: -12,
  transition: { duration: 0.3 },
};

export default function OnHoverAnimation({
  children,
  className,
  onClick,
}: Props) {
  return (
    <motion.div
      whileHover={{ ...variants }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
