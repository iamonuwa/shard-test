import { Listbox, Transition } from "@headlessui/react";
import { FC, forwardRef, Fragment, HTMLAttributes, ReactNode } from "react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { classNames } from "../utils";

interface IBaseProps extends HTMLAttributes<HTMLSelectElement> {}

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

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>((props, ref) => {
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
              `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                active ? "bg-amber-100 text-amber-900" : "text-gray-900"
              }`
            }
            value={keyPropFn(option)}
          >
            {({ selected }) => (
              <>
                <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                  {valuePropFn(option).toString()}
                </span>
              </>
            )}
          </Listbox.Option>
        );
      })
    );
  };

  console.log(valuePropFn(selected));

  return (
    <div className={rootClassName}>
      <Listbox value={selected} onChange={onSelected}>
        {({ open }) => {
          return (
            <>
              {label && <Listbox.Label className="block text-sm font-medium text-gray-700">{label}</Listbox.Label>}
              <div className="relative">
                <Listbox.Button className="relative w-full h-10 cursor-pointer border bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate">{valuePropFn(selected)}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
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
                  <Listbox.Options className="absolute z-10 mt-1 w-full h-auto max-h-48 overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {renderOptions()}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          );
        }}
      </Listbox>
    </div>
  );
});

Dropdown.displayName = "Dropdown";

export default Dropdown;
