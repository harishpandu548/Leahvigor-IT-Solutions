"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight, Send } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "contact@leahvigor.com",
    href: "mailto:contact@leahvigor.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 7674012233",
    href: "tel:+917674012233",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Hyderabad, Telangana, India",
    href: null,
  },
];

const serviceOptions = [
  "IT Solutions",
  "Digital Growth",
  "Talent Acquisition",
  "Website Creation",
  "General Enquiry",
];

export default function Contact() {
  const brandName = "LEAHVIGOR".split("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to form submission API / email service
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative pt-24 lg:pt-32 pb-0"
      aria-label="Contact section"
    >
      {/* BG glow */}
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] blur-[140px] opacity-6 pointer-events-none"
        style={{ background: "radial-gradient(circle, #3B82F615, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <SectionLabel text="Get in touch" />
        <h2
          className="font-display font-bold text-white leading-tight mt-4 mb-16 flex flex-wrap gap-x-[0.22em] gap-y-2 cursor-default"
          style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)" }}
        >
          {["Let's", "build", "what's", "next."].map((word, i) => {
            const highlight = ["what's", "next."].includes(word);
            return (
              <motion.span
                key={i}
                whileHover={{ 
                  scale: 1.05, 
                  color: highlight ? "#A855F7" : "#8B5CF6",
                  textShadow: highlight ? "0px 0px 20px rgba(168,85,247,0.6)" : "0px 0px 20px rgba(139,92,246,0.6)",
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`inline-block transition-colors ${highlight ? "gradient-text" : ""}`}
              >
                {word}
              </motion.span>
            );
          })}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact info */}
          <div>
            <p className="text-slate-400 text-base leading-relaxed font-sans mb-10 max-w-sm">
              Ready to accelerate your growth? Reach out and a member of our team will get back to you within one business day.
            </p>

            <div className="space-y-6">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-500/20 transition-colors">
                      <Icon size={16} className="text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-xs font-sans font-medium uppercase tracking-widest text-slate-500 mb-0.5">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-white font-sans hover:text-indigo-400 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-white font-sans">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Decorative */}
            <div className="mt-12 pt-12 border-t border-white/5">
              <p className="text-slate-500 text-sm font-sans">
                LEAHVIGOR Solutions Pvt. Ltd.
              </p>
              <p className="text-slate-600 text-xs font-sans mt-1">
                Hyderabad, Telangana, India
              </p>
            </div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
                noValidate
                aria-label="Contact form"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-name"
                      className="text-xs font-sans font-medium text-slate-400 uppercase tracking-widest"
                    >
                      Name *
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full bg-surface border border-white/8 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 font-sans text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-surface-2 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-email"
                      className="text-xs font-sans font-medium text-slate-400 uppercase tracking-widest"
                    >
                      Work Email *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className="w-full bg-surface border border-white/8 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 font-sans text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-surface-2 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-company"
                      className="text-xs font-sans font-medium text-slate-400 uppercase tracking-widest"
                    >
                      Company
                    </label>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company name"
                      className="w-full bg-surface border border-white/8 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 font-sans text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-surface-2 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-phone"
                      className="text-xs font-sans font-medium text-slate-400 uppercase tracking-widest"
                    >
                      Phone
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full bg-surface border border-white/8 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 font-sans text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-surface-2 transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-service"
                    className="text-xs font-sans font-medium text-slate-400 uppercase tracking-widest"
                  >
                    What can we help you with?
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-surface border border-white/8 rounded-xl px-4 py-3.5 text-white font-sans text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-surface-2 transition-all appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-charcoal text-slate-400">Select a service...</option>
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-charcoal">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-message"
                    className="text-xs font-sans font-medium text-slate-400 uppercase tracking-widest"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project or challenge..."
                    className="w-full bg-surface border border-white/8 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 font-sans text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-surface-2 transition-all resize-none"
                  />
                </div>

                <button
                  id="contact-submit"
                  type="submit"
                  className="group w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-gradient-to-r from-electric via-indigo-500 to-violet text-white font-display font-bold text-base hover:opacity-90 hover:scale-[1.01] transition-all duration-300"
                >
                  <Send size={18} />
                  Send Enquiry
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-20 rounded-2xl border border-indigo-500/20 bg-indigo-500/5"
              >
                <div className="w-16 h-16 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center mb-6">
                  <Send size={24} className="text-indigo-400" />
                </div>
                <h3 className="font-display font-bold text-white text-2xl mb-3">
                  Message received.
                </h3>
                <p className="text-slate-400 font-sans text-base max-w-xs">
                  We&apos;ll be in touch within one business day. Thank you for reaching out.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* GIANT HOVER TEXT */}
      <div className="w-full mt-12 pb-0 cursor-default px-6 lg:px-12 max-w-[1600px] mx-auto">
        <div className="flex justify-between w-full">
          {brandName.map((char, i) => (
            <motion.div
              key={i}
              className="relative font-display font-bold text-[clamp(4rem,15vw,22rem)] leading-[0.8] tracking-tighter select-none block overflow-hidden group"
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              {/* Initial Solid Letter */}
              <motion.span
                variants={{
                  rest: { y: 0, rotateX: 0, opacity: 1 },
                  hover: { y: "-100%", rotateX: 90, opacity: 0 }
                }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                className="block text-white origin-bottom"
              >
                {char}
              </motion.span>

              {/* Hover Image-Clipped Letter */}
              <motion.span
                variants={{
                  rest: { y: "100%", rotateX: -90, opacity: 0 },
                  hover: { y: 0, rotateX: 0, opacity: 1 }
                }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                className="block absolute top-0 left-0 origin-top w-full text-center"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1600&auto=format&fit=crop')",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  backgroundAttachment: "fixed",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  color: "transparent",
                  WebkitTextStroke: "2px rgba(255,255,255,0.3)"
                }}
              >
                {char}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
