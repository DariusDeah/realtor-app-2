import { Variants, motion } from "framer-motion";
import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  subtitle: string;
  img: string;
  animationDelay: number;
  query: string;
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

function CTACard({ title, subtitle, img, animationDelay, query }: Props) {
  return (
    <Link href={`/search?${query}`}>
      <motion.div
        className="flex snap-center cursor-pointer bg-slate-200 rounded-lg  w-full p-10 "
        variants={delayCardVariant(animationDelay)}
        whileHover={{
          translateY: -8,
          transition: { duration: 0.3 },
        }}
      >
        <li className=" w-full flex  flex-col justify-between ">
          <article className="text-xs mb-3 ">
            <h1 className="lg:text-lg font-semibold underline flex items-center  ">
              {title}
            </h1>
            <p className="lg:text-base"> {subtitle}</p>
          </article>
          <img src={img} alt="" className="relative" draggable={false} />
        </li>
      </motion.div>
    </Link>
  );
}

export default CTACard;
