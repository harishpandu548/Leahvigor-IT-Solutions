export type Testimonial = {
  quote: string;
  author: string;
  company: string;
  role: string;
};

// NOTE: These testimonials use real client company names from the existing Leahvigor website.
// The quote content is placeholder text — please replace with actual testimonial copy before publishing.
export const testimonials: Testimonial[] = [
  {
    quote:
      "Leahvigor brought both the strategic thinking and technical depth we needed. Their team became a genuine extension of ours, and the results speak for themselves.",
    author: "Client Representative",
    company: "Rainsoft Global",
    role: "— Rainsoft Global", // Update with real name/role before publishing
  },
  {
    quote:
      "What sets Leahvigor apart is their ability to understand business objectives first, then build the right technology around them. That approach made all the difference for us.",
    author: "Client Representative",
    company: "CAP Technologies",
    role: "— CAP Technologies", // Update with real name/role before publishing
  },
];
