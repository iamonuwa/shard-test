import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { FC, ReactNode } from "react";

export type LinkProps = NextLinkProps & {
  external?: boolean;
  className?: string;
  href: string;
  as?: string;
  children: ReactNode;
};

const Link: FC<LinkProps> = ({ children, external, className, href, as, ...rest }) => {
  let link: JSX.Element;
  if (external) {
    link = (
      <NextLink
        target="_blank"
        className={[className, "outline-0"].join(" ")}
        rel="noopener noreferrer"
        as={as}
        passHref
        href={href}
        {...rest}
      >
        {children}
      </NextLink>
    );
  } else {
    link = (
      <NextLink as={as} className={[className, "outline-0"].join(" ")} passHref href={href} {...rest}>
        {children}
      </NextLink>
    );
  }

  return link;
};

Link.defaultProps = {
  external: false,
};

export default Link;
