"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Eye, X } from "lucide-react";
import { Product, INITIAL_PRODUCTS } from "@/data/mockData";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = [
    { id: "all", label: "ทั้งหมด" },
    { id: "Fragrance Oils", label: "Fragrance Oils" },
    { id: "Essential Oils", label: "Essential Oils" },
    { id: "Candle Supplies", label: "Candle Supplies" },
    { id: "Soap Making", label: "Soap Making" },
    { id: "Accessories", label: "Accessories" },
  ];

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/admin/products");
        if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data.products)) {
            setProducts(data.products);
          }
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory =
          activeCategory === "all" || p.category === activeCategory;
        const matchesQuery =
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => {
        if (sortOption === "price-asc") return a.price - b.price;
        if (sortOption === "price-desc") return b.price - a.price;
        return 0;
      });
  }, [products, activeCategory, searchQuery, sortOption]);

  return (
    <div className="min-h-screen bg-[#fafaf9] text-neutral-900 font-sans pb-24">
      {/* Sticky Sub-Header Breadcrumb */}
      <div className="border-b border-neutral-200 bg-white/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-semibold text-neutral-500 hover:text-black transition-colors"
            >
              หน้าแรก
            </Link>
            <span className="text-neutral-300">/</span>
            <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
              สินค้าทั้งหมด (Products)
            </span>
          </div>

          <Link
            href="/cart"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#fdf8e6] text-[#8a5b14] text-xs font-bold hover:bg-[#f6e9b8] transition border border-[#f3d07a]/60 shadow-xs"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>ดูตะกร้าสินค้า (3)</span>
          </Link>
        </div>
      </div>

      {/* Main Header & Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-neutral-500">
            Premium Fragrance Oils Collection
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900 font-serif">
            คอลเลกชันน้ำหอมระดับพรีเมียม
          </h1>
          <p className="text-sm text-neutral-600 leading-relaxed">
            สัมผัสความหอมระดับพรีเมียมจาก Fragrance Oils คุณภาพสูง สำหรับทำเทียนหอมและสบู่
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 pt-8 pb-4 flex-wrap">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-neutral-900 text-white shadow-sm"
                    : "bg-white text-neutral-600 hover:text-black border border-neutral-200 hover:border-neutral-300"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-200/80">
          <div className="relative w-full sm:w-80">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="ค้นหาชื่อสินค้า แบรนด์..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-black transition-colors"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <span className="text-xs text-neutral-500 font-medium">
              พบ {filteredProducts.length} รายการ
            </span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-white border border-neutral-200 rounded-xl px-3 py-2 text-xs font-semibold text-neutral-700 focus:outline-none focus:border-black"
            >
              <option value="newest">มาใหม่ล่าสุด</option>
              <option value="price-asc">ราคา: ต่ำ → สูง</option>
              <option value="price-desc">ราคา: สูง → ต่ำ</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {isLoading ? (
          <div className="py-24 text-center">
            <div className="w-8 h-8 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs text-neutral-500 font-medium mt-3">กำลังโหลดสินค้า...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-2xl border border-neutral-200">
            <p className="text-neutral-500 text-sm">ไม่พบสินค้าที่ตรงกับการค้นหา</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-neutral-200/80 overflow-hidden shadow-sm hover:shadow-md hover:border-neutral-300 transition-all flex flex-col justify-between"
              >
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-neutral-100 flex items-center justify-center">
                  <img
                    src={product.media[0]}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.compareAtPrice > product.price && (
                    <span className="absolute top-3 left-3 bg-neutral-950 text-[#f3d07a] border border-[#b38728]/40 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                      ลด {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(product)}
                    className="absolute bottom-3 right-3 p-2 rounded-full bg-white/90 text-neutral-900 hover:bg-neutral-900 hover:text-white transition shadow opacity-0 group-hover:opacity-100 cursor-pointer"
                    title="ดูรายละเอียดอย่างรวดเร็ว"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Details */}
                <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                      {product.category}
                    </span>
                    <h3 className="mt-1 font-bold text-sm text-neutral-900 line-clamp-1 group-hover:text-[#996515] transition-colors">
                      {product.title}
                    </h3>
                    <p className="mt-1 text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                    <div>
                      <span className="text-sm sm:text-base font-extrabold text-neutral-900">
                        ฿{product.price.toLocaleString("th-TH")}
                      </span>
                      {product.compareAtPrice > product.price && (
                        <span className="ml-2 text-xs text-neutral-400 line-through">
                          ฿{product.compareAtPrice.toLocaleString("th-TH")}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => alert(`เพิ่ม "${product.title}" ลงในตะกร้าเรียบร้อยแล้ว!`)}
                      className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-800 transition cursor-pointer"
                      title="ใส่ตะกร้า"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute right-5 top-5 p-1 text-neutral-400 hover:text-neutral-800 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="aspect-square rounded-2xl overflow-hidden bg-neutral-100">
                <img
                  src={selectedProduct.media[0]}
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-4">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-widest">
                  {selectedProduct.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-neutral-900">
                  {selectedProduct.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {selectedProduct.description}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black text-neutral-900">
                    ฿{selectedProduct.price.toLocaleString("th-TH")}
                  </span>
                  {selectedProduct.compareAtPrice > selectedProduct.price && (
                    <span className="text-sm text-neutral-400 line-through">
                      ฿{selectedProduct.compareAtPrice.toLocaleString("th-TH")}
                    </span>
                  )}
                </div>
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => {
                      alert(`เพิ่ม "${selectedProduct.title}" ลงในตะกร้าเรียบร้อยแล้ว!`);
                      setSelectedProduct(null);
                    }}
                    className="w-full py-3 rounded-full bg-neutral-900 hover:bg-black text-white text-xs sm:text-sm font-bold transition shadow-md cursor-pointer"
                  >
                    🛍️ เพิ่มลงในตะกร้าสินค้า
                  </button>
                  <Link
                    href="/cart"
                    className="w-full py-2.5 rounded-full bg-[#fdf8e6] hover:bg-[#f6e9b8] text-[#8a5b14] text-xs font-bold transition border border-[#f3d07a]/60 flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>ไปที่ตะกร้าสินค้า (View Cart)</span>
                  </Link>
                  <Link
                    href="/how-to-order"
                    className="block text-center text-xs text-neutral-500 hover:text-black pt-1"
                  >
                    วิธีการสั่งซื้อและการชำระเงิน →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
