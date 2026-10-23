"use client";

import React, { useState } from "react";
import Link from "next/link";

interface FeaturedItem {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  hasFromPrefix?: boolean;
  imageUrl: string;
}

interface TabContent {
  id: string;
  name: string;
  featured: {
    brand: string;
    model: string;
    modelHighlight?: string;
    modelSuffix?: string;
    badge: string;
    tagline: string;
    specs: string[];
    price: string;
    originalPrice: string;
    hasFromPrefix?: boolean;
    btnText: string;
    btnHref: string;
    imageUrl: string;
  };
  items: FeaturedItem[];
}

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState<"new" | "lifestyle">("new");

  const tabs: Record<string, TabContent> = {
    new: {
      id: "new",
      name: "สินค้าใหม่",
      featured: {
        brand: "REDMI",
        model: "Note ",
        modelHighlight: "17",
        modelSuffix: " Pro Max",
        badge: "5G",
        tagline: "แบตแกร่งเต็ม MAX",
        specs: [
          "แบตเตอรี่ 10000mAh พร้อมไฮเปอร์ชาร์จ 100W",
          "ทนน้ำลึก 2 เมตร นาน 72 ชั่วโมง",
        ],
        price: "฿17,990.00",
        originalPrice: "฿21,599.00",
        hasFromPrefix: true,
        btnText: "เรียนรู้เพิ่มเติม",
        btnHref: "/products",
        imageUrl: "https://www.latifperfumes.com/_next/static/media/agarwoodfront.86510e2b.jpg",
      },
      items: [
        {
          id: "redmi-17-5g",
          name: "REDMI Note 17 5G",
          price: "฿11,999.00",
          originalPrice: "฿14,399.00",
          hasFromPrefix: true,
          imageUrl: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&auto=format&fit=crop&q=80",
        },
        {
          id: "redmi-watch-6-lite",
          name: "REDMI Watch 6 Lite",
          price: "฿1,999.00",
          originalPrice: "฿2,990.00",
          imageUrl: "https://www.central.co.th/e-shopping/wp-content/uploads/2020/12/TOM-FORD-BEAUTY-OUD.jpg",
        },
        {
          id: "poco-f9-ultra",
          name: "POCO F9 Ultra",
          price: "฿29,990.00",
          originalPrice: "฿31,990.00",
          hasFromPrefix: true,
          imageUrl: "https://images.unsplash.com/photo-1608500218890-c4f86641bc34?w=500&auto=format&fit=crop&q=80",
        },
        {
          id: "poco-f9-pro",
          name: "POCO F9 Pro",
          price: "฿25,990.00",
          originalPrice: "฿27,990.00",
          hasFromPrefix: true,
          imageUrl: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=500&auto=format&fit=crop&q=80",
        },
      ],
    },
    lifestyle: {
      id: "lifestyle",
      name: "ตอบโจทย์ทุกไลฟ์สไตล์",
      featured: {
        brand: "XIAOMI",
        model: "Buds 5 Pro",
        badge: "Hi-Res",
        tagline: "มิติเสียงคมชัด ตัดเสียงรบกวนขั้นสุด",
        specs: [
          "ระบบตัดเสียงรบกวนอัจฉริยะแบบ Hybrid Active Noise Cancellation",
          "แบตเตอรี่ใช้งานต่อเนื่องสูงสุดถึง 38 ชั่วโมง",
        ],
        price: "฿3,990.00",
        originalPrice: "฿4,990.00",
        btnText: "เรียนรู้เพิ่มเติม",
        btnHref: "/products",
        imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
      },
      items: [
        {
          id: "smart-band-9",
          name: "Xiaomi Smart Band 9",
          price: "฿1,490.00",
          originalPrice: "฿1,990.00",
          imageUrl: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&auto=format&fit=crop&q=80",
        },
        {
          id: "sound-pocket",
          name: "Xiaomi Sound Pocket",
          price: "฿699.00",
          originalPrice: "฿990.00",
          imageUrl: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&auto=format&fit=crop&q=80",
        },
        {
          id: "scooter-4-pro",
          name: "Electric Scooter 4 Pro",
          price: "฿18,990.00",
          originalPrice: "฿22,990.00",
          hasFromPrefix: true,
          imageUrl: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=500&auto=format&fit=crop&q=80",
        },
        {
          id: "action-cam",
          name: "Xiaomi Action Cam 4K",
          price: "฿4,590.00",
          originalPrice: "฿5,990.00",
          imageUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=80",
        },
      ],
    },
  };

  const currentTab = tabs[activeTab];

  return (
    <section className="w-full py-6 sm:py-10">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-neutral-900 tracking-tight font-sans">
        ผลิตภัณฑ์ที่ร่วมรายการ
      </h2>

      {/* Tabs Filter Buttons */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-7 pb-1 overflow-x-auto no-scrollbar px-4">
        <button
          type="button"
          onClick={() => setActiveTab("new")}
          className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer focus:outline-none ${
            activeTab === "new"
              ? "bg-neutral-900 text-white shadow-md"
              : "bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900"
          }`}
        >
          สินค้าใหม่
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("lifestyle")}
          className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer focus:outline-none ${
            activeTab === "lifestyle"
              ? "bg-neutral-900 text-white shadow-md"
              : "bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900"
          }`}
        >
          ตอบโจทย์ทุกไลฟ์สไตล์
        </button>
      </div>

      {/* Main Tab Content Card */}
      <div className="mt-7 sm:mt-8 rounded-3xl bg-white border border-neutral-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)] p-4 sm:p-7 md:p-8 transition-all">
        {/* Featured Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden bg-neutral-50/70 border border-neutral-100 transition-all hover:shadow-sm">
          <div className="relative w-full h-[240px] sm:h-[300px] md:h-[340px] overflow-hidden bg-neutral-100/80 flex items-center justify-center">
            <img
              src={currentTab.featured.imageUrl}
              alt={currentTab.featured.model}
              className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center items-center text-center">
            <span className="text-xs sm:text-sm font-black tracking-widest text-neutral-700 uppercase font-sans">
              {currentTab.featured.brand}
            </span>
            <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight flex items-center justify-center flex-wrap gap-1 font-sans">
              <span>{currentTab.featured.model}</span>
              {currentTab.featured.modelHighlight && (
                <span className="text-[#e11d48] font-black">
                  {currentTab.featured.modelHighlight}
                </span>
              )}
              {currentTab.featured.modelSuffix && <span>{currentTab.featured.modelSuffix}</span>}
              <span className="ml-1 text-[11px] font-bold px-1.5 py-0.5 border border-neutral-800 rounded text-neutral-900 leading-none">
                {currentTab.featured.badge}
              </span>
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm font-semibold text-neutral-600 tracking-wide">
              {currentTab.featured.tagline}
            </p>
            <div className="mt-3 text-xs sm:text-[13px] text-neutral-500 leading-relaxed max-w-sm space-y-0.5">
              {currentTab.featured.specs.map((spec, i) => (
                <p key={i}>{spec}</p>
              ))}
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-sm sm:text-base font-bold text-neutral-900">
                {currentTab.featured.hasFromPrefix ? "ตั้งแต่ " : ""}
                {currentTab.featured.price}
              </span>
              <span className="text-xs text-neutral-400 line-through">
                {currentTab.featured.originalPrice}
              </span>
            </div>
            <Link
              href={currentTab.featured.btnHref}
              className="mt-4 inline-flex items-center justify-center bg-neutral-900 hover:bg-black text-white text-xs sm:text-sm font-semibold px-7 py-2.5 rounded-full transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
            >
              {currentTab.featured.btnText}
            </Link>
          </div>
        </div>

        {/* Sub Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 md:gap-5 mt-5 sm:mt-6">
          {currentTab.items.map((item) => (
            <Link
              key={item.id}
              href="/products"
              className="group rounded-2xl bg-[#f8f8f9] hover:bg-neutral-100/90 p-4 sm:p-5 flex flex-col items-center justify-between text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md border border-transparent hover:border-neutral-200/60"
            >
              <div className="w-full h-28 sm:h-36 flex items-center justify-center p-2 relative overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="mt-3 w-full">
                <h4 className="font-bold text-xs sm:text-sm text-neutral-900 tracking-tight group-hover:text-[#ff6900] transition-colors truncate">
                  {item.name}
                </h4>
                <div className="mt-1.5 flex items-baseline justify-center gap-1.5 flex-wrap">
                  <span className="text-xs sm:text-sm font-bold text-neutral-900">
                    {item.hasFromPrefix ? "ตั้งแต่ " : ""}
                    {item.price}
                  </span>
                  <span className="text-[11px] text-neutral-400 line-through">
                    {item.originalPrice}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
