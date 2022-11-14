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
    required?: boolean;
    custom?: {
      customValidationFunc: (...args: any[]) => boolean;
      validationErrorMessage: string;
    };
    asyncCustom?: {
      asyncCustomValidationFunc: (...args: any[]) => Promise<boolean>;
      validationErrorMessage: string;
    };
  } | null;
};

const useDebounceInput = ({ defaultInput, rules }: Props) => {
  const [inputValue, setInputValue] = useState<string>(defaultInput);
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [validInput, setValidInput] = useState<boolean>(false);
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
      case rules && rules.required && !inputValue.length:
        setError(true);
        setErrorMessage("this field is required");
        setValidInput(false);
        break;
      case rules && rules.isUrl && !inputValue.includes("https://"):
        setError(true);
        setErrorMessage("not a valid url!");
        setValidInput(false);
        break;

      case rules && rules.isEmail && !inputValue.includes("@"):
        setError(true);
        setErrorMessage("not a valid email address!");
        setValidInput(false);
        break;

      case rules?.minLength && inputValue.length < rules.minLength:
        setError(true);
        setErrorMessage(
          "input value too short, must be at least " +
            rules.minLength +
            " characters"
        );
        setValidInput(false);
        break;

      case rules && inputValue.length && inputValue.length > rules.maxLength:
        setError(true);
        setErrorMessage(
          "input value too long, must be at max " +
            rules.maxLength +
            " characters"
        );
        setValidInput(false);
        break;

      case rules &&
        rules.custom &&
        rules.custom.customValidationFunc &&
        !rules.custom.customValidationFunc(inputValue):
        setError(true);
        setErrorMessage(rules.custom.validationErrorMessage);
        break;
      default:
        setValidInput(true);
        setError(false);
        break;
    }
    setError(false);
    setValidInput(true);
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      inputValidation();
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
    validInput,
    errorMessage,
  };
};

export default useDebounceInput;
