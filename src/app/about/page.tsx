import React from "react";
import Link from "next/link";
import { ArrowLeft, GraduationCap, BookOpen, Target, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-16">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-[#8a5b14] transition"
        >
          <ArrowLeft className="w-4 h-4" /> กลับสู่หน้าแรก
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-neutral-200/80 p-8 sm:p-12 shadow-sm relative overflow-hidden">
        {/* Ambient Top Gold Glow */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#b38728] via-[#f3d07a] to-[#996515] absolute top-0 left-0 right-0"></div>

        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-[#8a5b14] border border-amber-200/80">
            <Sparkles className="w-3.5 h-3.5 text-[#c29015]" /> About Me / Profile
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
          เกี่ยวกับฉัน
        </h1>

        <p className="mt-2 text-sm text-neutral-500">
          ข้อมูลส่วนตัวและเป้าหมายของผู้พัฒนาเว็บไซต์
        </p>

        {/* Highlighted Profile Info in Unified 3 Colors */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {/* Card 1 */}
          <div className="p-5 rounded-2xl bg-neutral-50/70 border border-neutral-200/80 hover:border-[#c29015] transition-all flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-900 text-[#f3d07a] shadow-xs">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#8a5b14] uppercase tracking-wider">
                การศึกษา
              </span>
            </div>
            <div className="mt-4">
              <p className="text-xs text-neutral-400">สาขา</p>
              <p className="text-base font-bold text-neutral-900 mt-0.5">
                🎓 วิทยาการคอมพิวเตอร์
              </p>
              <p className="text-xs text-neutral-500 mt-1">มหาวิทยาลัยทักษิณ (TSU)</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-5 rounded-2xl bg-neutral-50/70 border border-neutral-200/80 hover:border-[#c29015] transition-all flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-900 text-[#f3d07a] shadow-xs">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#8a5b14] uppercase tracking-wider">
                ความสนใจ
              </span>
            </div>
            <div className="mt-4">
              <p className="text-xs text-neutral-400">รายวิชาที่ชอบ</p>
              <p className="text-base font-bold text-neutral-900 mt-0.5">
                📚 ภาษาอังกฤษเพื่อการสื่อสาร 1
              </p>
              <p className="text-xs text-neutral-500 mt-1">English for Communication 1</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-5 rounded-2xl bg-neutral-50/70 border border-neutral-200/80 hover:border-[#c29015] transition-all flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-900 text-[#f3d07a] shadow-xs">
                <Target className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#8a5b14] uppercase tracking-wider">
                เป้าหมายในอนาคต
              </span>
            </div>
            <div className="mt-4">
              <p className="text-xs text-neutral-400">เป้าหมาย</p>
              <p className="text-base font-bold text-neutral-900 mt-0.5">
                🎯 ว่างงานแต่รวย
              </p>
              <p className="text-xs text-neutral-500 mt-1">Financial Freedom &amp; Happiness</p>
            </div>
          </div>
        </div>

        {/* Detailed Section */}
        <div className="mt-8 border-t border-neutral-100 pt-6">
          <h2 className="text-lg font-bold text-neutral-900 mb-3">
            เกี่ยวกับโปรเจกต์นี้
          </h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            เว็บไซต์นี้เป็นส่วนหนึ่งของรายวิชา <strong>0214321 Web App Design &amp; Development</strong>{" "}
            พัฒนาด้วย Next.js, React, TypeScript และ Tailwind CSS เพื่อจำลองแพลตฟอร์ม E-Commerce
            ระดับลักชัวรีแบรนด์ <strong>GANHOM</strong> ที่ผสานระบบจัดการผลิตภัณฑ์ บทความ (Blog API)
            และระบบติดต่อสอบถาม (Customer Contact Center) ไว้อย่างครบถ้วน
          </p>
        </div>
      </div>
    </div>
  );
}
