"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#8a5b14] via-[#c29015] to-[#71440a] text-white text-lg shadow-sm">
              📝
            </div>
            <div>
              <p className="font-bold text-neutral-900">My Blog</p>
              <p className="text-xs text-neutral-500">Personal Blog Website &amp; GANHOM Luxury Store</p>
            </div>
          </div>
          <div className="text-center text-sm text-neutral-500 sm:text-right">
            <p>© 2026 My Blog. All rights reserved.</p>
            <p className="mt-1 font-semibold text-neutral-700">0214321 Web App Design &amp; Development</p>
          </div>
        </div>
        <div className="mt-6 border-t border-neutral-100 pt-5 text-center text-xs text-neutral-400">
          Built with{" "}
          <span className="font-bold text-[#8a5b14]">Next.js</span> •{" "}
          <span className="font-bold text-[#8a5b14]">TypeScript</span> •{" "}
          <span className="font-bold text-[#8a5b14]">Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
}
