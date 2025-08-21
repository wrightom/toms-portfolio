type Project = {
  name: string;
  link: string;
  linkDescr?: string; // Optional description for the link
  descr: string;
  tags?: string[]; // Optional tags for the project
};

export const projects: Project[] = [
  {
    name: "FIECON Powerups",
    link: "https://www.linkedin.com/posts/tomnw_at-fiecon-were-using-technology-to-enhance-activity-7336734483787759616-WY3E?utm_source=share&utm_medium=member_desktop&rcm=ACoAABjc42YBPiUfkzVSPG36c0JHKBDtbn-Rj94",
    linkDescr: "Demo video",
    descr:
      "I independently developed an OfficeJS Excel add-in featuring tools to automate our economic modelling process. The app was deployed across the organisation, saving £40K annually in efficiency gains and laying the foundation for future innovation.",
    tags: ["OfficeJS", "JS", "HTML", "Clarity Analytics", "Product Design"],
  },
  {
    name: "Sky Chess",
    link: "https://tomnwright.itch.io/skychess",
    linkDescr: "Download from itch.io",
    descr: "A prototype for a relaxing 3D chess game for console.",
    tags: ["Unity", "C#"],
  },
  {
    name: "Neural net dissertation",
    link: "https://drive.google.com/file/d/1vHy7rvSqQRU3JVmmJXgndWkH3knlqRFU/view?usp=sharing",
    linkDescr: "Read on Google Drive",
    descr:
      "Achieved first class for university dissertation on neural networks titled 'Deep Learning and its Applications', in which I derived the back-propogation algorithm from first principles, using this to train a shallow network to solve the XOR problem.",
    tags: ["Python", "Neural Networks"],
  },
  {
    name: "RSA encryption",
    link: "https://github.com/tomnwright/rsa-encryption",
    linkDescr: "View my code on GitHub",
    descr:
      "A Python implementation of the RSA public key encryption algorithm. Part of theoretical paper on the mathematics of RSA submitted as part of IB Extended Essay.",
    tags: ["Python", "Cryptography"],
  },
  {
    name: "3D rendering engine",
    link: "https://github.com/tomnwright/renderia-engine",
    linkDescr: "View my code on GitHub",
    descr:
      "A Python Blender add-in implementing a custom orthographic rendering engine (renders 3D objects to image using camera position). Part of a theoretical paper on the mathematics of CGI submitted as part of IB maths.",
    tags: ["Python", "3D", "Blender"],
  },
];
