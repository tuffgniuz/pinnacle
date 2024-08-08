import { LucideArrowRight } from "lucide-react";
import { FC, ReactNode } from "react";

type Step = {
  stepCount: number;
  isCurrentStep: boolean;
  completed: boolean;
  label: string;
};

const StepTracker: FC<{ steps: Step[] }> = ({ steps }) => {
  return (
    <div className="flex items-center gap-3">
      {steps.map((step) => (
        <div
          key={step.stepCount}
          className={`flex items-center justify-center h-8 w-8 rounded-lg transition-all duration-300 ease-in-out ${
            step.isCurrentStep
              ? "bg-accent-light-300 text-text-light-900"
              : step.completed
                ? "bg-accent-dark-300 text-text-light-700"
                : "bg-background-dark-500 text-text-light-700"
          }`}
        >
          {step.stepCount}
        </div>
      ))}
      <div className="flex items-center gap-5">
        <LucideArrowRight />
        <p className="font-medium">
          {steps.find((step) => step.isCurrentStep)?.label}
        </p>
      </div>
    </div>
  );
};

export default StepTracker;
