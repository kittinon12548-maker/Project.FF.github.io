"use client";

import React, { useRef } from "react";
import {
  Truck,
  ShieldCheck,
  MessageCircle,
  Sparkles,
  Gift,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* ─── Top service cards ─── */
interface ServiceCard {
  id: string;
  label: string;
  title: string;
  description: string;
  imageUrl: string;
}

const serviceCards: ServiceCard[] = [
  {
    id: "consult",
    label: "GANHOM SPECIALIST",
    title: "ช็อปแบบตัวต่อตัวกับ\nผู้เชี่ยวชาญเรื่องกลิ่นหอม",
    description:
      "ปรึกษาทีมผู้เชี่ยวชาญของเรา เพื่อค้นหากลิ่นหอมที่ตรงใจคุณ ทั้งออนไลน์และทางโทรศัพท์",
    imageUrl:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "workshop",
    label: "GANHOM WORKSHOP",
    title: "เข้าร่วมเวิร์กช็อปฟรีที่\nGANHOM Studio",
    description:
      "เรียนรู้ศิลปะการผสมกลิ่นหอมและทำเทียนหอม สบู่ น้ำหอมเฉพาะตัว กับผู้เชี่ยวชาญของเรา",
    imageUrl:
      "https://images.unsplash.com/photo-1596211091592-b87e0a2d6480?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "customize",
    label: "CUSTOM BLENDING",
    title: "สร้างกลิ่นหอมเฉพาะตัว\nด้วยหัวเชื้อกว่า 200 กลิ่น",
    description:
      "ให้ทีมของเราช่วยคุณออกแบบกลิ่นหอมที่ไม่ซ้ำใคร ตามสไตล์และบุคลิกภาพของคุณ",
    imageUrl:
      "https://images.unsplash.com/photo-1616949755610-8c9b31f5f126?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "support",
    label: "AFTER SALES",
    title: "รับบริการและความช่วยเหลือ\nจากผู้เชี่ยวชาญ GANHOM",
    description:
      "ไม่ว่าจะเป็นคำถามเรื่องการใช้งาน หรือต้องการปรับสูตรกลิ่นใหม่ เราพร้อมให้คำปรึกษา",
    imageUrl:
      "https://images.unsplash.com/photo-1607006314644-88f58b7aeb88?w=600&auto=format&fit=crop&q=80",
  },
];

/* ─── Bottom benefit items ─── */
interface BenefitItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  titleHighlight: string;
  subtitle?: string;
}

const benefitItems: BenefitItem[] = [
  {
    id: "trade-in",
    icon: <Truck className="w-7 h-7 text-[#8a5b14]" strokeWidth={1.5} />,
    title: "นำขวดเปล่าของคุณมา\nแลก ",
    titleHighlight: "เพื่อรับเครดิต\nสำหรับใช้ซื้อครั้งใหม่°",
  },
  {
    id: "installment",
    icon: <ShieldCheck className="w-7 h-7 text-[#8a5b14]" strokeWidth={1.5} />,
    title: "จ่ายดอกเบี้ย 0% นานสุด\n",
    titleHighlight: "10 เดือน⁴",
  },
  {
    id: "engraving",
    icon: <Sparkles className="w-7 h-7 text-[#8a5b14]" strokeWidth={1.5} />,
    title: "เพิ่มความพิเศษ ",
    titleHighlight: "ด้วย\nการสลักอิโมจิ ชื่อ และ\nตัวเลขที่นำมาผสมกัน\nได้ฟรี",
  },
  {
    id: "free-delivery",
    icon: <Gift className="w-7 h-7 text-[#8a5b14]" strokeWidth={1.5} />,
    title: "รับบริการจัดส่งฟรี หรือ\nโปรรับสินค้าที่มีพร้อม\n",
    titleHighlight: "จำหน่ายที่ GANHOM Store.",
  },
  {
    id: "experience",
    icon: <MessageCircle className="w-7 h-7 text-[#8a5b14]" strokeWidth={1.5} />,
    title: "สัมผัสประสบการณ์ ",
    titleHighlight: "การ\nเลือกซื้อที่ปรับมาให้เป็น\nคุณ",
    subtitle: "ใน แอป GANHOM Store",
  },
  {
    id: "personalize",
    icon: <RefreshCw className="w-7 h-7 text-[#8a5b14]" strokeWidth={1.5} />,
    title: "ปรับแต่งกลิ่นหอมของคุณ\nและสร้างสรรค์สไตล์\n",
    titleHighlight: "GANHOM ของคุณ\nเอง",
  },
];

/* ─── Component ─── */
export default function ServiceHighlights() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 340;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full bg-[#f5f5f7] border-t border-neutral-200/60 py-10 sm:py-14 md:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-10 sm:space-y-12">
        {/* ──────────── Top: Service Carousel ──────────── */}
        <div>
          <h2 className="text-2xl sm:text-[28px] font-semibold tracking-tight text-neutral-900">
            ความช่วยเหลืออยู่ที่นี่
          </h2>
          <p className="mt-0.5 text-base sm:text-lg text-neutral-400 font-normal">
            ไม่ว่าเมื่อไหร่หรือแบบไหนที่คุณต้องการ
          </p>

          {/* Carousel wrapper */}
          <div className="relative mt-5 sm:mt-6">
            {/* Scroll buttons */}
            <button
              type="button"
              onClick={() => scroll("left")}
              className="hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 items-center justify-center rounded-full bg-white/80 border border-neutral-200/80 shadow-sm hover:bg-white hover:shadow-md transition-all cursor-pointer backdrop-blur-sm"
              aria-label="เลื่อนซ้าย"
            >
              <ChevronLeft className="w-4 h-4 text-neutral-600" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 items-center justify-center rounded-full bg-white/80 border border-neutral-200/80 shadow-sm hover:bg-white hover:shadow-md transition-all cursor-pointer backdrop-blur-sm"
              aria-label="เลื่อนขวา"
            >
              <ChevronRight className="w-4 h-4 text-neutral-600" />
            </button>

            {/* Cards scroller */}
            <div
              ref={scrollRef}
              className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-2 snap-x snap-mandatory -mx-1 px-1"
            >
              {serviceCards.map((card) => (
                <div
                  key={card.id}
                  className="group snap-start flex-shrink-0 w-[260px] sm:w-[280px] rounded-2xl bg-white border border-neutral-200/70 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg cursor-default"
                >
                  {/* Text content */}
                  <div className="p-5 pb-3 flex-shrink-0">
                    <span className="text-[10px] font-semibold tracking-wider text-neutral-400 uppercase leading-none">
                      {card.label}
                    </span>
                    <h3 className="mt-2.5 text-[17px] sm:text-lg font-bold text-neutral-900 leading-[1.3] whitespace-pre-line">
                      {card.title}
                    </h3>
                    <p className="mt-1.5 text-[12px] sm:text-[13px] text-neutral-400 leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  {/* Image area */}
                  <div className="relative w-full flex-1 min-h-[180px] sm:min-h-[200px] overflow-hidden mt-auto">
                    <img
                      src={card.imageUrl}
                      alt={card.label}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ──────────── Divider ──────────── */}
        <hr className="border-neutral-200/80" />

        {/* ──────────── Bottom: Benefits Grid ──────────── */}
        <div>
          <h3 className="text-xl sm:text-[22px] font-semibold tracking-tight text-neutral-900">
            ความแตกต่างของ GANHOM Store
            <span className="ml-1 text-neutral-400 font-normal text-base sm:text-lg">
              อีกหลายเหตุผลในการเลือกซื้อกับเรา
            </span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-5 sm:mt-6">
            {benefitItems.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl bg-white border border-neutral-200/70 p-4 sm:p-5 flex flex-col gap-3 transition-all duration-200 hover:shadow-sm cursor-default min-h-[140px]"
              >
                {/* Icon */}
                <div className="flex-shrink-0">{item.icon}</div>

                {/* Text */}
                <p className="text-[13px] sm:text-sm font-semibold text-neutral-900 leading-[1.45] whitespace-pre-line">
                  {item.title}
                  <span className="text-[#8a5b14] font-bold">
                    {item.titleHighlight}
                  </span>
                </p>
                {item.subtitle && (
                  <p className="text-[11px] sm:text-xs text-neutral-400 leading-snug">
                    {item.subtitle}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
