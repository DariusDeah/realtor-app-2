import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  children: JSX.Element;
};
const variants = {
  out: {
    opacity: 0,
    y: 40,
    transition: {
      duration: 0.3,
    },
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay: 0.2,
    },
  },
};

export default function Transition({ children }: Props) {
  const { asPath } = useRouter();
  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={asPath}
        variants={variants}
        animate="in"
        initial="out"
        exit="out"
        className="overflow-hidden"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
