import React from "react";
import Link from "next/link";
import { ArrowLeft, GraduationCap, BookOpen, Target, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-16">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition"
        >
          <ArrowLeft className="w-4 h-4" /> กลับสู่หน้าแรก
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-sm relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-sky-400"></div>

        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 border border-blue-100">
            <Sparkles className="w-3.5 h-3.5" /> About Me / Profile
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-950 tracking-tight">
          เกี่ยวกับฉัน
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          ข้อมูลส่วนตัวและเป้าหมายของผู้พัฒนาเว็บไซต์
        </p>

        {/* Highlighted Profile Info */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100/80 flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">
                การศึกษา
              </span>
            </div>
            <div className="mt-4">
              <p className="text-xs text-slate-500">สาขา</p>
              <p className="text-base font-bold text-slate-900 mt-0.5">
                🎓 วิทยาการคอมพิวเตอร์
              </p>
              <p className="text-xs text-blue-700 mt-1">มหาวิทยาลัยทักษิณ (TSU)</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-100/80 flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-600 text-white shadow-sm">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                ความสนใจ
              </span>
            </div>
            <div className="mt-4">
              <p className="text-xs text-slate-500">รายวิชาที่ชอบ</p>
              <p className="text-base font-bold text-slate-900 mt-0.5">
                📚 ภาษาอังกฤษเพื่อการสื่อสาร 1
              </p>
              <p className="text-xs text-amber-700 mt-1">English for Communication 1</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-100/80 flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
                <Target className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                เป้าหมายในอนาคต
              </span>
            </div>
            <div className="mt-4">
              <p className="text-xs text-slate-500">เป้าหมาย</p>
              <p className="text-base font-bold text-slate-900 mt-0.5">
                🎯 ว่างงานแต่รวย
              </p>
              <p className="text-xs text-emerald-700 mt-1">Financial Freedom &amp; Happiness</p>
            </div>
          </div>
        </div>

        {/* Detailed Section */}
        <div className="mt-8 border-t border-slate-100 pt-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3">
            เกี่ยวกับโปรเจกต์นี้
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
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
