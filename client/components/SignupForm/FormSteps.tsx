import React from "react";

type Props = {
  currentStep: number;
};

function FormSteps({ currentStep }: Props) {
  const generateStepColor = (stepValue: number) => {
    if (stepValue <= currentStep) return "step-primary ";
    if (currentStep === stepValue) return " font-semibold";
  };
  return (
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
  );
}

export default FormSteps;
