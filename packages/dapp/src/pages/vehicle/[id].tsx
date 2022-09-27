import Button from "components/Button";
import Container from "components/Container";
import { Hero } from "components/Hero";
import Table from "components/Table";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { FC, Fragment, useMemo } from "react";
import { useVehicleHistory } from "store/hooks/useVehicleHistory";

const Vehicle: FC<NextPage> = () => {
  const router = useRouter();
  const vin = router?.query?.id?.toString().toUpperCase();
  const { toggleDialog } = useVehicleHistory();
  const columns = [
    {
      Header: "Assets",
      accessor: "asset",
    },
    {
      Header: "Note",
      accessor: "note",
    },
    {
      Header: "Uploader",
      accessor: "user",
    },
    {
      Header: "Date repaired",
      accessor: "date",
    },
  ];
  const data = useMemo(() => [], []);
  return (
    <Fragment>
      <Hero title={`View repair history for ${vin}`} />
      <main className="py-4">
        <Container>
          <div className="flex justify-end">
            <Button onClick={() => toggleDialog()}>Upload repair information</Button>
          </div>
          <div className="mt-4 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <Table data={data} columns={columns} />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </Fragment>
  );
};

export default Vehicle;
