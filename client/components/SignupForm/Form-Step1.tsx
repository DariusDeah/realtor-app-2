import React, { useState } from "react";
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
  const [isViewingPassword, setIsViewingPassword] = useState(false);

  // const waiter = async (ms: number) => {
  //   return new Promise((resolve) => {
  //     setTimeout(resolve, ms);
  //   });
  // };

  const {
    onChangeHandler: firstNameOnChange,
    value: firstNameValue,
    error: firstNameError,
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
    errorMessage: lastNameErrorMessage,
    onBlurHandler: lastNameOnBlur,
  } = useDebounceInput({
    defaultInput: userData.fullName ? userData.fullName.split(" ")[1] : "",
    rules: {
      minLength: 2,
      maxLength: 70,
    },
  });

  const {
    onChangeHandler: emailOnChange,
    value: emailValue,
    error: emailError,
    errorMessage: emailErrorMessage,
  } = useDebounceInput({
    defaultInput: userData.email || "",
    rules: {
      minLength: 2,
      maxLength: 70,
      isEmail: true,
    },
  });

  const {
    onChangeHandler: passwordOnChange,
    value: passwordValue,
    error: passwordError,
    errorMessage: passwordErrorMessage,
    onBlurHandler: passwordOnBlur,
  } = useDebounceInput({
    defaultInput: userData.password || "",
    rules: {
      minLength: 8,
      maxLength: 65,
    },
  });
  const {
    onChangeHandler: addressOnChange,
    value: addressValue,
    error: addressError,
    errorMessage: addressErrorMessage,
    onBlurHandler: addressOnBlur,
  } = useDebounceInput({
    defaultInput: userData.location ? userData.location.address : "",
    rules: {},
  });
  const {
    onChangeHandler: cityOnChange,
    value: cityValue,
    error: cityError,
    errorMessage: cityErrorMessage,
    onBlurHandler: cityOnBlur,
  } = useDebounceInput({
    defaultInput: userData.location ? userData.location.city : "",
    rules: {},
  });
  const {
    onChangeHandler: stateOnChange,
    value: stateValue,
    error: stateError,
    errorMessage: stateErrorMessage,
    onBlurHandler: stateOnBlur,
  } = useDebounceInput({
    defaultInput: userData.location ? userData.location.state : "",
    rules: {},
  });
  const {
    onChangeHandler: zipcodeOnChange,
    value: zipcodeValue,
    error: zipcodeError,
    errorMessage: zipcodeErrorMessage,
    onBlurHandler: zipcodeOnBlur,
  } = useDebounceInput({
    defaultInput: userData.location ? userData.location.zipcode : "",
    rules: {},
  });

  const {
    onChangeHandler: photoOnChange,
    value: photoValue,
    error: photoError,
    errorMessage: photoErrorMessage,
    onBlurHandler: photoOnBlur,
  } = useDebounceInput({
    defaultInput: userData.photoUrl || "",
    rules: { minLength: 10, isUrl: true },
  });

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    const userData = {
      fullName: firstNameValue + "" + lastNameValue,
      email: emailValue,
      password: passwordValue,
      photoUrl: photoValue,
      location: {
        address: addressValue,
        city: cityValue,
        state: stateValue,
        zipcode: zipcodeValue,
      },
    };
    addToLocalStorage("User", userData);
    nextStepFunction(e, userData);
  };
  console.log({
    firstNameError,
    lastNameError,
    emailError,
    passwordError,
  });

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
              className={`input input-bordered ${emailError && "input-error"}`}
              required
              onChange={emailOnChange}
              autoComplete="email"
            />
            {emailError && (
              <p className="text-xs text-error">{emailErrorMessage}</p>
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex items-start">
              <p className="text-sm flex">
                Password {"( 8-64 characters)"} {required}
              </p>
            </div>
            <div className="form-control">
              <label className="input-group ">
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
                  value={passwordValue}
                  onChange={passwordOnChange}
                  onBlur={passwordOnBlur}
                  className={`input input-bordered w-full ${
                    passwordError && "input-error"
                  }`}
                  autoComplete="current-password"
                  required
                />
              </label>
              {passwordError && (
                <p className="text-xs text-error">{passwordErrorMessage}</p>
              )}
            </div>
          </div>
        </div>
        <div className=" form-control flex flex-col gap-2">
          <div className="">
            <p className="text-sm">Address</p>
            <input
              value={addressValue}
              type="text"
              className={`input input-bordered w-full ${
                addressError && "input-error"
              }`}
              onChange={addressOnChange}
              onBlur={addressOnBlur}
            />
            {addressError && (
              <p className="text-xs text-error">{addressErrorMessage}</p>
            )}
          </div>
          <div className="lg:flex grid grid-cols-1  justify-between">
            <div className=" flex flex-col ">
              <p className="text-xs">City</p>
              <input
                value={cityValue}
                type="text"
                className={`input input-bordered ${cityError && "input-error"}`}
                onChange={cityOnChange}
                onBlur={cityOnBlur}
              />
              {cityError && (
                <p className="text-xs text-error">{cityErrorMessage}</p>
              )}
            </div>
            <div>
              <p className="text-xs">State</p>
              {/* <input
                value={stateValue}
                type="text"
                className={`input input-bordered ${
                  stateError && "input-error"
                }`}
                onChange={stateOnChange}
                onBlur={stateOnBlur}
              />
              {stateError && (
                <p className="text-xs text-error">{stateErrorMessage}</p>
              )} */}
              <input
                // value={stateValue}
                type="text"
                className={`input input-bordered ${
                  stateError && "input-error"
                }`}
                onChange={stateOnChange}
                onBlur={stateOnBlur}
                name="states"
                list="states"
              />
              <datalist id="states">
                <option disabled selected />
                <option value="AL" />
                <option value="AK" />
                <option value="AZ" />
                <option value="AR" />
                <option value="CA" />
                <option value="CO" />
                <option value="CT" />
                <option value="DE" />
                <option value="DC" />
                <option value="FL" />
                <option value="GA" />
                <option value="HI" />
                <option value="ID" />
                <option value="IL" />
                <option value="IN" />
                <option value="IA" />
                <option value="KS" />
                <option value="KY" />
                <option value="LA" />
                <option value="ME" />
                <option value="MD" />
                <option value="MA" />
                <option value="MI" />
                <option value="MN" />
                <option value="MS" />
                <option value="MO" />
                <option value="MT" />
                <option value="NE" />
                <option value="NV" />
                <option value="NH" />
                <option value="NJ" />
                <option value="NM" />
                <option value="NY" />
                <option value="NC" />
                <option value="ND" />
                <option value="OH" />
                <option value="OK" />
                <option value="OR" />
                <option value="PA" />
                <option value="RI" />
                <option value="SC" />
                <option value="SD" />
                <option value="TN" />
                <option value="TX" />
                <option value="UT" />
                <option value="VT" />
                <option value="VA" />
                <option value="WA" />
                <option value="WV" />
                <option value="WI" />
                <option value="WY" />
              </datalist>
            </div>
            <div>
              <p className="text-xs">Zip Code</p>
              <input
                value={zipcodeValue}
                type="text"
                className={`input input-bordered ${
                  zipcodeError && "input-error"
                }`}
                onChange={zipcodeOnChange}
                onBlur={zipcodeOnBlur}
              />
              {zipcodeError && (
                <p className="text-xs text-error">{zipcodeErrorMessage}</p>
              )}
            </div>
          </div>
        </div>
        <div className=" flex flex-col">
          <p className="text-sm">Photo {"(URL)"}</p>
          <input
            value={photoValue}
            type="text"
            className={`input input-bordered ${photoError && "input-error"}`}
            onChange={photoOnChange}
            onBlur={photoOnBlur}
          />
          {photoError && (
            <p className="text-xs text-error">{photoErrorMessage}</p>
          )}
        </div>
      </div>
      {/* <div className="divider"></div> */}
      <div className="flex justify-end mt-10  ">
        <FormButton
          style="btn btn-primary text-white    "
          title="Next Step"
          disabled={
            !firstNameValue.length ||
            !lastNameValue.length ||
            !emailValue.length ||
            !passwordValue.length ||
            firstNameError ||
            lastNameError ||
            emailError ||
            passwordError
          }
          onClick={handleFormSubmit}
        />
      </div>
    </>
  );
}

export default FormStep1;
