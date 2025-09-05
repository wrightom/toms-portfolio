export type ProjectData = {
  name: string;
  link: string;
  linkDescr?: string; // Optional description for the link
  descr: string;
  tags?: string[]; // Optional tags for the project
  imgUrl?: string; // Optional image URL for the project
};

export const projects: ProjectData[] = [
  {
    name: "FIECON Powerups",
    link: "https://www.linkedin.com/posts/tomnw_at-fiecon-were-using-technology-to-enhance-activity-7336734483787759616-WY3E?utm_source=share&utm_medium=member_desktop&rcm=ACoAABjc42YBPiUfkzVSPG36c0JHKBDtbn-Rj94",
    linkDescr: "View demo on LinkedIn",
    descr:
      "I developed an OfficeJS Excel add-in featuring tools to automate our economic modelling process. The app was deployed across the organisation, saving £40K annually in efficiency gains and laying the foundation for future innovation.",
    tags: ["OfficeJS", "JS", "HTML", "Clarity Analytics", "Product Design"],
    imgUrl: "project-icons/powerups.png",
  },
  {
    name: "Sky Chess",
    link: "https://tomnwright.itch.io/skychess",
    linkDescr: "Download from itch.io",
    descr: "A prototype for a relaxing 3D chess game for console.",
    tags: ["Unity", "C#"],
    imgUrl: "project-icons/skychess.png"
  },
  {
    name: "Neural net dissertation",
    link: "https://github.com/wrightom/shallow-XOR",
    linkDescr: "View on GitHub",
    descr:
      "Achieved first class for university dissertation on neural networks titled 'Deep Learning and its Applications', in which I derived the back-propogation algorithm from first principles, using this to train a shallow network to solve the XOR problem.",
    tags: ["Uni", "Python", "Neural Networks"],
    imgUrl:"project-icons/diss2.png"
  },
  {
    name: "Game development",
    link: "https://github.com/wrightom/gamedev-archived",
    linkDescr: "View on GitHub",
    descr:
      "A collection of all my old game development projects, including two published to Google Play store.",
    tags: ["Game Dev", "Unity", "C#", "Blender", "3D"],
    imgUrl:"project-icons/games.png"
  },
  {
    name: "Academic projects",
    link: "https://github.com/wrightom/academic-projects",
    linkDescr: "View on GitHub",
    descr: "A collection of my academic projects from university and college.",
    tags: ["Uni", "Python"],
    imgUrl:"project-icons/pattern.png"
  },
  {
    name: "RSA encryption",
    link: "https://github.com/tomnwright/rsa-encryption",
    linkDescr: "View on GitHub",
    descr:
      "A Python implementation of the RSA public key encryption algorithm. Part of theoretical paper on the mathematics of RSA submitted as part of IB Extended Essay.",
    tags: ["Python", "Cryptography"],
    imgUrl:"project-icons/rsa.png"
  },
  {
    name: "3D rendering engine",
    link: "https://github.com/tomnwright/renderia-engine",
    linkDescr: "View on GitHub",
    descr:
      "A Python Blender add-in implementing a custom orthographic rendering engine (renders 3D objects to image using camera position). Part of a theoretical paper on the mathematics of CGI submitted as part of IB maths.",
    tags: ["Python", "3D", "Blender"],
    imgUrl:"project-icons/ria.png"
  },
  {
    name: "Mice problem video",
    link: "https://youtu.be/r_V0pd0C318",
    linkDescr: "Watch on YouTube",
    descr:
      "Worked in a group of 6 to produce a YouTube video about the Mice Problem in the context of robots on mars. Submitted as part of University of Birmingham Mathematical Modelling and Problems Solving module (2021). Edited video and produced all 3D graphics, alongside working on actual analysis.",
    tags: ["Uni", "Blender", "Mathematics", "Video editing"],
    imgUrl:"project-icons/robots.png"
  },
  {
    name: "Board game question app",
    link: "https://github.com/wrightom/uni-board-game-qs/",
    linkDescr: "View on GitHub",
    descr:
      "Web app for generating trivia questions for Maths Degree - The Game That Counts - an educational mathematics board game for GCSE students. Submitted as part of University of Birmingham Mathematics in Industry module (2021).",
    tags: ["Uni", "React"],
    imgUrl:"project-icons/boardgame.png"
  },
  {
    name: "RC plane",
    link: "https://youtu.be/y_kS4XK1t14",
    linkDescr: "Watch flight on YouTube",
    descr:
      "Designed and built a remote-controlled model plane from scratch. (Unfortunately I was less good at flying the thing.)",
    tags: ["Engineering", "Electronics"],
    imgUrl:"project-icons/plane.jpeg"
  },
];

// {
//   name: "Maths game site",
//   link: "",
//   linkDescr: "View on GitHub",
//   descr:
//     "",
//   tags: [],
// },
