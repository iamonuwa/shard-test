import type { NextPage } from "next";
import { Fragment, useEffect, useState } from "react";
import { Blur } from "components/Blur";
import Container from "components/Container";
import { Hero } from "components/Hero";
import Head from "next/head";
import { useVehicleRegistry } from "store/hooks/useVehicleRegistry";
import { Search } from "components/Search";
import { BoltSlashIcon, InformationCircleIcon } from "@heroicons/react/24/solid";
import { Footer } from "components/Footer";
import Table from "components/Table";
import { useIPFS } from "hooks/useIPFS";

const Home: NextPage = () => {
  const title = "Decentralized Vehicle Database";
  let [query, setQuery] = useState("");
  const { loadVehicles, data, error, loading } = useVehicleRegistry();
  const { metadata, getMetadata } = useIPFS();

  const columns = [
    {
      Header: "VIN",
      accessor: "vehicle_number",
    },
    {
      Header: "Engine",
      accessor: "engine",
    },
    {
      Header: "Fuel Consumption",
      accessor: "fuel",
    },
    {
      Header: "Manufacture year",
      accessor: "manufacture_year",
    },
    {
      Header: "Place of Registration",
      accessor: "registration_place",
    },
  ];

  useEffect(() => {
    loadVehicles();
  }, []);

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
          <Search onChange={setQuery} query={query} />
        </div>
      </div>
      <main className="py-4">
        <Container>
          {loading && (
            <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
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
          {!error && data.length > 0 ? (
            <div className="mt-4 flex flex-col">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden ring-1 ring-black ring-opacity-5">
                    <Table data={data} columns={columns} />
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
