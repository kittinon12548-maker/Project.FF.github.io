"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Truck,
  CheckCircle2,
  QrCode,
  Building2,
  Copy,
  Check,
  AlertCircle,
  Download,
} from "lucide-react";
import { CartItem, getCartItems, saveCartItems, INITIAL_CART_ITEMS } from "@/data/cartStore";

interface BankInfo {
  id: string;
  name: string;
  accountNumber: string;
  accountName: string;
  branch: string;
  badgeBg: string;
  badgeText: string;
  logoText: string;
}

const SUPPORTED_BANKS: BankInfo[] = [
  {
    id: "kbank",
    name: "ธนาคารกสิกรไทย (KBANK)",
    accountNumber: "095-2-84192-3",
    accountName: "บริษัท กานหอม ลักชูรี (ไทยแลนด์) จำกัด",
    branch: "สาขาสยามพารากอน",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
    logoText: "KBANK",
  },
  {
    id: "scb",
    name: "ธนาคารไทยพาณิชย์ (SCB)",
    accountNumber: "408-9-12345-8",
    accountName: "บริษัท กานหอม ลักชูรี (ไทยแลนด์) จำกัด",
    branch: "สาขาเซ็นทรัลเวิลด์",
    badgeBg: "bg-purple-50",
    badgeText: "text-purple-700",
    logoText: "SCB",
  },
  {
    id: "bbl",
    name: "ธนาคารกรุงเทพ (BBL)",
    accountNumber: "101-8-76543-2",
    accountName: "บริษัท กานหอม ลักชูรี (ไทยแลนด์) จำกัด",
    branch: "สาขาสำนักงานใหญ่สีลม",
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-700",
    logoText: "BBL",
  },
  {
    id: "ktb",
    name: "ธนาคารกรุงไทย (KTB)",
    accountNumber: "015-1-98765-4",
    accountName: "บริษัท กานหอม ลักชูรี (ไทยแลนด์) จำกัด",
    branch: "สาขาถนนสุขุมวิท",
    badgeBg: "bg-sky-50",
    badgeText: "text-sky-700",
    logoText: "KTB",
  },
];

type PaymentMethod = "" | "qr_code" | "bank_transfer";

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  // Sync with localStorage
  useEffect(() => {
    setItems(getCartItems());
    setIsLoaded(true);

    const handleCartUpdated = () => {
      setItems(getCartItems());
    };

    window.addEventListener("cartUpdated", handleCartUpdated);
    return () => window.removeEventListener("cartUpdated", handleCartUpdated);
  }, []);

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("");
  const [selectedBankId, setSelectedBankId] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [copiedBankAcc, setCopiedBankAcc] = useState(false);

  // Checkout states
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any>(null);

  // Update item quantity
  const handleQuantityChange = (id: string, delta: number) => {
    const updated = items
      .map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter(Boolean) as CartItem[];
    setItems(updated);
    saveCartItems(updated);
  };

  // Remove item
  const handleRemoveItem = (id: string) => {
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    saveCartItems(updated);
  };

  // Apply voucher
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess("");

    const code = couponCode.trim().toUpperCase();
    if (code === "GANHOM10") {
      setDiscountPercent(10);
      setCouponSuccess("ใช้โค้ดส่วนลด 10% สำเร็จ!");
    } else if (code === "FREESHIP") {
      setDiscountPercent(5);
      setCouponSuccess("ใช้โค้ดส่วนลดค่าจัดส่งสำเร็จ!");
    } else if (code === "") {
      setCouponError("กรุณากรอกรหัสคูปองส่วนลด");
    } else {
      setCouponError("รหัสคูปองไม่ถูกต้องหรือหมดอายุ");
    }
  };

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const shippingFee = subtotal >= 1500 || subtotal === 0 ? 0 : 50;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);
  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Selected bank object
  const selectedBank = SUPPORTED_BANKS.find((b) => b.id === selectedBankId);

  // Validate payment method selection
  const isPaymentValid =
    paymentMethod === "qr_code" ||
    (paymentMethod === "bank_transfer" && selectedBankId !== "");

  const handleCopyAccountNumber = (accNo: string) => {
    navigator.clipboard.writeText(accNo.replace(/-/g, ""));
    setCopiedBankAcc(true);
    setTimeout(() => setCopiedBankAcc(false), 2000);
  };

  const handleCheckout = () => {
    if (!paymentMethod) {
      setPaymentError("กรุณาเลือกวิธีการชำระเงินก่อนดำเนินการสั่งซื้อ");
      return;
    }
    if (paymentMethod === "bank_transfer" && !selectedBankId) {
      setPaymentError("กรุณาเลือกธนาคารที่ต้องการโอนชำระเงิน");
      return;
    }

    setPaymentError("");
    setIsCheckingOut(true);

    setTimeout(() => {
      setIsCheckingOut(false);
      setCompletedOrder({
        orderNumber: `GH${Date.now().toString().slice(-8)}`,
        total: grandTotal,
        method: paymentMethod,
        bank: paymentMethod === "bank_transfer" ? selectedBank : null,
        itemCount: totalItemCount,
        date: new Date().toLocaleString("th-TH"),
      });
      setItems([]);
      saveCartItems([]);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-neutral-900 font-sans pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        {/* Title */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-neutral-200 pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight font-serif flex items-center gap-3">
              <span>ตะกร้าสินค้าของคุณ</span>
              <span className="text-sm font-sans font-bold bg-[#fdf8e6] text-[#8a5b14] px-3 py-1 rounded-full border border-[#f3d07a]/60">
                {totalItemCount} ชิ้น
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              ตรวจสอบรายการสินค้า จำนวน และเลือกวิธีการชำระเงินก่อนดำเนินการ
            </p>
          </div>

          <Link
            href="/products"
            className="text-xs font-semibold text-neutral-600 hover:text-black flex items-center gap-1 transition self-start sm:self-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>เลือกซื้อสินค้าต่อ</span>
          </Link>
        </div>

        {!isLoaded ? (
          <div className="py-24 text-center">
            <div className="w-8 h-8 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs text-neutral-500 font-medium mt-3">กำลังโหลดตะกร้าสินค้า...</p>
          </div>
        ) : items.length === 0 && !completedOrder ? (
          /* Empty Cart State */
          <div className="bg-white rounded-3xl border border-neutral-200 p-12 sm:p-16 text-center max-w-xl mx-auto shadow-xs space-y-5 my-8">
            <div className="w-20 h-20 rounded-full bg-[#fdf8e6] text-[#8a5b14] flex items-center justify-center mx-auto shadow-inner">
              <ShoppingBag className="w-10 h-10 stroke-[1.6]" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-neutral-800">
                ไม่มีสินค้าในตะกร้าของคุณ
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed max-w-sm mx-auto">
                คุณยังไม่ได้เลือกสินค้าลงในตะกร้า เริ่มต้นสำรวจผลิตภัณฑ์สารกระตุ้นไม้กฤษณาและน้ำหอมพรีเมียมของเราได้ทันที
              </p>
            </div>
            <div>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#8a5b14] via-[#c29015] to-[#71440a] text-white font-bold text-xs shadow-lg hover:opacity-95 transition hover:scale-105 active:scale-95"
              >
                <span>เลือกดูสินค้าทั้งหมด (Products)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          /* Active Cart Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Cart Items List (Left Column) */}
            <div className="lg:col-span-7 xl:col-span-8 bg-white rounded-2xl border border-neutral-200 shadow-xs overflow-hidden">
              <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3.5 bg-neutral-50/80 border-b border-neutral-200 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                <span className="col-span-6">สินค้า</span>
                <span className="col-span-2 text-center">ราคาต่อหน่วย</span>
                <span className="col-span-2 text-center">จำนวน</span>
                <span className="col-span-2 text-right">ยอดรวม</span>
              </div>

              <div className="divide-y divide-neutral-100">
                {items.map((item) => {
                  const lineTotal = item.price * item.quantity;

                  return (
                    <div
                      key={item.id}
                      className="p-4 sm:p-6 sm:grid sm:grid-cols-12 sm:gap-4 sm:items-center hover:bg-neutral-50/40 transition"
                    >
                      {/* Product Info */}
                      <div className="col-span-6 flex items-center gap-4">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-neutral-200 shrink-0"
                        />
                        <div className="min-w-0 space-y-1">
                          <h4 className="font-bold text-sm text-neutral-900 leading-snug line-clamp-2">
                            {item.name}
                          </h4>
                          <p className="text-xs text-neutral-500 font-medium">
                            {item.variation}
                          </p>
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-neutral-400 hover:text-rose-600 text-xs inline-flex items-center gap-1 transition cursor-pointer pt-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>ลบรายการนี้</span>
                          </button>
                        </div>
                      </div>

                      {/* Unit Price */}
                      <div className="col-span-2 text-center mt-3 sm:mt-0">
                        <span className="sm:hidden text-xs text-neutral-500 mr-2">ราคา:</span>
                        <span className="text-sm font-semibold text-neutral-700">
                          ฿{item.price.toLocaleString()}
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="col-span-2 flex items-center justify-start sm:justify-center gap-2 mt-3 sm:mt-0">
                        <div className="inline-flex items-center border border-neutral-200 rounded-lg bg-white shadow-xs">
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className="p-1.5 hover:bg-neutral-100 text-neutral-600 rounded-l-lg transition cursor-pointer"
                            aria-label="ลดจำนวน"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-9 text-center text-xs font-bold text-neutral-800">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="p-1.5 hover:bg-neutral-100 text-neutral-600 rounded-r-lg transition cursor-pointer"
                            aria-label="เพิ่มจำนวน"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Line Total */}
                      <div className="col-span-2 text-right mt-3 sm:mt-0">
                        <span className="sm:hidden text-xs text-neutral-500 mr-2">ยอดรวม:</span>
                        <span className="text-base font-bold text-[#8a5b14]">
                          ฿{lineTotal.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Free Shipping Alert banner */}
              <div className="p-4 bg-[#fdf8e6]/80 border-t border-[#f3d07a]/40 flex items-center gap-3 text-xs text-[#8a5b14]">
                <Truck className="w-5 h-5 flex-shrink-0" />
                <span>
                  {subtotal >= 1500 ? (
                    <strong className="text-emerald-700 font-bold">
                      🎉 ยินดีด้วย! คำสั่งซื้อของคุณได้รับสิทธิ์ จัดส่งฟรี ทั่วประเทศ
                    </strong>
                  ) : (
                    <span>
                      สั่งซื้อเพิ่มอีก{" "}
                      <strong>฿{(1500 - subtotal).toLocaleString()}</strong> เพื่อรับสิทธิ์{" "}
                      <strong>จัดส่งฟรี ทั่วไทย</strong>
                    </span>
                  )}
                </span>
              </div>
            </div>

            {/* Order Summary & Payment Method Card (Right Column) */}
            <div className="lg:col-span-5 xl:col-span-4 space-y-4">
              <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-xs space-y-4">
                <h3 className="font-bold text-neutral-900 text-base border-b border-neutral-100 pb-3">
                  สรุปคำสั่งซื้อ
                </h3>

                {/* Subtotals */}
                <div className="space-y-2.5 text-xs text-neutral-600">
                  <div className="flex justify-between">
                    <span>ยอดรวมสินค้า ({totalItemCount} ชิ้น):</span>
                    <span className="font-semibold text-neutral-800">
                      ฿{subtotal.toLocaleString()}
                    </span>
                  </div>

                  {discountPercent > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>ส่วนลด ({discountPercent}%):</span>
                      <span>-฿{discountAmount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>ค่าจัดส่งพัสดุด่วน:</span>
                    <span className="font-semibold text-neutral-800">
                      {shippingFee === 0 ? (
                        <span className="text-emerald-600 font-bold">ฟรีค่าส่ง</span>
                      ) : (
                        `฿${shippingFee.toLocaleString()}`
                      )}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-neutral-200 flex justify-between items-baseline">
                    <span className="text-sm font-bold text-neutral-900">
                      ยอดสุทธิ (Total):
                    </span>
                    <span className="text-xl font-black text-[#8a5b14]">
                      ฿{grandTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Voucher Code Form */}
                <form onSubmit={handleApplyCoupon} className="pt-2 border-t border-neutral-100 space-y-2">
                  <label className="block text-xs font-semibold text-neutral-700">
                    โค้ดส่วนลด (Voucher Code)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="ลองใส่ GANHOM10"
                      className="flex-1 px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-800 uppercase focus:outline-none focus:border-[#8a5b14]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-neutral-900 hover:bg-black text-white text-xs font-bold rounded-lg transition cursor-pointer"
                    >
                      ใช้โค้ด
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-[11px] text-rose-600 font-medium">{couponError}</p>
                  )}
                  {couponSuccess && (
                    <p className="text-[11px] text-emerald-600 font-medium">{couponSuccess}</p>
                  )}
                </form>

                {/* ======================================================== */}
                {/* PAYMENT METHOD SELECTOR (2 SYSTEMS)                      */}
                {/* ======================================================== */}
                <div className="pt-3 border-t border-neutral-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-neutral-900">
                      เลือกวิธีการชำระเงิน <span className="text-[#ee4d2d]">*</span>
                    </label>
                    {isPaymentValid && (
                      <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>พร้อมชำระเงิน</span>
                      </span>
                    )}
                  </div>

                  {/* 2 Main Payment Systems Radio Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {/* System 1: QR Code PromptPay */}
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentMethod("qr_code");
                        setPaymentError("");
                      }}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                        paymentMethod === "qr_code"
                          ? "border-[#c29015] bg-[#fdfaf3] ring-2 ring-[#c29015]/20 shadow-xs"
                          : "border-neutral-200 hover:border-neutral-300 bg-white"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg shrink-0 ${
                          paymentMethod === "qr_code"
                            ? "bg-[#c29015] text-white"
                            : "bg-neutral-100 text-neutral-600"
                        }`}
                      >
                        <QrCode className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-neutral-800 text-xs">สแกนคิวอาร์โค้ด</p>
                        <p className="text-[10px] text-neutral-500 mt-0.5">PromptPay Thai QR</p>
                      </div>
                    </button>

                    {/* System 2: Bank Transfer */}
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentMethod("bank_transfer");
                        setPaymentError("");
                      }}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                        paymentMethod === "bank_transfer"
                          ? "border-[#c29015] bg-[#fdfaf3] ring-2 ring-[#c29015]/20 shadow-xs"
                          : "border-neutral-200 hover:border-neutral-300 bg-white"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg shrink-0 ${
                          paymentMethod === "bank_transfer"
                            ? "bg-[#c29015] text-white"
                            : "bg-neutral-100 text-neutral-600"
                        }`}
                      >
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-neutral-800 text-xs">จ่ายผ่านธนาคาร</p>
                        <p className="text-[10px] text-neutral-500 mt-0.5">โอนเงินเข้าบัญชี</p>
                      </div>
                    </button>
                  </div>

                  {/* Detail Panel 1: QR Code PromptPay */}
                  {paymentMethod === "qr_code" && (
                    <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-3">
                      <div className="flex items-center justify-between border-b border-neutral-200/80 pb-2 text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] bg-[#003b70] text-white font-black px-1.5 py-0.5 rounded tracking-wider">
                            THAI QR
                          </span>
                          <span className="font-bold text-neutral-800">พร้อมเพย์ (PromptPay)</span>
                        </div>
                        <span className="font-extrabold text-[#8a5b14] text-xs">
                          ฿{grandTotal.toLocaleString()}
                        </span>
                      </div>

                      {/* PromptPay Visual Card */}
                      <div className="flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-neutral-200 text-center space-y-2 shadow-2xs">
                        {/* High-res SVG Thai QR Display */}
                        <div className="p-2.5 bg-white border-2 border-neutral-800 rounded-xl inline-block shadow-xs">
                          <svg
                            className="w-32 h-32"
                            viewBox="0 0 100 100"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect width="100" height="100" fill="white" />
                            {/* QR Finder patterns */}
                            <rect x="6" y="6" width="26" height="26" rx="2" fill="black" />
                            <rect x="10" y="10" width="18" height="18" rx="1" fill="white" />
                            <rect x="14" y="14" width="10" height="10" fill="black" />

                            <rect x="68" y="6" width="26" height="26" rx="2" fill="black" />
                            <rect x="72" y="10" width="18" height="18" rx="1" fill="white" />
                            <rect x="76" y="14" width="10" height="10" fill="black" />

                            <rect x="6" y="68" width="26" height="26" rx="2" fill="black" />
                            <rect x="10" y="72" width="18" height="18" rx="1" fill="white" />
                            <rect x="14" y="76" width="10" height="10" fill="black" />

                            {/* Center Logo Area */}
                            <circle cx="50" cy="50" r="10" fill="#003b70" />
                            <text
                              x="50"
                              y="53.5"
                              fill="white"
                              fontSize="8"
                              fontWeight="bold"
                              textAnchor="middle"
                            >
                              ฿
                            </text>

                            {/* Pixel data patterns */}
                            <rect x="36" y="8" width="6" height="6" fill="black" />
                            <rect x="46" y="12" width="6" height="6" fill="black" />
                            <rect x="56" y="8" width="6" height="6" fill="black" />
                            <rect x="36" y="24" width="6" height="6" fill="black" />
                            <rect x="48" y="26" width="6" height="6" fill="black" />
                            <rect x="8" y="38" width="6" height="6" fill="black" />
                            <rect x="20" y="44" width="6" height="6" fill="black" />
                            <rect x="28" y="52" width="6" height="6" fill="black" />
                            <rect x="68" y="38" width="6" height="6" fill="black" />
                            <rect x="78" y="44" width="6" height="6" fill="black" />
                            <rect x="86" y="52" width="6" height="6" fill="black" />
                            <rect x="38" y="68" width="6" height="6" fill="black" />
                            <rect x="48" y="74" width="6" height="6" fill="black" />
                            <rect x="58" y="82" width="6" height="6" fill="black" />
                            <rect x="68" y="68" width="6" height="6" fill="black" />
                            <rect x="78" y="76" width="6" height="6" fill="black" />
                            <rect x="86" y="84" width="6" height="6" fill="black" />
                          </svg>
                        </div>

                        <div>
                          <p className="text-xs font-bold text-neutral-900">
                            บจก. กานหอม ลักชูรี (ไทยแลนด์)
                          </p>
                          <p className="text-[10px] text-neutral-400 mt-0.5">
                            พร้อมเพย์: 0105566019281
                          </p>
                          <p className="text-[10px] text-neutral-500 mt-1">
                            สแกนผ่านแอปธนาคารใดก็ได้เพื่อชำระเงินอัตโนมัติ
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Detail Panel 2: Bank Transfer (Sub-Function: Select Bank) */}
                  {paymentMethod === "bank_transfer" && (
                    <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                          เลือกธนาคารที่ต้องชำระ <span className="text-[#ee4d2d]">*</span>
                        </label>
                        <select
                          value={selectedBankId}
                          onChange={(e) => {
                            setSelectedBankId(e.target.value);
                            setPaymentError("");
                          }}
                          className={`w-full px-3 py-2 bg-white border rounded-lg text-xs font-medium focus:outline-none focus:border-[#c29015] ${
                            !selectedBankId && paymentError
                              ? "border-rose-400 text-rose-800 ring-1 ring-rose-200"
                              : "border-neutral-300 text-neutral-800"
                          }`}
                        >
                          <option value="">-- กรุณาเลือกธนาคารที่ต้องการโอน --</option>
                          {SUPPORTED_BANKS.map((b) => (
                            <option key={b.id} value={b.id}>
                              {b.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Selected Bank Details Display */}
                      {selectedBank ? (
                        <div className="p-3 bg-white rounded-xl border border-neutral-200 space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${selectedBank.badgeBg} ${selectedBank.badgeText}`}
                            >
                              {selectedBank.logoText}
                            </span>
                            <span className="text-neutral-500 text-[11px]">{selectedBank.branch}</span>
                          </div>

                          <div>
                            <p className="text-neutral-400 text-[10px]">ชื่อบัญชี:</p>
                            <p className="font-bold text-neutral-800">{selectedBank.accountName}</p>
                          </div>

                          <div className="flex items-center justify-between pt-1 border-t border-neutral-100">
                            <div>
                              <p className="text-neutral-400 text-[10px]">เลขที่บัญชี:</p>
                              <p className="font-mono font-extrabold text-sm text-[#8a5b14]">
                                {selectedBank.accountNumber}
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleCopyAccountNumber(selectedBank.accountNumber)}
                              className="px-2.5 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-[11px] font-semibold flex items-center gap-1 transition cursor-pointer"
                            >
                              {copiedBankAcc ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  <span className="text-emerald-600">คัดลอกแล้ว</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>คัดลอกเลขบัญชี</span>
                                </>
                              )}
                            </button>
                          </div>

                          <div className="pt-1 text-[10px] text-neutral-400">
                            ยอดโอนสุทธิ: <strong className="text-neutral-700">฿{grandTotal.toLocaleString()}</strong> (กรุณาโอนให้ตรงตามยอด)
                          </div>
                        </div>
                      ) : (
                        <p className="text-[11px] text-amber-700 font-medium">
                          ⚠️ กรุณาคลิกเลือกธนาคารด้านบนเพื่อดูข้อมูลเลขที่บัญชี
                        </p>
                      )}
                    </div>
                  )}

                  {/* Validation Error Banner */}
                  {paymentError && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span className="font-semibold">{paymentError}</span>
                    </div>
                  )}
                </div>

                {/* Checkout CTA */}
                <div className="space-y-1.5 pt-1">
                  <button
                    type="button"
                    disabled={isCheckingOut || !isPaymentValid}
                    onClick={handleCheckout}
                    className={`w-full py-3.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                      isPaymentValid
                        ? "bg-gradient-to-r from-[#8a5b14] via-[#c29015] to-[#71440a] hover:opacity-95 text-white cursor-pointer hover:scale-[1.01] active:scale-98"
                        : "bg-neutral-200 text-neutral-400 cursor-not-allowed shadow-none"
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>
                      {isCheckingOut ? "กำลังดำเนินการ..." : "ดำเนินการสั่งซื้อ / ชำระเงิน"}
                    </span>
                  </button>

                  {!isPaymentValid && (
                    <p className="text-[11px] text-neutral-400 text-center font-medium">
                      * กรุณาเลือกวิธีการชำระเงิน (และเลือกธนาคาร) ก่อนดำเนินการ
                    </p>
                  )}
                </div>
              </div>

              {/* Guarantees */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-4 space-y-2 text-xs text-neutral-600">
                <div className="flex items-center gap-2 text-neutral-800 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>รับประกันสินค้าแท้ 100% จากผู้ผลิตกานหอม</span>
                </div>
                <p className="text-[11px] text-neutral-500 pl-6">
                  จัดส่งปลอดภัย บรรจุหีบห่อแน่นหนา พร้อมบริการเก็บเงินปลายทาง
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Order Complete Success Modal */}
      {completedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-black text-neutral-900 font-serif">
                สั่งซื้อสินค้าสำเร็จเรียบร้อย!
              </h3>
              <p className="text-xs text-neutral-500 font-mono">
                เลขที่คำสั่งซื้อ: #{completedOrder.orderNumber}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-500">ยอดชำระสุทธิ:</span>
                <span className="font-extrabold text-[#8a5b14] text-sm">
                  ฿{completedOrder.total.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">วิธีการชำระเงิน:</span>
                <span className="font-semibold text-neutral-800">
                  {completedOrder.method === "qr_code"
                    ? "สแกนคิวอาร์โค้ด (PromptPay)"
                    : `โอนผ่านธนาคาร (${completedOrder.bank?.name})`}
                </span>
              </div>
              {completedOrder.bank && (
                <div className="pt-2 border-t border-neutral-200/80 text-[11px]">
                  <p className="text-neutral-500">เลขที่บัญชีปลายทาง:</p>
                  <p className="font-mono font-bold text-neutral-800">
                    {completedOrder.bank.accountNumber} ({completedOrder.bank.accountName})
                  </p>
                </div>
              )}
              <div className="flex justify-between text-neutral-500 pt-1">
                <span>วันที่ทำรายการ:</span>
                <span>{completedOrder.date}</span>
              </div>
            </div>

            <p className="text-xs text-neutral-500 leading-relaxed">
              ระบบได้รับคำสั่งซื้อของท่านแล้ว เจ้าหน้าที่จะดำเนินการตรวจสอบยอดและจัดส่งพัสดุให้เร็วที่สุด
            </p>

            <div className="pt-2">
              <Link
                href="/products"
                onClick={() => setCompletedOrder(null)}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-neutral-900 hover:bg-black text-white font-bold text-xs transition cursor-pointer"
              >
                <span>กลับไปเลือกชมสินค้า</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
