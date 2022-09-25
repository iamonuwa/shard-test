import { useState } from "react";
import { CAR_MODELS } from "services/cars";
import { FUEL_TYPE } from "services/fuel";
import { Button } from "./Button";
import Container from "./Container";
import Dropdown from "./Dropdown";
import { Input } from "./Input";
import { Step } from "./Step";

interface Step {
  name: string;
  description: string;
  href: string;
}

const steps: Step[] = [
  { name: "Vehicle Information", description: "Vitae sed mi luctus laoreet.", href: "#" },
  { name: "Preview", description: "Penatibus eu quis ante.", href: "#" },
];

export const Form = () => {
  const [index, setIndex] = useState<number>(0);

  const submitForm = () => {
    if (index > steps.length) {
      console.log("Submitted!!!");
    } else {
      setIndex(index + 1);
    }
  };

  const manufacture_years = () => {
    let years: number[] = [];
    for (let index = 1900; index < 2022; index++) {
      years.push(index);
    }
    return years;
  };

  return (
    <main className="space-y-3">
      <div className="lg:border-t lg:border-b lg:border-gray-200">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Progress">
          <ol
            role="list"
            className="overflow-hidden rounded-md lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-gray-200"
          >
            {steps.map((step, stepIdx) => (
              <Step key={stepIdx} step={{ ...step, index: stepIdx }} size={steps.length} />
            ))}
          </ol>
        </nav>
      </div>
      <Container>
        <form className="space-y-8 border p-3 shadow-sm">
          <div className="grid grid-cols-3 gap-4">
            <div className="w-full">
              <Dropdown
                options={CAR_MODELS}
                label="Vehicle Model"
                keyPropFn={option => option}
                valuePropFn={option => option.brand}
                onSelected={item => console.log(item)}
                placeholder="Select Model"
                selected={""}
              />
            </div>
            <div className="w-full">
              <Dropdown
                options={manufacture_years()}
                label="Year of Manufacture"
                keyPropFn={option => option}
                valuePropFn={option => option}
                onSelected={item => console.log(item)}
                selected={""}
              />
            </div>
            <div className="w-full">
              <Input label="Primary Colour" type="text" name="primary_colour" placeholder="Black" />
            </div>

            <div className="w-full">
              <Dropdown
                options={FUEL_TYPE}
                label="Fuel Type"
                keyPropFn={option => option}
                valuePropFn={option => option}
                onSelected={item => console.log(item)}
                selected={""}
              />
            </div>

            <div className="w-full">
              <Input label="Engine" type="text" name="engine" placeholder="33cc" />
            </div>
            <div className="w-full">
              <Input label="Registration Place" type="text" name="registration_place" placeholder="Cardiff" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="button" className="w-64 py-4 rounded-none" onClick={() => submitForm()}>
              {steps.length > index ? "Next" : "Submit Vehicle Information"}
            </Button>
          </div>
        </form>
      </Container>
    </main>
  );
};
