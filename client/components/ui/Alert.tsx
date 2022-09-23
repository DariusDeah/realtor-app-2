import React, { useEffect, useRef } from "react";
import ReactDom from "react-dom";
type Props = {
  title: string;
  type: AlertTypes;
  buttons?: [
    {
      title: string;
      style?: string;
      onClickFunc: () => void;
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
  //   const alertRoot = document.querySelector("#alert-root") as HTMLElement;
  //   const el = useRef(document.createElement("div"));

  //   useEffect(() => {
  //     // Use this in case CRA throws an error about react-hooks/exhaustive-deps
  //     const current = el.current;

  //     // We assume `alertRoot` exists with '!'
  //     alertRoot!.appendChild(current);
  //     return () => void alertRoot!.removeChild(current);
  //   }, []);

  return (
    <div className={`alert  alert-${type} shadow-lg`}>
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
              className={`btn btn-sm ${button.style}`}
            >
              {button.title}
            </button>
          ))}
      </div>
    </div>
    // el.current
  );
}

export default Alert;
