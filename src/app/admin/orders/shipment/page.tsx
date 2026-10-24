"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Truck,
  Printer,
  Package,
  CheckCircle2,
  Clock,
  AlertCircle,
  Search,
  Filter,
  Download,
  MapPin,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Calendar,
} from "lucide-react";

interface ShipmentItem {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  address: string;
  carrier: "Flash Express" | "Kerry Express" | "J&T Express" | "ไปรษณีย์ไทย";
  trackingNumber?: string;
  productTitle: string;
  quantity: number;
  shipType: "drop_off" | "pick_up";
  status: "pending_ship" | "in_transit" | "delivered";
  orderDate: string;
}

const INITIAL_SHIPMENTS: ShipmentItem[] = [
  {
    id: "ship-1",
    orderNumber: "241024FF89301A",
    customerName: "สมชาย รักสงบ",
    phone: "081-234-5678",
    address: "99/12 หมู่ 4 ต.เนินพระ อ.เมือง จ.ระยอง 21000",
    carrier: "Flash Express",
    productTitle: "สารกระตุ้นเรซิ่นไม้กฤษณา กานหอม พรีเมียม (3L) x 2",
    quantity: 2,
    shipType: "drop_off",
    status: "pending_ship",
    orderDate: "2026-10-24 14:22",
  },
  {
    id: "ship-2",
    orderNumber: "241024FF55102C",
    customerName: "วิชัย สวนกฤษณาตราด",
    phone: "086-555-1122",
    address: "12 หมู่ 1 ต.เขาสมิง อ.เขาสมิง จ.ตราด 23130",
    carrier: "J&T Express",
    productTitle: "สารกระตุ้นเรซิ่นไม้กฤษณา กานหอม แกลลอน 1 ลิตร x 10",
    quantity: 10,
    shipType: "pick_up",
    status: "pending_ship",
    orderDate: "2026-10-24 16:40",
  },
  {
    id: "ship-3",
    orderNumber: "241024FF77218B",
    customerName: "กมลวรรณ ทรัพย์เจริญ",
    phone: "089-876-5432",
    address: "45 ถ.สุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110",
    carrier: "Kerry Express",
    trackingNumber: "KER249102847",
    productTitle: "น้ำหอมกฤษณาแท้ CHUN Eau De Parfum 50ml x 1",
    quantity: 1,
    shipType: "drop_off",
    status: "in_transit",
    orderDate: "2026-10-23 10:15",
  },
  {
    id: "ship-4",
    orderNumber: "241023FF11928D",
    customerName: "ธนวัฒน์ เจริญสุข",
    phone: "092-333-8899",
    address: "88/5 หมู่ 2 ต.หนองปลาไหล อ.บางละมุง จ.ชลบุรี 20150",
    carrier: "Flash Express",
    trackingNumber: "TH99827182901",
    productTitle: "สารกระตุ้นเรซิ่นไม้กฤษณา กานหอม พรีเมียม (3L) x 1",
    quantity: 1,
    shipType: "pick_up",
    status: "delivered",
    orderDate: "2026-10-20 09:30",
  },
];

export default function AdminShipmentPage() {
  const [shipments, setShipments] = useState<ShipmentItem[]>(INITIAL_SHIPMENTS);
  const [activeTab, setActiveTab] = useState<"pending" | "transit" | "delivered" | "all">("pending");
  const [selectedCarrier, setSelectedCarrier] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = shipments.filter((item) => {
    if (activeTab === "pending" && item.status !== "pending_ship") return false;
    if (activeTab === "transit" && item.status !== "in_transit") return false;
    if (activeTab === "delivered" && item.status !== "delivered") return false;

    if (selectedCarrier !== "all" && item.carrier !== selectedCarrier) return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        item.orderNumber.toLowerCase().includes(q) ||
        item.customerName.toLowerCase().includes(q) ||
        item.productTitle.toLowerCase().includes(q) ||
        (item.trackingNumber && item.trackingNumber.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleConfirmShipment = (id: string) => {
    setShipments((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              status: "in_transit",
              trackingNumber: `TH${Math.floor(1000000000 + Math.random() * 9000000000)}`,
            }
          : s
      )
    );
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-neutral-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-800 flex items-center gap-2">
            <span>การจัดส่งของฉัน</span>
            <span className="text-xs bg-[#fff1ee] text-[#ee4d2d] font-semibold px-2 py-0.5 rounded-full">
              {shipments.filter((s) => s.status === "pending_ship").length} รอจัดส่ง
            </span>
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            จัดการการจัดส่งพัสดุ พิมพ์ใบปะหน้าพัสดุ เรียกรถเข้ารับพัสดุ และติดตามหมายเลขพัสดุ
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/orders"
            className="px-3.5 py-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <span>ดูรายการคำสั่งซื้อ</span>
          </Link>
          <button
            type="button"
            onClick={() => alert("พิมพ์ใบปะหน้าพัสดุทั้งหมดสำหรับรายการที่รอจัดส่ง")}
            className="px-4 py-2 rounded-lg bg-[#ee4d2d] hover:bg-[#d73f20] text-white text-xs font-bold flex items-center gap-1.5 transition shadow-xs cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>พิมพ์ใบปะหน้าเป็นชุด</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-neutral-500">รอจัดส่ง (To Ship)</p>
            <p className="text-xl font-bold text-neutral-800">
              {shipments.filter((s) => s.status === "pending_ship").length} รายการ
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-neutral-500">อยู่ระหว่างขนส่ง (In Transit)</p>
            <p className="text-xl font-bold text-neutral-800">
              {shipments.filter((s) => s.status === "in_transit").length} รายการ
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-neutral-500">จัดส่งสำเร็จ (Delivered)</p>
            <p className="text-xl font-bold text-neutral-800">
              {shipments.filter((s) => s.status === "delivered").length} รายการ
            </p>
          </div>
        </div>
      </div>

      {/* Main Tabs and Table */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
        {/* Tabs */}
        <div className="flex items-center border-b border-neutral-200 text-xs font-medium">
          {[
            { key: "pending", label: "รอการจัดส่ง" },
            { key: "transit", label: "อยู่ระหว่างขนส่ง" },
            { key: "delivered", label: "จัดส่งสำเร็จ" },
            { key: "all", label: "พัสดุทั้งหมด" },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key as any)}
              className={`py-3 px-5 border-b-2 transition cursor-pointer ${
                activeTab === tab.key
                  ? "border-[#ee4d2d] text-[#ee4d2d] font-bold bg-[#fffdfd]"
                  : "border-transparent text-neutral-600 hover:text-neutral-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filter Toolbar */}
        <div className="p-4 bg-neutral-50/70 border-b border-neutral-200 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="flex-1 flex flex-col sm:flex-row gap-2 w-full">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ค้นหาด้วย เลขคำสั่งซื้อ, ชื่อผู้รับ, เลขพัสดุ..."
                className="w-full pl-9 pr-3 py-2 bg-white border border-neutral-200 rounded-lg text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#ee4d2d]"
              />
            </div>

            <select
              value={selectedCarrier}
              onChange={(e) => setSelectedCarrier(e.target.value)}
              className="px-3 py-2 bg-white border border-neutral-200 rounded-lg text-xs text-neutral-700 focus:outline-none focus:border-[#ee4d2d]"
            >
              <option value="all">ทุกบริษัทขนส่ง</option>
              <option value="Flash Express">Flash Express</option>
              <option value="Kerry Express">Kerry Express</option>
              <option value="J&T Express">J&T Express</option>
              <option value="ไปรษณีย์ไทย">ไปรษณีย์ไทย</option>
            </select>
          </div>
        </div>

        {/* Shipment Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-700">
            <thead className="bg-neutral-50 text-neutral-500 font-semibold border-b border-neutral-200">
              <tr>
                <th className="py-3 px-4">เลขคำสั่งซื้อ / วันที่</th>
                <th className="py-3 px-4">ผู้รับ / ที่อยู่จัดส่ง</th>
                <th className="py-3 px-4">รายการสินค้า</th>
                <th className="py-3 px-4">บริษัทขนส่ง / รูปแบบ</th>
                <th className="py-3 px-4">สถานะพัสดุ</th>
                <th className="py-3 px-4 text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-neutral-400">
                    ไม่พบรายการพัสดุในหมวดนี้
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-neutral-50/60 transition">
                    <td className="py-3 px-4 font-mono">
                      <p className="font-bold text-neutral-800">{item.orderNumber}</p>
                      <p className="text-[11px] text-neutral-400 mt-0.5">{item.orderDate}</p>
                    </td>

                    <td className="py-3 px-4 max-w-xs">
                      <p className="font-semibold text-neutral-800">{item.customerName}</p>
                      <p className="text-[11px] text-neutral-500 truncate">{item.address}</p>
                      <p className="text-[11px] text-neutral-400">{item.phone}</p>
                    </td>

                    <td className="py-3 px-4 max-w-xs">
                      <p className="font-medium text-neutral-800 line-clamp-2">
                        {item.productTitle}
                      </p>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-semibold text-neutral-800">{item.carrier}</span>
                      <p className="text-[10px] text-neutral-400">
                        {item.shipType === "pick_up" ? "เรียกรถเข้ารับ (Pick-up)" : "นำส่งสาขา (Drop-off)"}
                      </p>
                    </td>

                    <td className="py-3 px-4">
                      {item.status === "pending_ship" && (
                        <span className="inline-block px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 font-semibold text-[11px]">
                          รอการจัดส่ง
                        </span>
                      )}
                      {item.status === "in_transit" && (
                        <div>
                          <span className="inline-block px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold text-[11px]">
                            อยู่ระหว่างขนส่ง
                          </span>
                          <p className="text-[10px] text-[#ee4d2d] font-mono mt-0.5 font-bold">
                            {item.trackingNumber}
                          </p>
                        </div>
                      )}
                      {item.status === "delivered" && (
                        <div>
                          <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-[11px]">
                            จัดส่งสำเร็จ
                          </span>
                          <p className="text-[10px] text-neutral-400 font-mono mt-0.5">
                            {item.trackingNumber}
                          </p>
                        </div>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => alert(`พิมพ์ใบปะหน้าพัสดุ #${item.orderNumber}`)}
                        className="px-2.5 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-100 text-neutral-700 font-medium transition cursor-pointer"
                        title="พิมพ์ใบปะหน้า"
                      >
                        <Printer className="w-3.5 h-3.5 inline mr-1" />
                        <span>ใบปะหน้า</span>
                      </button>

                      {item.status === "pending_ship" && (
                        <button
                          type="button"
                          onClick={() => handleConfirmShipment(item.id)}
                          className="px-3 py-1.5 rounded-lg bg-[#ee4d2d] hover:bg-[#d73f20] text-white font-bold transition shadow-xs cursor-pointer"
                        >
                          จัดส่งแล้ว
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
