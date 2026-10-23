import React from "react";
import Link from "next/link";

export default function AboutBanner() {
  return (
    <section className="overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 p-6 text-white shadow-lg shadow-blue-500/20 md:p-8">
      <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
        <div>
          <p className="text-sm font-medium text-blue-100 uppercase tracking-wider">
            THANK YOU FOR VISITING
          </p>
          <h2 className="mt-1 text-xl font-bold md:text-2xl">
            ขอบคุณที่เข้ามาเยี่ยมชม My Blog 👋
          </h2>
          <p className="mt-2 text-sm text-blue-100">
            เรียนรู้ พัฒนา และสร้างสิ่งใหม่ไปด้วยกัน
          </p>
        </div>
        <Link
          href="/about"
          className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-600 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg active:scale-95"
        >
          รู้จักฉันเพิ่มเติม →
        </Link>
      </div>
    </section>
  );
}
