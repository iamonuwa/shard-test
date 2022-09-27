import { forwardRef, HTMLAttributes } from "react";

type InputProps = HTMLAttributes<HTMLInputElement> & {
  type?: string;
  name?: string;
  label?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, type, name, ...rest }, ref) => {
  return (
    <>
      {label && (
        <label htmlFor="primary_colour" className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        ref={ref}
        name={name}
        {...rest}
        className="block w-full h-10 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </>
  );
});

Input.displayName = "Input";
export { Input };
