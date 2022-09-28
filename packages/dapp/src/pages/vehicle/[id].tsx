import Button from "components/Button";
import Container from "components/Container";
import { Hero } from "components/Hero";
import Table from "components/Table";
import { useIPFS } from "hooks/useIPFS";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { FC, Fragment, useEffect, useState } from "react";
import { History } from "services/queries/history";
import { useVehicleHistory } from "store/hooks/useVehicleHistory";

const Vehicle: FC<NextPage> = () => {
  const router = useRouter();
  const vin = router?.query?.id?.toString().toUpperCase() as string;

  const { toggleDialog, loadHistory, data } = useVehicleHistory();
  const { getMetadata } = useIPFS();
  const [metadata, setMetadata] = useState<History[]>([]);

  const columns = [
    {
      Header: "ID",
      accessor: "id",
    },
    // {
    //   Header: "Note",
    //   accessor: "report",
    // },
    {
      Header: "Uploader",
      accessor: "user.id",
    },
    {
      Header: "Date logged",
      accessor: "createdAt",
    },
  ];

  const loadMetadata = async () => {
    let metadataList: History[] = [];
    data?.repairs.forEach(async item => {
      const metadataObject = await getMetadata(item.ipfsHash);
      metadataList.push({
        ...item,
        ...metadataObject,
      });
    });
    setMetadata(metadataList);
  };

  useEffect(() => {
    loadHistory(vin);
    loadMetadata();
  }, [data]);

  return (
    <Fragment>
      <Hero image={""} alt="" title={`View repair history for ${vin}`} />
      <main className="py-4">
        <Container>
          <div className="flex justify-end">
            <Button onClick={() => toggleDialog()}>Upload repair information</Button>
          </div>
          <div className="mt-4 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="-mx-4 mt-8 overflow-hidden shadow sm:-mx-6 md:mx-0">
                  <Table data={metadata} columns={columns} />
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
