import { useIPFS } from "hooks/useIPFS";
import { FC, useEffect } from "react";
import { VehicleData } from "services/queries/vehicle";
import Link from "./Link";

type VehicleProps = {
  data: VehicleData;
};

export const Vehicle: FC<VehicleProps> = ({ data }) => {
  const { ipfsHash } = data;
  const { metadata, getMetadata } = useIPFS();
  useEffect(() => {
    const fetchMetadata = async () => {
      await getMetadata(ipfsHash);
    };
    fetchMetadata();
  }, [ipfsHash]);

  return (
    <Link
      href={`/vehicle/${metadata?.vehicle_number.toLowerCase()}`}
      className="overflow-hidden shadow-md border border-gray-200 bg-white px-4 py-5 sm:px-6"
    >
      <div className="font-bold text-xl mb-2">{metadata?.vehicle_number}</div>
      <p className="text-base">Engine: {`${metadata?.engine}`}</p>
      <p className="text-base">Fuel: {`${metadata?.fuel || 0}`}</p>
      <p className="text-base">Manufacture year: {`${metadata?.manufacture_year || null}`}</p>
      <p className="text-base">Registered in: {`${metadata?.registration_place || null}`}</p>
    </Link>
  );
};
