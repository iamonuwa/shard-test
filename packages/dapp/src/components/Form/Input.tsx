import { ComponentPropsWithRef, forwardRef, HTMLAttributes } from "react";
import { classNames } from "utils";

export type InputProps = ComponentPropsWithRef<"input"> & {
  label?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, className, ...rest }, ref) => {
  return (
    <>
      {label && (
        <label htmlFor="primary_colour" className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        ref={ref}
        {...rest}
        className={classNames(
          "block h-10 w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
          className!,
        )}
      />
    </>
  );
});

Input.displayName = "Input";
export { Input };
