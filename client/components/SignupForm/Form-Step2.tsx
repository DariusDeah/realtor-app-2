import React, { useRef, useState } from "react";
import OnHoverAnimation from "../animations/OnHoverAnimation";
import useUpdateLocalSave from "../hooks/useUpdateLocalSave";
import MultiHomeUI from "../ui/Multi-Home";
import SingleHomeUI from "../ui/Single-Home";
import FormButton from "./FormButton";

type Props = {
  userData: any;
  nextStepFunction: (event: Event, data: any) => void;
  backStepFunction: (e: Event) => void;
};

function FormStep2({ userData, nextStepFunction, backStepFunction }: Props) {
  const [housingPreference, setHousingPreference] = useState<
    "Houses" | "Apartments"
  >(userData.housingPreference || null);
  const addToLocalStorage = useUpdateLocalSave();

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const userSubmissionData = {
      housingPreference,
    };
    addToLocalStorage("User", userSubmissionData);
    nextStepFunction(e, userSubmissionData);
  };

  return (
    <div className="form-control flex flex-col justify-between ">
      <h1 className="text-3xl font-medium mb-4">
        What can we help you find? 🏡
      </h1>
      <div className="">
        <div className="flex justify-between">
          <OnHoverAnimation
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
          </OnHoverAnimation>
          <OnHoverAnimation
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
          </OnHoverAnimation>
        </div>
      </div>
      <div className="divider"></div>
      <div className="flex justify-between mt-4  ">
        <FormButton
          title="Back"
          style={`${"btn"}`}
          onClick={(e) => backStepFunction(e)}
        />
        <FormButton
          style="btn btn-primary"
          title="Next"
          disabled={!housingPreference}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}

export default FormStep2;
