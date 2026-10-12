import { Link } from "@tanstack/react-router";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children: ReactNode;
};

/**
 * Internal link that accepts a resolved path string (e.g. "/services/outlet-switch-repair").
 * Same-page hash links and external/tel/sms/mailto links render a plain <a>.
 */
export function AppLink({ href, children, ...rest }: Props) {
  if (!href.startsWith("/")) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }
  const [path, hash] = href.split("#");
  return (
    <Link to={path as never} {...(hash ? { hash } : {})} {...(rest as Record<string, unknown>)}>
      {children}
    </Link>
  );
}
