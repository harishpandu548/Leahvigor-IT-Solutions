export type Service = {
  number: string;
  title: string;
  tagline: string;
  description: string;
  items: string[];
  accentColor: string;
  image: string;
};

export const services: Service[] = [
  {
    number: "01",
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
    accentColor: "#6366F1",
    image: "/services/digi (1).webp",
  },
  {
    number: "02",
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
    accentColor: "#8B5CF6",
    image: "/services/telent (1).webp",
  },
  {
    number: "03",
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
    accentColor: "#3B82F6",
    image: "/services/it (1).webp",
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
    accentColor: "#A855F7",
    image: "/services/website (1).webp",
  },
];
