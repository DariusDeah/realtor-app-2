import Router, { useRouter } from "next/router";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { User } from "../../models/user";
import { useAppDispatch } from "../../redux";
import { signUpUser } from "../../redux/user.reducer";
import useLocalSave from "../hooks/useLocalSave";
import FormButton from "./FormButton";

const FormStep1 = lazy(() => import("./Form-Step1"));
const FormStep2 = lazy(() => import("./Form-Step2"));
const FormStep3 = lazy(() => import("./Form-Step3"));
const FormSteps = lazy(() => import("./FormSteps"));

type Props = {};

function SignupForm({}: Props) {
  const dispatch = useAppDispatch();

  const [userData, setUserData] = useState<User | any>({});
  let timezone: string;
  const router = useRouter();
  const { query } = useRouter();
  const currentStep = parseInt(query["step"]);

  const { addToLocalStorage } = useLocalSave();

  useEffect(() => {
    // query["step"] = parseInt(window.localStorage.getItem("currentStep") ?? "1");
    window.localStorage.setItem("currentStep", currentStep.toString());
    // setCompletedSteps(
    //   JSON.parse(window.localStorage.getItem("completedSteps") ?? "[]")
    // );
    setUserData(JSON.parse(window.localStorage.getItem("User") ?? "{}"));
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }, [currentStep]);

  const handleNextStep = (e: Event, data?: any) => {
    e.preventDefault();

    setUserData((prevState: any) => {
      return {
        ...prevState,
        ...data,
        timezone,
      };
    });

    addToLocalStorage({
      items: [
        { key: "currentStep", item: currentStep },
        {
          key: "User",
          item: userData,
        },
      ],
    });
    console.log({ data }, { userData });
    router.push(`sign-up/?step=${currentStep + 1}`, undefined, {
      shallow: true,
    });
  };

  const handleBackStep = (e: Event) => {
    e.preventDefault();

    addToLocalStorage({
      items: [{ key: "currentStep", item: currentStep }],
    });
    router.push(`sign-up/?step=${currentStep - 1}`, undefined, {
      shallow: true,
    });
  };

  const handleFormSubmit = async (e: Event) => {
    e.preventDefault();

    setUserData((prevState: any) => {
      return {
        ...prevState,

        timezone: timezone || prevState.timezone,
      };
    });
    // alert("Are you sure you're ready to submit this form?");

    const res = await dispatch(signUpUser(userData));
    if (res.meta.requestStatus === "fulfilled") {
      router.push("/sign-up?step=4", undefined, { shallow: true });

      window.localStorage.removeItem("User");
      window.localStorage.removeItem("currentStep");
      window.localStorage.removeItem("completedSteps");

      setTimeout(() => {
        router.push("/");
      }, 4000);
    }
  };

  const step4Content = (
    <div className="w-full">
      <img
        src="https://i.pinimg.com/originals/b9/88/b7/b988b7c3e84e1f83ef9447157831b460.gif"
        alt=""
      />
    </div>
  );

  return (
    <div className=" border-2 lg:max-w-screen-lg w-screen rounded-lg lg:mx-4 ">
      <div className="flex flex-col items-center mt-4 ">
        {/* Steps */}
        <Suspense fallback={<div>Loading steps...</div>}>
          <FormSteps currentStep={currentStep} />
        </Suspense>
        <form>
          <div className="form-control  space-y-4 w-screen lg:w-full mt-20 p-8 ">
            <Suspense fallback={<div>Loading Form Content</div>}>
              {currentStep === 1 && (
                <FormStep1
                  userData={userData}
                  nextStepFunction={handleNextStep}
                />
              )}
              {currentStep === 2 && (
                <FormStep2
                  userData={userData}
                  nextStepFunction={handleNextStep}
                  backStepFunction={handleBackStep}
                />
              )}
              {currentStep === 3 && (
                <FormStep3
                  userData={userData}
                  nextStepFunction={handleFormSubmit}
                  backStepFunction={handleBackStep}
                />
              )}
              {currentStep === 4 && step4Content}
            </Suspense>
          </div>
          {/* <div className="flex justify-between mt-4  ">
            <FormButton
              title="Back"
              style={`${
                currentStep === MIN_STEPS ? "btn-disabled" : " btn-primary"
              }`}
              onClick={handleBackStep}
            />
            <FormButton
              style={`btn btn-primary 
              
              `}
              title={currentStep < 3 ? "Next" : "Finish"}
              onClick={handleNextStep}
            />
          </div> */}
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
