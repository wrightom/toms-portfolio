import Link from "./components/Link.tsx";
import LinkIcons from "./components/LinkIcons";
import "./App.css";
import { projects } from "./projects.ts";
import type { ProjectData } from "./projects.ts";
import React, { useState, useRef, useEffect } from "react";


const cat = (...classes: string[]) => classes.join(" ");


function Tag({ name }: { name: string }) {
  return (
    <div className="border-[var(--theme-orange)] text-[var(--theme-orange)] inline-block rounded-full border px-2 py-0.5 text-sm">
      {name}
    </div>
  );
}


// Idea: generic activating link component
// function ActivatingLink({ children }: { children: React.ReactNode }) {
//   const [active, setActive] = useState(false);
//   const [activating, setActivating] = useState(false);


// }


function Project({ project }: { project: ProjectData }) {


  const [active, setActive] = useState(false);
  const [activating, setActivating] = useState(false);

  // desktop interactions
  const activationDuration = 400;
  const activationTimeout = useRef<number | null>(null);
  const activate = () => {
    setActivating(true);

    // clear existing timeout if any
    if (activationTimeout.current) {
      clearTimeout(activationTimeout.current);
    }

    // set new timeout to remove activating state
    activationTimeout.current = setTimeout(() => {
      // stop activating (not the same as starting deactivating)
      setActivating(false);
    }, activationDuration); // 300ms - adjust to match your CSS transition
  }

  const handleMouseEnter = () => { setActive(true); activate(); };
  const handleMouseLeave = () => setActive(false);


  // touch interactions
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // if inactive onclick, must be a non-mouse click
    if (!active) {
      // handle touch
      event.preventDefault();
      setActive(true);
    }
  }

  // close project when user clicks outside

  // ref to check self click
  const selfRef = useRef<HTMLAnchorElement>(null);

  // register external click listener upon 'active' change
  useEffect(() => {
    // only register upon activation
    if (!active) return;

    // close on click (not run if self click - blocked by onclick)
    const handleClose = (event: MouseEvent | TouchEvent) => {
      // prevent self click from deactivating (in useEffect)
      const isSelf = selfRef.current && selfRef.current.contains(event.target as Node);
      if (!isSelf) setActive(false);
    };
    
    // register listener
    document.addEventListener("click", handleClose);

    // cleanup: remove listener upon deactivation
    return () => document.removeEventListener("click", handleClose);

  }, [active])

  return (

    <a ref={selfRef} href={project.link} target="_blank" rel="noopener noreferrer" className={cat("group title-container relative",
    ) + (active || activating ? " active" : "")} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick}>
      <div className="flex gap-5 items-center">
        <h2 className={"title smooth"}>{project.name}</h2>
        <div className="text-primarylight"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`h-6 w-6 transition-all delay-150 duration-200 ${active ? "translate-x-1 -translate-y-1 opacity-100" : "opacity-0"}`}><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg></div>
      </div>
      {/* <div className={"absolute inset-1 -z-1 bg-gray-100/40 rounded-md transition-all delay-0 group-hover:delay-300 duration-700 " + (active ? "opacity-0" : "opacity-100")}></div> */}

      <div className={cat(
        active ? 'max-h-[250px]' : 'max-h-0',
        active ? "opacity-100" : "opacity-0",
        "overflow-hidden",
        "transition-all delay-0 group-hover:delay-300 duration-700",
      )}>
        <div className="tags-container flex gap-2 my-2 flex-wrap">
          {project.tags?.map((tag: string, index: number) => (
            <Tag name={tag} key={index} />
          ))}
        </div>
        <p>{project.descr}</p>
      </div>
      <div className={cat(
        active ? "ring-black/10 shadow-lg" : "ring-transparent",
        active ? "opacity-100" : "opacity-0",
        "pointer-events-none",
        "absolute -inset-4 -z-5",
        "bg-white/80 backdrop-blur-[2px]",
        "ring-1 rounded-xl",
        "transition-all delay-0 group-hover:delay-300 duration-700",
      )}></div>

    </a >)
}




function App() {

  return (
    // Tailwind: centers the container horizontally (mx-auto), sets different maximum widths for various screen sizes (max-w-2xl, sm:max-w-3xl, md:max-w-4xl), and adds top and bottom padding that increases on medium screens (pt-28 pb-20 md:pt-32)
    <div className="content mx-auto max-w-2xl pt-28 pb-20 sm:max-w-3xl md:max-w-4xl md:pt-32 px-6 flex flex-col gap-3">
      <a href="https://tomwright.io"><h1 className="title smooth hover-active"><div className="absolute -inset-5"></div>Tom Wright</h1></a>
      <div className="space-y-2">
        <p>Hi, I'm <Link href="https://tomwright.io">Tom</Link>. Welcome to my portfolio. 👋</p>
        <p>
          I'm passionate about building innovative tech and applying cutting
          edge techniques to solve problems.{" "}
        </p>
        <p>
          In 2023, I graduated from the University of Birmingham with a First-Class BSc Mathematics and an overall score of 81%.
          The companies I have worked for include
          {" "}<Link href="https://fiecon.com" newtab>FIECON</Link>,
          {" "}<Link href="https://ample.earth" newtab>Ample</Link>, and
          {" "}<Link href="https://ricardo.com" newtab>Ricardo</Link>.
        </p>
      </div>
      <LinkIcons className="mt-3" />

      <p className="projects-title mt-20">Check out some of the things I've been up to.</p>

      <div className="projects-container flex flex-col gap-0 mt-5">
        {projects.map((project: ProjectData, index: number) => (
          <Project project={project} key={index} />
        ))}
      </div>

      <div className="mt-10"></div>
    </div>
  );
}

export default App;
