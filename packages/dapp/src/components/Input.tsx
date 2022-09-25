import { FC, HTMLAttributes } from "react";

type InputProps = HTMLAttributes<HTMLInputElement> & {
  type?: string;
  name?: string;
  label?: string;
};

export const Input: FC<InputProps> = ({ label, type, name, ...rest }) => {
  return (
    <>
      {label && (
        <label htmlFor="primary_colour" className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        {...rest}
        className="block w-full h-10 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </>
  );
};
