import Link from "next/link";
import { FC, ReactNode } from "react";

type LinkProps = {
  children: ReactNode;
  href: string;
};
export const NextLink: FC<LinkProps> = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
    >
      {children}
    </Link>
  );
};
