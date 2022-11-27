import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../redux";
import { loginUser, selectUser } from "../redux/user.reducer";
import useDebounceInput from "./hooks/useDebounceInput";
import FormButton from "./SignupForm/FormButton";
import Alert, { AlertTypes } from "./ui/Alert";
import Input from "./ui/Input";

type Props = {};

function LoginForm({}: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [alertNotification, setAlertNotification] = useState<JSX.Element>();
  const user = useAppSelector(selectUser);
  const {
    onChangeHandler: emailOnChange,
    value: emailValue,
    error: emailError,
    errorMessage: emailErrorMessage,
    pending: emailPending,
  } = useDebounceInput({
    defaultInput: "",
    rules: {
      isEmail: true,
    },
  });
  const {
    onChangeHandler: passwordOnChange,
    value: passwordValue,
    error: passwordError,
    pending: passwordPending,
    errorMessage: passwordErrorMessage,
    onBlurHandler: passwordOnBlur,
  } = useDebounceInput({
    defaultInput: "",
    rules: {},
  });
  const handleFormSubmit = async () => {
    await dispatch(loginUser({ email: emailValue, password: passwordValue }));
    if (user.error) {
      console.log(user.error);
      setAlertNotification(
        <Alert
          title={`${user.error.message}`}
          updateFunc={setAlertNotification}
          type={AlertTypes.Error}
        />
      );
    }
    if (user.success) {
      setAlertNotification(
        <Alert
          title={`Login Successful`}
          description={`Welcome back, ${user.user?.fullName}!`}
          updateFunc={setAlertNotification}
          type={AlertTypes.Success}
        />
      );
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  };

  const [isViewingPassword, setIsViewingPassword] = useState(false);

  return (
    <div className="form-control gap-y-10 w-full  lg:p-12 p-3  flex flex-col justify-center  items-center ">
      {alertNotification}
      <h1 className="lg:text-5xl text-2xl font-semibold text-center h-20">
        Welcome Back!
      </h1>
      <div className=" lg:w-1/2 w-full">
        <Input
          errorCondition={emailError}
          errorMessage={emailErrorMessage}
          label="Email"
          value={emailValue}
          type="email"
          className={`input input-bordered input-sm  ${
            emailError && "input-error"
          }`}
          required
          pending={emailPending}
          onChange={emailOnChange}
          autoComplete="email"
        />
      </div>
      <div className=" lg:w-1/2 w-full ">
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
            className="w-10 h-10 selectable"
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
        <Input
          type={isViewingPassword ? "text" : "password"}
          value={passwordValue}
          onChange={passwordOnChange}
          pending={passwordPending}
          placeholder="Password"
          className={`input input-bordered input-sm  ${
            passwordError && "input-error"
          }`}
          required
          errorCondition={passwordError}
          errorMessage={passwordErrorMessage}
          label={"Password"}
        />
      </div>
      <div className="flex justify-center   ">
        <FormButton
          style="btn btn-primary "
          title="Submit"
          onClick={handleFormSubmit}
        />
      </div>
    </div>
  );
}

export default LoginForm;
