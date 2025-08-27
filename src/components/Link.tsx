import type { ReactNode } from "react"

export default function Link({children, href, newtab=false}:{children:ReactNode, href:string, newtab?:boolean}) {

  const linkProps = newtab ? {target: "_blank", rel: "noopener noreferrer"} : {};
  
  return <a {...linkProps} href={href} className="smooth font-bold text-gray underline underline-offset-2 decoration-blue decoration-1.5 hover:decoration-3 hover:underline decoration-solid">{children}</a>
}