import { ButtonHTMLAttributes, FC, forwardRef, JSXElementConstructor, useRef } from "react";
import { mergeRefs } from "react-merge-refs";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  variant?: "contained" | "outlined" | "text";
  active?: boolean;
  type?: "submit" | "reset" | "button";
  Component?: string | JSXElementConstructor<any>;
  width?: string | number;
  loading?: boolean;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = forwardRef((props, buttonRef) => {
  const {
    className,
    variant = "contained",
    children,
    active,
    width,
    loading = false,
    disabled = false,
    style = {},
    Component = "button",
    ...rest
  } = props;
  const ref = useRef<typeof Component>(null);

  return (
    <Component
      aria-pressed={active}
      data-variant={variant}
      ref={mergeRefs([ref, buttonRef])}
      className={className}
      disabled={disabled}
      style={{
        width,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Component>
  );
});

Button.displayName = "Button";
Button.defaultProps = {};

export { Button };
