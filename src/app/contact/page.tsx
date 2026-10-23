"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Zap, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tag, setTag] = useState("General");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const emailLower = email.toLowerCase().trim();
  const isValidEmailDomain =
    emailLower.endsWith("@tsu.ac.th") || emailLower.endsWith("@gmail.com");
  const isFormValid =
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    message.trim().length > 0 &&
    isValidEmailDomain;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, tag, message }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg("ส่งข้อความติดต่อเรียบร้อยแล้ว! เจ้าหน้าที่จะติดต่อกลับโดยเร็ว");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setErrorMsg(data.error || "ไม่สามารถส่งข้อความได้ กรุณาลองใหม่อีกครั้ง");
      }
    } catch (err) {
      setErrorMsg("เกิดข้อผิดพลาดในการเชื่อมต่อเครือข่าย");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 mb-3 border border-blue-100">
            <span>📞 Contact Us</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            ติดต่อเรา
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            ส่งข้อความถึงเรา หรือสอบถามข้อมูลเพิ่มเติมได้ที่นี่
          </p>
        </div>
        <Link
          href="/contact/my-messages"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 px-4 py-2.5 text-xs font-bold text-white transition shadow-sm self-start sm:self-auto cursor-pointer"
        >
          📮 ดูข้อความที่ฉันส่งไว้ →
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Left Column: Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white shadow-xl shadow-blue-500/10">
            <h2 className="text-xl font-bold mb-2">ช่องทางการติดต่อ 💬</h2>
            <p className="text-xs text-blue-100 mb-6 leading-relaxed">
              ยินดีต้อนรับ! สามารถส่งข้อความคำถาม ข้อเสนอแนะ หรือข้อติชมถึงเราได้ตลอด 24 ชั่วโมง
            </p>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3 bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                <span className="text-xl">
                  <Mail className="w-5 h-5 text-white" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-blue-200 uppercase tracking-wider">
                    อีเมลที่รองรับ
                  </p>
                  <p className="font-medium text-white text-xs mt-0.5">
                    เฉพาะ @tsu.ac.th และ @gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                <span className="text-xl">
                  <Zap className="w-5 h-5 text-white" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-blue-200 uppercase tracking-wider">
                    ระยะเวลาตอบกลับ
                  </p>
                  <p className="font-medium text-white text-xs mt-0.5">
                    ตอบกลับภายใน 24 ชั่วโมง
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                <span className="text-xl">
                  <MapPin className="w-5 h-5 text-white" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-blue-200 uppercase tracking-wider">
                    สถานที่
                  </p>
                  <p className="font-medium text-white text-xs mt-0.5">
                    มหาวิทยาลัยทักษิณ (TSU)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4">
            <p className="text-xs font-semibold text-blue-700">💡 คำแนะนำ:</p>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              โปรดตรวจสอบว่าใส่อีเมลถูกต้อง เพื่อให้แอดมินสามารถตอบกลับข้อความของท่านไปยังอีเมลดังกล่าวได้
            </p>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100">
            ส่งข้อความติดต่อ
          </h2>

          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 max-w-full">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                ชื่อ-นามสกุล
              </label>
              <input
                placeholder="กรอกชื่อของคุณ"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border border-slate-200 p-3 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-50/50 text-sm"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-bold text-slate-700">
                  อีเมลติดต่อ
                </label>
                {email.length > 0 && !isValidEmailDomain && (
                  <span className="text-[11px] text-rose-500 font-semibold">
                    * ต้องลงท้ายด้วย @tsu.ac.th หรือ @gmail.com
                  </span>
                )}
              </div>
              <input
                type="email"
                placeholder="ตัวอย่าง: name@tsu.ac.th หรือ name@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`border p-3 w-full rounded-xl focus:outline-none focus:ring-2 transition-all text-sm bg-slate-50/50 ${
                  email.length > 0 && !isValidEmailDomain
                    ? "border-rose-400 focus:ring-rose-400"
                    : "border-slate-200 focus:ring-blue-500 focus:border-transparent"
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                หมวดหมู่ข้อความ (Tag)
              </label>
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="border border-slate-200 p-3 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-50/50 text-sm font-medium text-slate-800"
              >
                <option value="General">🏷️ ทั่วไป (General)</option>
                <option value="Question">❓ สอบถามข้อมูล (Question)</option>
                <option value="Feedback">💬 ข้อเสนอแนะ (Feedback)</option>
                <option value="Support">🛠️ ช่วยเหลือ (Support)</option>
                <option value="Bug">🐛 รายงานปัญหา (Bug)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                ข้อความที่ต้องการส่ง
              </label>
              <textarea
                placeholder="รายละเอียดข้อความที่ต้องการติดต่อ..."
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="border border-slate-200 p-3 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-50/50 text-sm"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`w-full py-3 px-5 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                isFormValid && !isSubmitting
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
              }`}
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? "กำลังส่งข้อความ..." : "🚀 ส่งข้อความติดต่อ"}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
