import { motion, Variant, Variants } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import ReactDom from "react-dom";
import Portal from "../Portal";
type Props = {
  title: string;
  type: AlertTypes;
  buttons?: [
    {
      title: string;
      className?: string;
      onClickFunc?: () => void;
    }
  ];
  description?: string;
};

export enum AlertTypes {
  Error = "error",
  Success = "success",
  Info = "info",
}

function Alert({ type, title, buttons, description }: Props) {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setOpen(false);
    }, 3000);
  });

  return (
    <Portal selector="#alert">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute top-0"
      >
        {open && (
          <div className={`alert lg:p-4 mt-3 w-fit  alert-${type} shadow-lg `}>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-info flex-shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <div>
                <h3 className="font-bold">{title}</h3>
                {description && <div className="text-xs">{description}</div>}
              </div>
            </div>
            <div className="flex-none">
              {buttons &&
                buttons.map((button) => (
                  <button
                    onClick={button.onClickFunc}
                    className={`btn btn-sm ${button.className}`}
                    key={button.title}
                  >
                    {button.title}
                  </button>
                ))}
            </div>
          </div>
        )}
      </motion.div>
    </Portal>
    // el.current
  );
}

export default Alert;
