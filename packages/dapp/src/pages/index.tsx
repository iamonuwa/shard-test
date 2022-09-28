import type { NextPage } from "next";
import { ChangeEvent, Fragment, useCallback, useEffect, useState } from "react";
import { Blur } from "components/Blur";
import Container from "components/Container";
import { Hero } from "components/Hero";
import Head from "next/head";
import { useVehicleRegistry } from "store/hooks/useVehicleRegistry";
import { Search } from "components/Search";
import { BoltSlashIcon, InformationCircleIcon } from "@heroicons/react/24/solid";
import { Footer } from "components/Footer";
import Table from "components/Table";
import { Metadata, useIPFS } from "hooks/useIPFS";
import Fuse from "fuse.js";
import Link from "components/Link";

const Home: NextPage = () => {
  const title = "Decentralized Vehicle Database";
  const { loadVehicles, data, error, loading } = useVehicleRegistry();
  const { getMetadata } = useIPFS();
  const [metadata, setMetadata] = useState<Metadata[]>([]);
  const query = new Fuse(metadata, {
    keys: ["vehicle_number", "registration_place", "manufacture_year", "vehicle_model.name"],
  });

  const loadMetadata = async () => {
    let metadataList: Metadata[] = [];
    data.forEach(async item => {
      const metadataObject = await getMetadata(item.ipfsHash);
      metadataList.push(metadataObject);
    });
    setMetadata(metadataList);
  };

  useEffect(() => {
    loadVehicles();
    loadMetadata();
  }, [data]);

  const columns = [
    {
      Header: "VIN",
      accessor: "vehicle_number",
    },
    {
      Header: "Brand",
      accessor: "vehicle_model.name",
    },
    {
      Header: "Engine",
      accessor: "engine",
    },
    {
      Header: "Fuel Consumption",
      accessor: "fuel_type",
    },
    {
      Header: "Manufacture year",
      accessor: "manufacture_year",
    },
    {
      Header: "Place of Registration",
      accessor: "registration_place",
    },
    {
      Header: "",
      accessor: "view_btn",
    },
  ];

  const handleFilter = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const filterInput = e.target.value;
      if (filterInput.length > 3) {
        const filterResult = query.search(e.target.value).map(item => item.item);
        setMetadata(filterResult);
      } else {
        loadMetadata();
      }
    },
    [data],
  );

  const getRow = () =>
    metadata.map(item => ({
      ...item,
      view_btn: (
        <Link className="" href={`/vehicle/${item.vehicle_number.toLowerCase()}`}>
          View repair history
        </Link>
      ),
    }));

  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>{title}</title>
      </Head>
      <Hero title={title} />
      <div className="pointer-events-none sticky top-0 z-10 -mb-10 overflow-hidden pb-10 sm:-mb-11 sm:pb-11 md:-mb-12 md:pb-12">
        <div className="relative">
          <Blur className="absolute bottom-[-16px] left-1/2 ml-[-570px] w-[1140px]" />
          <Search onChange={handleFilter} />
        </div>
      </div>
      <main className="py-4">
        <Container>
          {loading && (
            <div className="shadow rounded-md p-4 max-w-sm w-full mx-auto">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-slate-200 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {error && (
            <div className="h-64 w-full flex flex-col justify-center items-center">
              <BoltSlashIcon className="h-12 w-12 text-gray-600" />
              <p className="text-lg text-gray-600 font-bold">An error occured {error}</p>
            </div>
          )}
          {!error && metadata.length > 0 ? (
            <div className="mt-4 flex flex-col">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="-mx-4 mt-8 overflow-hidden shadow sm:-mx-6 md:mx-0">
                    <Table data={getRow()} columns={columns} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-64 w-full flex flex-col justify-center items-center">
              <InformationCircleIcon className="h-12 w-12 text-gray-600" />
              <p className="text-lg text-gray-600 font-bold">No information available</p>
            </div>
          )}
        </Container>
      </main>
      <Footer />
    </Fragment>
  );
};

export default Home;
