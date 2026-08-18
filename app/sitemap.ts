import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://leahvigor.com";
  const lastModified = new Date();

  return [
    { url: baseUrl, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/services`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/work`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/insights`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: "yearly", priority: 0.9 },
  ];
}
