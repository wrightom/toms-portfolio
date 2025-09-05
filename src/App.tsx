import Link from "./components/Link.tsx";
import LinkIcons from "./components/LinkIcons";
import "./App.css";
import { projects } from "./projects.ts";
import type { ProjectData } from "./projects.ts";
import React, { useState, useRef, useEffect } from "react";
import { isMobile } from "react-device-detect";

const cat = (...classes: string[]) => classes.join(" ");


// function Tag({ name }: { name: string }) {
//   return (
//     <div className="border-[var(--theme-orange)] text-[var(--theme-orange)] inline-block rounded-full border px-2 py-0.5 text-sm">
//       {name}
//     </div>
//   );
// }


// Idea: generic activating link component
// function ActivatingLink({ children }: { children: React.ReactNode }) {
//   const [active, setActive] = useState(false);
//   const [activating, setActivating] = useState(false);


// }
const ANIM_DIST = 100;

function animateSquare(square:HTMLElement) {
  if (!square.parentElement) {
    throw new Error("Element has no parent container");
  }

  const divRect = square.getBoundingClientRect();
  const parentRect = square.parentElement.getBoundingClientRect();

  // Absolute center of div (on screen)
  const centerX = divRect.left + divRect.width / 2;
  const centerY = divRect.top + divRect.height / 2;

  // Position relative to parent
  const relativeX = (centerX - parentRect.left) / parentRect.width;
  const relativeY = (centerY - parentRect.top) / parentRect.height;


  // Calculate direction from square to top center
  const directionX = relativeX - 0.5;
  const directionY = 1 + relativeY;

  // Normalize and apply random distance (15-50px)
  const distance = ANIM_DIST * (1 + Math.random() * 2);
  const length = Math.sqrt(directionX * directionX + directionY * directionY);
  const normalizedX = length > 0 ? (directionX / length) * distance : 0;
  const normalizedY = length > 0 ? (directionY / length) * distance : 0;

  // Set initial position
  square.style.setProperty('--start-x', `${normalizedX}px`);
  square.style.setProperty('--start-y', `${normalizedY}px`);
  square.style.setProperty('--start-s', `${1 + Math.random()}`);
  // square.style.setProperty('--start-s', `${0.8}`);

  // Random duration (0.6s to 1.2s)
  const duration = 1 + Math.random() * 2;

  // Apply the animation
  square.style.animation = `floatIn ${duration}s cubic-bezier(0.4, 0, 0.2, 1) forwards`;
}

function Project({ project }: { project: ProjectData, activeDefault?: boolean }) {

  // ref to check self click
  const selfRef = useRef<HTMLAnchorElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);

  // float in
  useEffect(() => {
    if (!floatRef.current) return;

    const el = floatRef.current;
    let hasAnimated = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            animateSquare(entry.target as HTMLElement);
            hasAnimated = true;
            observer.unobserve(entry.target); // stop watching once animated
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const [active, setActive] = useState(false);
  const [activating, setActivating] = useState(false);

  // desktop interactions
  const activationDuration = 400;
  const activationTimeout = useRef<number | null>(null);
  const activate = () => {
    setActive(true);
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

  // isMobile: On mobile, touch triggers mouseEnter and click
  const handleMouseEnter = () => { if (!isMobile) activate() };
  const handleMouseLeave = () => { if (!isMobile) setActive(false) };


  // touch interactions
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // if inactive onclick, must be a non-mouse click
    if (!active) {
      // handle touch
      event.preventDefault();
      setActive(true);
    }
  }

  const onMouseOver = () => { if (!isMobile && !active) activate() };

  // close project when user clicks outside

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
    <div ref={floatRef} className="opacity-0 flex">
    <a className="smooth anim-card relative group aspect-square rounded-xl overflow-hidden ring-1 ring-black/10" ref={selfRef} href={project.link} title={project.linkDescr} target="_blank" rel="noopener noreferrer" onMouseMove={onMouseOver} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick}>
      <img src={project.imgUrl || "https://picsum.photos/500/200"} alt="" className="w-full h-full object-cover" />
      <div className={cat("title-bar z-200 text-white min-h-15 w-full absolute flex justify-between items-center gap-1 bg-[var(--theme-blue)] px-3 py-1 top-full transition-all duration-500", (active || activating) ? "-translate-y-full" : "")}>
        <p>{project.name}</p>
        <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`h-6 w-6 transition-all delay-200 duration-400 ${active ? "opacity-100" : "-translate-x-2 translate-y-2 opacity-0"}`}><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg></div>
      </div>
    </a >
    </div>
  )
  // return (

  //   <a ref={selfRef} href={project.link} title={project.linkDescr} target="_blank" rel="noopener noreferrer" className={cat("group title-container relative",
  //   ) + (active || activating ? " active" : "")} onMouseMove={onMouseOver} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick}>
  //     <div className="flex gap-5 items-center">
  //       <h2 className={"title smooth"}>{project.name}</h2>

  //     </div>
  //     {/* <div className={"absolute inset-1 -z-1 bg-gray-100/40 rounded-md transition-all delay-0 group-hover:delay-300 duration-700 " + (active ? "opacity-0" : "opacity-100")}></div> */}

  //     <div className={cat(
  //       active ? 'max-h-[250px]' : 'max-h-0',
  //       active ? "opacity-100" : "opacity-0",
  //       "overflow-hidden",
  //       "transition-all delay-0 group-hover:delay-300 duration-700",
  //     )}>
  //       <div className="tags-container flex gap-2 my-2 flex-wrap">
  //         {project.tags?.map((tag: string, index: number) => (
  //           <Tag name={tag} key={index} />
  //         ))}
  //       </div>
  //       <p>{project.descr}</p>
  //     </div>
  //     <div className={cat(
  //       "ring-black/10",
  //       // active ? "ring-black/10 shadow-lg" : "ring-transparent",
  //       // active ? "opacity-100" : "opacity-0",
  //       "pointer-events-none",
  //       "absolute -z-5",
  //       active ? "-inset-4" : "-inset-2",
  //       "bg-white/80 backdrop-blur-[2px]",
  //       "ring-1 rounded-xl",
  //       "transition-all delay-0 group-hover:delay-300 duration-700",
  //     )}></div>

  //   </a >)
}




function App() {

  return (
    // Tailwind: centers the container horizontally (mx-auto), sets different maximum widths for various screen sizes (max-w-2xl, sm:max-w-3xl, md:max-w-4xl), and adds top and bottom padding that increases on medium screens (pt-28 pb-20 md:pt-32)
    <div className="content mx-auto max-w-2xl pt-28 pb-20 sm:max-w-3xl md:max-w-4xl md:pt-15 px-6 flex flex-col gap-3">
      {/* <a href="https://tomwright.io"> */}
      <div className="hover-parent mb-10 pt-15">
        <h1 className="-ml-1 mb-2 title smooth child-active">Tom Wright</h1>
        <LinkIcons className="mb-5" />
      </div>
      {/* </a> */}
      <p>Hi, I'm <Link href="https://tomwright.io">Tom</Link>. Welcome to my portfolio. 👋</p>
      <div className="flex sm:flex-row flex-col gap-4 items-stretch">

        <Bullet>
          I'm passionate about building innovative tech and applying cutting-edge techniques to solve problems.
        </Bullet>
        <Bullet>
          I graduated in 2023 from the University of Birmingham with a First-Class BSc Mathematics and an overall score of 81%.
        </Bullet>
        <Bullet>
          The companies I have worked for include
          {" "}<Link href="https://fiecon.com" newtab>FIECON</Link>,
          {" "}<Link href="https://ample.earth" newtab>Ample</Link>, and
          {" "}<Link href="https://ricardo.com" newtab>Ricardo</Link>.
        </Bullet>

      </div>
      <div className="projects-title mt-15">
        <div className="relative flex py-5 items-center">
          <div className="border-t w-5 border-[var(--theme-blue)]"></div>
          <span className="flex-shrink mx-4 text-gray-700">Projects</span>
          <div className="flex-grow border-t border-[var(--theme-blue)]"></div>
        </div>
        <p>Click on the links below to find out more about what I've built.</p>
      </div>


      <div id="projects-container" className="grid md:grid-cols-5 grid-cols-3 sm:gap-5 gap-2">
        {projects.map((project: ProjectData, index: number) => (
          <Project project={project} key={index} />
        ))}
      </div>


      <div className="mt-10"></div>
    </div>
  );
}

export default App;


function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="smooth anim-card ring-1 ring-[var(--theme-blue)] p-5 rounded-xl">{children}</div>
  )
}