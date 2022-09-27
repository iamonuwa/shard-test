import { FC } from "react";
import { classNames } from "./utils";

export type StepProps = {
  name: string;
  description: string;
  index?: number;
};

export const Step: FC<{ step: StepProps; size: number }> = ({ step, size }) => {
  return (
    <li className="relative overflow-hidden lg:flex-1">
      <div
        className={classNames(
          step.index === 0 ? "border-b-1" : "",
          "border border-gray-200 overflow-hidden lg:border-0",
        )}
      >
        <div className="group">
          <span
            className="absolute top-0 left-0 h-full w-1 bg-transparent lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
            aria-hidden="true"
          />
          <span
            className={classNames(step.index !== 0 ? "lg:pl-9" : "", "px-6 py-5 flex items-start text-sm font-medium")}
          >
            <span className="flex-shrink-0">
              <span
                className={classNames(
                  "flex h-10 w-10 items-center justify-center rounded-full",
                  step.index! > size ? "bg-indigo-600" : "border",
                )}
              >
                {step.index! + 1}
              </span>
            </span>
            <span className="mt-0.5 ml-4 flex min-w-0 flex-col">
              <span className="text-sm font-medium">{step.name}</span>
              <span className="text-sm font-medium text-gray-500">{step.description}</span>
            </span>
          </span>
        </div>
      </div>
    </li>
  );
};
