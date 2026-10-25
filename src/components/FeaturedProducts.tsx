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
        brand: "GANHOM",
        model: "Oud Royale ",
        modelHighlight: "Special",
        modelSuffix: " Edition",
        badge: "EXCLUSIVE",
        tagline: "สัมผัสความหอมเหนือระดับแห่งไม้กฤษณาแท้",
        specs: [
          "หัวเชื้อน้ำหอม Fragrance Oil สกัดเข้มข้น 100%",
          "กลิ่นหอมลุ่มลึก ติดทนนานกว่า 24 ชั่วโมง",
        ],
        price: "฿14,500.00",
        originalPrice: "฿16,900.00",
        hasFromPrefix: true,
        btnText: "เรียนรู้เพิ่มเติม",
        btnHref: "/products",
        imageUrl: "https://www.latifperfumes.com/_next/static/media/agarwoodfront.86510e2b.jpg",
      },
      items: [
        {
          id: "vanilla-oil",
          name: "Madagascar Vanilla Fragrance Oil",
          price: "฿450.00",
          originalPrice: "฿590.00",
          hasFromPrefix: false,
          imageUrl: "https://images.unsplash.com/photo-1608500218890-c4f86641bc34?w=500&auto=format&fit=crop&q=80",
        },
        {
          id: "tom-ford-oud",
          name: "Tom Ford Oud Wood Eau De Parfum",
          price: "฿15,000.00",
          originalPrice: "฿17,500.00",
          imageUrl: "https://www.central.co.th/e-shopping/wp-content/uploads/2020/12/TOM-FORD-BEAUTY-OUD.jpg",
        },
        {
          id: "sea-salt-orchid",
          name: "Sea Salt & Orchid Fragrance Oil",
          price: "฿490.00",
          originalPrice: "฿620.00",
          hasFromPrefix: false,
          imageUrl: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=500&auto=format&fit=crop&q=80",
        },
        {
          id: "french-lavender",
          name: "French Lavender Fields Essential Oil",
          price: "฿480.00",
          originalPrice: "฿600.00",
          hasFromPrefix: false,
          imageUrl: "https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?w=500&auto=format&fit=crop&q=80",
        },
      ],
    },
    lifestyle: {
      id: "lifestyle",
      name: "ตอบโจทย์ทุกไลฟ์สไตล์",
      featured: {
        brand: "GANHOM HOME",
        model: "Amber Candle Gift Set",
        badge: "PREMIUM",
        tagline: "เซ็ตอุปกรณ์ทำเทียนหอมระดับพรีเมียมครบวงจร",
        specs: [
          "ไขถั่วเหลืองธรรมชาติ 100% ไร้ควัน ไร้สารพิษ",
          "พร้อมขวดแก้วสีชา ฝาไม้ธรรมชาติ และหัวเชื้อน้ำหอม",
        ],
        price: "฿1,290.00",
        originalPrice: "฿1,690.00",
        btnText: "เรียนรู้เพิ่มเติม",
        btnHref: "/products",
        imageUrl: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&auto=format&fit=crop&q=80",
      },
      items: [
        {
          id: "fresh-coffee",
          name: "Fresh Coffee Roasted Fragrance Oil",
          price: "฿420.00",
          originalPrice: "฿550.00",
          imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=80",
        },
        {
          id: "pumpkin-spice",
          name: "Pumpkin Spice & Cinnamon Oil",
          price: "฿450.00",
          originalPrice: "฿590.00",
          imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80",
        },
        {
          id: "soap-base",
          name: "Organic Melt & Pour Soap Base",
          price: "฿250.00",
          originalPrice: "฿320.00",
          hasFromPrefix: false,
          imageUrl: "https://images.unsplash.com/photo-1607006314644-88f58b7aeb88?w=500&auto=format&fit=crop&q=80",
        },
        {
          id: "amber-jar",
          name: "Luxury Amber Candle Glass Jar 200ml",
          price: "฿120.00",
          originalPrice: "฿160.00",
          imageUrl: "https://images.unsplash.com/photo-1596433809252-260c2745dfdd?w=500&auto=format&fit=crop&q=80",
        },
      ],
    },
  };

  const currentTab = tabs[activeTab];

  return (
    <section className="w-full pt-4 sm:pt-6 pb-0">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-neutral-900 tracking-tight font-sans">
        ผลิตภัณฑ์ที่ร่วมรายการ
      </h2>

      {/* Tabs Filter Buttons in 3 Colors */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-7 pb-1 overflow-x-auto no-scrollbar px-4">
        <button
          type="button"
          onClick={() => setActiveTab("new")}
          className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer focus:outline-none ${activeTab === "new"
              ? "bg-neutral-900 text-[#f3d07a] shadow-md border border-[#c29015]/40"
              : "bg-white hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900 border border-neutral-200"
            }`}
        >
          สินค้าใหม่
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("lifestyle")}
          className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer focus:outline-none ${activeTab === "lifestyle"
              ? "bg-neutral-900 text-[#f3d07a] shadow-md border border-[#c29015]/40"
              : "bg-white hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900 border border-neutral-200"
            }`}
        >
          ตอบโจทย์ทุกไลฟ์สไตล์
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="mt-7 sm:mt-8 space-y-5 sm:space-y-6">
        {/* Featured Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden bg-neutral-50/70 border border-neutral-200 transition-all hover:border-[#c29015]/50">
          <div className="relative w-full h-[240px] sm:h-[300px] md:h-[340px] overflow-hidden bg-neutral-100 flex items-center justify-center">
            <img
              src={currentTab.featured.imageUrl}
              alt={currentTab.featured.model}
              className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center items-center text-center">
            <span className="text-xs sm:text-sm font-extrabold tracking-widest text-[#8a5b14] uppercase font-sans">
              {currentTab.featured.brand}
            </span>
            <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight flex items-center justify-center flex-wrap gap-1 font-sans">
              <span>{currentTab.featured.model}</span>
              {currentTab.featured.modelHighlight && (
                <span className="text-[#8a5b14] font-black">
                  {currentTab.featured.modelHighlight}
                </span>
              )}
              {currentTab.featured.modelSuffix && <span>{currentTab.featured.modelSuffix}</span>}
              <span className="ml-1 text-[11px] font-bold px-2 py-0.5 border border-neutral-800 rounded bg-neutral-900 text-[#f3d07a] leading-none">
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
              <span className="text-sm sm:text-base font-extrabold text-neutral-900">
                {currentTab.featured.hasFromPrefix ? "ตั้งแต่ " : ""}
                {currentTab.featured.price}
              </span>
              <span className="text-xs text-neutral-400 line-through">
                {currentTab.featured.originalPrice}
              </span>
            </div>
            <Link
              href={currentTab.featured.btnHref}
              className="mt-4 inline-flex items-center justify-center bg-gradient-to-r from-[#8a5b14] via-[#c29015] to-[#71440a] hover:brightness-105 text-white text-xs sm:text-sm font-bold px-8 py-2.5 rounded-full transition-all duration-200 shadow-md active:scale-95 cursor-pointer"
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
              className="group rounded-2xl bg-[#fafaf9] hover:bg-white p-4 sm:p-5 flex flex-col items-center justify-between text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md border border-neutral-200 hover:border-[#c29015]"
            >
              <div className="w-full h-28 sm:h-36 flex items-center justify-center p-2 relative overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="mt-3 w-full">
                <h4 className="font-bold text-xs sm:text-sm text-neutral-900 tracking-tight group-hover:text-[#8a5b14] transition-colors truncate">
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
