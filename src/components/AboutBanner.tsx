"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";

interface EcosystemTab {
  id: string;
  title: string;
  description: string;
  image: string;
}

const ecosystemItems: EcosystemTab[] = [
  {
    id: "mac",
    title: "iPhone และ Mac",
    description:
      "การสะท้อนหน้าจอ iPhone ช่วยให้คุณดูหน้าจอ iPhone ได้บน Mac และยังควบคุมสิ่งที่อยู่บนหน้าจอได้โดยไม่ต้องหยิบโทรศัพท์เลย แถมคุณสมบัติความต่อเนื่องยังช่วยให้คุณรับสายหรือตอบกลับข้อความจาก Mac ของคุณได้โดยตรง แล้วยังสามารถคัดลอกรูปภาพ วิดีโอ หรือข้อความจาก iPhone แล้ววางลงในแอปอื่นบน Mac ยิ่งไปกว่านั้นคุณยังสามารถเข้าถึงไฟล์ของคุณจากอุปกรณ์ใดก็ได้ด้วย iCloud",
    image: "/images/apple-ecosystem.jpg",
  },
  {
    id: "watch",
    title: "iPhone และ Apple Watch",
    description:
      "ดูการแจ้งเตือน ควบคุมเพลง และติดตามเป้าหมายการออกกำลังกายของคุณได้ทันทีจากข้อมือ พร้อมการค้นหาตำแหน่ง iPhone ที่แม่นยำและการปลดล็อคที่ทำงานผสานกันอย่างไร้รอยต่อ",
    image: "/images/apple-ecosystem.jpg",
  },
  {
    id: "airpods",
    title: "iPhone และ AirPods",
    description:
      "สลับเสียงเพลง การโทร และการประชุมข้ามระหว่างอุปกรณ์ต่างๆ ได้โดยอัตโนมัติ พร้อมระบบตัดเสียงรบกวนแบบแอ็คทีฟและระบบเสียงตามตำแหน่งที่ปรับตามการเคลื่อนไหวของศีรษะ",
    image: "/images/apple-ecosystem.jpg",
  },
];

export default function AboutBanner() {
  const [activeTab, setActiveTab] = useState<string>("mac");

  const currentItem =
    ecosystemItems.find((item) => item.id === activeTab) || ecosystemItems[0];

  return (
    <section className="py-6 sm:py-10">
      {/* Title Header */}
      <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 mb-6 sm:mb-8">
        เกี่ยวกับเรา
      </h2>

      {/* Main Apple-style Card Container */}
      <div className="rounded-3xl bg-[#f5f5f7] border border-neutral-200/60 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Accordion / Tabs Column */}
          <div className="lg:col-span-5 flex flex-col divide-y divide-neutral-200">
            {ecosystemItems.map((item) => {
              const isOpen = activeTab === item.id;
              return (
                <div key={item.id} className="py-5 first:pt-0 last:pb-0">
                  <button
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className="w-full flex items-center justify-between text-left group cursor-pointer"
                  >
                    <span className="text-xl sm:text-2xl font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors">
                      {item.title}
                    </span>
                    <span className="text-neutral-500 ml-4">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-neutral-800" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-neutral-400 group-hover:text-neutral-700" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="mt-4 text-[15px] sm:text-base leading-relaxed text-neutral-600 font-normal animate-fadeIn">
                      <p>{item.description}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Showcase Image Column */}
          <div className="lg:col-span-7 flex items-center justify-center">
            <div className="relative w-full aspect-[4/3] max-w-[620px] rounded-2xl overflow-hidden shadow-md bg-white">
              <Image
                src={currentItem.image}
                alt={currentItem.title}
                fill
                sizes="(max-width: 1024px) 100vw, 620px"
                className="object-cover object-center transition-all duration-500 ease-out hover:scale-102"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
