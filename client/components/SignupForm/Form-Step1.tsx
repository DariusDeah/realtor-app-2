import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { User } from "../../models/user";
import useDebounceInput from "../hooks/useDebounceInput";
import useUpdateLocalSave from "../hooks/useUpdateLocalSave";
import FormButton from "./FormButton";

type Props = {
  userData: User;
  nextStepFunction: (event: Event, data: any) => void;
};

function FormStep1({ userData, nextStepFunction }: Props) {
  const addToLocalStorage = useUpdateLocalSave();
  const {
    onChangeHandler: firstNameOnChange,
    value: firstNameValue,
    error: firstNameError,
    validInput: firstNameValid,
    errorMessage: firstNameErrorMessage,
    onBlurHandler: firstNameOnBlur,
  } = useDebounceInput({
    defaultInput: (userData.fullName && userData.fullName.split(" ")[0]) || "",
    rules: {
      minLength: 2,
      maxLength: 50,
    },
  });

  const {
    onChangeHandler: lastNameOnChange,
    value: lastNameValue,
    error: lastNameError,
    validInput: lastNameValid,
    errorMessage: lastNameErrorMessage,
    onBlurHandler: lastNameOnBlur,
  } = useDebounceInput({
    defaultInput: (userData.fullName && userData.fullName.split(" ")[1]) || "",
    rules: {
      minLength: 2,
      maxLength: 70,
    },
  });

  const {
    onChangeHandler: emailOnChange,
    value: emailValue,
    error: emailError,
    validInput: emailValid,
    errorMessage: emailErrorMessage,
  } = useDebounceInput({
    defaultInput: userData.email || "",
    rules: {
      minLength: 2,
      maxLength: 70,
      isEmail: true,
      asyncCustom: {
        asyncCustomValidationFunc: async (input: string) => {
          return input.includes("darius");
        },
        validationErrorMessage: "this is not a valid async email",
      },
    },
  });

  const handleFormSubmit = (e: any) => {
    nextStepFunction(e, {
      fullName: `${firstNameValue} ${lastNameValue}`,
    });
  };
  const [isViewingPassword, setIsViewingPassword] = useState(false);

  const required = <p className="text-error">{"*"}</p>;

  return (
    <>
      <div className="form-control flex gap-10  ">
        <h1 className="text-3xl font-medium">Help us get to know you 👏</h1>
        <div className="grid-cols-2 grid gap-5">
          <div className="flex flex-col ">
            <p className="text-sm flex ">First Name {required} </p>
            <input
              type="text"
              value={firstNameValue}
              onChange={firstNameOnChange}
              className={`input input-bordered ${
                firstNameError && "input-error"
              }`}
              onBlur={firstNameOnBlur}
              required
            />
            {firstNameError && (
              <p className="text-xs text-error">{firstNameErrorMessage}</p>
            )}
          </div>
          <div className="flex flex-col ">
            <p className="text-sm flex">Last Name {required}</p>
            <input
              value={lastNameValue}
              type="text"
              className={`input input-bordered ${
                lastNameError && "input-error"
              }`}
              required
              onChange={lastNameOnChange}
              onBlur={lastNameOnBlur}
            />
            {lastNameError && (
              <p className="text-xs text-error">{lastNameErrorMessage}</p>
            )}
          </div>

          <div className=" flex  flex-col">
            <p className="text-sm flex">Email {required}</p>
            <input
              value={emailValue}
              type="email"
              className="input input-bordered"
              required
              onChange={emailOnChange}
            />
            {emailError && (
              <p className="text-xs text-error">{emailErrorMessage}</p>
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex items-start">
              <p className="text-sm">Password {"( 8-64 characters)"}</p>
            </div>
            <div className="form-control">
              <label className="input-group">
                <span className="w-[25%] ">
                  {isViewingPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-10 h-10 selectable"
                      onClick={() => setIsViewingPassword(false)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-8 h-8 selectable"
                      onClick={() => setIsViewingPassword(true)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </span>
                <input
                  type={isViewingPassword ? "text" : "password"}
                  value={userData.password}
                  placeholder="Password"
                  className="input input-bordered w-full"
                  required
                />
              </label>
            </div>
          </div>
        </div>
        <div className=" form-control flex flex-col gap-2">
          <div className="">
            <p className="text-sm">Address</p>
            <input type="text" className="input input-bordered w-full " />
          </div>
          <div className="lg:flex grid grid-cols-1  justify-between">
            <div className=" flex flex-col ">
              <p className="text-xs">City</p>
              <input type="text" className="input input-bordered " />
            </div>
            <div>
              <p className="text-xs">State</p>
              <input type="text" className="input input-bordered " />
            </div>
            <div>
              <p className="text-xs">Zip Code</p>
              <input type="text" className="input input-bordered " />
            </div>
          </div>
        </div>
        <div className=" flex flex-col">
          <p className="text-sm">Photo {"(URL)"}</p>
          <input
            type="text"
            placeholder={userData.photoUrl}
            className="input input-bordered w-full"
          />
        </div>
      </div>
      <div className="divider"></div>
      <div className="flex justify-end mt-4  ">
        <FormButton
          style="btn btn-primary text-white    "
          title="Next Step"
          disabled={!firstNameValid && !lastNameValid}
        />
      </div>
    </>
  );
}

export default FormStep1;
