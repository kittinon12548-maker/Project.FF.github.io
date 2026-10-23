"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, Globe, ShoppingBag, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<"TH" | "EN">("TH");
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const navLinks = [
    { label: "หน้าแรก", href: "/" },
    { label: "เกี่ยวกับเรา", href: "/about" },
    { label: "สินค้า", href: "/products" },
    { label: "บทความ", href: "/posts" },
    { label: "วิธีการสั่งซื้อและการชำระเงิน", href: "/how-to-order" },
    { label: "ติดต่อเรา", href: "/contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-transform duration-300 ease-in-out">
        {/* Luxury Gold Strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#b38728] via-[#f3d07a] to-[#996515]"></div>

        {/* Top Header */}
        <div className="mx-auto max-w-7xl px-4 sm:px-8 py-3.5 md:py-5">
          <div className="grid grid-cols-3 items-center">
            {/* Left Sub-brand */}
            <div className="flex items-center">
              <span className="hidden text-[10px] font-semibold tracking-[0.25em] text-neutral-400 uppercase sm:inline-block">
                OFFICIAL LUXURY
              </span>
            </div>

            {/* Brand Title */}
            <div className="flex justify-center">
              <Link
                href="/"
                className="group inline-flex flex-col items-center justify-center transition-opacity hover:opacity-85"
              >
                <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-[0.3em] font-sans uppercase pl-[0.35em] bg-gradient-to-r from-[#8a5b14] via-[#c29015] to-[#71440a] bg-clip-text text-transparent">
                  GANHOM
                </span>
              </Link>
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center justify-end gap-3.5 sm:gap-5 md:gap-6 text-black">
              {/* Search Toggle */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-1 text-black transition-transform hover:scale-110 focus:outline-none cursor-pointer"
                title="ค้นหา"
                aria-label="ค้นหา"
              >
                <Search className="h-5 w-5 md:h-[22px] md:w-[22px] stroke-[1.6]" />
              </button>

              {/* User Account */}
              <button
                type="button"
                onClick={() => setIsAuthOpen(true)}
                className="relative p-1 text-black transition-transform hover:scale-110 cursor-pointer focus:outline-none"
                title="เข้าสู่ระบบ"
                aria-label="บัญชีผู้ใช้"
              >
                <User className="h-5 w-5 md:h-[22px] md:w-[22px] stroke-[1.6]" />
              </button>

              {/* Language Selector */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="p-1 transition-all hover:scale-110 focus:outline-none rounded-full text-black cursor-pointer"
                  title="เลือกภูมิภาคและภาษา / Region & Language"
                  aria-label="เลือกภูมิภาคและภาษา"
                >
                  <Globe className="h-5 w-5 md:h-[22px] md:w-[22px] stroke-[1.6]" />
                </button>
                {isLangOpen && (
                  <div className="absolute right-0 mt-2 w-36 rounded-xl bg-white p-2 shadow-xl border border-neutral-100 z-50">
                    <button
                      onClick={() => {
                        setCurrentLang("TH");
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs rounded-lg font-medium transition ${
                        currentLang === "TH" ? "bg-amber-50 text-amber-900 font-bold" : "hover:bg-neutral-50"
                      }`}
                    >
                      🇹🇭 ภาษาไทย (TH)
                    </button>
                    <button
                      onClick={() => {
                        setCurrentLang("EN");
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs rounded-lg font-medium transition ${
                        currentLang === "EN" ? "bg-amber-50 text-amber-900 font-bold" : "hover:bg-neutral-50"
                      }`}
                    >
                      🇬🇧 English (EN)
                    </button>
                  </div>
                )}
              </div>

              {/* Cart / Products Link */}
              <Link
                href="/products"
                className="relative p-1 text-black transition-transform hover:scale-110"
                title="สินค้าและตะกร้า"
                aria-label="สินค้า"
              >
                <ShoppingBag className="h-5 w-5 md:h-[22px] md:w-[22px] stroke-[1.6]" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-600 text-[10px] font-bold text-white">
                  3
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Search Bar Overlay */}
        {isSearchOpen && (
          <div className="border-t border-neutral-100 bg-neutral-50/90 backdrop-blur px-4 py-3 animate-fadeIn">
            <div className="mx-auto max-w-3xl flex items-center gap-3">
              <Search className="h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="ค้นหาน้ำหอม กลิ่น เทียนหอม หรือบทความ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none"
                autoFocus
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-neutral-400 hover:text-neutral-700 text-sm"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="border-t border-neutral-100 bg-white">
          <div className="mx-auto max-w-7xl px-4">
            <div className="no-scrollbar flex items-center justify-start md:justify-center gap-4 sm:gap-6 md:gap-7 overflow-x-auto py-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`group relative whitespace-nowrap py-1 text-xs md:text-[13px] tracking-wide transition-colors duration-200 ${
                      isActive ? "text-black font-semibold" : "text-neutral-600 hover:text-black font-medium"
                    }`}
                  >
                    <span>{link.label}</span>
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] w-full bg-black transition-transform duration-200 origin-center ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    ></span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      </header>

      {/* Auth Modal Mockup */}
      {isAuthOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsAuthOpen(false)}
              className="absolute right-5 top-5 p-1 text-neutral-400 hover:text-neutral-800"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="text-center space-y-2 mb-6">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-widest">
                GANHOM LUXURY MEMBER
              </span>
              <h3 className="text-2xl font-black text-neutral-900">เข้าสู่ระบบสมาชิก</h3>
              <p className="text-xs text-neutral-500">
                เข้าสู่ระบบเพื่อติดตามสถานะคำสั่งซื้อและรับสิทธิพิเศษ
              </p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("เข้าสู่ระบบเรียบร้อยแล้ว (Demo Mode)");
                setIsAuthOpen(false);
              }}
              className="space-y-4 text-sm"
            >
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  อีเมล (Email)
                </label>
                <input
                  type="email"
                  placeholder="เช่น user@tsu.ac.th หรือ gmail.com"
                  required
                  className="w-full rounded-xl border border-neutral-200 p-3 text-sm focus:border-black focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  รหัสผ่าน (Password)
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  className="w-full rounded-xl border border-neutral-200 p-3 text-sm focus:border-black focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-neutral-900 py-3 font-bold text-white transition hover:bg-black"
              >
                เข้าสู่ระบบ
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
