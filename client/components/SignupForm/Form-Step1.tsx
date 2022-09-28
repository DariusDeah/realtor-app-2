import React, { useRef, useState } from "react";

type Props = {
  userData: any;
  nextStepFunction: (event: Event, data: any) => void;
};

function FormStep1({ userData, nextStepFunction }: Props) {
  const fullNameRef = useRef<HTMLInputElement>(userData.fullName || null);
  const emailRef = useRef<HTMLInputElement>(userData.email || null);
  const passwordRef = useRef<HTMLInputElement>(userData.password || null);
  const photoUrlRef = useRef<HTMLInputElement>(userData.photoUrl || null);

  const [isViewingPassword, setIsViewingPassword] = useState(false);
  const handleSubmit = (e: Event) => {
    const userSubmissionData = {
      fullName: fullNameRef.current?.value || userData.fullName,
      email: emailRef.current?.value || userData.email,
      password: passwordRef.current?.value || userData.password,
      photoUrl: photoUrlRef.current?.value || userData.photoUrl,
    };

    nextStepFunction(e, userSubmissionData);
  };
  return (
    <>
      <div className="form-control space-y-3">
        <h1 className="text-3xl font-medium">Help us get to know you 👏</h1>
        <input
          type="text"
          placeholder="Full Name"
          ref={fullNameRef}
          value={userData.fullName}
          className="input"
        />

        <input
          type="text"
          value={userData.photoUrl}
          placeholder="Photo Url"
          className="input"
          ref={photoUrlRef}
        />
        <div className=" flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-slate-500"
          >
            <path
              strokeLinecap="round"
              d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
            />
          </svg>

          <input
            type="email"
            placeholder="Email"
            value={userData.email}
            className="input border-none"
            ref={emailRef}
          />
        </div>
        <div className="flex items-center">
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

          <input
            type={isViewingPassword ? "text" : "password"}
            value={userData.password}
            placeholder="Password"
            className="input"
            ref={passwordRef}
          />
        </div>
      </div>
    </>
  );
}

export default FormStep1;
