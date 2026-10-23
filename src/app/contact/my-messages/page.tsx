"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Trash2, Mail, MessageSquare, Plus, Clock } from "lucide-react";
import { ContactMessage } from "@/app/api/contact/route";

export default function MyMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/contact");
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.messages)) {
          setMessages(data.messages);
        }
      }
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("คุณแน่ใจหรือไม่ว่าต้องการลบข้อความนี้?")) return;
    try {
      const res = await fetch(`/api/contact?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (err) {
      alert("เกิดข้อผิดพลาดในการลบข้อความ");
    }
  };

  const filteredMessages = messages.filter((m) => {
    const q = searchQuery.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.message.toLowerCase().includes(q) ||
      m.tag.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-[#8a5b14] transition mb-3"
        >
          <ArrowLeft className="w-4 h-4" /> กลับสู่หน้าแบบฟอร์มติดต่อ
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-[#8a5b14] mb-2 border border-amber-200/80">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>My Sent Messages</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              ข้อความที่ฉันส่งไว้ ({messages.length})
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              ดูรายการข้อความที่คุณเคยส่งถึงเรา พร้อมแก้ไขหรือลบข้อความได้ทันที
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 hover:bg-black px-4 py-2.5 text-xs font-bold text-white transition shadow-sm self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" /> ส่งข้อความใหม่
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-xs flex items-center gap-3">
        <Search className="text-neutral-400 text-lg pl-1 w-5 h-5" />
        <input
          type="text"
          placeholder="ค้นหาข้อความ, ชื่อ หรืออีเมลของคุณ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-sm font-medium text-neutral-800 placeholder-neutral-400 outline-none bg-transparent"
        />
      </div>

      {/* Messages List */}
      {isLoading ? (
        <div className="space-y-4">
          <div className="h-32 bg-neutral-100 animate-pulse rounded-2xl"></div>
          <div className="h-32 bg-neutral-100 animate-pulse rounded-2xl"></div>
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-neutral-200">
          <p className="text-neutral-500 text-sm">ไม่พบข้อความที่ส่งไว้</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMessages.map((msg) => (
            <div
              key={msg.id}
              className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-xs hover:border-[#c29015]/60 transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200/80">
                    🏷️ {msg.tag}
                  </span>
                  <span className="font-bold text-sm text-neutral-900">
                    {msg.name}
                  </span>
                  <span className="text-xs text-neutral-400 inline-flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" />
                    {msg.email}
                  </span>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <span className="text-[11px] text-neutral-400 inline-flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(msg.createdAt).toLocaleDateString("th-TH", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDelete(msg.id)}
                    className="p-1.5 text-neutral-400 hover:text-rose-600 transition rounded-lg hover:bg-rose-50 cursor-pointer"
                    title="ลบข้อความ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
