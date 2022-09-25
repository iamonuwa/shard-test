import { Form } from "components/Form";
import { Hero } from "components/Hero";
import { NextPage } from "next";

const RegisterVehicle: NextPage = () => {
  const title = "Register new Vehicle Information";
  return (
    <main>
      <title>{title}</title>
      <Hero title={title} />
      <Form />
    </main>
  );
};

export default RegisterVehicle;
