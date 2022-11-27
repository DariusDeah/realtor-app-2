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
  updateFunc?: (arg: any) => void;
  description?: any;
};

export enum AlertTypes {
  Error = "error",
  Success = "success",
  Info = "info",
}

function Alert({ type, title, buttons, description, updateFunc }: Props) {
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      updateFunc && updateFunc(null);
    }, 3000);
    return () => {
      clearTimeout(timeOutId);
    };
  }, []);

  return (
    <Portal selector="#alert">
      <div className="toast   toast-top  z-[99999] ">
        {type && (
          <div
            className={`alert lg:p-4 mt-3    alert-${"success"} shadow-lg  `}
          >
            <div>
              {type === "info" && (
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
              )}
              {type === "success" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
              {type === "error" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}

              <div>
                <h3 className="font-bold text-xl">{title}</h3>
                {description && <div className="">{description}</div>}
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
      </div>
    </Portal>
  );

  // el.current
}

export default Alert;
