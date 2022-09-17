import React, { useState } from "react";
import MultiHomeUI from "./ui/Multi-Home";
import SingleHomeUI from "./ui/Single-Home";

type Props = {};

const MAX_STEPS = 4;
const MIN_STEPS = 1;

function SignupForm({}: Props) {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const generateStepColor = (stepValue: number) => {
    if (completedSteps.includes(stepValue)) return "step-primary";
    if (currentStep === stepValue) return "step-primary font-semibold";
  };

  const handleNextStep = () => {
    setCompletedSteps((prevState: number[]) => {
      return [...prevState, currentStep];
    });
    setCurrentStep((prev: number) => {
      console.log(currentStep);
      if (currentStep < MAX_STEPS) return prev + 1;
      return currentStep;
    });
  };

  const handleBackStep = () => {
    setCompletedSteps((prevState: number[]) => {
      return prevState.filter((x) => x !== currentStep);
    });
    setCurrentStep((prevState: number) => {
      if (currentStep > 1) return prevState - 1;
      return currentStep;
    });
  };

  const step1Content = (
    <>
      <h1 className="text-3xl font-medium">Help us get to know you 👏</h1>
      <input type="text" placeholder="Full Name" className="input" />

      <input type="text" placeholder="Photo Url" className="input" />
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

        <input type="email" placeholder="Email" className="input border-none" />
      </div>
      <input type="password" placeholder="Password" className="input" />
    </>
  );

  const step2Content = (
    <>
      <h1 className="text-3xl font-medium">What can we help you find? 🏡</h1>
      <div>
        <p className="text-center text-xl">I'm looking for a </p>
        <div className="flex justify-between">
          <div className="selectable w-36 ">
            <SingleHomeUI />
            <p className="font-bold text-xl text-center mt-2">Home</p>
          </div>
          <div className="selectable w-36">
            <MultiHomeUI />
            <p className="font-bold text-xl text-center mt-2">Apartment</p>
          </div>
        </div>
      </div>
      <p className="text-center text-lg">I'm from </p>
      <input
        type="text"
        name=""
        id=""
        placeholder="zip-code"
        className="input"
      />
      <select className="select">
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
    </>
  );

  const step3Content = (
    <>
      <h1 className="text-3xl font-medium">Membership Status</h1>
      <div>
        <div className="flex justify-between">
          <div className="selectable w-36 ">
            <SingleHomeUI />
            <p className="font-bold text-xl text-center mt-2">Home</p>
          </div>
          <div className="selectable w-36">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3649/3649801.png"
              alt=""
            />
            <p className="font-bold text-xl text-center mt-2">Apartment</p>
          </div>
        </div>
      </div>
    </>
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
    <div className=" border-2 lg:max-w-screen-md w-screen rounded-lg mx-4 p-5">
      {/* Steps */}
      <div className="flex flex-col items-center mt-4 ">
        <ul className="steps">
          <li className={`step ${generateStepColor(1)}`} value={1}>
            Register
          </li>
          <li className={`step ${generateStepColor(2)}`} value={2}>
            Location {"&"} Prefrences
          </li>
          <li className={`step ${generateStepColor(3)}`} value={3}>
            Membership{" "}
          </li>
          <li className={`step ${generateStepColor(4)}`} value={4}>
            Completed!{" "}
          </li>
        </ul>

        <form>
          <div className="form-control p-28 space-y-4">
            {currentStep === 1 && step1Content}
            {currentStep === 2 && step2Content}
            {currentStep === 3 && step3Content}
            {currentStep === 4 && step4Content}
          </div>
        </form>
      </div>
      <div className="flex justify-between">
        <button className="btn" onClick={handleBackStep}>
          Back
        </button>
        <button className="btn" onClick={handleNextStep}>
          Next
        </button>
      </div>
    </div>
  );
}

export default SignupForm;
