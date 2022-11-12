import Link from "next/link";
import React, { useRef, useState } from "react";
import useUpdateLocalSave from "../hooks/useUpdateLocalSave";
import FormButton from "./FormButton";

type Props = {
  userData: any;
  nextStepFunction: (event: Event, data: any) => void;
};

function FormStep1({ userData, nextStepFunction }: Props) {
  const fullNameRef = useRef<HTMLInputElement>(userData.fullName || null);
  const emailRef = useRef<HTMLInputElement>(userData.email || null);
  const passwordRef = useRef<HTMLInputElement>(userData.password || null);
  const photoUrlRef = useRef<HTMLInputElement>(userData.photoUrl || null);
  const addToLocalStorage = useUpdateLocalSave();

  const [isViewingPassword, setIsViewingPassword] = useState(false);
  const handleSubmit = (e: Event) => {
    const userSubmissionData = {
      fullName: fullNameRef.current?.value || userData.fullName,
      email: emailRef.current?.value || userData.email,
      password: passwordRef.current?.value || userData.password,
      photoUrl: photoUrlRef.current?.value || userData.photoUrl,
    };
    addToLocalStorage("User", userSubmissionData);
    nextStepFunction(e, userSubmissionData);
  };
  const required = null;
  return (
    <>
      <div className="form-control flex gap-10 ">
        <h1 className="text-3xl font-medium">Help us get to know you 👏</h1>
        <div className="grid-cols-2 grid gap-5">
          <div className="flex flex-col ">
            <p className="text-sm">First Name</p>
            <input
              type="text"
              ref={fullNameRef}
              value={userData.fullName.split(" ")[1]}
              className="input input-bordered"
              required
            />
          </div>
          <div className="flex flex-col ">
            <p className="text-sm">Last Name</p>
            <input
              type="text"
              ref={fullNameRef}
              value={userData.fullName.split(" ")[1]}
              className="input input-bordered"
              required
            />
          </div>

          <div className=" flex  flex-col">
            <p className="text-sm">Email</p>
            <input
              type="email"
              placeholder="Email"
              value={userData.email}
              className="input input-bordered"
              ref={emailRef}
              required
            />
            {required}
          </div>
          <div className="flex flex-col">
            <div className="flex items-start">
              <p className="text-sm">Password</p>
            </div>
            <div className="form-control">
              <label className="input-group">
                <span className="w-[25%]">
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
                  className="input input-bordered "
                  ref={passwordRef}
                  required
                />
              </label>
            </div>
          </div>
        </div>
        <div className=" flex flex-col">
          <p className="text-sm">Photo {"(URL)"}</p>
          <input
            type="text"
            value={userData.photoUrl}
            placeholder="Photo Url"
            className="input input-bordered w-full"
            ref={photoUrlRef}
          />
        </div>
      </div>
      <div className="divider"></div>
      <div className="flex justify-end mt-4  ">
        <FormButton
          style="btn btn-primary"
          title="Next Step"
          onClick={handleSubmit}
        />
      </div>
    </>
  );
}

export default FormStep1;
