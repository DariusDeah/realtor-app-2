import React, { useRef, useState } from "react";
import { User } from "../../models/user";
import OnHoverAnimation from "../animations/OnHoverAnimation";
import useDebounceInput from "../hooks/useDebounceInput";
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
  >(userData.housingPreference || "Houses");

  const addToLocalStorage = useUpdateLocalSave();

  const {
    onChangeHandler: budgetMinOnChange,
    value: budgetMinValue,
    error: budgetMinError,
    errorMessage: budgetMinErrorMessage,
    onBlurHandler: budgetMinOnBlur,
  } = useDebounceInput({
    defaultInput: "",
    rules: {
      minLength: 1,
      maxLength: 50,
    },
  });

  const {
    onChangeHandler: budgetMaxOnChange,
    value: budgetMaxValue,
    error: budgetMaxError,
    errorMessage: budgetMaxErrorMessage,
    onBlurHandler: budgetMaxOnBlur,
  } = useDebounceInput({
    defaultInput: "",
    rules: {
      minLength: 1,
      maxLength: 50,
    },
  });

  const {
    onChangeHandler: bathroomOnChange,
    value: bathroomValue,
    error: bathroomError,
    errorMessage: bathroomErrorMessage,
    onBlurHandler: bathroomOnBlur,
  } = useDebounceInput({
    defaultInput: "",
    rules: {
      minLength: 1,
      maxLength: 50,
    },
  });

  const {
    onChangeHandler: bedroomOnChange,
    value: bedroomValue,
    error: bedroomError,
    errorMessage: bedroomErrorMessage,
    onBlurHandler: bedroomOnBlur,
  } = useDebounceInput({
    defaultInput: "",
    rules: {
      minLength: 1,
      maxLength: 50,
    },
  });

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const userSubmissionData = {
      housingPreferences: {
        type: housingPreference,
        budget: {
          min: budgetMinValue,
          max: budgetMaxValue,
        },
        bathroom: bathroomValue,
        bedroom: bedroomValue,
      },
    };
    addToLocalStorage("User", userSubmissionData);
    nextStepFunction(e, userSubmissionData);
  };

  return (
    <div className="form-control flex flex-col justify-between gap-3 ">
      <h1 className="text-3xl font-medium mb-4">
        What can we help you find? 🏡
      </h1>
      <div className=" flex flex-col gap-10">
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
        <div className="flex flex-col gap-3">
          <p className="font-semibold text-2xl">Preferences</p>
          <div className="flex gap-4 flex-wrap">
            <div className="">
              <p>Budget Min.</p>
              <label className="input-group">
                <span>$</span>
                <input
                  type="number"
                  className="input input-bordered"
                  onChange={budgetMinOnChange}
                  onBlur={budgetMinOnBlur}
                  value={budgetMinValue}
                />
              </label>
              {housingPreference === "Apartments" && (
                <p className="text-gray-400 text-end">/mo</p>
              )}
            </div>
            <div className="">
              <p>Budget Max.</p>
              <label className="input-group">
                <span>$</span>
                <input
                  type="number"
                  className="input input-bordered"
                  onChange={budgetMaxOnChange}
                  onBlur={budgetMaxOnBlur}
                  value={budgetMaxValue}
                />
              </label>
              {housingPreference === "Apartments" && (
                <p className="text-gray-400 text-end">/mo</p>
              )}
            </div>
            <div>
              <p>Beds</p>
              <input
                className="input input-bordered"
                type="number"
                onChange={bathroomOnChange}
                onBlur={bathroomOnBlur}
                value={bathroomValue}
              />
            </div>
            <div>
              <p> Baths</p>
              <input
                className="input input-bordered"
                type="number"
                onChange={bedroomOnChange}
                onBlur={bedroomOnBlur}
                value={bedroomValue}
              />
            </div>
          </div>
        </div>

        <p className="text-xs">
          Filling out this information will help us provide you with homes or
          apartments based around your preferences and or goals{" "}
        </p>
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
