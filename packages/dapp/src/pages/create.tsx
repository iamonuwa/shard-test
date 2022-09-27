import Button from "components/Button";
import Container from "components/Container";
import { Footer } from "components/Footer";
import Dropdown from "components/Form/Dropdown";
import { Input } from "components/Form/Input";
import { Hero } from "components/Hero";
import { Step, StepProps } from "components/Step";
import Web3Status from "components/Wallet/Web3Status";
import { CARS } from "constants/cars";
import { useActiveWeb3React } from "hooks/useActiveWeb3React";
import { useBlockchain } from "hooks/useBlockchain";
import { useIPFS } from "hooks/useIPFS";
import { NextPage } from "next";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { FUEL_TYPE } from "services/fuel";

type FormState = {
  vehicle_number: string;
  vehicle_model: string;
  manufacture_year: string;
  primary_colour: string;
  fuel_type: string;
  engine: string;
  registration_place: string;
};

const title = "Register new Vehicle Information";
const steps: StepProps[] = [
  { name: "Vehicle Information", description: "Register Vehicle" },
  { name: "Preview", description: "Preview Vehicle Information" },
];

const RegisterVehicle: NextPage = () => {
  const [index, setIndex] = useState<number>(0);
  const { uploadMetadata } = useIPFS();
  const { registerVehicle } = useBlockchain();
  const { account } = useActiveWeb3React();

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormState>({ mode: "all" });

  const onSubmit = async (payload: FormState) => {
    const metadata = {
      ...payload,
    };
    if (index > steps.length) {
      const cid = await uploadMetadata(metadata);
      await registerVehicle(cid, payload.vehicle_number);
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
    <Fragment>
      <title>{title}</title>
      <Hero title={title} />
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
        <Container className="py-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 border p-3 shadow-sm">
            <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
              <div className="w-full">
                <Input
                  label="Vehicle Number"
                  type="text"
                  {...register("vehicle_number")}
                  name="vehicle_number"
                  placeholder="WW-AMG-123"
                />
              </div>
              <div className="w-full">
                <Dropdown
                  options={CARS}
                  label="Vehicle Model"
                  keyPropFn={option => option}
                  valuePropFn={option => option && option?.name}
                  onSelected={item => setValue("vehicle_model", item as string)}
                  placeholder="Select Model"
                  selected={watch("vehicle_model")}
                />
              </div>
              <div className="w-full">
                <Dropdown
                  options={manufacture_years()}
                  label="Year of Manufacture"
                  keyPropFn={option => option}
                  valuePropFn={option => option}
                  onSelected={item => setValue("manufacture_year", item as string)}
                  selected={watch("manufacture_year")}
                />
              </div>
              <div className="w-full">
                <Input
                  label="Primary Colour"
                  {...register("primary_colour")}
                  type="text"
                  name="primary_colour"
                  placeholder="Black"
                />
              </div>
              <div className="w-full">
                <Dropdown
                  options={FUEL_TYPE}
                  label="Fuel Type"
                  keyPropFn={option => option}
                  valuePropFn={option => option}
                  onSelected={item => setValue("fuel_type", item as string)}
                  selected={watch("fuel_type")}
                />
              </div>

              <div className="w-full">
                <Input label="Engine" {...register("engine")} type="text" name="engine" placeholder="33cc" />
              </div>
              <div className="w-full">
                <Input
                  label="Registration Place"
                  {...register("registration_place")}
                  type="text"
                  placeholder="Cardiff"
                />
              </div>
            </div>
            <div className="flex sm:justify-center md:justify-end">
              {account ? (
                <Button disabled={isSubmitting || Object.values(errors).length > 0} className="sm:w-full md:w-64">
                  {steps.length > index ? "Next" : "Submit Vehicle Information"}
                </Button>
              ) : (
                <Web3Status />
              )}
            </div>
          </form>
        </Container>
      </main>
      <Footer />
    </Fragment>
  );
};

export default RegisterVehicle;
