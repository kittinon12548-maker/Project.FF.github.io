"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Copy, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function HowToOrderPage() {
  const [copiedBank, setCopiedBank] = useState(false);
  const [copiedPromptPay, setCopiedPromptPay] = useState(false);

  const copyToClipboard = (text: string, type: "bank" | "promptpay") => {
    navigator.clipboard.writeText(text);
    if (type === "bank") {
      setCopiedBank(true);
      setTimeout(() => setCopiedBank(false), 2000);
    } else {
      setCopiedPromptPay(true);
      setTimeout(() => setCopiedPromptPay(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50/50 py-10 md:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-1.5 text-xs font-bold text-amber-900 border border-amber-200/80">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>GANHOM CUSTOMER SERVICE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-neutral-900 font-sans">
            วิธีการสั่งซื้อและการชำระเงิน
          </h1>
          <p className="text-sm sm:text-base text-neutral-500 max-w-2xl mx-auto">
            คู่มือขั้นตอนการสั่งซื้อสินค้าอย่างง่าย พร้อมช่องทางการชำระเงินที่ปลอดภัยและสะดวกรวดเร็ว
          </p>
        </div>

        {/* Section 1: 4 Steps */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.03)] space-y-8">
          <div className="border-b border-neutral-100 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white text-sm font-bold">
                1
              </span>
              ขั้นตอนการสั่งซื้อสินค้า
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              ทำตามขั้นตอนง่ายๆ 4 ขั้นตอนเพื่อสั่งซื้อสินค้าชิ้นโปรดของคุณ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="relative rounded-2xl border border-neutral-100 bg-neutral-50/60 p-5 flex flex-col justify-between hover:border-neutral-300 transition-all">
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-xl bg-neutral-900 text-[#f3d07a] flex items-center justify-center text-xl shadow-sm">
                  🛍️
                </div>
                <div className="text-xs font-bold text-[#8a5b14] tracking-wider uppercase">
                  ขั้นตอนที่ 1
                </div>
                <h3 className="font-bold text-neutral-900 text-base">
                  เลือกสินค้าที่ต้องการ
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  เลือกดูสินค้าจากหน้าสินค้า หรือแคตตาล็อก กดปุ่มดูรายละเอียดและเลือกแบบที่ชอบ
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-200/60">
                <Link
                  href="/products"
                  className="text-xs font-semibold text-neutral-900 hover:text-[#b38728] inline-flex items-center gap-1"
                >
                  ดูสินค้าทั้งหมด →
                </Link>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative rounded-2xl border border-neutral-100 bg-neutral-50/60 p-5 flex flex-col justify-between hover:border-neutral-300 transition-all">
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-xl bg-neutral-900 text-[#f3d07a] flex items-center justify-center text-xl shadow-sm">
                  🛒
                </div>
                <div className="text-xs font-bold text-[#8a5b14] tracking-wider uppercase">
                  ขั้นตอนที่ 2
                </div>
                <h3 className="font-bold text-neutral-900 text-base">
                  ตรวจสอบรายการ
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  ตรวจสอบรายการสินค้าในตะกร้า จำนวน และยอดรวม หรือกดสั่งซื้อตอนนี้ได้ทันที
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-200/60">
                <span className="text-xs text-neutral-400">ตรวจสอบความถูกต้อง</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative rounded-2xl border border-neutral-100 bg-neutral-50/60 p-5 flex flex-col justify-between hover:border-neutral-300 transition-all">
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-xl bg-neutral-900 text-[#f3d07a] flex items-center justify-center text-xl shadow-sm">
                  💳
                </div>
                <div className="text-xs font-bold text-[#8a5b14] tracking-wider uppercase">
                  ขั้นตอนที่ 3
                </div>
                <h3 className="font-bold text-neutral-900 text-base">
                  ชำระเงินและแจ้งโอน
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  เลือกช่องทางการชำระเงินที่สะดวก โอนเงินผ่านธนาคารหรือสแกน QR Code PromptPay
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-200/60">
                <span className="text-xs text-[#8a5b14] font-semibold inline-flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#c29015]" /> ปลอดภัย 100%
                </span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative rounded-2xl border border-neutral-100 bg-neutral-50/60 p-5 flex flex-col justify-between hover:border-neutral-300 transition-all">
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-xl bg-neutral-900 text-[#f3d07a] flex items-center justify-center text-xl shadow-sm">
                  📦
                </div>
                <div className="text-xs font-bold text-[#8a5b14] tracking-wider uppercase">
                  ขั้นตอนที่ 4
                </div>
                <h3 className="font-bold text-neutral-900 text-base">
                  รอรับสินค้าพรีเมียม
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  ร้านค้าจัดเตรียมพัสดุและจัดส่งแบบด่วนพิเศษ พร้อมแจ้งหมายเลข Tracking ให้ท่านติดตาม
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-200/60">
                <Link
                  href="/contact"
                  className="text-xs font-semibold text-neutral-900 hover:text-[#b38728] inline-flex items-center gap-1"
                >
                  สอบถามสถานะคำสั่งซื้อ →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Payment Channels */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.03)] space-y-8">
          <div className="border-b border-neutral-100 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white text-sm font-bold">
                2
              </span>
              ช่องทางการชำระเงิน
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              ท่านสามารถเลือกชำระเงินผ่านช่องทางที่ท่านสะดวกได้ดังนี้
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Kasikorn Bank */}
            <div className="rounded-2xl border border-neutral-200/80 p-6 bg-gradient-to-br from-neutral-50 to-white relative overflow-hidden shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-neutral-950 text-[#f3d07a] border border-[#b38728]/30 flex items-center justify-center font-bold text-sm shadow-sm">
                    KBANK
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 text-base">ธนาคารกสิกรไทย</h3>
                    <p className="text-xs text-neutral-500">Kasikornbank</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#8a5b14] bg-[#fdf8e6] px-2.5 py-1 rounded-full border border-[#f3d07a]">
                  แนะนำ
                </span>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm pt-2">
                <div className="flex justify-between items-center py-1 border-b border-neutral-100">
                  <span className="text-neutral-500">ชื่อบัญชี:</span>
                  <span className="font-semibold text-neutral-900">
                    บจก. แกนหอม ลักชัวรี่ (GANHOM)
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-neutral-100">
                  <span className="text-neutral-500">เลขที่บัญชี:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-base text-neutral-900 tracking-wider">
                      089-2-89234-1
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard("089-2-89234-1", "bank")}
                      className="p-1 text-neutral-400 hover:text-black transition"
                      title="คัดลอกเลขบัญชี"
                    >
                      {copiedBank ? (
                        <Check className="w-4 h-4 text-[#8a5b14]" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-neutral-500">ประเภท:</span>
                  <span className="text-neutral-700">ออมทรัพย์</span>
                </div>
              </div>
            </div>

            {/* PromptPay */}
            <div className="rounded-2xl border border-neutral-200/80 p-6 bg-gradient-to-br from-neutral-50 to-white relative overflow-hidden shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-neutral-950 text-[#f3d07a] border border-[#b38728]/30 flex items-center justify-center font-bold text-sm shadow-sm">
                    QR
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 text-base">
                      พร้อมเพย์ (PromptPay)
                    </h3>
                    <p className="text-xs text-neutral-500">
                      สแกนจ่ายได้ทุกธนาคาร ไม่มีค่าธรรมเนียม
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#8a5b14] bg-[#fdf8e6] px-2.5 py-1 rounded-full border border-[#f3d07a]">
                  รวดเร็ว
                </span>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm pt-2">
                <div className="flex justify-between items-center py-1 border-b border-neutral-100">
                  <span className="text-neutral-500">พร้อมเพย์ ID:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-base text-neutral-900 tracking-wider">
                      099-400-0199
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard("099-400-0199", "promptpay")}
                      className="p-1 text-neutral-400 hover:text-black transition"
                      title="คัดลอกพร้อมเพย์ ID"
                    >
                      {copiedPromptPay ? (
                        <Check className="w-4 h-4 text-[#8a5b14]" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-neutral-100">
                  <span className="text-neutral-500">ชื่อบัญชี:</span>
                  <span className="font-semibold text-neutral-900">
                    GANHOM LUXURY OFFICIAL
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-neutral-500">การยืนยันยอด:</span>
                  <span className="text-[#8a5b14] font-medium">
                    ตรวจรับยอดอัตโนมัติทันที
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Questions CTA */}
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-bold">
              มีข้อสงสัยเกี่ยวกับการสั่งซื้อหรือการชำระเงิน?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-xl">
              ทีมงานของเราพร้อมดูแลและให้คำปรึกษาตลอดทุกขั้นตอน ติดต่อสอบถามได้ทันที
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-white text-black text-xs sm:text-sm font-bold hover:bg-neutral-100 transition shadow-sm"
            >
              ติดต่อเรา
            </Link>
            <Link
              href="/products"
              className="px-6 py-3 rounded-full bg-neutral-800 text-white border border-neutral-700 text-xs sm:text-sm font-semibold hover:bg-neutral-700 transition"
            >
              เลือกชมสินค้า
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
