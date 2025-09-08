import LinkTo from "./components/LinkTo.tsx";
import LinkIcons from "./components/LinkIcons";
import "./App.css";

import { projects } from "./projects.ts";
import type { ProjectData } from "./projects.ts";

import { posts } from "./posts.ts";
import type { PostData } from "./posts.ts";



import React, { useState, useRef, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { Link, useLocation, BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

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

function animateSquare(square: HTMLElement) {
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

  const offsetX = relativeX - 0.5;

  // Calculate direction from square to top center
  const directionX = 10 * (Math.abs(offsetX) < 0.1 ? (
    Math.random() / 10
  ) * (
      Math.random() < 0.5 ? 1 : -1
    ) : offsetX)
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
      <a className={`smooth ${active || activating ? "anim-active" : ""} relative group aspect-square rounded-xl overflow-hidden ring-1 ring-black/10`} ref={selfRef} href={project.link} title={project.linkDescr} target="_blank" rel="noopener noreferrer" onMouseMove={onMouseOver} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick}>
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
    <div className="overflow-clip">
      {/* // Tailwind: centers the container horizontally (mx-auto), sets different maximum widths for various screen sizes (max-w-2xl, sm:max-w-3xl, md:max-w-4xl), and adds top and bottom padding that increases on medium screens (pt-28 pb-20 md:pt-32) */}
      <div className="content mx-auto max-w-2xl pt-28 pb-20 sm:max-w-3xl md:max-w-4xl md:pt-15 px-6 flex flex-col gap-3">
        {/* <a href="https://tomwright.io"> */}
        <div className="hover-parent mb-10 pt-15 flex items-stretch gap-10 flex-wrap">
          <img className="h-30 " src="logo.svg"></img>
          <div>
            <h1 className="-ml-1 mb-2 title smooth child-active">Tom Wright</h1>
            <LinkIcons className="mb-5" />
          </div>
        </div>
        {/* </a> */}
        <p>Hi, I'm <LinkTo href="https://tomwright.io">Tom</LinkTo>. Welcome to my portfolio. 👋</p>
        <div className="flex sm:flex-row flex-col gap-4 items-stretch">

          <Card>
            I'm passionate about building innovative tech and applying cutting-edge techniques to solve problems.
          </Card>
          <Card>
            I graduated in 2023 from the University of Birmingham with a First-Class BSc Mathematics and an overall score of 81%.
          </Card>
          <Card>
            The companies I have worked for include
            {" "}<LinkTo href="https://fiecon.com" newtab>FIECON</LinkTo>,
            {" "}<LinkTo href="https://ample.earth" newtab>Ample</LinkTo>, and
            {" "}<LinkTo href="https://ricardo.com" newtab>Ricardo</LinkTo>.
          </Card>

        </div>
        <Router>

          <ContentRouter />
        </Router>
        <div className="mt-30"></div>
      </div>
    </div>
  );
}

export default App;


function Card({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
}) {
  return (
    <div {...props} className={className + " smooth anim-card ring-1 ring-[var(--theme-blue)] p-5 rounded-xl"}>{children}</div>
  )
}


function ContentRouter() {


  const location = useLocation();

  const routerClass = (target: string) => "relative mx-1 px-1 py-0.5 rounded-sm transition-all duration-400" + (location.pathname === target ? " text-white bg-[var(--theme-blue)]" : " hover:bg-gray-100");

  return (
    <>
      <div className="projects-title mt-15">
        <div className="relative flex py-5 items-center">
          <div className="border-t w-5 border-[var(--theme-blue)]"></div>
          <span className="flex-shrink mx-4 text-gray-700 text-lg">
            <Link to="/projects" className={routerClass("/projects")}>
              Projects
              <div className="absolute -inset-x-2 -inset-y-3 sm:inset-0"></div>
            </Link>
            {" / "}
            <Link to="/wilt" className={routerClass("/wilt")}>
              Blog
              <div className="absolute -inset-x-2 -inset-y-3 sm:inset-0"></div>
            </Link>
          </span>
          <div className="flex-grow border-t border-[var(--theme-blue)]"></div>
        </div>
      </div>

      <Routes>

        <Route path="/" element={<Navigate to="/projects" replace />} />
        <Route path="/projects" element={<ProjectsContent />} />
        <Route path="/wilt" element={<WiltContent />} />
      </Routes>

    </>

  )
}

function ProjectsContent() {
  return (
    <>
      <p>Click on the links below to find out more about what I've built.</p>

      <div id="projects-container" className="grid md:grid-cols-5 grid-cols-3 sm:gap-5 gap-2">
        {projects.map((project: ProjectData, index: number) => (
          <Project project={project} key={index} />
        ))}
      </div>
    </>
  );
}
function WiltContent() {
  return (
    <>
      <div title="What I learned today..." className="hover-parent cursor-pointer flex gap-10 bg-gray-100/50 rounded-lg ring-1 ring-black/10 pl-2 items-center justify-between">

        <div className="relative">
          <h2 className="title smooth child-active tracking-widest">WILT
          </h2>
        </div>

        <span className="my-2 hidden sm:inline">An open-source framework for daily learning</span>

        <div className="flex items-center gap-1 hover:bg-black/5 py-1 px-2 rounded-lg transition-all duration-300">
          <svg className="h-8 text-primarylight" viewBox="5 -5 90 110" fill="currentColor">
            <path d="m74.957 45.871c0.53516-0.76953 0.84375-1.1172 1.043-1.5156 0.54688-1.082 1.0469-2.1914 1.5625-3.2852 0.625-1.3242 1.1602-2.7852 2.9531-2.8438 1.9297-0.0625 3.3086 1.0078 4.0039 2.6562 1.3164 3.1211 2.6641 6.2656 3.5625 9.5195 2.293 8.3203 2.7891 16.738 0.51953 25.18-2.8789 10.715-9.5859 18.344-19.176 23.605-1.1992 0.65625-2.457 1.1875-3.9062 0.48828-1.7852-0.85938-2.5156-2.2695-1.8672-4.1484 0.31641-0.90625 0.77344-1.7812 1.2695-2.6094 2.832-4.7305 2.3203-9.2578-0.80078-13.613-0.98828-1.3789-2.082-2.6875-3.1797-3.9844-4.9727-5.8594-6.6133-12.652-5.6758-20.16 0.125-0.99609 0.38672-1.9102-0.65625-2.5859-0.95703-0.625-1.832-0.38281-2.7344 0.10938-8.0781 4.4414-14.184 10.699-17.527 19.383-0.68359 1.7734-0.99609 3.7539-1.1406 5.6641-0.41016 5.4648 0.089844 10.832 2.332 15.926 0.066407 0.14844 0.12891 0.29688 0.17578 0.45312 0.69531 2.1602 0.33984 3.7188-1.0977 4.8164-1.3711 1.0469-2.8516 1.0195-4.7188-0.20312-1.4219-0.92969-2.8008-1.9258-4.1719-2.9258-5.1641-3.7773-9.6211-8.2031-12.379-14.07-5.3789-11.449-4.3359-22.449 2.5508-32.957 2.9883-4.5586 6.8906-8.3555 10.484-12.41 2.6211-2.9609 5.2617-5.9492 7.5039-9.1953 3.8828-5.625 5.5547-11.984 5.2695-18.836-0.066406-1.6172-0.12109-3.2422-0.03125-4.8555 0.14453-2.5742 2.332-4.0469 4.7695-3.2422 0.76172 0.25 1.4961 0.62891 2.1836 1.0469 13.426 8.1719 22.348 19.926 27.293 34.734 0.80859 2.4141 0.89844 5.0703 1.3086 7.6172 0.09375 0.59375 0.14453 1.1953 0.27344 2.25z" />
          </svg>
          <div className="rounded-full ring-1 ring-[var(--theme-blue)] h-6 aspect-square inline-flex items-center justify-center text-bold">3</div>
        </div>
      </div>


      <div className="grid md:grid-cols-3 grid-rows-3 sm:gap-5 gap-2">
        {posts.map((post: PostData, index: number) => (
          <Post data={post} key={index} />
        ))}
      </div>
    </>
  );
}



function Post({ data }: { data: PostData }) {
  return (
    <Card className="group hover-parent relative">
      <div className="flex justify-between">
        <p className="font-bold title smooth child-active text-lg">{data.title}</p>
        <div className="text-primarylight"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`h-6 w-6 transition-all delay-200 duration-400 -translate-x-2 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-0`}><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg></div>
      </div>
      <p className="text-gray-300 italic mb-2">{data.date}</p>
      <p>{data.descr}</p>
      <a className="absolute inset-0" href={data.link}></a>
    </Card>
  );
}