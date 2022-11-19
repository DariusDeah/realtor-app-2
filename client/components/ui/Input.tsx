import React from "react";

type Props = {
  errorCondition: boolean;
  errorMessage: string;
  label: string;
  style?: string;
} & JSX.IntrinsicElements["input"];

function Input({
  onChange,
  value,
  type,
  className,
  errorCondition,
  errorMessage,
  label,
  required,
  style,
  list,
}: Props) {
  return (
    <div className="flex flex-col ">
      <p className="text-sm flex ">
        {label} {required && <p className="text-error">{"*"}</p>}{" "}
      </p>
      <input
        onChange={onChange}
        value={value}
        type={type}
        className={`input input-bordered input-md ${
          errorCondition && "input-error"
        } ${style}`}
        list={list}
      />
      {errorCondition && <p className="text-xs text-error">{errorMessage}</p>}
    </div>
  );
}

export default Input;
