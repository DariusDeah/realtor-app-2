import React, { useRef, useState } from "react";
import OnHoverAnimation from "../animations/OnHoverAnimation";
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
  const zipcodeRef = useRef<HTMLInputElement>(userData.zipcode || null);
  const stateRef = useRef<HTMLSelectElement>(userData.state || null);

  const handleSubmit = (e: Event) => {
    const userSubmissionData = {
      housingPreference,
      zipcode: zipcodeRef.current.value,
      state: stateRef.current.value,
    };
    nextStepFunction(e, userSubmissionData);
  };

  return (
    <div className="form-control space-y-3">
      <h1 className="text-3xl font-medium mb-4">
        What can we help you find? 🏡
      </h1>
      <div className="space-y-10">
        <p className="text-center text-xl">I'm looking for a </p>
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
      <div className="flex justify-between mt-4  ">
        <FormButton
          title="Back"
          style={`${"btn"}`}
          onClick={(e) => backStepFunction(e)}
        />
        <FormButton
          style="btn btn-primary"
          title="Next"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}

export default FormStep2;
