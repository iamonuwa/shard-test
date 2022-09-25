import { Listbox, Transition } from "@headlessui/react";
import { FC, Fragment, ReactNode } from "react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import Image from "next/future/image";
import { classNames } from "./utils";

interface IBaseProps {}

interface IKeyValuePair {
  key: any;
  value: string;
}

interface IDefaultKeyValuePair extends IBaseProps {
  options: IKeyValuePair[];
}

interface ICustomKeyValuePair extends IBaseProps {
  keyPropFn: (option: IKeyValuePair | any) => any;
  valuePropFn: (option: IKeyValuePair | any) => string | number;
  options: any[];
}

interface IDropdownProps {
  label?: string;
  selected?: any;
  onSelected: (e: unknown) => void;
  className?: string;
  placeholder?: string;
  children?: ReactNode;
  hasImage?: boolean;
}

type DropdownProps = (IDefaultKeyValuePair | ICustomKeyValuePair) & IDropdownProps;

const Dropdown: FC<DropdownProps> = props => {
  const { label, hasImage, selected, onSelected, options, children, className, ...rest } = props;
  let { keyPropFn, valuePropFn } = props as ICustomKeyValuePair;

  delete (rest as any).keyPropFn;
  delete (rest as any).valuePropFn;

  if (!keyPropFn && !valuePropFn) {
    keyPropFn = (option: IKeyValuePair) => option.key;
    valuePropFn = (option: IKeyValuePair) => option.value;
  }

  const rootClassName = classNames("", className!);
  const renderOptions = () => {
    return (
      options &&
      options.map((option: IKeyValuePair | any, index) => {
        return (
          <Listbox.Option
            key={index}
            className={({ active }) =>
              classNames(
                "cursor-pointer select-none text-gray-900 relative py-2 px-2",
                // @ts-ignore
                { "bg-blue-100": active },
              )
            }
            value={keyPropFn(option)}
          >
            {({ selected, active }) => (
              <>
                <span className={`${selected ? "font-medium" : "font-normal"} block truncate`}>
                  {valuePropFn(option).toString()}
                </span>
              </>
            )}
          </Listbox.Option>
        );
      })
    );
  };

  return (
    <div className={rootClassName}>
      <Listbox value={selected} onChange={onSelected}>
        {({ open }) => (
          <>
            {label && <Listbox.Label className="block text-sm font-medium text-gray-700">{label}</Listbox.Label>}
            <div className="relative">
              <Listbox.Button className="relative w-full h-10 cursor-default border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                {hasImage && (
                  <span className="flex items-center">
                    <Image src={selected.img} alt="" className="h-6 w-6 flex-shrink-0" />
                    <span className="ml-3 block truncate">{selected.name}</span>
                  </span>
                )}
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {renderOptions()}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};

export default Dropdown;
