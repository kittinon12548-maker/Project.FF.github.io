import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h2 className="text-4xl font-bold tracking-tight text-neutral-900 mb-2">404</h2>
      <p className="text-neutral-600 mb-6">ไม่พบหน้าที่คุณต้องการ</p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-full bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-800 transition"
      >
        กลับหน้าแรก
      </Link>
    </div>
  );
}
