"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, User, Globe, ShoppingBag, X, ShieldAlert, LogOut, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<"TH" | "EN">("TH");

  // Auth States
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [currentUser, setCurrentUser] = useState<{ email: string; isAdmin: boolean } | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

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
      alert(`ยินดีต้อนรับคุณ ${loginEmail.trim()} เข้าสู่ระบบสมาชิก GANHOM`);
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
    { label: "ร้านค้า", href: "/" },
    { label: "เกี่ยวกับเรา", href: "/about" },
    { label: "วิธีการสั่งซื้อและการชำระเงิน", href: "/how-to-order" },
    { label: "บริการช่วยเหลือ", href: "/contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-transform duration-300 ease-in-out">
        {/* Luxury Gold Strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#b38728] via-[#f3d07a] to-[#996515]"></div>

        {/* Main Header Row */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3.5 md:py-4">
          <div className="flex items-center justify-between gap-4 lg:gap-8">
            {/* Brand Title (Left Corner) */}
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/"
                className="group inline-flex items-center transition-opacity hover:opacity-85"
              >
                <span className="text-2xl sm:text-3xl font-extrabold tracking-[0.25em] font-sans uppercase pl-[0.1em] bg-gradient-to-r from-[#8a5b14] via-[#c29015] to-[#71440a] bg-clip-text text-transparent">
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
            <nav className="hidden md:flex items-center justify-center gap-4 lg:gap-6 xl:gap-7 flex-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`group relative whitespace-nowrap py-1 text-xs lg:text-[13px] tracking-wide transition-colors duration-200 ${
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

              {/* Cart / Products Link */}
              <Link
                href="/products"
                className="relative p-1 text-black transition-transform hover:scale-110"
                title="สินค้าและตะกร้า"
                aria-label="สินค้า"
              >
                <ShoppingBag className="h-5 w-5 md:h-[22px] md:w-[22px] stroke-[1.6]" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#c29015] text-[10px] font-bold text-white shadow-sm">
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
                className="text-neutral-400 hover:text-neutral-700 text-sm cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        <nav className="md:hidden border-t border-neutral-100 bg-white">
          <div className="no-scrollbar flex items-center justify-start gap-4 overflow-x-auto px-4 py-2.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative whitespace-nowrap py-1 text-xs tracking-wide transition-colors duration-200 ${
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
        </nav>
      </header>

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
