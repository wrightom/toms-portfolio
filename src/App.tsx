import LinkNewTab from "./components/LinkNewTab";
import LinkIcons from "./components/LinkIcons";
import "./App.css";



// function Project({
//   name,
//   link,
//   descr
// }: {
//   name: string;
//   link: string;
//   descr: string
// }) {
//   return (
//     <a href={link} target="_blank" rel="noopener noreferrer">
//       <div className="project group rounded-lg border border-neutral-800 p-3">
//         <h3>{name}</h3>
//         <p>{descr}</p>
//       </div>c
//     </a>
//   );
// }

function App() {
  // const projects = [
  //   {
  //     name: "Test project",
  //     link: "https://example.com/test-project",
  //     descr: "This is a test project.",
  //   },
  //   {
  //     name: "Test project",
  //     link: "https://example.com/test-project",
  //     descr: "This is a test project.",
  //   },
  //   {
  //     name: "Test project",
  //     link: "https://example.com/test-project",
  //     descr: "This is a test project.",
  //   },
  //   {
  //     name: "Test project",
  //     link: "https://example.com/test-project",
  //     descr: "This is a test project.",
  //   },
  // ];

  return (
    // Tailwind: centers the container horizontally (mx-auto), sets different maximum widths for various screen sizes (max-w-2xl, sm:max-w-3xl, md:max-w-4xl), and adds top and bottom padding that increases on medium screens (pt-28 pb-20 md:pt-32)
    <div className="content mx-auto max-w-2xl pt-28 pb-20 sm:max-w-3xl md:max-w-4xl md:pt-32 px-5 flex flex-col gap-3">
      <a href="https://tomwright.io"><h1 className="title">Tom Wright</h1></a>
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
      {/* 
      <h2>Projects</h2>
      <div
        id="projects"
        className=""
      >
        {projects.map((project, index) => (
          <Project
            key={index}
            name={project.name}
            link={project.link}
            descr={project.descr}
          />
        ))}
      </div> */}
    </div>
  );
}

export default App;
