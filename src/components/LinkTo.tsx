import type { AnchorHTMLAttributes, ReactNode } from "react"

export default function LinkTo({ children, href, newtab = false, ...props }: { children: ReactNode, href: string, newtab?: boolean } & AnchorHTMLAttributes<HTMLAnchorElement>) {

  const linkProps = newtab ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return <a {...linkProps} href={href} {...props} className="smooth font-bold text-gray underline underline-offset-2 decoration-blue decoration-1.5 hover:decoration-3 hover:underline decoration-solid">{children}</a>
}