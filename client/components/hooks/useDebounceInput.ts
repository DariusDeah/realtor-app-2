import React, { useEffect, useReducer, useState } from "react";

type Props = {
  // validateFunc: any;
  // onChangeFunc: (...args: any[]) => void;
  // input: any;
  defaultInput: any;
  rules: {
    minLength?: number;
    maxLength?: number;
    isEmail?: boolean;
    isUrl?: boolean;
    custom?: {
      customValidationFunc: (...args: any[]) => boolean;
      validationErrorMessage: string;
    };
    asyncCustom?: {
      asyncCustomValidationFunc: (...args: any[]) => Promise<boolean>;
      validationErrorMessage: string;
    };
  };
};

const useDebounceInput = ({ defaultInput, rules }: Props) => {
  const [inputValue, setInputValue] = useState<string>(defaultInput);
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");

  function onChangeHandler(e: any) {
    setInputValue(e.target.value);
    setIsTouched(true);
  }

  function onBlurHandler(e: any) {
    setIsTouched(true);
    inputValidation();
  }

  const inputValidation = async () => {
    switch (isTouched) {
      case inputValue.length < rules.minLength:
        setError(true);
        setErrorMessage(
          "input value too short, must be at least " +
            rules.minLength +
            " characters"
        );
        break;
      case inputValue.length && inputValue.length > rules.maxLength:
        setError(true);
        setErrorMessage(
          "input value too long, must be at max " +
            rules.maxLength +
            " characters"
        );
        break;
      case rules.isEmail && !inputValue.includes("@"):
        setError(true);
        setErrorMessage("not a valid email address!");
        break;
      case rules.isUrl && !inputValue.includes("https://"):
        setError(true);
        setErrorMessage("not a valid url!");
        break;
      case rules.custom &&
        rules.custom.customValidationFunc &&
        !rules.custom.customValidationFunc(inputValue):
        setError(true);
        setErrorMessage(rules.custom.validationErrorMessage);
        break;

      default:
        setError(false);
        break;
    }
  };

  useEffect(() => {
    const timeOut = setTimeout(async () => {
      await inputValidation();
    }, 1000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [inputValue]);
  return {
    onChangeHandler,
    onBlurHandler,
    value: inputValue,
    error,
    validInput: !error,
    errorMessage,
  };
};

export default useDebounceInput;
