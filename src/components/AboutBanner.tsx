import React from "react";
import Link from "next/link";

export default function AboutBanner() {
  return (
    <section className="overflow-hidden rounded-2xl bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 p-6 text-white shadow-xl shadow-black/15 border border-[#b38728]/35 md:p-8">
      <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
        <div>
          <p className="text-xs font-bold text-[#f3d07a] uppercase tracking-[0.2em]">
            THANK YOU FOR VISITING
          </p>
          <h2 className="mt-1 text-xl font-bold md:text-2xl text-white">
            ขอบคุณที่เข้ามาเยี่ยมชม My Blog 👋
          </h2>
          <p className="mt-2 text-sm text-neutral-300">
            เรียนรู้ พัฒนา และสร้างสิ่งใหม่ไปด้วยกัน
          </p>
        </div>
        <Link
          href="/about"
          className="rounded-xl bg-gradient-to-r from-[#b38728] via-[#f3d07a] to-[#996515] px-6 py-3 text-sm font-extrabold text-neutral-950 shadow-md transition-all hover:scale-105 active:scale-95"
        >
          รู้จักฉันเพิ่มเติม →
        </Link>
      </div>
    </section>
  );
}
