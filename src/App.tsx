import LinkNewTab from "./components/LinkNewTab";
import LinkIcons from "./components/LinkIcons";
import "./App.css";
import { projects } from "./projects.ts";
import type { ProjectData } from "./projects.ts";
import { useState, useRef } from "react";


const cl = (...classes: string[]) => classes.join(" ");

// function Description({ descr }: { descr: string }) {
//   <div className={cl(
//     // open ? "" : "hidden",
//     "overflow-hidden",
//     "absolute",
//     // open ? "bg-white/100" : "bg-white/0",
//     "bg-red-300",
//     "backdrop-blur-[1px]",
//     "-inset-x-1 -top-0",
//     "p-2",
//     "ring-1",
//     open ? "ring-black/10" : "ring-transparent",
//     "rounded-xl",
//     // "z-10",
//     // open ? 'max-h-[250px]' : 'max-h-16',
//     open ? "opacity-100" : "opacity-0",
//     "transition-all delay-100 duration-700"
//   )}>
//     <div className={cl(
//       "mt-9",
//       // open ? "opacity-100" : "opacity-0",
//       // "transition-all duration-700"
//     )}>
//       {project.descr}
//     </div>
//   </div>
// }


function Project({ project }: { project: ProjectData }) {


  // const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [activating, setActivating] = useState(false);

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
  const handleMouseLeave = () => {
    // activating => do nothing, wait for animation to finish
    setActive(false);
  };

  return (

    <a href={project.link} target="_blank" rel="noopener noreferrer" className={cl("group title-container relative",
    ) + (active || activating ? " active" : "")}  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <h2
        className={"title smooth"}>{project.name}<div className={"absolute inset-1 -z-1 bg-gray-100/40 rounded-md transition-all delay-0 group-hover:delay-300 duration-700 "+(active ? "opacity-0" : "opacity-100")}></div></h2>
      <div className={cl(
        "overflow-hidden",
        active ? 'max-h-[250px]' : 'max-h-0',
        active ? "opacity-100" : "opacity-0",
        "transition-all delay-0 group-hover:delay-300 duration-700",
      )}>
        <p>{project.descr}</p>
      </div>
      <div className={cl(
        "absolute -inset-5 -z-5",
        "bg-white/80 backdrop-blur-[2px]",
        active ? "ring-black/5 shadow-sm" : "ring-transparent",
        active ? "opacity-100" : "opacity-0",
        "ring-1 rounded-xl",
        "transition-all delay-0 group-hover:delay-300 duration-700",
      )}></div>

    </a >)
}




function App() {
  console.log(projects);

  return (
    // Tailwind: centers the container horizontally (mx-auto), sets different maximum widths for various screen sizes (max-w-2xl, sm:max-w-3xl, md:max-w-4xl), and adds top and bottom padding that increases on medium screens (pt-28 pb-20 md:pt-32)
    <div className="content mx-auto max-w-2xl pt-28 pb-20 sm:max-w-3xl md:max-w-4xl md:pt-32 px-5 flex flex-col gap-3">
      <a href="https://tomwright.io"><h1 className="title smooth">Tom Wright</h1></a>
      <div className="space-y-2">
        <p>Hi, I'm Tom. Welcome to my portfolio. 👋</p>
        <p>
          I'm passionate about building innovative tech and applying cutting
          edge techniques to solve problems.{" "}
        </p>
        <p>
          In 2023, I graduated from the University of Birmingham with a First-Class BSc Mathematics and an overall score of 81%.
          The companies I have worked for include
          {" "}<LinkNewTab href="https://fiecon.com">FIECON</LinkNewTab>,
          {" "}<LinkNewTab href="https://ample.earth">Ample</LinkNewTab>, and
          {" "}<LinkNewTab href="https://ricardo.com">Ricardo</LinkNewTab>.
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
