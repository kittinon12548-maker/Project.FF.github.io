"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Layers,
  Sparkles,
  ArrowRight,
  Search,
  ExternalLink,
} from "lucide-react";

export default function AdminStandardProductPage() {
  const [activeTab, setActiveTab] = useState<"standard" | "mapping" | "quality">("standard");

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-neutral-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-800 flex items-center gap-2">
            <span>Shopee Standard Product</span>
            <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ระบบมาตรฐานสินค้า</span>
            </span>
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            ฐานข้อมูลมาตรฐานสินค้า ช่วยให้ข้อมูลคุณสมบัติสินค้าถูกต้อง ตรงตามข้อกำหนดของแพลตฟอร์ม
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

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
        <div className="flex items-center border-b border-neutral-200 text-xs font-medium">
          {[
            { key: "standard", label: "แคตตาล็อกสินค้ามาตรฐาน" },
            { key: "quality", label: "คะแนนคุณภาพข้อมูลสินค้า (Quality Score)" },
            { key: "mapping", label: "การจับคู่แบรนด์และหมวดหมู่" },
          ].map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setActiveTab(t.key as any)}
              className={`py-3 px-5 border-b-2 transition cursor-pointer ${
                activeTab === t.key
                  ? "border-[#ee4d2d] text-[#ee4d2d] font-bold bg-[#fffdfd]"
                  : "border-transparent text-neutral-600 hover:text-neutral-900"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Standard Catalog */}
        {activeTab === "standard" && (
          <div className="p-5 space-y-4">
            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/60 text-xs text-amber-900 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold">สิทธิประโยชน์ของการใช้ Shopee Standard Product</p>
                <p className="text-amber-800 leading-relaxed">
                  สินค้าที่ระบุคุณลักษณะตรงตามมาตรฐานจะได้รับสัญลักษณ์รับรองความถูกต้อง มีโอกาสแสดงในหน้าแรกของผลการค้นหาเพิ่มขึ้นถึง 35% และช่วยให้ผู้ซื้อค้นหาพบได้ง่ายขึ้น
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-neutral-200 bg-white space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-neutral-800 text-sm">
                    หมวด: สารกระตุ้นเรซิ่นไม้กฤษณา
                  </span>
                  <span className="text-[11px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">
                    รับรองแล้ว
                  </span>
                </div>
                <div className="space-y-1.5 text-neutral-600">
                  <p>• <strong>แบรนด์:</strong> GANHOM (กานหอม) Official</p>
                  <p>• <strong>มาตรฐาน:</strong> สารสกัดชีวภาพ 100% ปราศจากสารเคมีตกค้าง</p>
                  <p>• <strong>ขนาดบรรจุมาตรฐาน:</strong> 1,000 ml / 3,000 ml / 5,000 ml</p>
                  <p>• <strong>อายุการเก็บรักษา:</strong> 2 ปี นับจากวันผลิต</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200 bg-white space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-neutral-800 text-sm">
                    หมวด: น้ำหอมกฤษณาแท้เกรดพรีเมียม
                  </span>
                  <span className="text-[11px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">
                    รับรองแล้ว
                  </span>
                </div>
                <div className="space-y-1.5 text-neutral-600">
                  <p>• <strong>แบรนด์:</strong> CHUN / GANHOM Luxury</p>
                  <p>• <strong>ประเภทน้ำหอม:</strong> Eau De Parfum (EDP)</p>
                  <p>• <strong>ความเข้มข้นหัวน้ำหอม:</strong> 20 - 25%</p>
                  <p>• <strong>ระยะเวลาความหอม:</strong> ติดทนนาน 12 - 18 ชั่วโมง</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Quality Score */}
        {activeTab === "quality" && (
          <div className="p-5 space-y-4 text-xs">
            <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 border border-neutral-200">
              <div>
                <p className="text-sm font-bold text-neutral-800">
                  ระดับความสมบูรณ์ของข้อมูลสินค้าทั้งร้าน
                </p>
                <p className="text-neutral-500 mt-0.5">
                  ประเมินจากความครบถ้วนของรูปภาพ, คำบรรยาย, น้ำหนัก และคุณลักษณะ
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-emerald-600">96%</span>
                <p className="text-[11px] text-emerald-700 font-semibold">ระดับดีเยี่ยม (Excellent)</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="p-3 rounded-lg border border-neutral-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="font-medium text-neutral-700">รูปภาพหน้าปกความละเอียดสูง คมชัด</span>
                </div>
                <span className="text-emerald-600 font-bold">ผ่านเกณฑ์</span>
              </div>

              <div className="p-3 rounded-lg border border-neutral-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="font-medium text-neutral-700">ระบุน้ำหนักและขนาดพัสดุชัดเจน</span>
                </div>
                <span className="text-emerald-600 font-bold">ผ่านเกณฑ์</span>
              </div>

              <div className="p-3 rounded-lg border border-neutral-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="font-medium text-neutral-700">ระบุ SKU และตัวเลือกสินค้าครบถ้วน</span>
                </div>
                <span className="text-emerald-600 font-bold">ผ่านเกณฑ์</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Mapping */}
        {activeTab === "mapping" && (
          <div className="p-5 text-xs text-neutral-600 space-y-3">
            <p className="font-bold text-neutral-800 text-sm">การจับคู่หมวดหมู่สากลของ Shopee</p>
            <p>ระบบเชื่อมโยงหมวดหมู่ร้านค้า GANHOM เข้ากับ Shopee Category Tree อัตโนมัติ:</p>
            <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 space-y-2 font-mono text-[11px]">
              <p>• สินค้าเกษตร &gt; ปุ๋ยและสารบำรุงต้นไม้ &gt; สารกระตุ้นเรซิ่นไม้กฤษณา</p>
              <p>• สุขภาพและความงาม &gt; น้ำหอมและกลิ่นบำบัด &gt; น้ำหอมกฤษณา EDP</p>
              <p>• เครื่องมือช่าง &gt; อุปกรณ์ทำสวน &gt; สายยางและถุงหยดสารอาหารต้นไม้</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
