import { ComponentPropsWithRef, forwardRef } from "react";
import { classNames } from "utils";

export type Variant = "primary" | "secondary" | "danger" | "success" | "pending";
export type Size = "sm" | "md" | "lg";

export type ButtonProps = ComponentPropsWithRef<"button"> & {
  type?: "submit" | "reset" | "button";
  variant?: Variant;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: Size;
  hoverableAnimation?: boolean;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, disabled, size, className, loading, variant, ...rest }, ref) => {
    const classes = {
      base: "text-black focus:outline-none transition ease-in-out duration-300",
      disabled: "opacity-50 cursor-default bg-gray-700 border border-gray-700",
      size: {
        sm: "px-2 py-1 text-sm",
        md: "px-4 py-2",
        lg: "px-8 py-3 text-lg",
      },
      variant: {
        primary: "bg-blue-500 hover:bg-blue-800 hover:text-white text-white",
        secondary: "bg-gray-200 hover:bg-gray-800 text-gray-900 hover:text-white",
        danger: "bg-red-500 hover:bg-red-800 text-white",
        success: "bg-green-500 hover:bg-green-800 text-white",
      },
    };

    // @ts-ignore
    const variantCls = classes.variant[variant!];

    return (
      <button
        aria-disabled={disabled}
        ref={ref}
        disabled={disabled}
        className={classNames(`
            ${classes.base}
            ${classes.size[size!]}
            ${variantCls}
            ${disabled && classes.disabled}
            ${className}
        `)}
        {...rest}
      >
        <div className={classNames(`flex items-center justify-center ${loading ? "space-x-2" : ""}`)}>
          <span>{children}</span>
        </div>
      </button>
    );
  },
);

Button.displayName = "Button";

Button.defaultProps = {
  variant: "primary",
  type: "button",
  loading: false,
  size: "md",
};

export default Button;
