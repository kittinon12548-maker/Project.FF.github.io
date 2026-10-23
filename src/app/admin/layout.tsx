"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ShoppingBag,
  Package,
  PlusCircle,
  Truck,
  TrendingUp,
  Tag,
  MessageSquare,
  DollarSign,
  BarChart3,
  Settings,
  Bell,
  ChevronDown,
  ChevronRight,
  Download,
  Grid,
  BookOpen,
  LogOut,
  ExternalLink,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("userEmail");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#f6f6f6] text-neutral-800 font-sans flex flex-col">
      {/* Shopee Seller Centre Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-neutral-200 h-14 px-4 sm:px-6 flex items-center justify-between shadow-xs">
        {/* Left: Shopee Bag Icon + Breadcrumb */}
        <div className="flex items-center gap-4">
          <Link href="/admin/products" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#ee4d2d] flex items-center justify-center text-white shadow-xs">
              <ShoppingBag className="w-5 h-5 fill-white text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[#ee4d2d] leading-none">
                Shopee
              </span>
              <span className="text-[10px] text-neutral-500 font-medium">
                Seller Centre
              </span>
            </div>
          </Link>

          <span className="text-neutral-300">|</span>

          {/* Breadcrumb */}
          <nav className="hidden sm:flex items-center gap-2 text-xs text-neutral-500">
            <Link href="/admin/products" className="hover:text-[#ee4d2d] transition">
              หน้าหลัก
            </Link>
            <span>&gt;</span>
            <span className="text-neutral-800 font-semibold">สินค้าของฉัน</span>
          </nav>
        </div>

        {/* Right Action Icons & Seller Profile */}
        <div className="flex items-center gap-4 text-neutral-600 text-xs">
          {/* Back to store link */}
          <Link
            href="/"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>ดูหน้าร้าน GANHOM</span>
          </Link>

          <button
            type="button"
            className="p-1 hover:text-[#ee4d2d] transition cursor-pointer"
            title="ดาวน์โหลดแอป"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            type="button"
            className="p-1 hover:text-[#ee4d2d] transition cursor-pointer"
            title="บริการทั้งหมด"
          >
            <Grid className="w-4 h-4" />
          </button>

          <button
            type="button"
            className="p-1 hover:text-[#ee4d2d] transition cursor-pointer"
            title="คู่มือศูนย์การเรียนรู้ผู้ขาย"
          >
            <BookOpen className="w-4 h-4" />
          </button>

          {/* Notification with 99+ Badge */}
          <div className="relative">
            <button
              type="button"
              className="p-1 hover:text-[#ee4d2d] transition cursor-pointer"
              title="การแจ้งเตือน"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-2 bg-[#ee4d2d] text-white text-[9px] font-bold px-1 rounded-full">
                99+
              </span>
            </button>
          </div>

          {/* Seller Profile Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 hover:opacity-80 transition cursor-pointer pl-2 border-l border-neutral-200"
            >
              <div className="w-7 h-7 rounded-full bg-amber-800 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                🌰
              </div>
              <span className="font-semibold text-neutral-800 text-xs hidden sm:inline-block">
                agarwoodstyle
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white p-2 shadow-xl border border-neutral-200 z-50 text-xs">
                <div className="p-2 border-b border-neutral-100">
                  <p className="font-bold text-neutral-900">agarwoodstyle</p>
                  <p className="text-[10px] text-neutral-400">ร้านค้าทางการ (Official)</p>
                </div>
                <Link
                  href="/"
                  className="flex items-center gap-2 p-2 hover:bg-neutral-50 rounded-lg text-neutral-700"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>ไปที่หน้าร้าน GANHOM</span>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 p-2 hover:bg-rose-50 text-rose-600 rounded-lg text-left cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>ออกจากระบบ</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Body with Sidebar and Main Content */}
      <div className="flex flex-1">
        {/* Left Sidebar */}
        <aside className="w-56 bg-white border-r border-neutral-200 min-h-[calc(100vh-56px)] p-3 hidden md:flex flex-col justify-between select-none">
          <div className="space-y-4 text-xs">
            {/* Group 1: คำสั่งซื้อ */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-neutral-600 font-bold px-2 py-1.5 cursor-pointer hover:bg-neutral-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-neutral-500" />
                  <span>คำสั่งซื้อ</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
              </div>
              <div className="pl-6 space-y-0.5 text-neutral-500">
                <p className="py-1 px-2 hover:text-[#ee4d2d] cursor-pointer rounded">
                  คำสั่งซื้อของฉัน
                </p>
                <p className="py-1 px-2 hover:text-[#ee4d2d] cursor-pointer rounded">
                  การจัดส่งของฉัน
                </p>
              </div>
            </div>

            {/* Group 2: สินค้า (Active Section) */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[#ee4d2d] font-bold px-2 py-1.5 bg-[#fff1ee] rounded-lg">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#ee4d2d]" />
                  <span>สินค้า</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#ee4d2d]" />
              </div>
              <div className="pl-6 space-y-0.5 text-neutral-600">
                <Link
                  href="/admin/products"
                  className={`block py-1 px-2 rounded font-medium transition ${
                    pathname === "/admin/products"
                      ? "text-[#ee4d2d] font-bold bg-[#fff5f3]"
                      : "hover:text-[#ee4d2d]"
                  }`}
                >
                  สินค้าของฉัน
                </Link>
                <Link
                  href="/admin/products?action=add"
                  className="block py-1 px-2 hover:text-[#ee4d2d] cursor-pointer rounded"
                >
                  เพิ่มสินค้าใหม่
                </Link>
                <p className="py-1 px-2 hover:text-[#ee4d2d] cursor-pointer rounded">
                  Shopee Standard Product
                </p>
                <p className="py-1 px-2 hover:text-[#ee4d2d] cursor-pointer rounded">
                  Shopee AI ช่วยเพิ่มประสิทธิภาพ
                </p>
              </div>
            </div>

            {/* Group 3: Marketing Centre */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-neutral-600 font-bold px-2 py-1.5 cursor-pointer hover:bg-neutral-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-neutral-500" />
                  <span>Marketing Centre</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
              </div>
              <div className="pl-6 space-y-0.5 text-neutral-500">
                <p className="py-1 px-2 hover:text-[#ee4d2d] cursor-pointer rounded">
                  แคมเปญส่วนลด
                </p>
                <p className="py-1 px-2 hover:text-[#ee4d2d] cursor-pointer rounded">
                  Shopee Ads
                </p>
                <p className="py-1 px-2 hover:text-[#ee4d2d] cursor-pointer rounded">
                  Flash Sale ในร้านค้า
                </p>
              </div>
            </div>

            {/* Group 4: การบริการลูกค้า */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-neutral-600 font-bold px-2 py-1.5 cursor-pointer hover:bg-neutral-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-neutral-500" />
                  <span>การบริการลูกค้า</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
              </div>
              <div className="pl-6 space-y-0.5 text-neutral-500">
                <p className="py-1 px-2 hover:text-[#ee4d2d] cursor-pointer rounded">
                  จัดการแชท
                </p>
                <p className="py-1 px-2 hover:text-[#ee4d2d] cursor-pointer rounded">
                  AI ผู้ช่วยตอบแชท
                </p>
              </div>
            </div>

            {/* Group 5: การเงิน */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-neutral-600 font-bold px-2 py-1.5 cursor-pointer hover:bg-neutral-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-neutral-500" />
                  <span>การเงิน</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
              </div>
            </div>

            {/* Group 6: ข้อมูลเชิงลึก */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-neutral-600 font-bold px-2 py-1.5 cursor-pointer hover:bg-neutral-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-neutral-500" />
                  <span>ข้อมูลเชิงลึก</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
              </div>
            </div>

            {/* Group 7: การตั้งค่าร้านค้า */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-neutral-600 font-bold px-2 py-1.5 cursor-pointer hover:bg-neutral-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-neutral-500" />
                  <span>การตั้งค่าร้านค้า</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
              </div>
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="pt-4 border-t border-neutral-100 text-[10px] text-neutral-400 text-center">
            <p>Shopee Seller Centre v2.4</p>
            <p className="mt-0.5">GANHOM Luxury Store</p>
          </div>
        </aside>

        {/* Main Workspace Content Area */}
        <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
