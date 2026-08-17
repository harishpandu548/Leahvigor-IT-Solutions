export type Service = {
  number: string;
  title: string;
  tagline: string;
  description: string;
  items: string[];
  color: string;
  accentColor: string;
};

export const services: Service[] = [
  {
    number: "01",
    title: "IT Solutions",
    tagline: "Build. Modernize. Scale.",
    description:
      "Architect resilient technology ecosystems that support your business today and scale with tomorrow's ambitions.",
    items: [
      "Custom Software Development",
      "IT Infrastructure & Support",
      "Cloud Migration & Management",
      "Cybersecurity & Risk Assessment",
    ],
    color: "from-blue-500/10 to-blue-600/5",
    accentColor: "#3B82F6",
  },
  {
    number: "02",
    title: "Digital Growth",
    tagline: "Reach. Engage. Convert.",
    description:
      "Turn digital presence into measurable business growth through data-driven marketing and strong brand positioning.",
    items: [
      "Digital Marketing & SEO",
      "Brand Strategy & Positioning",
      "Content Marketing",
      "Social Media Management",
    ],
    color: "from-indigo-500/10 to-indigo-600/5",
    accentColor: "#6366F1",
  },
  {
    number: "03",
    title: "Talent Acquisition",
    tagline: "Find. Build. Grow.",
    description:
      "Build high-performing teams with strategic talent acquisition designed around your growth objectives.",
    items: [
      "Executive Search & Placement",
      "Technical Recruiting",
      "Volume Recruiting",
      "Employer Branding",
    ],
    color: "from-violet-500/10 to-violet-600/5",
    accentColor: "#8B5CF6",
  },
  {
    number: "04",
    title: "Website Creation",
    tagline: "Design. Develop. Transform.",
    description:
      "Create digital experiences that communicate your value, engage your audience and drive action.",
    items: [
      "UI/UX Design",
      "Responsive Web Development",
      "E-commerce Solutions",
      "CMS & Platform Integration",
    ],
    color: "from-purple-500/10 to-purple-600/5",
    accentColor: "#A855F7",
  },
];
