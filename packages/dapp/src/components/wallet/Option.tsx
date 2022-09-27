import { FC } from "react";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Button from "components/Button";

interface OptionProps {
  onClick?: () => void;
  id?: string;
  clickable?: boolean;
  color?: string;
  active?: boolean;
  link?: string | null;
  header?: string | JSX.Element;
  subheader?: string | null;
  icon?: string;
}

const Option: FC<OptionProps> = ({ header, icon, onClick }) => {
  return (
    <Button
      onClick={onClick}
      className="py-2 px-3 rounded-none cursor-pointer border border-1 hover:border-blue-300 w-full"
    >
      <div className="flex">
        <div className="flex space-x-1">
          <div className="font-normal text-sm">{header}</div>
        </div>
        <div className="flex items-center group space-x-3">
          <ArrowRightIcon width={24} height={12} />
        </div>
      </div>
    </Button>
  );
};

export default Option;
