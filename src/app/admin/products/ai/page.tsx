"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Bot,
  Copy,
  Check,
  Wand2,
  FileText,
  Tag,
  ArrowRight,
  TrendingUp,
  Image as ImageIcon,
  Zap,
} from "lucide-react";

export default function AdminAIEnhancerPage() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // AI Title states
  const [productKeyword, setProductKeyword] = useState("สารกระตุ้นเรซิ่นไม้กฤษณา กานหอม");
  const [titleTone, setTitleTone] = useState("ทางการและน่าเชื่อถือ");
  const [generatedTitles, setGeneratedTitles] = useState<string[]>([
    "สารกระตุ้นเรซิ่นไม้กฤษณา กานหอม (GANHOM) สูตรเข้มข้น เร่งสร้างแก่นหอม ย่นเวลาเหลือ 2-3 ปี ปลอดภัย 100%",
    "【ส่งฟรี】สารกระตุ้นไม้กฤษณา พรีเมียม 1L / 3L เพิ่มผลผลิตเรซิ่น ยางหอมเข้มข้น คุณภาพเกรดส่งออก",
    "สารกระตุ้นต้นกฤษณา กานหอม แกลลอนแท้สูตรธรรมชาติ ซึมลึกเข้าสู่แก่น ไม่ทำให้ลำต้นเน่าเสีย",
  ]);

  // AI Description states
  const [features, setFeatures] = useState("สารสกัดธรรมชาติ 100%, เร่งเรซิ่นไว 2-3 ปี, ไม่เป็นพิษ, มีขนาด 1L และ 3L");
  const [generatedDesc, setGeneratedDesc] = useState(`🌿 สารกระตุ้นเรซิ่นไม้กฤษณา กานหอม (GANHOM Official)

สุดยอดนวัตกรรมสารกระตุ้นการสร้างแก่นหอม สำหรับชาวสวนไม้กฤษณาโดยเฉพาะ
สูตรสารสกัดจากธรรมชาติ 100% ปลอดภัยต่อสิ่งแวดล้อมและผู้ใช้งาน ไม่ทำให้ต้นไม้เน่าเสีย

✨ จุดเด่นของผลิตภัณฑ์:
• ย่นระยะเวลาการเกิดแก่นหอมจากเดิม 6-7 ปี เหลือเพียง 2-3 ปี
• เพิ่มปริมาณและความเข้มข้นของเรซิ่นยางหอมเกรดพรีเมียม
• ซึมลึกตรงเข้าสู่แก่นไม้ ใช้งานง่ายทั้งแบบถุงแขวนและแบบหมักเจาะลำต้น
• มีให้เลือกทั้งขนาด 1 ลิตร (ทดลอง) และ 3 ลิตร (สุดคุ้ม)

📦 พร้อมจัดส่งด่วนทั่วประเทศ รับประกันคุณภาพสินค้าแท้ 100% จากผู้ผลิต`);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleGenerateTitle = () => {
    setGeneratedTitles([
      `[ขายดี] ${productKeyword} สูตรเข้มข้นพิเศษ เร่งยางหอมเร็วขึ้น 3 เท่า เกรดส่งออก`,
      `【แท้ 100%】${productKeyword} ปลอดภัย ไร้สารเคมีตกค้าง พร้อมส่งทั่วไทย`,
      `${productKeyword} ขนาด 1L - 3L ช่วยย่นระยะเวลาเก็บเกี่ยว เพิ่มมูลค่าไม้กฤษณา`,
    ]);
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-neutral-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-800 flex items-center gap-2">
            <span>Shopee AI ช่วยเพิ่มประสิทธิภาพ</span>
            <span className="text-xs bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Smart Tools</span>
            </span>
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            ใช้ปัญญาประดิษฐ์ช่วยสร้างชื่อสินค้า คำบรรยาย และคีย์เวิร์ด SEO เพื่อเพิ่มยอดขายและอันดับการค้นหา
          </p>
        </div>

        <Link
          href="/admin/products"
          className="px-3.5 py-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold flex items-center gap-1.5 transition self-start sm:self-auto"
        >
          <span>กลับไปที่สินค้าของฉัน</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Tool 1: AI Title Generator */}
        <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs space-y-4 text-xs">
          <div className="flex items-center gap-2 text-neutral-800 font-bold border-b border-neutral-100 pb-3">
            <Tag className="w-4 h-4 text-[#ee4d2d]" />
            <span className="text-sm">AI สร้างชื่อสินค้าดึงดูดใจ (SEO Title Enhancer)</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                คีย์เวิร์ดหรือชื่อสินค้าเริ่มต้น:
              </label>
              <input
                type="text"
                value={productKeyword}
                onChange={(e) => setProductKeyword(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-800 focus:outline-none focus:border-[#ee4d2d]"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-neutral-500">โทนภาษา: ทางการ / ส่งเสริมการขาย</span>
              <button
                type="button"
                onClick={handleGenerateTitle}
                className="px-4 py-2 rounded-lg bg-[#ee4d2d] hover:bg-[#d73f20] text-white font-bold flex items-center gap-1.5 transition shadow-xs cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>สร้างชื่อใหม่ด้วย AI</span>
              </button>
            </div>

            <div className="space-y-2 pt-2 border-t border-neutral-100">
              <p className="font-semibold text-neutral-600">ตัวอย่างชื่อสินค้าที่ AI แนะนำ:</p>
              {generatedTitles.map((t, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 flex items-start justify-between gap-3 hover:border-amber-300 transition"
                >
                  <p className="text-neutral-800 font-medium leading-relaxed">{t}</p>
                  <button
                    type="button"
                    onClick={() => handleCopy(t, `title-${idx}`)}
                    className="p-1.5 rounded bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-600 cursor-pointer flex-shrink-0"
                    title="คัดลอกข้อความ"
                  >
                    {copiedKey === `title-${idx}` ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tool 2: AI Description Writer */}
        <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs space-y-4 text-xs">
          <div className="flex items-center gap-2 text-neutral-800 font-bold border-b border-neutral-100 pb-3">
            <FileText className="w-4 h-4 text-[#ee4d2d]" />
            <span className="text-sm">AI เขียนคำบรรยายสินค้า (Product Description)</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                จุดเด่นหลักของสินค้า (คั่นด้วยจุลภาค):
              </label>
              <input
                type="text"
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-800 focus:outline-none focus:border-[#ee4d2d]"
              />
            </div>

            <div className="relative">
              <textarea
                rows={9}
                value={generatedDesc}
                onChange={(e) => setGeneratedDesc(e.target.value)}
                className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-800 font-mono text-[11px] leading-relaxed focus:outline-none focus:border-[#ee4d2d]"
              />
              <button
                type="button"
                onClick={() => handleCopy(generatedDesc, "desc")}
                className="absolute top-2 right-2 px-3 py-1.5 rounded-lg bg-white shadow-xs border border-neutral-200 hover:bg-neutral-50 text-neutral-700 font-semibold flex items-center gap-1 cursor-pointer"
              >
                {copiedKey === "desc" ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span className="text-emerald-600">คัดลอกแล้ว</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>คัดลอกรายละเอียด</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
