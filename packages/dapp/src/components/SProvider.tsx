import { useRef } from "react";
import { useServiceProvider } from "store/hooks/useServiceProvider";
import { Button } from "./Button";
import { Modal } from "./Modal";

export const ServiceProvider = () => {
  const { isDialogOpen, toggleDialog } = useServiceProvider();

  return (
    <Modal title="Register New Service Provider" isOpen={isDialogOpen} onClose={() => toggleDialog(false)}>
      <div className="space-y-3">
        <div className="">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="name"
              id="name"
              className="block w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="John Doe"
            />
          </div>
        </div>
        <div className="">
          <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="mt-1">
            <input
              type="email"
              name="email_address"
              id="email_address"
              className="block w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="me@john.doe"
            />
          </div>
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
