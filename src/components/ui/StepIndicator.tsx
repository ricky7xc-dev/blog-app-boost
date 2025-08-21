import { Check } from "lucide-react";

export const StepIndicator = ({ currentStep }: { currentStep: number }) => {
  const steps = ["Metadata", "Summary", "Content", "Review"];

  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div
            className={`
            flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium
            ${
              index + 1 <= currentStep
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-600"
            }
          `}
          >
            {index + 1 < currentStep ? <Check size={16} /> : index + 1}
          </div>
          <span
            className={`ml-2 text-sm ${
              index + 1 <= currentStep ? "text-blue-600" : "text-gray-400"
            }`}
          >
            {step}
          </span>
          {index < steps.length - 1 && (
            <div
              className={`w-8 h-0.5 mx-4 ${
                index + 1 < currentStep ? "bg-blue-600" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};
