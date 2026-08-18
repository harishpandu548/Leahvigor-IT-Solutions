export type Solution = {
  number: string;
  title: string;
  description: string;
  tag: string;
  image: string;
};

export const solutions: Solution[] = [
  {
    number: "01",
    title: "Talent Acquisition",
    description:
      "Strategic recruitment solutions that help you build the high-performing teams your growth demands.",
    tag: "People",
    image: "/solutions/talent-acquisition (1).webp",
  },
  {
    number: "02",
    title: "Cloud & Infrastructure",
    description:
      "Modern cloud architectures that provide the scalability, reliability, and security to grow without limits.",
    tag: "Infrastructure",
    image: "/solutions/cloud (1).webp",
  },
  {
    number: "03",
    title: "Custom Software Development",
    description:
      "Tailor-made software solutions engineered to solve complex operational challenges and scale seamlessly.",
    tag: "Engineering",
    image: "/solutions/it-solutions (1).webp",
  },
  {
    number: "04",
    title: "Digital Growth & Marketing",
    description:
      "Data-driven digital marketing campaigns that expand your reach, build your brand, and convert audiences.",
    tag: "Growth",
    image: "/solutions/digital-marketing (1).webp",
  },
  {
    number: "05",
    title: "Cybersecurity Solutions",
    description:
      "Protect your digital assets, business data, and customer trust with advanced risk-mitigation frameworks.",
    tag: "Security",
    image: "/solutions/cybersecurity.webp",
  },
];
