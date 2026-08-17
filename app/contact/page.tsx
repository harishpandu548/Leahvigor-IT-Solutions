import { Metadata } from "next";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with LEAHVIGOR Solutions. Let's start a conversation about how we can help accelerate your business growth.",
};

export default function ContactPage() {
  return (
    <main id="main-content" className="pt-24">
      <Contact />
      <Footer />
    </main>
  );
}
