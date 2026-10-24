"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Upload,
  Plus,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  HelpCircle,
  Image as ImageIcon,
  DollarSign,
  Package,
  Truck,
  Layers,
} from "lucide-react";

export default function AdminAddProductPage() {
  const router = useRouter();

  // Form states
  const [name, setName] = useState("");
  const [category, setCategory] = useState("สารกระตุ้นเรซิ่นไม้กฤษณา");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [comparePrice, setComparePrice] = useState("");
  const [stock, setStock] = useState("100");
  const [sku, setSku] = useState(`SKU-${Math.floor(100000 + Math.random() * 900000)}`);
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1608500218890-c4f86641bc34?w=500&auto=format&fit=crop&q=80");
  const [weight, setWeight] = useState("1.2");
  const [status, setStatus] = useState<"active" | "unlisted">("active");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Preset sample image options for easy testing
  const sampleImages = [
    { label: "สารกระตุ้นแกลลอน", url: "https://images.unsplash.com/photo-1608500218890-c4f86641bc34?w=500&auto=format&fit=crop&q=80" },
    { label: "น้ำหอมกฤษณา", url: "https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?w=500&auto=format&fit=crop&q=80" },
    { label: "ถุงสารกระตุ้นแขวน", url: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=500&auto=format&fit=crop&q=80" },
    { label: "ขวดแก้วน้ำมันกฤษณา", url: "https://images.unsplash.com/photo-1596433809252-260c2745dfdd?w=500&auto=format&fit=crop&q=80" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("กรุณากรอกชื่อสินค้า");
      return;
    }
    if (!price || Number(price) <= 0) {
      alert("กรุณาระบุราคาสินค้าให้ถูกต้อง");
      return;
    }

    setIsSubmitting(true);

    const newProduct = {
      id: `PROD-${Date.now()}`,
      name: name.trim(),
      sku: sku.trim() || `SKU-${Date.now()}`,
      category,
      price: Number(price),
      compareAtPrice: comparePrice ? Number(comparePrice) : Number(price) * 1.2,
      stock: Number(stock) || 0,
      sales: 0,
      views: 1,
      imageUrl: imageUrl.trim() || sampleImages[0].url,
      description,
      status,
      createdAt: new Date().toISOString().split("T")[0],
    };

    // Save to localStorage
    try {
      const saved = localStorage.getItem("seller_products");
      let list = [];
      if (saved) {
        list = JSON.parse(saved);
        if (!Array.isArray(list)) list = [];
      }
      list.unshift(newProduct);
      localStorage.setItem("seller_products", JSON.stringify(list));
    } catch (err) {
      console.error("Failed to save product", err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      alert("เพิ่มสินค้าสำเร็จ เรียบร้อยแล้ว!");
      router.push("/admin/products");
    }, 400);
  };

  return (
    <div className="space-y-4 max-w-5xl mx-auto pb-16">
      {/* Top Breadcrumb & Header */}
      <div className="flex items-center justify-between bg-white p-4 sm:p-5 rounded-xl border border-neutral-200 shadow-xs">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-neutral-800 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-800">
              เพิ่มสินค้าใหม่
            </h1>
            <p className="text-xs text-neutral-500 mt-0.5">
              กรอกข้อมูลผลิตภัณฑ์ ตั้งราคา และกำหนดสต็อกเพื่อเริ่มจำหน่ายในร้าน
            </p>
          </div>
        </div>

        <Link
          href="/admin/products"
          className="text-xs font-semibold text-neutral-500 hover:text-neutral-800 transition"
        >
          ยกเลิก
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Section 1: ข้อมูลพื้นฐาน */}
        <div className="bg-white p-5 sm:p-6 rounded-xl border border-neutral-200 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-neutral-800 border-b border-neutral-100 pb-3 flex items-center gap-2">
            <Package className="w-4 h-4 text-[#ee4d2d]" />
            <span>ข้อมูลพื้นฐาน (Basic Information)</span>
          </h2>

          <div className="space-y-3 text-xs">
            {/* Product Name */}
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                ชื่อสินค้า <span className="text-[#ee4d2d]">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="เช่น สารกระตุ้นเรซิ่นไม้กฤษณา กานหอม พรีเมียม 3 ลิตร"
                className="w-full px-3 py-2.5 bg-neutral-50/50 border border-neutral-200 rounded-lg text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#ee4d2d] focus:bg-white text-xs"
              />
              <p className="text-[11px] text-neutral-400 mt-1">
                ความยาวที่แนะนำ: 25 - 100 ตัวอักษร เพื่อให้ค้นหาง่ายขึ้น
              </p>
            </div>

            {/* Category */}
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                หมวดหมู่สินค้า <span className="text-[#ee4d2d]">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 bg-neutral-50/50 border border-neutral-200 rounded-lg text-neutral-800 text-xs focus:outline-none focus:border-[#ee4d2d] focus:bg-white"
              >
                <option value="สารกระตุ้นเรซิ่นไม้กฤษณา">สารกระตุ้นเรซิ่นไม้กฤษณา (Activators)</option>
                <option value="น้ำหอมกฤษณาพรีเมียม">น้ำหอมกฤษณาพรีเมียม (Oud Perfumes)</option>
                <option value="อุปกรณ์การเกษตรและสายให้น้ำยา">อุปกรณ์การเกษตรและสายให้น้ำยา (Tools & Drips)</option>
                <option value="ผลิตภัณฑ์สกัดจากธรรมชาติ">ผลิตภัณฑ์สกัดจากธรรมชาติ (Natural Extracts)</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                รายละเอียดสินค้า
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="ระบุจุดเด่น วิธีการใช้งาน ข้อควรระวัง และขนาดบรรจุ..."
                className="w-full px-3 py-2.5 bg-neutral-50/50 border border-neutral-200 rounded-lg text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#ee4d2d] focus:bg-white text-xs leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Section 2: รูปภาพสินค้า */}
        <div className="bg-white p-5 sm:p-6 rounded-xl border border-neutral-200 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-neutral-800 border-b border-neutral-100 pb-3 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-[#ee4d2d]" />
            <span>รูปภาพสินค้า (Product Images)</span>
          </h2>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                URL รูปภาพสินค้าหลัก (Cover Image URL)
              </label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2.5 bg-neutral-50/50 border border-neutral-200 rounded-lg text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#ee4d2d] focus:bg-white text-xs"
              />
            </div>

            {/* Image Preview & Presets */}
            <div className="flex flex-col sm:flex-row items-start gap-4 pt-2">
              <div className="w-28 h-28 rounded-xl border border-neutral-200 overflow-hidden bg-neutral-50 flex items-center justify-center flex-shrink-0">
                {imageUrl ? (
                  <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <Upload className="w-6 h-6 text-neutral-300" />
                )}
              </div>

              <div className="flex-1 space-y-2">
                <p className="text-[11px] font-semibold text-neutral-600">
                  หรือเลือกใช้รูปตัวอย่างสำหรับทดสอบ:
                </p>
                <div className="flex flex-wrap gap-2">
                  {sampleImages.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setImageUrl(s.url)}
                      className="px-2.5 py-1 rounded-lg border border-neutral-200 hover:border-[#ee4d2d] text-neutral-600 hover:text-[#ee4d2d] text-[11px] transition cursor-pointer"
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: ข้อมูลการขาย */}
        <div className="bg-white p-5 sm:p-6 rounded-xl border border-neutral-200 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-neutral-800 border-b border-neutral-100 pb-3 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-[#ee4d2d]" />
            <span>ข้อมูลการขาย (Sales & Pricing)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                ราคาจำหน่าย (฿) <span className="text-[#ee4d2d]">*</span>
              </label>
              <input
                type="number"
                required
                min="1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="เช่น 329"
                className="w-full px-3 py-2.5 bg-neutral-50/50 border border-neutral-200 rounded-lg text-neutral-800 text-xs focus:outline-none focus:border-[#ee4d2d] focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                ราคาเต็มก่อนลด (฿) (ไม่บังคับ)
              </label>
              <input
                type="number"
                min="1"
                value={comparePrice}
                onChange={(e) => setComparePrice(e.target.value)}
                placeholder="เช่น 450"
                className="w-full px-3 py-2.5 bg-neutral-50/50 border border-neutral-200 rounded-lg text-neutral-800 text-xs focus:outline-none focus:border-[#ee4d2d] focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                จำนวนคลังสินค้า (Stock) <span className="text-[#ee4d2d]">*</span>
              </label>
              <input
                type="number"
                required
                min="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="100"
                className="w-full px-3 py-2.5 bg-neutral-50/50 border border-neutral-200 rounded-lg text-neutral-800 text-xs focus:outline-none focus:border-[#ee4d2d] focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                รหัสสินค้า (SKU)
              </label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="SKU-100234"
                className="w-full px-3 py-2.5 bg-neutral-50/50 border border-neutral-200 rounded-lg text-neutral-800 text-xs focus:outline-none focus:border-[#ee4d2d] focus:bg-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* Section 4: การจัดส่งและน้ำหนัก */}
        <div className="bg-white p-5 sm:p-6 rounded-xl border border-neutral-200 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-neutral-800 border-b border-neutral-100 pb-3 flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#ee4d2d]" />
            <span>การจัดส่ง (Shipping & Dimensions)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                น้ำหนักพัสดุ (กก. / kg)
              </label>
              <input
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="1.2"
                className="w-full px-3 py-2.5 bg-neutral-50/50 border border-neutral-200 rounded-lg text-neutral-800 text-xs focus:outline-none focus:border-[#ee4d2d] focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                สถานะสินค้า
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-neutral-50/50 border border-neutral-200 rounded-lg text-neutral-800 text-xs focus:outline-none focus:border-[#ee4d2d] focus:bg-white"
              >
                <option value="active">เปิดขายทันที (Active)</option>
                <option value="unlisted">ยังไม่ลงขาย / ฉบับร่าง (Unlisted)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs flex items-center justify-between">
          <Link
            href="/admin/products"
            className="px-4 py-2.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-neutral-700 text-xs font-semibold transition"
          >
            ยกเลิก
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setStatus("unlisted");
                alert("บันทึกเป็นฉบับร่างเรียบร้อย");
                router.push("/admin/products");
              }}
              className="px-4 py-2.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold transition cursor-pointer"
            >
              บันทึกเป็นฉบับร่าง
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-lg bg-[#ee4d2d] hover:bg-[#d73f20] text-white text-xs font-bold transition shadow-xs cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? "กำลังบันทึก..." : "บันทึกและลงขาย"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
