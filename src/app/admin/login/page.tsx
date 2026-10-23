"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShoppingBag, ArrowLeft, ShieldCheck, Key } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const emailTrim = email.toLowerCase().trim();
    const isEmailAdmin =
      emailTrim === "admin" ||
      emailTrim === "admin@ganhom.com" ||
      emailTrim === "admin@gmail.com" ||
      emailTrim === "admin@tsu.ac.th";

    if (isEmailAdmin && password === "123") {
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("userEmail", "admin");
      router.push("/admin/products");
    } else {
      setError("อีเมลหรือรหัสผ่านแอดมินไม่ถูกต้อง (ใช้ email: admin, password: 123)");
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-neutral-200 p-8 shadow-lg space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#ee4d2d] mx-auto flex items-center justify-center text-white shadow-md">
            <ShoppingBag className="w-8 h-8 fill-white text-white" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 pt-2">
            Shopee Seller Centre
          </h1>
          <p className="text-xs text-neutral-500">
            ระบบจัดการหลังบ้านร้านค้า GANHOM Official Store
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block font-bold text-neutral-700 mb-1">
              อีเมลผู้ดูแลระบบ (Admin Email)
            </label>
            <input
              type="text"
              placeholder="admin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-neutral-300 rounded-xl p-3 focus:outline-none focus:border-[#ee4d2d]"
            />
          </div>

          <div>
            <label className="block font-bold text-neutral-700 mb-1">
              รหัสผ่าน (Password)
            </label>
            <input
              type="password"
              placeholder="123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-neutral-300 rounded-xl p-3 focus:outline-none focus:border-[#ee4d2d]"
            />
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900">
            <p className="font-bold flex items-center gap-1">
              <Key className="w-3.5 h-3.5" /> ข้อมูลเข้าสู่ระบบทดสอบ:
            </p>
            <p className="mt-0.5">
              อีเมล: <code className="font-bold font-mono">admin</code> | รหัสผ่าน: <code className="font-bold font-mono">123</code>
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#ee4d2d] hover:bg-[#d73211] text-white font-bold transition shadow-md cursor-pointer"
          >
            เข้าสู่ระบบหลังบ้าน
          </button>
        </form>

        <div className="text-center pt-2 border-t border-neutral-100">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-[#ee4d2d] font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> กลับสู่หน้าแรก GANHOM
          </Link>
        </div>
      </div>
    </div>
  );
}
