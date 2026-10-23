# 🌟 GANHOM Luxury Store & Blog Web Application

โครงงานเว็บไซต์อีคอมเมิร์ซสินค้าพรีเมียมและบล็อกส่วนตัว สำหรับรายวิชา **0214321 Web App Design & Development** พัฒนาตามโครงสร้างเว็บไซต์ต้นแบบ [GANHOM](https://ganhom-jydm.vercel.app/)

---

## 🚀 เทคโนโลยีที่ใช้ (Tech Stack)

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Fetching**: REST API & [JSONPlaceholder API](https://jsonplaceholder.typicode.com/)

---

## 🔐 ข้อมูลเข้าสู่ระบบหลังบ้าน (Admin Login)

สามารถเข้าสู่ระบบผ่านปุ่มรูปคนบนแถบเมนูด้านบน (Navbar) หรือเข้าผ่าน `/admin/login`
- **Email (อีเมล)**: `admin` (หรือ `admin@ganhom.com`)
- **Password (รหัสผ่าน)**: `123`
- **ระบบหลังบ้าน (Shopee Seller Centre)**: จะนำท่านเข้าสู่หน้า `/admin/products` ออกแบบตามหน้า **Shopee Seller Centre** สินค้าของฉัน โดยเริ่มต้นเป็นหน้าว่าง (Empty State: 0 รายการ) ตามโจทย์ พร้อมปุ่ม **+ เพิ่มสินค้าใหม่** เพื่อเพิ่มสินค้าลงในระบบได้ทันที

---

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```text
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── admin/
│   │   │   │   └── products/
│   │   │   │       └── route.ts         # API ให้ข้อมูลสินค้าทั้งหมด 14 รายการ
│   │   │   └── contact/
│   │   │       └── route.ts             # API รับ/ส่ง/ลบ ข้อความติดต่อ
│   │   ├── about/
│   │   │   └── page.tsx                 # หน้าเกี่ยวกับฉัน (สาขาวิชา, วิชาที่ชอบ, เป้าหมาย)
│   │   ├── contact/
│   │   │   ├── page.tsx                 # หน้าแบบฟอร์มติดต่อเรา พร้อมตรวจสอบโดเมนอีเมล
│   │   │   └── my-messages/
│   │   │       └── page.tsx             # หน้ารายการข้อความที่ส่งไว้ พร้อมฟังก์ชันค้นหาและลบ
│   │   ├── how-to-order/
│   │   │   └── page.tsx                 # หน้าขั้นตอนการสั่งซื้อ 4 ขั้นตอนและช่องทางชำระเงิน
│   │   ├── posts/
│   │   │   ├── page.tsx                 # หน้ารวมบทความบล็อก (ดึงข้อมูลจาก API 10 รายการ)
│   │   │   └── [id]/
│   │   │       └── page.tsx             # หน้ารายละเอียดบทความ พร้อมระบบกด Like และแสดงความคิดเห็น
│   │   ├── products/
│   │   │   └── page.tsx                 # หน้ารวมสินค้า คัดกรองตามหมวดหมู่ ค้นหา และจัดเรียง
│   │   ├── globals.css                  # สไตล์รวมและแอนิเมชัน
│   │   ├── layout.tsx                   # โครงสร้าง Layout หลัก (Header Navbar + Footer)
│   │   └── page.tsx                     # หน้าแรก (Home)
│   ├── components/
│   │   ├── Navbar.tsx                   # แถบเมนูด้านบนสุดสไตล์ลักชัวรีสีทอง พร้อมโมดอลและเมนู
│   │   ├── Footer.tsx                   # ส่วนท้ายเว็บไซต์ระบุข้อมูลรายวิชาและผู้พัฒนา
│   │   ├── HeroSlider.tsx               # สไลเดอร์แบนเนอร์อัตโนมัติพร้อมแถบความคืบหน้า
│   │   ├── FeaturedProducts.tsx         # แท็บแสดงสินค้าใหม่และสินค้าตอบโจทย์ไลฟ์สไตล์
│   │   ├── LatestPosts.tsx              # การ์ดแสดงบทความบล็อคล่าสุด 3 รายการ
│   │   └── AboutBanner.tsx              # แบนเนอร์ขอบคุณและปุ่มเชื่อมไปยังหน้าเกี่ยวกับฉัน
│   └── data/
│       └── mockData.ts                  # ข้อมูลสินค้าและสไลด์แบนเนอร์เริ่มต้น
├── package.json
├── tsconfig.json
├── postcss.config.mjs
└── next.config.ts
```

---

## 💻 วิธีการรันโปรเจกต์ (Getting Started)

### 1. ติดตั้ง Dependencies
```bash
npm install
```

### 2. รันโหมด Development
```bash
npm run dev
```
เปิดเบราว์เซอร์แล้วเข้าสู่ [http://localhost:3000](http://localhost:3000)

### 3. ตรวจสอบ Build สำหรับ Production
```bash
npm run build
npm start
```

---

## ✨ ไฮไลท์และฟีเจอร์เด่น (Key Features)

1. **Luxury Navigation Header**:
   - แถบสีทองไล่เฉด `bg-gradient-to-r from-[#b38728] via-[#f3d07a] to-[#996515]`
   - โลโก้ GANHOM สีทองเมทัลลิก
   - ปุ่มค้นหาแบบ Overlay, เมนูล็อกอินโมดอล, สลับภาษา TH/EN, และไอคอนตะกร้าสินค้า
   - เส้นเมนูขีดเส้นใต้แบบ Interactive Underline Animation เมื่อวางเมาส์หรืออยู่ในหน้านั้นๆ

2. **หน้าแรก (Home)**:
   - Hero Slider พร้อมตัวจับเวลาแถบสีส้มวิ่งอัตโนมัติ และปุ่ม Pause/Play
   - แท็บสลับสินค้าแนะนำ "สินค้าใหม่" และ "ตอบโจทย์ทุกไลฟ์สไตล์"
   - รายการบทความบล็อกล่าสุดพร้อมลิงก์ไปยังหน้ารายละเอียด
   - แบนเนอร์ "ขอบคุณที่เข้ามาเยี่ยมชม My Blog 👋"

3. **หน้าเกี่ยวกับฉัน (About Me)**:
   - สาขาวิชา: วิทยาการคอมพิวเตอร์ (มหาวิทยาลัยทักษิณ)
   - รายวิชาที่ชอบ: ภาษาอังกฤษเพื่อการสื่อสาร 1
   - เป้าหมาย: ว่างงานแต่รวย

4. **หน้ารวมสินค้า (Products)**:
   - กรองหมวดหมู่: ทั้งหมด, Fragrance Oils, Essential Oils, Candle Supplies, Soap Making, Accessories
   - ค้นหาแบบเรียลไทม์ และจัดเรียงตามราคา (ต่ำ → สูง / สูง → ต่ำ)
   - โมดอล Quick View แสดงข้อมูลสินค้าและปุ่มหยิบใส่ตะกร้า

5. **หน้าระบบบทความ (Blog Posts & Comments)**:
   - ดึงข้อมูลจาก API บทความ 10 รายการ
   - หน้ารายละเอียดแต่ละบทความ (`/posts/[id]`) มีปุ่มกดถูกใจ (Likes) และกล่องแสดงความคิดเห็น

6. **หน้าคู่มือการสั่งซื้อ (How to Order)**:
   - อธิบาย 4 ขั้นตอนการสั่งซื้อด้วยการ์ดไอคอน
   - บัญชีกสิกรไทย (KBANK) และ พร้อมเพย์ (PromptPay) พร้อมปุ่มคลิกคัดลอกเลขบัญชีอัตโนมัติ

7. **หน้าระบบติดต่อเรา (Contact Us & My Messages)**:
   - แบบฟอร์มติดต่อพร้อมระบบตรวจสอบโดเมนอีเมล รองรับเฉพาะ `@tsu.ac.th` และ `@gmail.com`
   - หน้าดูประวัติข้อความที่เคยส่งไว้ (`/contact/my-messages`) พร้อมค้นหาและปุ่มลบข้อความ
