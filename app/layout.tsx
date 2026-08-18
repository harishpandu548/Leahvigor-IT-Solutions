import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/navbar/Navbar";
import Chatbot from "@/components/chatbot/Chatbot";
import Preloader from "@/components/ui/Preloader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://leahvigor.com"),
  title: {
    default: "LEAHVIGOR Solutions | Accelerate Your Growth",
    template: "%s | LEAHVIGOR Solutions",
  },
  description:
    "Leahvigor Solutions helps businesses accelerate growth through technology, digital strategy, talent acquisition and high-performance digital experiences.",
  keywords: [
    "IT solutions",
    "digital marketing",
    "talent acquisition",
    "web development",
    "cloud migration",
    "Hyderabad",
    "technology consultancy",
  ],
  authors: [{ name: "LEAHVIGOR Solutions Pvt. Ltd." }],
  icons: {
    icon: "/logo/logo (2).png",
    shortcut: "/logo/logo (2).png",
    apple: "/logo/logo (2).png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://leahvigor.com",
    siteName: "LEAHVIGOR Solutions",
    title: "LEAHVIGOR Solutions | Accelerate Your Growth",
    description:
      "Leahvigor Solutions helps businesses accelerate growth through technology, digital strategy, talent acquisition and high-performance digital experiences.",
    images: [
      {
        url: "/logo/logo (2).png",
        width: 1200,
        height: 630,
        alt: "LEAHVIGOR Solutions Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LEAHVIGOR Solutions | Accelerate Your Growth",
    description:
      "Technology. Digital. Talent. One strategic partner to accelerate your growth.",
    images: ["/logo/logo (2).png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className="bg-midnight text-white font-sans antialiased">
        <CustomCursor />
        <Preloader />
        <Navbar />
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
