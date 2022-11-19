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
    <div className="form-control flex gap-y-5 ">
      <h1 className="lg:text-3xl font-medium text-center ">
        Membership Status
      </h1>
      <div>
        <div className="flex flex-col ">
          <div className="flex justify-between">
            <div>
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
            </div>
            <div>
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
            </div>
          </div>
          <Suspense fallback={<div>Table Loading...</div>}>
            <div className="overflow-auto">
              <MembershipComparisonTable />
            </div>
          </Suspense>
        </div>
        <div className="flex justify-between  ">
          <FormButton title="Back" onClick={(e) => backStepFunction(e)} />
          <FormButton
            title="Next"
            disabled={!membershipStatus}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default FormStep3;
