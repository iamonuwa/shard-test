import { FC } from "react";

type FuelType = "DIESEL" | "FUEL" | "ELECTRIC";

type VehicleProps = {
  vehicle: {
    model: string;
    date_of_first_registration: string;
    year_of_manufacture: string;
    cylinder_cap: number;
    fuel_type: FuelType;
    color: string;
  };
  mileage: {};
  repairs: {};
};

export const Vehicle: FC<VehicleProps> = () => {
  return null;
};
