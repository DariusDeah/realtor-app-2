import React, { lazy, Suspense, useState } from "react";
import OnHoverAnimation from "../animations/OnHoverAnimation";
import useUpdateLocalSave from "../hooks/useUpdateLocalSave";
import FormButton from "./FormButton";
const MembershipComparisonTable = lazy(
  () => import("../MembershipComparisonTable")
);

type Props = {
  userData: any;
  nextStepFunction: (event: Event, data: any) => void;
  backStepFunction: (e: Event) => void;
};

function FormStep3({ userData, nextStepFunction, backStepFunction }: Props) {
  const [membershipStatus, setMembershipStatus] = useState<"Base" | "Premium">(
    userData.membershipStatus || null
  );
  const addToLocalStorage = useUpdateLocalSave();

  const handleSubmit = (e: Event) => {
    const userSubmissionData = {
      membershipStatus,
    };
    addToLocalStorage("User", userSubmissionData);
    nextStepFunction(e, userSubmissionData);
  };
  return (
    <form className="form-control space-y-3">
      <h1 className="text-3xl font-medium text-center">Membership Status</h1>
      <div>
        <div className="flex justify-between">
          <OnHoverAnimation
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
          </OnHoverAnimation>
          <OnHoverAnimation
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
          </OnHoverAnimation>
          <Suspense fallback={<div>Table Loading...</div>}>
            <MembershipComparisonTable />
          </Suspense>
        </div>
        <div className="overflow-x-auto border-t-4 border-black p-5 mt-5"></div>
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
    </form>
  );
}

export default FormStep3;
