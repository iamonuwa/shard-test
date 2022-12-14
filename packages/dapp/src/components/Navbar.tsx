import { Fragment } from "react";
import dynamic from "next/dynamic";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "./Link";
import Button from "./Button";
import { useServiceProvider } from "store/hooks/useServiceProvider";
import Web3Status from "./Wallet/Web3Status";
import { ServiceProvider } from "./SProvider";
import { AddHistoryModal } from "./AddHistory";
import { useActiveWeb3React } from "hooks/useActiveWeb3React";

const WalletModal = dynamic(() => import("./Wallet"), {
  ssr: false,
});

export default function Navbar() {
  const { account } = useActiveWeb3React();
  const { toggleDialog } = useServiceProvider();
  return (
    <Fragment>
      <Popover className="relative">
        <div className="flex items-center justify-between md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto sm:h-10"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </Link>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 outline-none">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          {!account ? (
            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0 space-x-3">
              <Web3Status />
            </div>
          ) : (
            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0 space-x-3">
              <Link href="/create">Add new vehicle</Link>
              <Button onClick={toggleDialog}>Add Service Provider</Button>
              <Web3Status />
            </div>
          )}
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute inset-x-0 top-0 origin-top-right transform px-2 transition md:hidden"
          >
            <div className="rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 py-2">
                <div className="flex items-center justify-between">
                  <div>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      alt="Your Company"
                    />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 outline-none">
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
              </div>
              <div className="space-y-6 py-2 px-5">
                {!account ? (
                  <div className="items-center justify-center">
                    <Web3Status className="w-full" />
                  </div>
                ) : (
                  <div className="items-center justify-center flex flex-col space-y-3">
                    <Link
                      className="flex w-full items-center justify-center bg-indigo-600 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      href="/create"
                    >
                      Add new vehicle
                    </Link>
                    <Button className="w-full" onClick={toggleDialog}>
                      Add Service Provider
                    </Button>
                    <Web3Status className="w-full" />
                  </div>
                )}
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
      <ServiceProvider />
      <WalletModal />
      <AddHistoryModal />
    </Fragment>
  );
}
