import { AbstractConnector } from "@web3-react/abstract-connector";
import { FC, Fragment } from "react";

interface PendingProps {
  connector?: AbstractConnector;
  error?: boolean;
  setPendingError: (error: boolean) => void;
  tryActivation: (connector: AbstractConnector) => void;
}

const Pending: FC<PendingProps> = ({ connector, error, setPendingError, tryActivation }) => {
  return (
    <Fragment>
      {error ? (
        <div className="px-3 my-3 cursor-pointer border border-red-300 w-full">
          <div className="flex items-center justify-between">
            <div className="flex item-center space-x-1">
              <div className="text-red-500">Error connecting.</div>
            </div>
            <div
              className="py-2 text-sm text-blue-500 cursor-pointer font-normal"
              onClick={() => {
                setPendingError(false);
                connector && tryActivation(connector);
              }}
            >
              Try again
            </div>
          </div>
        </div>
      ) : (
        <div className="px-3 my-3 rounded-md border w-full">
          <div className="flex justify-between py-2">
            <div>Initializing...</div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Pending;
