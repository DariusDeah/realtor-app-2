import { Variants, motion } from "framer-motion";
import React from "react";

type Props = {
  title: string;
  subtitle: string;
  img: string;
  animationDelay: number;
};
const delayCardVariant = (delay: number) => {
  const cardVariants: Variants = {
    offscreen: {
      y: 300,
      visibility: "hidden",
    },
    onscreen: {
      y: 0,
      visibility: "visible",

      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 1,
        delay: delay,
        stiffness: 50,
      },
    },
  };
  return cardVariants;
};

function CTACard({ title, subtitle, img, animationDelay }: Props) {
  return (
    <motion.div
      className="flex snap-center cursor-pointer p-9 bg-slate-100 rounded-lg flex-wrap z-50 "
      variants={delayCardVariant(animationDelay)}
      whileHover={{
        translateY: -12,
        transition: { duration: 0.3 },
      }}
    >
      <li className=" lg:w-full ">
        <article className="text-xs mb-3 ">
          <h1 className="lg:text-lg font-semibold underline flex items-center ">
            {title}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </h1>
          <p className="lg:text-base"> {subtitle}</p>
        </article>
        <img src={img} alt="" className="w-96" />
      </li>
    </motion.div>
  );
}

export default CTACard;
