"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] py-8 px-6 lg:px-12 w-full text-slate-300 border-t border-white/5">
      <div className="max-w-[1600px] mx-auto">
        {/* BOTTOM ROW */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans text-slate-500 uppercase tracking-widest">
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/support" className="hover:text-white transition-colors">Support</Link>
          </div>
          <p>© {year} LEAHVIGOR SOLUTIONS PVT. LTD. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
}
