import { forwardRef, HTMLAttributes } from "react";

type TextareaProps = HTMLAttributes<HTMLTextAreaElement> & {
  name?: string;
  label?: string;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ label, name, ...rest }, ref) => {
  return (
    <>
      {label && (
        <label htmlFor="primary_colour" className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        name={name}
        {...rest}
        className="block w-full h-64 resize-none border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      ></textarea>
    </>
  );
});

Textarea.displayName = "Textarea";
export { Textarea };
