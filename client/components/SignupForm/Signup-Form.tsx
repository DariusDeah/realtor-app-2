import { useRouter } from "next/router";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { User } from "../../models/user";
import { useAppDispatch } from "../../redux";
import { signUpUser } from "../../redux/user.reducer";
import useLocalSave from "../hooks/useLocalSave";
import Alert, { AlertTypes } from "../ui/Alert";

const FormStep1 = lazy(() => import("./Form-Step1"));
const FormStep2 = lazy(() => import("./Form-Step2"));
const FormStep3 = lazy(() => import("./Form-Step3"));
const FormSteps = lazy(() => import("./FormSteps"));

type Props = {};

function SignupForm({}: Props) {
  const dispatch = useAppDispatch();
  const { addToLocalStorage } = useLocalSave();

  const [userData, setUserData] = useState<User | any>({});
  let timezone: string;
  const router = useRouter();
  const { query } = useRouter();
  const currentStep = parseInt(query["step"] ? query["step"][0] : "1");
  // const [error, setError] = useState({ type: "", message: "" });
  const [alertNotifications, setAlertNotifications] = useState<JSX.Element[]>(
    []
  );

  const MAX_STEPS = 4;

  useEffect(() => {
    //only save steps lower than max step count
    if (query["step"] && parseInt(query["step"][0]) < MAX_STEPS) {
      window.localStorage.setItem("currentStep", JSON.stringify(currentStep));
    }
    setUserData(JSON.parse(window.localStorage.getItem("User") || "{}"));
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }, []);

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
      items: [{ key: "currentStep", item: currentStep }],
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
    const userData = JSON.parse(localStorage.getItem("User") || "");
    // alert("Are you sure you're ready to submit this form?");
    //validate form data
    if (userData && !isValidUserFormData(userData)) {
      // setError({ type: "erorr", message: "erorr form data" });

      return;
    }

    // throw new Error("fix form");
    const res = await dispatch(signUpUser(userData));
    if (res.meta.requestStatus.includes("fulfilled")) {
      setAlertNotifications((prevState: JSX.Element[]) => [
        ...prevState,
        <Alert
          title="Signup Success"
          description={`welcome ${userData.fullName}`}
          type={AlertTypes.Success}
        />,
      ]);
      router.push("/sign-up?step=4", undefined, { shallow: true });

      window.localStorage.removeItem("User");
      window.localStorage.removeItem("currentStep");

      setTimeout(() => {
        router.push("/");
      }, 4000);
    } else {
      setAlertNotifications((prevState: JSX.Element[]) => [
        ...prevState,
        <Alert
          title={res.error.name}
          description={res.error.message}
          type={AlertTypes.Error}
        />,
      ]);
    }
  };

  const isValidUserFormData = (userData: User) => {
    // return (
    //   userData.email &&
    //   userData.fullName &&
    //   userData.location.address &&
    //   userData.location.city &&
    //   userData.location.state &&
    //   userData.location.zipcode
    // );
    return true;
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
    <>
      {/* {alertNotifications.map((notification) => {
        <div>{notification}</div>;
      })} */}
      {alertNotifications}
      <div className="flex flex-col items-center mt-4 ">
        {/* Steps */}
        <Suspense fallback={<div>Loading steps...</div>}>
          <FormSteps currentStep={currentStep} />
        </Suspense>
        <div className="divider"></div>
        <form className="w-full">
          <div className="  w-screen lg:w-full  ">
            <Suspense fallback={<div>Loading Form Content</div>}>
              {currentStep === 1 && userData && (
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
        </form>
      </div>
    </>
  );
}

export default SignupForm;
