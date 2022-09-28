import React, { lazy, Suspense, useState } from "react";
const MembershipComparisonTable = lazy(
  () => import("../MembershipComparisonTable")
);

type Props = {
  userData: any;
  nextStepFunction: (event: Event, data: any) => void;
};

function FormStep3({ userData, nextStepFunction }: Props) {
  const [membershipStatus, setMembershipStatus] = useState<"Base" | "Premium">(
    userData.membershipStatus || null
  );
  return (
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
          <Suspense fallback={<div>Table Loading...</div>}>
            <MembershipComparisonTable />
          </Suspense>
        </div>
        <div className="overflow-x-auto border-t-4 border-black p-5 mt-5"></div>
      </div>
    </form>
  );
}

export default FormStep3;
