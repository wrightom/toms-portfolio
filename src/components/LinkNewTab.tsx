import type { ReactNode } from "react"

export default function LinkNewTab({children, href}:{children:ReactNode, href:string}){
  return <a href={href} target="_blank" rel="noopener noreferrer" className="font-bold text-gray underline underline-offset-2 decoration-blue decoration-1.5 hover:decoration-3 hover:underline decoration-solid">{children}</a>
}