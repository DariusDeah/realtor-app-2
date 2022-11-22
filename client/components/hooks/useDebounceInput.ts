import { useEffect, useState } from "react";

type Props = {
  defaultInput: string;
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
  };
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

  const inputValidation = () => {
    if (!Object.keys(rules).length) {
      setError(false);
    }

    switch (isTouched) {
      case rules.minLength && inputValue && inputValue.length < rules.minLength:
        setError(true);
        setErrorMessage(
          "input value too short, must be at least " +
            rules.minLength +
            " characters"
        );
        break;
      case rules.maxLength && inputValue && inputValue.length > rules.maxLength:
        setError(true);
        setErrorMessage(
          "input value too long, must be at max " +
            rules.maxLength +
            " characters"
        );
        break;

      case rules.required && inputValue && !inputValue.length:
        setError(true);
        setErrorMessage("this field is required");
        break;
      case rules.isUrl && inputValue && !inputValue.includes("https://"):
        setError(true);
        setErrorMessage("not a valid url!");
        break;

      case rules.isEmail && !inputValue.includes("@"):
        setError(true);
        setErrorMessage("not a valid email address!");
        break;

      case rules.custom &&
        rules.custom.customValidationFunc &&
        !rules.custom.customValidationFunc(inputValue):
        setError(true);
        rules.custom && setErrorMessage(rules.custom.validationErrorMessage);
        break;

      default:
        setError(false);
        break;
    }
  };

  const asyncInputValidation = async () => {
    if (
      rules &&
      rules.asyncCustom &&
      (await rules.asyncCustom.asyncCustomValidationFunc(inputValue))
    ) {
      setError(true);
      setErrorMessage(rules.asyncCustom.validationErrorMessage);
    }
  };

  useEffect(() => {
    const timeOut = setTimeout(async () => {
      inputValidation();
      if (rules.asyncCustom) {
        await asyncInputValidation();
      }
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
