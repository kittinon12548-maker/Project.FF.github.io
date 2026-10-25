"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, User, Globe, ShoppingBag, X, ShieldAlert, LogOut, LayoutDashboard, ChevronRight } from "lucide-react";
import { getCartTotalCount } from "@/data/cartStore";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<"TH" | "EN">("TH");

  // Mega Menu Hover State with Smooth Hover Intent Delay
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const enterTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (menu: string) => {
    // Clear pending leave timeout so it doesn't close
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    // If another dropdown is already open, switch immediately for seamless browsing
    if (activeDropdown !== null) {
      if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);
      setActiveDropdown(menu);
      return;
    }

    // Hover Intent Delay: smooth 160ms delay when first hovering
    if (enterTimeoutRef.current) {
      clearTimeout(enterTimeoutRef.current);
    }
    enterTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(menu);
    }, 160);
  };

  const handleMouseLeave = () => {
    // Cancel pending open if mouse moved away before delay elapsed
    if (enterTimeoutRef.current) {
      clearTimeout(enterTimeoutRef.current);
      enterTimeoutRef.current = null;
    }
    // Smooth leave debounce delay
    leaveTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 220);
  };

  // Keep dropdown open without flicker when cursor is inside panel
  const handleDropdownMouseEnter = () => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    if (enterTimeoutRef.current) {
      clearTimeout(enterTimeoutRef.current);
      enterTimeoutRef.current = null;
    }
  };

  // Close dropdown on route change
  useEffect(() => {
    if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);
    if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);
      if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    };
  }, []);

  // Auth States
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [currentUser, setCurrentUser] = useState<{ email: string; isAdmin: boolean } | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Check local storage for existing session
    const storedAdmin = localStorage.getItem("isAdmin");
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setCurrentUser({
        email: storedEmail,
        isAdmin: storedAdmin === "true",
      });
    }

    const updateCount = () => {
      setCartCount(getCartTotalCount());
    };
    updateCount();
    window.addEventListener("cartUpdated", updateCount);
    return () => window.removeEventListener("cartUpdated", updateCount);
  }, []);

  // Hide Navbar when in /admin dashboard
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    const emailTrim = loginEmail.toLowerCase().trim();
    const isEmailAdmin =
      emailTrim === "admin" ||
      emailTrim === "admin@ganhom.com" ||
      emailTrim === "admin@gmail.com" ||
      emailTrim === "admin@tsu.ac.th";

    if (isEmailAdmin && loginPassword === "123") {
      // Admin Login
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("userEmail", "admin");
      setCurrentUser({ email: "admin", isAdmin: true });
      setIsAuthOpen(false);
      setLoginEmail("");
      setLoginPassword("");
      router.push("/admin/products");
    } else if (loginEmail.trim() && loginPassword.trim()) {
      // Normal Member Login
      localStorage.setItem("isAdmin", "false");
      localStorage.setItem("userEmail", loginEmail.trim());
      setCurrentUser({ email: loginEmail.trim(), isAdmin: false });
      setIsAuthOpen(false);
      setLoginEmail("");
      setLoginPassword("");
      alert(`ยินดีต้อนรับคุณ ${loginEmail.trim()} เข้าสู่ระบบสมาชิก`);
    } else {
      setAuthError("กรุณากรอกอีเมลและรหัสผ่าน");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("userEmail");
    setCurrentUser(null);
    setIsUserMenuOpen(false);
  };

  const navLinks = [
    { label: "เลือกซื้อ", href: "/products" },
    { label: "เกี่ยวกับเรา", href: "/about" },
    { label: "บริการช่วยเหลือ", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
          activeDropdown
            ? "bg-white border-b-transparent"
            : "bg-white/95 backdrop-blur-md border-b border-neutral-200/60"
        }`}
      >
        {/* Main Header Row */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 md:py-3.5">
          <div className="flex items-center justify-between gap-4 lg:gap-8">
            {/* Brand Title (Left Corner) */}
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/"
                className="group inline-flex items-center transition-opacity hover:opacity-85"
              >
                <span className="text-2xl sm:text-3xl font-extrabold tracking-[0.12em] font-sans uppercase pl-[0.05em] bg-gradient-to-r from-[#8a5b14] via-[#c29015] to-[#71440a] bg-clip-text text-transparent">
                  GANHOM 
                </span>
              </Link>
              {currentUser?.isAdmin && (
                <Link
                  href="/admin/products"
                  className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#c29015] text-white text-[11px] font-bold shadow-sm hover:bg-[#8a5b14] transition"
                >
                  <LayoutDashboard className="w-3 h-3" />
                  หลังบ้าน
                </Link>
              )}
            </div>

            {/* Navigation Menu (Top Bar) */}
            <nav className="hidden md:flex items-center justify-center gap-6 lg:gap-8 xl:gap-9 flex-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const isProducts = link.href === "/products";
                const isSupport = link.href === "/contact";
                const isDropdownActive =
                  (isProducts && activeDropdown === "products") ||
                  (isSupport && activeDropdown === "support");
                const isDimmed = activeDropdown !== null && !isDropdownActive;

                return (
                  <div
                    key={link.href}
                    className="relative py-2"
                    onMouseEnter={() => {
                      if (isProducts) handleMouseEnter("products");
                      else if (isSupport) handleMouseEnter("support");
                      else handleMouseLeave();
                    }}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={link.href}
                      className={`group relative whitespace-nowrap py-1 text-xs lg:text-[13px] tracking-tight transition-all duration-200 ease-out ${
                        isDimmed
                          ? "opacity-35 text-[#1d1d1f]"
                          : isActive || isDropdownActive
                          ? "opacity-100 text-[#1d1d1f] font-semibold"
                          : "opacity-80 text-[#1d1d1f] hover:opacity-100 font-medium"
                      }`}
                    >
                      <span>{link.label}</span>
                      <span
                        className={`absolute bottom-0 left-0 h-[2px] w-full bg-[#1d1d1f] transition-all duration-300 origin-center ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isActive || isDropdownActive
                            ? "scale-x-100 opacity-100"
                            : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                        }`}
                      ></span>
                    </Link>
                  </div>
                );
              })}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center justify-end gap-3.5 sm:gap-4 md:gap-5 text-black shrink-0">
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

              {/* User Account / Profile */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    if (currentUser) {
                      setIsUserMenuOpen(!isUserMenuOpen);
                    } else {
                      setIsAuthOpen(true);
                    }
                  }}
                  className="relative p-1 text-black transition-transform hover:scale-110 cursor-pointer focus:outline-none flex items-center gap-1"
                  title={currentUser ? `บัญชี: ${currentUser.email}` : "เข้าสู่ระบบ"}
                  aria-label="บัญชีผู้ใช้"
                >
                  <User className="h-5 w-5 md:h-[22px] md:w-[22px] stroke-[1.6]" />
                  {currentUser && (
                    <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-[#c29015] border-2 border-white"></span>
                  )}
                </button>

                {/* User Dropdown Menu if logged in */}
                {currentUser && isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white p-3 shadow-xl border border-neutral-100 z-50 space-y-2">
                    <div className="border-b border-neutral-100 pb-2 px-1">
                      <p className="text-xs text-neutral-400">เข้าสู่ระบบในชื่อ</p>
                      <p className="text-sm font-bold text-neutral-900 truncate">
                        {currentUser.email}
                      </p>
                      {currentUser.isAdmin && (
                        <span className="mt-1 inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                          🛡️ ผู้ดูแลระบบ (Admin)
                        </span>
                      )}
                    </div>

                    {currentUser.isAdmin && (
                      <Link
                        href="/admin/products"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-amber-900 bg-amber-50/80 rounded-xl hover:bg-amber-100 transition"
                      >
                        <LayoutDashboard className="w-4 h-4 text-amber-600" />
                        <span>ระบบหลังบ้าน (Shopee)</span>
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition text-left cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>ออกจากระบบ</span>
                    </button>
                  </div>
                )}
              </div>

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
                      className={`w-full text-left px-3 py-1.5 text-xs rounded-lg font-medium transition cursor-pointer ${
                        currentLang === "TH" ? "bg-[#fdf8e6] text-[#8a5b14] font-bold" : "hover:bg-neutral-50"
                      }`}
                    >
                      🇹🇭 ภาษาไทย (TH)
                    </button>
                    <button
                      onClick={() => {
                        setCurrentLang("EN");
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs rounded-lg font-medium transition cursor-pointer ${
                        currentLang === "EN" ? "bg-[#fdf8e6] text-[#8a5b14] font-bold" : "hover:bg-neutral-50"
                      }`}
                    >
                      🇬🇧 English (EN)
                    </button>
                  </div>
                )}
              </div>

              {/* Cart Link */}
              <Link
                href="/cart"
                className="relative p-1 text-black transition-transform hover:scale-110"
                title="ตะกร้าสินค้า"
                aria-label="ตะกร้าสินค้า"
              >
                <ShoppingBag className="h-5 w-5 md:h-[22px] md:w-[22px] stroke-[1.6]" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#c29015] text-[10px] font-bold text-white shadow-sm">
                  {cartCount}
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
                className="text-neutral-400 hover:text-neutral-700 text-sm cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Apple-style Store Mega Menu Flyout */}
        <div
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`hidden md:block absolute left-0 right-0 top-full w-full bg-white border-b border-black/[0.04] shadow-[0_12px_24px_-10px_rgba(0,0,0,0.04)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-50 ${
            activeDropdown === "products"
              ? "opacity-100 translate-y-0 pointer-events-auto visible"
              : "opacity-0 -translate-y-1.5 pointer-events-none invisible duration-200 ease-out"
          }`}
        >
          <div className="mx-auto max-w-[980px] px-8 sm:px-10 lg:px-12 pt-7 sm:pt-8 pb-8 sm:pb-9">
            <div className="grid grid-cols-12 gap-8 lg:gap-12">
              {/* Column 1: Main Category Items (Large Semibold Typography) */}
              <div className="col-span-6 lg:col-span-5">
                <p className="text-[12px] text-[#6e6e73] font-normal tracking-[-0.01em] mb-3 select-none">
                  เลือกซื้อ
                </p>
                <div className="space-y-1.5 sm:space-y-2 group/col1">
                  {[
                    { label: "แก่นไม้กฤษณา", href: "/products?search=แก่นไม้" },
                    { label: "น้ำมันกฤษณา & น้ำหอม", href: "/products?search=น้ำมันกฤษณา" },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setActiveDropdown(null)}
                      className="block text-[23px] sm:text-[24px] lg:text-[25px] font-semibold text-[#1d1d1f] tracking-[-0.015em] leading-[1.25] transition-all duration-200 ease-out hover:!opacity-100 group-hover/col1:opacity-40"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Column 2: Experience & Farm */}
              <div className="col-span-3 lg:col-span-4">
                <p className="text-[12px] text-[#6e6e73] font-normal tracking-[-0.01em] mb-3 select-none">
                  ประสบการณ์และฟาร์ม
                </p>
                <div className="space-y-2.5">
                  {[
                    { label: "เรียนรู้สร้างแก่นไม้กฤษณา", href: "/products?search=เร่งแก่น" },
                    { label: "ข่าวสาร", href: "/about" },
                    { label: "เยี่ยมชมฟาร์ม", href: "/contact" },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setActiveDropdown(null)}
                      className="block text-[12px] font-semibold text-[#1d1d1f] tracking-[-0.01em] leading-normal transition-colors duration-200 hover:text-[#0071e3]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Column 3: Account & Orders */}
              <div className="col-span-3 lg:col-span-3">
                <p className="text-[12px] text-[#6e6e73] font-normal tracking-[-0.01em] mb-3 select-none">
                  บัญชีและคำสั่งซื้อ
                </p>
                <div className="space-y-2.5">
                  {[
                    { label: "สถานะคำสั่งซื้อ", href: "/cart" },
                    { label: "วิธีการชำระเงิน", href: "/how-to-order" },
                    { label: "จัดการข้อมูลส่วนตัว", href: "/account" },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setActiveDropdown(null)}
                      className="block text-[12px] font-semibold text-[#1d1d1f] tracking-[-0.01em] leading-normal transition-colors duration-200 hover:text-[#0071e3]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Apple-style Support Mega Menu Flyout */}
        <div
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`hidden md:block absolute left-0 right-0 top-full w-full bg-white border-b border-black/[0.04] shadow-[0_12px_24px_-10px_rgba(0,0,0,0.04)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-50 ${
            activeDropdown === "support"
              ? "opacity-100 translate-y-0 pointer-events-auto visible"
              : "opacity-0 -translate-y-1.5 pointer-events-none invisible duration-200 ease-out"
          }`}
        >
          <div className="mx-auto max-w-[980px] px-8 sm:px-10 lg:px-12 pt-7 sm:pt-8 pb-8 sm:pb-9">
            <div className="grid grid-cols-12 gap-8 lg:gap-12">
              {/* Column 1: Main Support Links (Large Semibold Typography) */}
              <div className="col-span-6 lg:col-span-5">
                <p className="text-[12px] text-[#6e6e73] font-normal tracking-[-0.01em] mb-3 select-none">
                  บริการช่วยเหลือ
                </p>
                <div className="space-y-1.5 sm:space-y-2 group/colSupport">
                  {[
                    { label: "วิธีการสั่งซื้อและการชำระเงิน", href: "/how-to-order" },
                    { label: "ติดต่อฝ่ายบริการลูกค้า", href: "/contact" },
                    { label: "คำถามที่พบบ่อย (FAQ)", href: "/how-to-order" },
                    { label: "การจัดส่งและติดตามพัสดุ", href: "/cart" },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setActiveDropdown(null)}
                      className="block text-[23px] sm:text-[24px] lg:text-[25px] font-semibold text-[#1d1d1f] tracking-[-0.015em] leading-[1.25] transition-all duration-200 ease-out hover:!opacity-100 group-hover/colSupport:opacity-40"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Column 2: Quick Links */}
              <div className="col-span-3 lg:col-span-4">
                <p className="text-[12px] text-[#6e6e73] font-normal tracking-[-0.01em] mb-3 select-none">
                  หัวข้อยอดนิยม
                </p>
                <div className="space-y-2.5">
                  {[
                    { label: "วิธีการชำระเงินและแจ้งโอน", href: "/how-to-order" },
                    { label: "เช็คสถานะคำสั่งซื้อ", href: "/cart" },
                    { label: "นโยบายการรับประกันสินค้า", href: "/about" },
                    { label: "ปรึกษาผู้เชี่ยวชาญเรื่องกลิ่น", href: "/contact" },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setActiveDropdown(null)}
                      className="block text-[12px] font-semibold text-[#1d1d1f] tracking-[-0.01em] leading-normal transition-colors duration-200 hover:text-[#0071e3]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Column 3: Contact Channels */}
              <div className="col-span-3 lg:col-span-3">
                <p className="text-[12px] text-[#6e6e73] font-normal tracking-[-0.01em] mb-3 select-none">
                  ติดต่อสอบถาม
                </p>
                <div className="space-y-2.5">
                  {[
                    { label: "ส่งข้อความติดต่อเรา", href: "/contact" },
                    { label: "ข้อมูลแบรนด์ GANHOM", href: "/about" },
                    { label: "แผนที่และเวลาทำการ", href: "/contact" },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setActiveDropdown(null)}
                      className="block text-[12px] font-semibold text-[#1d1d1f] tracking-[-0.01em] leading-normal transition-colors duration-200 hover:text-[#0071e3]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <nav className="md:hidden border-t border-neutral-100 bg-white">
          <div className="no-scrollbar flex items-center justify-start gap-4 overflow-x-auto px-4 py-2.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative whitespace-nowrap py-1 text-xs tracking-tight transition-all duration-200 ${
                    isActive ? "text-[#1d1d1f] font-semibold" : "text-[#1d1d1f]/70 hover:text-[#1d1d1f] font-medium"
                  }`}
                >
                  <span>{link.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] w-full bg-[#1d1d1f] transition-all duration-300 origin-center ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                    }`}
                  ></span>
                </Link>
              );
            })}
          </div>
        </nav>
      </header>

      {/* Apple-style Backdrop Blur Overlay: ใส สว่าง สบายตา ไม่มืดหมอง */}
      {activeDropdown && (
        <div
          className="hidden md:block fixed inset-0 top-[52px] md:top-[56px] bg-white/20 backdrop-blur-md z-40 transition-opacity duration-300 ease-out"
          onClick={() => setActiveDropdown(null)}
          onMouseEnter={handleMouseLeave}
        />
      )}

      {/* Auth Modal with Admin Recognition */}
      {isAuthOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsAuthOpen(false)}
              className="absolute right-5 top-5 p-1 text-neutral-400 hover:text-neutral-800 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="text-center space-y-2 mb-6">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-widest">
                GANHOM LUXURY MEMBER
              </span>
              <h3 className="text-2xl font-black text-neutral-900">เข้าสู่ระบบสมาชิก</h3>
              <p className="text-xs text-neutral-500">
                เข้าสู่ระบบเพื่อติดตามคำสั่งซื้อ หรือเข้าสู่แผงควบคุมหลังบ้าน
              </p>
            </div>

            {authError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                {authError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  อีเมล (Email)
                </label>
                <input
                  type="text"
                  placeholder="เช่น admin หรือ user@tsu.ac.th"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
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
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border border-neutral-200 p-3 text-sm focus:border-black focus:outline-none"
                />
              </div>

              {/* Admin Tip Notice */}
              <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 text-[11px] text-amber-900 leading-relaxed space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
                  <span>เข้าสู่ระบบหลังบ้าน (Shopee Seller Centre):</span>
                </div>
                <p className="pl-5 text-neutral-600">
                  อีเมล: <code className="bg-amber-100/80 px-1.5 py-0.5 rounded font-mono font-bold text-amber-950">admin</code> | รหัสผ่าน: <code className="bg-amber-100/80 px-1.5 py-0.5 rounded font-mono font-bold text-amber-950">123</code>
                </p>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-neutral-900 py-3 font-bold text-white transition hover:bg-black cursor-pointer shadow-md"
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
