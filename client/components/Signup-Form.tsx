import Router from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../models/user";
import { UserDTO } from "../models/userDTO";
import { useAppDispatch, useAppSelector } from "../redux";
import { selectUser, signUpUser } from "../redux/user.reducer";
import { API_KEY, SERVER_API } from "../utils/axios.conif";
import { signup } from "../utils/requests";
import useAutosave from "./hooks/Autosave";
import useLocalSave from "./hooks/useLocalSave";
import Alert, { AlertTypes } from "./ui/Alert";
import MultiHomeUI from "./ui/Multi-Home";
import SingleHomeUI from "./ui/Single-Home";

type Props = {};

const MAX_STEPS = 4;
const MIN_STEPS = 1;

function SignupForm({}: Props) {
  const dispatch = useAppDispatch();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [userData, setUserData] = useState<User | any>({});
  const [housingPreference, setHousingPreference] = useState<
    "Houses" | "Apartments"
  >(userData.housingPreference || null);
  const [membershipStatus, setMembershipStatus] = useState<"Base" | "Premium">(
    userData.membershipStatus || null
  );
  const [isViewingPassword, setIsViewingPassword] = useState(false);
  const [timezone, setTimezone] = useState<string>("");

  const fullNameRef = useRef<HTMLInputElement>(userData.fullName || null);
  const emailRef = useRef<HTMLInputElement>(userData.email || null);
  const passwordRef = useRef<HTMLInputElement>(userData.password || null);
  const photoUrlRef = useRef<HTMLInputElement>(userData.photoUrl || null);
  const zipcodeRef = useRef<HTMLInputElement>(userData.zipcode || null);
  const stateRef = useRef<HTMLSelectElement>(userData.state || null);
  let alert;

  const { isSaved, addToLocalStorage } = useLocalSave();

  useEffect(() => {
    setCurrentStep(
      parseInt(window.localStorage.getItem("currentStep") ?? `${currentStep}`)
    );
    setCompletedSteps(
      JSON.parse(window.localStorage.getItem("completedSteps") ?? "[]")
    );
    setUserData(JSON.parse(window.localStorage.getItem("User") ?? "{}"));
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  const generateStepColor = (stepValue: number) => {
    if (completedSteps.includes(stepValue)) return "step-primary";
    if (currentStep === stepValue) return "step-primary font-semibold";
  };

  const handleNextStep = (e: Event) => {
    e.preventDefault();

    setUserData((prevState: any) => {
      return {
        ...prevState,
        fullName: fullNameRef.current?.value || prevState.fullName,
        email: emailRef.current?.value || prevState.email,
        password: passwordRef.current?.value || prevState.password,
        photoUrl: photoUrlRef.current?.value || prevState.photoUrl,
        housingPreference: housingPreference || prevState.housingPreference,
        membershipStatus: membershipStatus || prevState.membershipStatus,
        zipcode: zipcodeRef.current?.value || prevState.zipcode,
        state: stateRef.current?.value || prevState.state,
        timezone: timezone || prevState.timezone,
      };
    });

    setCompletedSteps((prevState: any) => {
      return [...new Set([...prevState, currentStep])];
    });

    setCurrentStep((prev: number) => {
      console.log(currentStep);
      if (currentStep < MAX_STEPS) return (prev += 1);
      return currentStep;
    });
    console.log(userData);

    addToLocalStorage({
      items: [
        { key: "currentStep", item: currentStep },
        { key: "completedSteps", item: completedSteps },
        {
          key: "User",
          item: userData,
        },
      ],
    });
  };

  const handleBackStep = (e: Event) => {
    e.preventDefault();
    setCompletedSteps((prevState: number[]) => {
      return [...prevState, currentStep];
    });

    setCurrentStep((prevState: number) => {
      if (currentStep > 1) return prevState - 1;
      return currentStep;
    });
    console.log(currentStep, userData);
    addToLocalStorage({
      items: [
        { key: "currentStep", item: currentStep },
        { key: "completedSteps", item: completedSteps },
      ],
    });
  };

  const handleFormSubmit = async (e: Event) => {
    e.preventDefault();

    setUserData((prevState: any) => {
      return {
        ...prevState,
        fullName: fullNameRef.current?.value || prevState.fullName,
        email: emailRef.current?.value || prevState.email,
        password: passwordRef.current?.value || prevState.password,
        photoUrl: photoUrlRef.current?.value || prevState.photoUrl,
        housingPreference: housingPreference || prevState.housingPreference,
        membershipStatus: membershipStatus || prevState.membershipStatus,
        zipcode: zipcodeRef.current?.value || prevState.zipcode,
        state: stateRef.current?.value || prevState.state,
        timezone: timezone || prevState.timezone,
      };
    });
    // alert("Are you sure you're ready to submit this form?");

    console.log("form submitting");

    // if (res.status == 200) {
    //   setCompletedSteps((prevState: number[]) => {
    //     return [...prevState, currentStep];
    //   });

    //   setCurrentStep((prevState: number) => {
    //     if (currentStep < MAX_STEPS) return prevState + 1;
    //     return currentStep;
    //   });
    const res = await dispatch(signUpUser(userData));
    console.log(res);
    if (res.meta.requestStatus.includes("fulfilled")) {
      setCompletedSteps((prevState: any) => {
        return [...new Set([...prevState, currentStep])];
      });

      setCurrentStep((prev: number) => {
        console.log(currentStep);
        if (currentStep < MAX_STEPS) return prev++;
        return currentStep;
      });

      window.localStorage.removeItem("User");
      window.localStorage.removeItem("currentStep");
      window.localStorage.removeItem("completedSteps");

      setTimeout(() => {
        Router.push("/");
      }, 3000);
    }
  };

  const step1Content = (
    <form className="form-control space-y-3">
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
            stroke-width="1.5"
            stroke="currentColor"
            className="w-10 h-10 selectable"
            onClick={() => setIsViewingPassword(true)}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
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
    </form>
  );

  const step2Content = (
    <form className="form-control space-y-3">
      <h1 className="text-3xl font-medium mb-4">
        What can we help you find? 🏡
      </h1>
      <div className="space-y-10">
        <p className="text-center text-xl">I'm looking for a </p>
        <div className="flex justify-between">
          <div
            className={`selectable w-36 ${
              housingPreference === "Houses" ||
              userData.housingPreference === "Houses"
                ? "selected"
                : ""
            }`}
            onClick={() => setHousingPreference("Houses")}
          >
            <SingleHomeUI />
            <p className="font-bold text-xl text-center mt-2">Home</p>
          </div>
          <div
            className={`selectable w-36 ${
              housingPreference === "Apartments" ||
              userData.housingPreference === "Apartment"
                ? "selected"
                : ""
            }`}
            onClick={() => setHousingPreference("Apartments")}
          >
            <MultiHomeUI />
            <p className="font-bold text-xl text-center mt-2">Apartment</p>
          </div>
        </div>
        <p className="text-center text-lg">I'm from </p>
        <input
          type="text"
          name=""
          id=""
          placeholder="zip-code"
          className="input"
          ref={zipcodeRef}
          value={userData.zipcode}
        />
        <select className="select" ref={stateRef} value={userData.state}>
          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="DC">District Of Columbia</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Mississippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PA">Pennsylvania</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
        </select>
      </div>
    </form>
  );

  const step3Content = (
    <form className="form-control space-y-3">
      <h1 className="text-3xl font-medium text-center">Membership Status</h1>
      <div>
        <div className="flex justify-between">
          <div
            className={`selectable w-36 ${
              membershipStatus === "Base" ? "selected" : ""
            }`}
            onClick={() => setMembershipStatus("Base")}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/835/835369.png"
              alt=""
            />
            <p className="font-bold text-xl text-center mt-2">Standard</p>
          </div>
          <div
            className={`selectable w-36 ${
              membershipStatus === "Premium" ? "selected" : ""
            }`}
            onClick={() => setMembershipStatus("Premium")}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3649/3649801.png"
              alt=""
            />
            <article className="font-bold text-xl text-center mt-2">
              <p>Premium</p>
              <p className="text-lg">5.99/mo</p>
            </article>
          </div>
        </div>
        <div className="overflow-x-auto border-t-4 border-black p-5 mt-5">
          <table className="table w-full">
            {/* <!-- head --> */}
            <thead className="text-center">
              <tr>
                <th></th>
                <th>Standard</th>
                <th></th>
                <th>Premium</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {/* <!-- row 1 --> */}
              <tr>
                <th></th>
                <td></td>
                <td>View price history and housing metrics</td>
                <td>✅</td>
              </tr>
              {/* <!-- row 2 --> */}
              <tr>
                <th></th>
                <td>✅</td>
                <td> View nearby homes and local schools</td>
                <td>✅</td>
              </tr>
              {/* <!-- row 3 --> */}
              <tr>
                <th></th>
                <td></td>
                <td>Save homes to favorites collection</td>
                <td>✅</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </form>
  );

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
      {/* Steps */}
      <div className="flex flex-col items-center mt-4 ">
        {alert}
        <ul className="steps lg:text-lg text-sm">
          <li className={`step ${generateStepColor(1)}`} value={1}>
            Register
          </li>
          <li className={`step ${generateStepColor(2)}`} value={2}>
            Location {"&"} Preferences
          </li>
          <li className={`step ${generateStepColor(3)}`} value={3}>
            Membership{" "}
          </li>
          <li className={`step ${generateStepColor(4)}`} value={4}>
            Completed!{" "}
          </li>
        </ul>
        {/* <h1>{isSaving && "Saving..."}</h1> */}
        <form onSubmit={handleFormSubmit}>
          <div className="form-control  space-y-4 w-screen lg:w-full mt-20 p-8 ">
            {currentStep === 1 && step1Content}
            {currentStep === 2 && step2Content}
            {currentStep === 3 && step3Content}
            {currentStep === 4 && step4Content}
          </div>
          <div className="flex justify-between mt-4">
            <button
              className={`btn ${currentStep === MIN_STEPS && "btn-disabled"}`}
              onClick={handleBackStep}
            >
              Back
            </button>
            {currentStep === 3 ? (
              <button className={`btn btn-primary `} type="submit">
                Finish
              </button>
            ) : (
              <button className={`btn  `} onClick={handleNextStep}>
                Next
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
