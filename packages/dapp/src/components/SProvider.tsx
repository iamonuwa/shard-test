import { useActiveWeb3React } from "hooks/useActiveWeb3React";
import { useServiceProvider } from "store/hooks/useServiceProvider";
import { Button } from "./Button";
import { Modal } from "./Modal";

export const ServiceProvider = () => {
  const { isDialogOpen, toggleDialog } = useServiceProvider();
  const { library } = useActiveWeb3React();

  return (
    <Modal isOpen={isDialogOpen} onClose={() => toggleDialog(false)}>
      <div className="space-y-2">
        <div className="">
          <div className="text-lg font-medium leading-6 text-gray-900">Register New Service Provider</div>
        </div>

        <div className="">
          <label htmlFor="wallet_address" className="block text-sm font-medium text-gray-700">
            Wallet Address
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="wallet_address"
              id="wallet_address"
              className="block w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="0x0000000000000000000000000000000000000000"
            />
          </div>
        </div>

        <Button className="w-full" color="blue">
          Add Service Provider
        </Button>
      </div>
    </Modal>
  );
};
