"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Download,
  Printer,
  Truck,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  RefreshCw,
  Calendar,
  ChevronDown,
  ShoppingBag,
  ExternalLink,
} from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  variation: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: OrderItem[];
  totalAmount: number;
  shippingFee: number;
  paymentMethod: string;
  shippingCarrier: string;
  trackingNumber?: string;
  status: "to_pay" | "to_ship" | "shipped" | "completed" | "cancelled" | "return";
  createdAt: string;
}

const INITIAL_ORDERS: Order[] = [
  {
    id: "ord-1",
    orderNumber: "241024FF89301A",
    customerName: "สมชาย รักสงบ",
    customerPhone: "081-234-5678",
    customerAddress: "99/12 หมู่ 4 ต.เนินพระ อ.เมือง จ.ระยอง 21000",
    items: [
      {
        id: "item-1",
        name: "สารกระตุ้นเรซิ่นไม้กฤษณา กานหอม พรีเมียม",
        variation: "ขนาด 3 ลิตร",
        price: 950,
        quantity: 2,
        imageUrl: "https://images.unsplash.com/photo-1608500218890-c4f86641bc34?w=200&auto=format&fit=crop&q=80",
      },
      {
        id: "item-2",
        name: "ชุดถุงให้สารกระตุ้นต้นไม้พร้อมสาย",
        variation: "1000ml",
        price: 320,
        quantity: 4,
        imageUrl: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=200&auto=format&fit=crop&q=80",
      },
    ],
    totalAmount: 3180,
    shippingFee: 0,
    paymentMethod: "ShopeePay / โอนเงิน",
    shippingCarrier: "Flash Express",
    trackingNumber: "TH24098192837A",
    status: "to_ship",
    createdAt: "2026-10-24 14:22",
  },
  {
    id: "ord-2",
    orderNumber: "241024FF77218B",
    customerName: "กมลวรรณ ทรัพย์เจริญ",
    customerPhone: "089-876-5432",
    customerAddress: "45 ถ.สุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110",
    items: [
      {
        id: "item-3",
        name: "น้ำหอมกฤษณาแท้ CHUN Eau De Parfum Force Vive",
        variation: "50 ml",
        price: 1890,
        quantity: 1,
        imageUrl: "https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?w=200&auto=format&fit=crop&q=80",
      },
    ],
    totalAmount: 1890,
    shippingFee: 45,
    paymentMethod: "บัตรเครดิต",
    shippingCarrier: "Kerry Express",
    trackingNumber: "KER249102847",
    status: "shipped",
    createdAt: "2026-10-23 10:15",
  },
  {
    id: "ord-3",
    orderNumber: "241024FF55102C",
    customerName: "วิชัย สวนกฤษณาตราด",
    customerPhone: "086-555-1122",
    customerAddress: "12 หมู่ 1 ต.เขาสมิง อ.เขาสมิง จ.ตราด 23130",
    items: [
      {
        id: "item-4",
        name: "สารกระตุ้นเรซิ่นไม้กฤษณา กานหอม แกลลอน 1 ลิตร",
        variation: "ขนาด 1 ลิตร",
        price: 329,
        quantity: 10,
        imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&auto=format&fit=crop&q=80",
      },
    ],
    totalAmount: 3290,
    shippingFee: 0,
    paymentMethod: "เก็บเงินปลายทาง (COD)",
    shippingCarrier: "J&T Express",
    status: "to_ship",
    createdAt: "2026-10-24 16:40",
  },
  {
    id: "ord-4",
    orderNumber: "241023FF11928D",
    customerName: "ธนวัฒน์ เจริญสุข",
    customerPhone: "092-333-8899",
    customerAddress: "88/5 หมู่ 2 ต.หนองปลาไหล อ.บางละมุง จ.ชลบุรี 20150",
    items: [
      {
        id: "item-5",
        name: "สารกระตุ้นเรซิ่นไม้กฤษณา กานหอม พรีเมียม",
        variation: "ขนาด 3 ลิตร",
        price: 950,
        quantity: 1,
        imageUrl: "https://images.unsplash.com/photo-1608500218890-c4f86641bc34?w=200&auto=format&fit=crop&q=80",
      },
    ],
    totalAmount: 950,
    shippingFee: 50,
    paymentMethod: "ShopeePay",
    shippingCarrier: "Flash Express",
    trackingNumber: "TH99827182901",
    status: "completed",
    createdAt: "2026-10-20 09:30",
  },
];

type TabType = "all" | "to_pay" | "to_ship" | "shipped" | "completed" | "cancelled" | "return";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [carrierFilter, setCarrierFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Filter orders by tab and search
  const filteredOrders = orders.filter((order) => {
    // Tab filter
    if (activeTab !== "all" && order.status !== activeTab) {
      return false;
    }
    // Carrier filter
    if (carrierFilter !== "all" && order.shippingCarrier !== carrierFilter) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchNumber = order.orderNumber.toLowerCase().includes(q);
      const matchCustomer = order.customerName.toLowerCase().includes(q);
      const matchPhone = order.customerPhone.includes(q);
      const matchItem = order.items.some((i) => i.name.toLowerCase().includes(q));
      if (!matchNumber && !matchCustomer && !matchPhone && !matchItem) {
        return false;
      }
    }
    return true;
  });

  const getTabCount = (tab: TabType) => {
    if (tab === "all") return orders.length;
    return orders.filter((o) => o.status === tab).length;
  };

  const handleShipOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: "shipped",
              trackingNumber: `TH${Math.floor(1000000000 + Math.random() * 9000000000)}`,
            }
          : o
      )
    );
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      {/* Page Title & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-xl border border-neutral-200 shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-800 flex items-center gap-2">
            <span>คำสั่งซื้อของฉัน</span>
            <span className="text-xs bg-[#fff1ee] text-[#ee4d2d] font-semibold px-2 py-0.5 rounded-full">
              {filteredOrders.length} รายการ
            </span>
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            จัดการคำสั่งซื้อของลูกค้า ตรวจสอบการชำระเงิน และดำเนินการจัดส่งสินค้า
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href="/admin/orders/shipment"
            className="px-3.5 py-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Truck className="w-4 h-4 text-[#ee4d2d]" />
            <span>ไปที่การจัดส่งของฉัน</span>
          </Link>

          <button
            type="button"
            onClick={() => alert("ส่งออกข้อมูลคำสั่งซื้อ (Excel) สำเร็จ")}
            className="px-3.5 py-2 rounded-lg border border-neutral-200 hover:border-neutral-300 text-neutral-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>ส่งออกรายงาน</span>
          </button>
        </div>
      </div>

      {/* Shopee-style Status Tabs */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
        <div className="flex items-center border-b border-neutral-200 overflow-x-auto text-xs font-medium scrollbar-none">
          {[
            { key: "all", label: "ทั้งหมด" },
            { key: "to_pay", label: "ที่ต้องชำระ" },
            { key: "to_ship", label: "ที่ต้องจัดส่ง", badge: getTabCount("to_ship") },
            { key: "shipped", label: "จัดส่งแล้ว" },
            { key: "completed", label: "สำเร็จแล้ว" },
            { key: "cancelled", label: "ยกเลิกแล้ว" },
            { key: "return", label: "การคืนเงิน/คืนสินค้า" },
          ].map((tab) => {
            const isActive = activeTab === tab.key;
            const count = getTabCount(tab.key as TabType);

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key as TabType)}
                className={`py-3 px-4 sm:px-5 whitespace-nowrap flex items-center gap-1.5 border-b-2 transition cursor-pointer ${
                  isActive
                    ? "border-[#ee4d2d] text-[#ee4d2d] font-bold bg-[#fffdfd]"
                    : "border-transparent text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? "bg-[#ee4d2d] text-white font-bold"
                      : "bg-neutral-100 text-neutral-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 bg-neutral-50/70 border-b border-neutral-200 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="flex-1 flex flex-col sm:flex-row gap-2">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาด้วย เลขคำสั่งซื้อ, ชื่อผู้ซื้อ, เบอร์โทร, หรือชื่อสินค้า..."
                className="w-full pl-9 pr-3 py-2 bg-white border border-neutral-200 rounded-lg text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#ee4d2d] focus:ring-1 focus:ring-[#ee4d2d]"
              />
            </div>

            {/* Carrier Filter */}
            <select
              value={carrierFilter}
              onChange={(e) => setCarrierFilter(e.target.value)}
              className="px-3 py-2 bg-white border border-neutral-200 rounded-lg text-xs text-neutral-700 focus:outline-none focus:border-[#ee4d2d]"
            >
              <option value="all">ทุกบริษัทขนส่ง</option>
              <option value="Flash Express">Flash Express</option>
              <option value="Kerry Express">Kerry Express</option>
              <option value="J&T Express">J&T Express</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setCarrierFilter("all");
            }}
            className="px-3 py-2 text-xs text-neutral-500 hover:text-[#ee4d2d] flex items-center justify-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>รีเซ็ตตัวกรอง</span>
          </button>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <p className="text-neutral-700 font-semibold text-sm">ไม่พบคำสั่งซื้อในหมวดนี้</p>
            <p className="text-neutral-400 text-xs">
              ลองเปลี่ยนคำค้นหา หรือสลับไปดูแท็บสถานะอื่น
            </p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-200">
            {filteredOrders.map((order) => {
              const isToShip = order.status === "to_ship";
              const isShipped = order.status === "shipped";
              const isCompleted = order.status === "completed";

              return (
                <div key={order.id} className="p-4 sm:p-5 hover:bg-neutral-50/50 transition">
                  {/* Order Top Bar: Customer, Date & Status */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-neutral-100 text-xs">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-neutral-900 text-sm">
                        {order.customerName}
                      </span>
                      <span className="text-neutral-400">|</span>
                      <span className="text-neutral-500 font-mono">
                        เลขคำสั่งซื้อ: {order.orderNumber}
                      </span>
                      <span className="text-neutral-400">•</span>
                      <span className="text-neutral-400">{order.createdAt}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isToShip && (
                        <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>ที่ต้องจัดส่ง</span>
                        </span>
                      )}
                      {isShipped && (
                        <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold flex items-center gap-1">
                          <Truck className="w-3.5 h-3.5" />
                          <span>จัดส่งแล้ว</span>
                        </span>
                      )}
                      {isCompleted && (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>สำเร็จแล้ว</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Order Content: Items & Price */}
                  <div className="py-3 flex flex-col md:flex-row justify-between gap-4">
                    {/* Item list */}
                    <div className="flex-1 space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-14 h-14 object-cover rounded-lg border border-neutral-200 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-neutral-800 line-clamp-1">
                              {item.name}
                            </p>
                            <p className="text-[11px] text-neutral-400 mt-0.5">
                              ตัวเลือก: {item.variation}
                            </p>
                            <p className="text-xs text-neutral-600 mt-0.5">
                              ฿{item.price.toLocaleString()} x {item.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Shipping & Payment Summary */}
                    <div className="md:w-72 flex flex-col justify-between border-t md:border-t-0 md:border-l border-neutral-100 pt-3 md:pt-0 md:pl-4 text-xs space-y-1.5">
                      <div className="space-y-1">
                        <div className="flex justify-between text-neutral-500">
                          <span>ขนส่ง:</span>
                          <span className="font-semibold text-neutral-700">
                            {order.shippingCarrier}
                          </span>
                        </div>
                        {order.trackingNumber && (
                          <div className="flex justify-between text-neutral-500">
                            <span>เลขติดตาม:</span>
                            <span className="font-mono font-medium text-[#ee4d2d]">
                              {order.trackingNumber}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between text-neutral-500">
                          <span>การชำระเงิน:</span>
                          <span className="text-neutral-700">{order.paymentMethod}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-neutral-100 flex items-baseline justify-between">
                        <span className="text-neutral-500 font-medium">ยอดคำสั่งซื้อทั้งหมด:</span>
                        <span className="text-base font-bold text-[#ee4d2d]">
                          ฿{order.totalAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order Footer Actions */}
                  <div className="pt-3 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <p className="text-neutral-400 text-[11px] truncate max-w-md">
                      ที่อยู่จัดส่ง: {order.customerAddress} ({order.customerPhone})
                    </p>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedOrder(order)}
                        className="px-3 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-100 text-neutral-700 font-medium transition cursor-pointer flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>รายละเอียด</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => alert(`พิมพ์ใบปะหน้าพัสดุสำหรับคำสั่งซื้อ #${order.orderNumber}`)}
                        className="px-3 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-100 text-neutral-700 font-medium transition cursor-pointer flex items-center gap-1"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>พิมพ์ใบปะหน้า</span>
                      </button>

                      {isToShip && (
                        <button
                          type="button"
                          onClick={() => handleShipOrder(order.id)}
                          className="px-4 py-1.5 rounded-lg bg-[#ee4d2d] hover:bg-[#d73f20] text-white font-bold transition shadow-xs cursor-pointer flex items-center gap-1.5"
                        >
                          <Truck className="w-3.5 h-3.5" />
                          <span>จัดส่งสินค้า</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-neutral-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <div>
                <h3 className="font-bold text-neutral-900 text-base">
                  รายละเอียดคำสั่งซื้อ
                </h3>
                <p className="text-xs text-neutral-500 font-mono mt-0.5">
                  #{selectedOrder.orderNumber}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="text-neutral-400 hover:text-neutral-600 text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-neutral-50 p-3 rounded-lg space-y-1">
                <p className="font-bold text-neutral-800">ข้อมูลผู้ซื้อและที่อยู่จัดส่ง</p>
                <p className="text-neutral-700 font-medium">{selectedOrder.customerName}</p>
                <p className="text-neutral-500">{selectedOrder.customerPhone}</p>
                <p className="text-neutral-600">{selectedOrder.customerAddress}</p>
              </div>

              <div>
                <p className="font-bold text-neutral-800 mb-2">รายการสินค้าที่สั่งซื้อ</p>
                <div className="space-y-2">
                  {selectedOrder.items.map((i) => (
                    <div key={i.id} className="flex items-center justify-between border-b border-neutral-100 pb-2">
                      <div className="flex items-center gap-2">
                        <img src={i.imageUrl} alt="" className="w-10 h-10 rounded object-cover" />
                        <div>
                          <p className="font-semibold text-neutral-800">{i.name}</p>
                          <p className="text-[11px] text-neutral-400">{i.variation} x {i.quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold text-neutral-800">
                        ฿{(i.price * i.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-neutral-50 p-3 rounded-lg space-y-1 font-medium">
                <div className="flex justify-between text-neutral-600">
                  <span>ผู้ให้บริการจัดส่ง:</span>
                  <span>{selectedOrder.shippingCarrier}</span>
                </div>
                {selectedOrder.trackingNumber && (
                  <div className="flex justify-between text-neutral-600">
                    <span>เลขติดตามพัสดุ:</span>
                    <span className="font-mono text-[#ee4d2d]">{selectedOrder.trackingNumber}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-600">
                  <span>วิธีชำระเงิน:</span>
                  <span>{selectedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-neutral-900 font-bold pt-2 border-t border-neutral-200 text-sm">
                  <span>ยอดชำระสุทธิ:</span>
                  <span className="text-[#ee4d2d]">฿{selectedOrder.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-neutral-200">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold cursor-pointer"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
