"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Filter,
  RotateCcw,
  Edit,
  Trash2,
  ExternalLink,
  ShieldAlert,
  Sparkles,
  HelpCircle,
  X,
  CheckCircle2,
  ShoppingBag,
  PackageOpen,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { Product, INITIAL_PRODUCTS } from "@/data/mockData";

export interface SellerProduct {
  id: string;
  name: string;
  sku: string;
  parentSku?: string;
  category: string;
  price: number;
  stock: number;
  sales: number;
  views: number;
  imageUrl: string;
  status: "active" | "review" | "violation" | "unlisted";
  smartTips?: string[];
  createdAt: string;
}

export default function AdminProductsPage() {
  // Start with empty products list by default as requested: "ไม่ต้องมีสินค้าก่อน"
  const [products, setProducts] = useState<SellerProduct[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "active" | "violation" | "review" | "unlisted">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isBannerDismissed, setIsBannerDismissed] = useState(false);

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<SellerProduct | null>(null);

  // Form Fields
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState("Fragrance Oils");
  const [formPrice, setFormPrice] = useState("");
  const [formStock, setFormStock] = useState("");
  const [formSku, setFormSku] = useState("");
  const [formImage, setFormImage] = useState("");

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("seller_products");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setProducts(parsed);
        }
      } catch (e) {
        console.error("Failed to parse saved seller products", e);
      }
    }
  }, []);

  // Save to localStorage whenever products change
  const updateProducts = (newProducts: SellerProduct[]) => {
    setProducts(newProducts);
    localStorage.setItem("seller_products", JSON.stringify(newProducts));
  };

  // Open modal for adding
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormName("");
    setFormCategory("Fragrance Oils");
    setFormPrice("");
    setFormStock("100");
    setFormSku(`SKU-${Math.floor(100000 + Math.random() * 900000)}`);
    setFormImage("https://images.unsplash.com/photo-1608500218890-c4f86641bc34?w=500&auto=format&fit=crop&q=80");
    setIsAddModalOpen(true);
  };

  // Open modal for editing
  const handleOpenEdit = (p: SellerProduct) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormCategory(p.category);
    setFormPrice(p.price.toString());
    setFormStock(p.stock.toString());
    setFormSku(p.sku);
    setFormImage(p.imageUrl);
    setIsAddModalOpen(true);
  };

  // Save Product (Add or Edit)
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPrice) return;

    const priceNum = parseFloat(formPrice) || 0;
    const stockNum = parseInt(formStock, 10) || 0;

    if (editingProduct) {
      // Update existing
      const updated = products.map((p) =>
        p.id === editingProduct.id
          ? {
              ...p,
              name: formName.trim(),
              category: formCategory,
              price: priceNum,
              stock: stockNum,
              sku: formSku || p.sku,
              imageUrl: formImage || p.imageUrl,
            }
          : p
      );
      updateProducts(updated);
    } else {
      // Add new product
      const newProd: SellerProduct = {
        id: `PROD-${Date.now()}`,
        name: formName.trim(),
        sku: formSku || `SKU-${Date.now().toString().slice(-6)}`,
        parentSku: `PAR-${Math.floor(1000 + Math.random() * 9000)}`,
        category: formCategory,
        price: priceNum,
        stock: stockNum,
        sales: 0,
        views: 1,
        imageUrl: formImage || "https://images.unsplash.com/photo-1608500218890-c4f86641bc34?w=500&auto=format&fit=crop&q=80",
        status: "active",
        smartTips: ["ข้อมูลสินค้าครบถ้วน", "พร้อมโปรโมทเพื่อเพิ่มยอดขาย"],
        createdAt: new Date().toISOString(),
      };
      updateProducts([newProd, ...products]);
    }

    setIsAddModalOpen(false);
  };

  // Delete Product
  const handleDelete = (id: string, name: string) => {
    if (confirm(`คุณต้องการลบสินค้า "${name}" ใช่หรือไม่?`)) {
      const filtered = products.filter((p) => p.id !== id);
      updateProducts(filtered);
    }
  };

  // Clear all products back to empty (0 products)
  const handleClearAll = () => {
    if (confirm("ต้องการล้างรายการสินค้าทั้งหมด เพื่อให้เป็นหน้าว่างเริ่มต้นตามแบบ Shopee หรือไม่?")) {
      updateProducts([]);
    }
  };

  // Load Demo Products (for easy testing when desired)
  const handleLoadDemo = () => {
    const demoItems: SellerProduct[] = [
      {
        id: "demo-1",
        name: "สารกระตุ้นกฤษณา เข้าแก่น 2-3 ปีคัดข้น!! (Agarwood Stimulation Solution)",
        sku: "43426144849",
        parentSku: "PAR-AGAR-01",
        category: "Fragrance Oils",
        price: 179,
        stock: 207,
        sales: 58,
        views: 1800,
        imageUrl: "https://www.latifperfumes.com/_next/static/media/agarwoodfront.86510e2b.jpg",
        status: "active",
        smartTips: ["ยอดขายดีแต่ยอดเข้าชมต่ำ", "โปรโมทด้วยโค้ดส่วนลด Check", "ข้อมูลสินค้าครบถ้วน"],
        createdAt: new Date().toISOString(),
      },
      {
        id: "demo-2",
        name: "Madagascar Vanilla Fragrance Oil 100ml เกรดพรีเมียมเข้มข้น",
        sku: "330070514770",
        parentSku: "PAR-VAN-02",
        category: "Fragrance Oils",
        price: 450,
        stock: 64,
        sales: 12,
        views: 450,
        imageUrl: "https://images.unsplash.com/photo-1608500218890-c4f86641bc34?w=500&auto=format&fit=crop&q=80",
        status: "active",
        smartTips: ["ยอดขายเติบโตต่อเนื่อง", "ข้อมูลสินค้าครบถ้วน"],
        createdAt: new Date().toISOString(),
      },
      {
        id: "demo-3",
        name: "Soy Wax Flakes 100% Pure Natural ไขถั่วเหลืองธรรมชาติสำหรับทำเทียนหอม",
        sku: "889012398401",
        parentSku: "PAR-WAX-03",
        category: "Candle Supplies",
        price: 320,
        stock: 92,
        sales: 30,
        views: 890,
        imageUrl: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=500&auto=format&fit=crop&q=80",
        status: "active",
        smartTips: ["สินค้าที่มีศักยภาพสูง", "ลูกค้ากลับมาซื้อซ้ำบ่อย"],
        createdAt: new Date().toISOString(),
      },
    ];
    updateProducts(demoItems);
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Tab filter
      if (activeTab === "active" && p.status !== "active") return false;
      if (activeTab === "violation" && p.status !== "violation") return false;
      if (activeTab === "review" && p.status !== "review") return false;
      if (activeTab === "unlisted" && p.status !== "unlisted") return false;

      // Category filter
      if (selectedCategory !== "all" && p.category !== selectedCategory) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesSku = p.sku.toLowerCase().includes(q);
        const matchesParent = p.parentSku?.toLowerCase().includes(q) || false;
        return matchesName || matchesSku || matchesParent;
      }

      return true;
    });
  }, [products, activeTab, selectedCategory, searchQuery]);

  const activeCount = products.filter((p) => p.status === "active").length;

  return (
    <div className="space-y-4 max-w-[1360px] mx-auto">
      {/* Top Header Card */}
      <div className="bg-white rounded-lg p-4 sm:p-5 border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
            สินค้าของฉัน
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            จัดการสต็อกสินค้า ราคา รายละเอียดสินค้า และติดตามประสิทธิภาพการขาย
          </p>
        </div>

        {/* Action Buttons Matching Shopee UI */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            className="px-3 py-1.5 rounded-md border border-neutral-300 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition cursor-pointer"
          >
            ตั้งค่าสินค้า
          </button>
          <button
            type="button"
            className="px-3 py-1.5 rounded-md border border-neutral-300 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition cursor-pointer"
          >
            ทำแบบชุด
          </button>

          {/* Shopee-style Primary Orange Button */}
          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-md bg-[#ee4d2d] hover:bg-[#d73211] text-white text-xs sm:text-sm font-bold shadow-xs flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>+ เพิ่มสินค้าใหม่</span>
          </button>
        </div>
      </div>

      {/* Main Status Tabs */}
      <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden shadow-2xs">
        <div className="flex items-center border-b border-neutral-200 overflow-x-auto text-xs sm:text-sm select-none">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`px-5 py-3 font-medium border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === "all"
                ? "border-[#ee4d2d] text-[#ee4d2d] font-bold"
                : "border-transparent text-neutral-600 hover:text-neutral-900"
            }`}
          >
            ทั้งหมด ({products.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("active")}
            className={`px-5 py-3 font-medium border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === "active"
                ? "border-[#ee4d2d] text-[#ee4d2d] font-bold"
                : "border-transparent text-neutral-600 hover:text-neutral-900"
            }`}
          >
            ขายอยู่ ({activeCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("violation")}
            className={`px-5 py-3 font-medium border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === "violation"
                ? "border-[#ee4d2d] text-[#ee4d2d] font-bold"
                : "border-transparent text-neutral-600 hover:text-neutral-900"
            }`}
          >
            การละเมิด (0)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("review")}
            className={`px-5 py-3 font-medium border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === "review"
                ? "border-[#ee4d2d] text-[#ee4d2d] font-bold"
                : "border-transparent text-neutral-600 hover:text-neutral-900"
            }`}
          >
            อยู่ระหว่างตรวจสอบ (0)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("unlisted")}
            className={`px-5 py-3 font-medium border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === "unlisted"
                ? "border-[#ee4d2d] text-[#ee4d2d] font-bold"
                : "border-transparent text-neutral-600 hover:text-neutral-900"
            }`}
          >
            ยังไม่ลงขาย (0)
          </button>
        </div>

        {/* Shopee Promotional Alert Banner */}
        {!isBannerDismissed && (
          <div className="p-3 mx-4 my-3 bg-[#e8f8f5] border border-[#a2ecd8] rounded-md flex items-center justify-between text-xs text-[#008f75]">
            <div className="flex items-center gap-2.5">
              <span className="text-base">🛡️</span>
              <div>
                <span className="font-bold">เพลิดเพลินกับ ROAS Protection</span>
                <span className="ml-1 text-neutral-700 hidden sm:inline">
                  จัดการโปรโมทสินค้าเพิ่มยอดขายแบบกำหนด ROAS เอง ควบคุมงบประมาณได้อย่างคุ้มค่า
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                className="px-2.5 py-1 bg-[#00bfa5] hover:bg-[#00a892] text-white rounded font-bold text-[11px] transition cursor-pointer"
              >
                ดูรายละเอียด
              </button>
              <button
                type="button"
                onClick={() => setIsBannerDismissed(true)}
                className="text-neutral-400 hover:text-neutral-600 cursor-pointer p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Sub-filter tabs */}
        <div className="px-4 py-2 border-b border-neutral-100 flex items-center gap-4 text-xs text-neutral-500">
          <span className="text-[#ee4d2d] font-bold border-b border-[#ee4d2d] pb-1 cursor-pointer">
            ทั้งหมด
          </span>
          <span className="hover:text-neutral-800 cursor-pointer pb-1">
            เติมสินค้า (0)
          </span>
          <span className="hover:text-neutral-800 cursor-pointer pb-1 flex items-center gap-1">
            รอการตรวจสอบรายละเอียดสินค้า (0)
            <span className="w-1.5 h-1.5 rounded-full bg-[#ee4d2d]"></span>
          </span>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="p-4 bg-neutral-50/50 border-b border-neutral-200 flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="ค้นหาด้วย ชื่อสินค้า, Parent SKU, เลข SKU, รหัสสินค้า"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-neutral-300 rounded-md py-1.5 pl-3 pr-8 text-xs focus:outline-none focus:border-[#ee4d2d] text-neutral-800"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="w-full md:w-44">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-white border border-neutral-300 rounded-md py-1.5 px-3 text-xs focus:outline-none focus:border-[#ee4d2d] text-neutral-700"
            >
              <option value="all">หมวดหมู่ทั้งหมด</option>
              <option value="Fragrance Oils">Fragrance Oils</option>
              <option value="Essential Oils">Essential Oils</option>
              <option value="Candle Supplies">Candle Supplies</option>
              <option value="Soap Making">Soap Making</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

          {/* High Potential Filter */}
          <div className="w-full md:w-40">
            <select className="w-full bg-white border border-neutral-300 rounded-md py-1.5 px-3 text-xs focus:outline-none focus:border-[#ee4d2d] text-neutral-700">
              <option value="">สินค้าที่มีศักยภาพสูง</option>
              <option value="top">ยอดขายสูง</option>
              <option value="view">ยอดเข้าชมสูง</option>
            </select>
          </div>

          {/* Filter Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="px-4 py-1.5 rounded-md border border-[#ee4d2d] text-[#ee4d2d] bg-white hover:bg-[#fff5f3] text-xs font-bold transition cursor-pointer"
            >
              นำไปใช้
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="px-3 py-1.5 rounded-md border border-neutral-300 text-neutral-600 hover:bg-neutral-100 text-xs font-medium transition cursor-pointer"
            >
              รีเซ็ต
            </button>
          </div>
        </div>

        {/* Header Info Bar: Count & Testing Helpers */}
        <div className="px-4 py-3 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-800">
              สินค้า {filteredProducts.length} รายการ
            </span>
            <span className="text-neutral-400">|</span>
            <span className="text-neutral-500 text-[11px]">
              แสดงสถานะคลังและข้อมูลวิเคราะห์แบบเรียลไทม์
            </span>
          </div>

          {/* Testing Utility buttons for User / Teacher evaluation */}
          <div className="flex items-center gap-2">
            {products.length === 0 ? (
              <button
                type="button"
                onClick={handleLoadDemo}
                className="text-[11px] px-2.5 py-1 rounded bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-semibold transition cursor-pointer"
                title="ทดลองโหลดสินค้าตัวอย่าง 3 รายการตามรูป"
              >
                📥 โหลดสินค้าตัวอย่าง (Load Demo)
              </button>
            ) : (
              <button
                type="button"
                onClick={handleClearAll}
                className="text-[11px] px-2.5 py-1 rounded bg-neutral-100 hover:bg-rose-50 text-neutral-600 hover:text-rose-600 border border-neutral-200 transition cursor-pointer"
                title="ล้างสินค้าให้เป็นค่าว่าง (0 รายการ) ตามที่ต้องการ"
              >
                🗑️ ล้างเป็นค่าว่าง (Empty State)
              </button>
            )}
          </div>
        </div>

        {/* Content Area: Table OR Empty State */}
        {filteredProducts.length === 0 ? (
          /* EMPTY STATE (ตามที่สั่ง: "ไม่ต้องมีสินค้าก่อน แบบ ช้อปปี้ ตามแบบส่งไปให้") */
          <div className="py-20 px-4 text-center flex flex-col items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-4 shadow-inner">
              <PackageOpen className="w-12 h-12 stroke-[1.4] text-neutral-400" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-neutral-800">
              ยังไม่มีสินค้าในร้านของคุณ
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-neutral-500 max-w-md">
              เริ่มต้นสร้างยอดขายและขยายธุรกิจของคุณโดยการเพิ่มสินค้าชิ้นแรกลงในระบบ
            </p>
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={handleOpenAdd}
                className="px-6 py-2.5 rounded-md bg-[#ee4d2d] hover:bg-[#d73211] text-white text-xs sm:text-sm font-bold shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>+ เพิ่มสินค้าใหม่</span>
              </button>
              <button
                type="button"
                onClick={handleLoadDemo}
                className="px-4 py-2.5 rounded-md border border-neutral-300 text-neutral-700 hover:bg-neutral-50 text-xs sm:text-sm font-semibold transition cursor-pointer"
              >
                โหลดสินค้าตัวอย่างตามแบบ
              </button>
            </div>
          </div>
        ) : (
          /* SHOPEE PRODUCTS TABLE (เมื่อมีสินค้าในระบบ) */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-neutral-700">
              <thead className="bg-[#fafafa] text-neutral-500 font-semibold border-b border-neutral-200">
                <tr>
                  <th className="p-3 w-10 text-center">
                    <input type="checkbox" className="rounded" />
                  </th>
                  <th className="p-3 min-w-[280px]">สินค้า</th>
                  <th className="p-3 min-w-[100px]">ราคา</th>
                  <th className="p-3 min-w-[80px]">คลัง</th>
                  <th className="p-3 min-w-[130px]">ประสิทธิภาพ</th>
                  <th className="p-3 min-w-[180px]">การวิเคราะห์อัจฉริยะ</th>
                  <th className="p-3 min-w-[120px] text-right">การดำเนินการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-neutral-50/70 transition">
                    <td className="p-3 text-center align-top">
                      <input type="checkbox" className="rounded mt-2" />
                    </td>

                    {/* Product Column */}
                    <td className="p-3 align-top">
                      <div className="flex gap-3">
                        <div className="w-14 h-14 rounded-md overflow-hidden bg-neutral-100 flex-shrink-0 border border-neutral-200">
                          <img
                            src={p.imageUrl}
                            alt={p.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="space-y-1">
                          <p className="font-bold text-neutral-900 leading-snug line-clamp-2 hover:text-[#ee4d2d] cursor-pointer">
                            {p.name}
                          </p>
                          <div className="text-[11px] text-neutral-400 space-y-0.5">
                            {p.parentSku && <p>Parent SKU: {p.parentSku}</p>}
                            <p className="flex items-center gap-1.5">
                              <span>รหัสสินค้า: {p.sku}</span>
                              <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
                                เมนูผูกสินค้า (AMS) &gt;
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Price Column */}
                    <td className="p-3 align-top">
                      <span className="font-bold text-neutral-900 text-sm">
                        ฿{p.price.toLocaleString("th-TH")}
                      </span>
                    </td>

                    {/* Stock Column */}
                    <td className="p-3 align-top">
                      <span
                        className={`font-semibold ${
                          p.stock < 10 ? "text-rose-600" : "text-neutral-800"
                        }`}
                      >
                        {p.stock}
                      </span>
                    </td>

                    {/* Performance Column */}
                    <td className="p-3 align-top text-neutral-600 space-y-0.5">
                      <p className="font-bold text-neutral-800">
                        ยอดขาย {p.sales}
                      </p>
                      <p className="text-[11px] text-neutral-400">
                        ยอดขายในช่วง 30 วันที่ผ่านมา: {p.sales}
                      </p>
                      <p className="text-[11px] text-neutral-400">
                        การมองเห็นในช่วง 30 วัน: {(p.views / 1000).toFixed(1)}k
                      </p>
                    </td>

                    {/* Smart Analysis Column */}
                    <td className="p-3 align-top space-y-1">
                      <p className="text-[11px] font-bold text-amber-700">
                        ยอดขายและยอดเข้าชมดี
                      </p>
                      <div className="space-y-0.5 text-[11px] text-emerald-700">
                        <p className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>โปรโมทด้วยโค้ดส่วนลด Check</span>
                        </p>
                        <p className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>ข้อมูลสินค้าครบถ้วน</span>
                        </p>
                      </div>
                    </td>

                    {/* Action Column */}
                    <td className="p-3 align-top text-right space-y-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(p)}
                        className="text-[#ee4d2d] hover:underline font-bold block ml-auto cursor-pointer"
                      >
                        แก้ไข
                      </button>
                      <button
                        type="button"
                        className="text-neutral-500 hover:text-[#ee4d2d] block ml-auto cursor-pointer text-[11px]"
                      >
                        กำลังโฆษณา
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(p.id, p.name)}
                        className="text-rose-600 hover:underline block ml-auto cursor-pointer text-[11px]"
                      >
                        ลบ
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Shopee-Style Add / Edit Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-neutral-200">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#ee4d2d] text-white flex items-center justify-center font-bold text-xs">
                  🛍️
                </div>
                <h3 className="font-bold text-neutral-900 text-sm sm:text-base">
                  {editingProduct ? "แก้ไขข้อมูลสินค้า" : "เพิ่มสินค้าใหม่ลงในร้าน"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-700 cursor-pointer p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProduct} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">
                  ชื่อสินค้า <span className="text-[#ee4d2d]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="เช่น สารกระตุ้นกฤษณา หรือ น้ำหอม Madagascar Vanilla"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                  className="w-full border border-neutral-300 rounded-lg p-2.5 text-xs focus:outline-none focus:border-[#ee4d2d]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">
                    หมวดหมู่ <span className="text-[#ee4d2d]">*</span>
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full border border-neutral-300 rounded-lg p-2.5 text-xs focus:outline-none focus:border-[#ee4d2d]"
                  >
                    <option value="Fragrance Oils">Fragrance Oils</option>
                    <option value="Essential Oils">Essential Oils</option>
                    <option value="Candle Supplies">Candle Supplies</option>
                    <option value="Soap Making">Soap Making</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 mb-1">
                    รหัสสินค้า (SKU)
                  </label>
                  <input
                    type="text"
                    value={formSku}
                    onChange={(e) => setFormSku(e.target.value)}
                    className="w-full border border-neutral-300 rounded-lg p-2.5 text-xs focus:outline-none focus:border-[#ee4d2d]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">
                    ราคาขาย (฿) <span className="text-[#ee4d2d]">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    placeholder="เช่น 179"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    required
                    className="w-full border border-neutral-300 rounded-lg p-2.5 text-xs focus:outline-none focus:border-[#ee4d2d]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 mb-1">
                    จำนวนคลัง (Stock) <span className="text-[#ee4d2d]">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="เช่น 100"
                    value={formStock}
                    onChange={(e) => setFormStock(e.target.value)}
                    required
                    className="w-full border border-neutral-300 rounded-lg p-2.5 text-xs focus:outline-none focus:border-[#ee4d2d]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">
                  URL รูปภาพสินค้า
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full border border-neutral-300 rounded-lg p-2.5 text-xs focus:outline-none focus:border-[#ee4d2d]"
                />
              </div>

              {/* Preview Image if entered */}
              {formImage && (
                <div className="flex items-center gap-3 p-2 bg-neutral-50 rounded-lg border border-neutral-200">
                  <img
                    src={formImage}
                    alt="preview"
                    className="w-12 h-12 object-cover rounded border"
                  />
                  <span className="text-[11px] text-neutral-500">
                    รูปตัวอย่างสินค้าที่จะแสดงในระบบ
                  </span>
                </div>
              )}

              {/* Modal Footer Buttons */}
              <div className="pt-3 border-t border-neutral-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-neutral-300 text-neutral-700 hover:bg-neutral-50 font-semibold cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#ee4d2d] hover:bg-[#d73211] text-white font-bold cursor-pointer shadow-xs"
                >
                  {editingProduct ? "บันทึกการแก้ไข" : "บันทึกและลงขาย"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
