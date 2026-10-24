export interface Product {
  id: string;
  title: string;
  description: string;
  media: string[];
  category: string;
  price: number;
  compareAtPrice: number;
  quantity: number;
  sku: string;
  status: string;
  tags: string[];
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "PROD-FO-001",
    title: "Madagascar Vanilla Fragrance Oil",
    description: "น้ำหอมกลิ่นวานิลลามาดากัสการ์ หอมหวานละมุนละไม เหมาะสำหรับนำไปผสมทำเทียนหอม สบู่ และผลิตภัณฑ์บำรุงผิว กลิ่นหอมติดทนนาน คัดสรรวัตถุดิบคุณภาพเกรดพรีเมียมจากยุโรป",
    media: ["https://images.unsplash.com/photo-1608500218890-c4f86641bc34?w=800&auto=format&fit=crop&q=80"],
    category: "Fragrance Oils",
    price: 450,
    compareAtPrice: 590,
    quantity: 150,
    sku: "FO-VAN-001",
    status: "active",
    tags: ["vanilla", "fragrance oil", "candle making", "soap making"]
  },
  {
    id: "PROD-FO-002",
    title: "Fresh Coffee Roasted Fragrance Oil",
    description: "กลิ่นหอมอบอวลของเมล็ดกาแฟคั่วบดสดใหม่ ให้ความรู้สึกสดชื่นกระปรี้กระเปร่าและอบอุ่นในทุกช่วงเวลา",
    media: ["https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80"],
    category: "Fragrance Oils",
    price: 420,
    compareAtPrice: 550,
    quantity: 120,
    sku: "FO-COF-002",
    status: "active",
    tags: ["coffee", "bakery", "relax"]
  },
  {
    id: "PROD-FO-003",
    title: "Sea Salt & Orchid Fragrance Oil",
    description: "สัมผัสกลิ่นอายความสดชื่นริมชายหาดผสานความหอมละมุนของดอกกล้วยไม้สีขาว ดอกลิลลี่ และเกลือทะเลธรรมชาติ",
    media: ["https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=800&auto=format&fit=crop&q=80"],
    category: "Fragrance Oils",
    price: 490,
    compareAtPrice: 620,
    quantity: 95,
    sku: "FO-SEA-003",
    status: "active",
    tags: ["sea salt", "floral", "fresh"]
  },
  {
    id: "PROD-FO-004",
    title: "Pumpkin Spice & Cinnamon Fragrance Oil",
    description: "กลิ่นหอมของพายฟักทองอบใหม่ผสมผสานกลิ่นเครื่องเทศซินนามอนและจันทน์เทศ ให้ความรู้สึกอบอุ่นในฤดูหนาว",
    media: ["https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80"],
    category: "Fragrance Oils",
    price: 450,
    compareAtPrice: 590,
    quantity: 80,
    sku: "FO-PUM-004",
    status: "active",
    tags: ["spice", "cinnamon", "autumn"]
  },
  {
    id: "PROD-FO-005",
    title: "French Lavender Fields Fragrance Oil",
    description: "กลิ่นดอกลาเวนเดอร์แท้จากแคว้นโพรวองซ์ ประเทศฝรั่งเศส ช่วยคลายความเครียด หลับสบาย และสร้างความผ่อนคลาย",
    media: ["https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?w=800&auto=format&fit=crop&q=80"],
    category: "Essential Oils",
    price: 480,
    compareAtPrice: 600,
    quantity: 110,
    sku: "FO-LAV-005",
    status: "active",
    tags: ["lavender", "relax", "sleep"]
  },
  {
    id: "PROD-FO-006",
    title: "Lemon & Green Tea Fragrance Oil",
    description: "ความหอมสดชื่นจากผลเลมอนสดและใบชาเขียวธรรมชาติ สัมผัสความกระปรี้กระเปร่า สะอาด สดใส",
    media: ["https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80"],
    category: "Essential Oils",
    price: 430,
    compareAtPrice: 550,
    quantity: 130,
    sku: "FO-LEM-006",
    status: "active",
    tags: ["lemon", "tea", "fresh"]
  },
  {
    id: "PROD-AG-001",
    title: "Initio Parfums Prives - Oud for Greatness",
    description: "น้ำหอมระดับนิชสุดหรูหรา ด้วยกลิ่นกฤษณาแท้ทรงพลัง ผสมผสานเครื่องเทศลาเวนเดอร์และแซฟฟรอน เผยเสน่ห์ดึงดูดระดับมาสเตอร์พีซ",
    media: ["https://www.latifperfumes.com/_next/static/media/agarwoodfront.86510e2b.jpg"],
    category: "Fragrance Oils",
    price: 14500,
    compareAtPrice: 16900,
    quantity: 15,
    sku: "OUD-INI-001",
    status: "active",
    tags: ["luxury", "oud", "perfume"]
  },
  {
    id: "PROD-AG-002",
    title: "Tom Ford - Oud Wood Eau De Parfum",
    description: "หนึ่งในน้ำหอมกลิ่นไม้กฤษณาที่โด่งดังที่สุดในโลก ให้ความลุ่มลึก อบอุ่น และเปี่ยมด้วยรสนิยมอันสง่างาม",
    media: ["https://www.central.co.th/e-shopping/wp-content/uploads/2020/12/TOM-FORD-BEAUTY-OUD.jpg"],
    category: "Fragrance Oils",
    price: 15000,
    compareAtPrice: 17500,
    quantity: 20,
    sku: "OUD-TF-002",
    status: "active",
    tags: ["luxury", "tom ford", "woody"]
  },
  {
    id: "PROD-AG-003",
    title: "Soy Wax Flakes 100% Pure Natural",
    description: "ไขถั่วเหลืองธรรมชาติแท้ 100% เกรดพรีเมียม จุดสะอาด ควันน้อย ยึดเกาะเนื้อแก้วได้ดีเยี่ยม ปลอดภัยไร้สารพิษ",
    media: ["https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&auto=format&fit=crop&q=80"],
    category: "Candle Supplies",
    price: 320,
    compareAtPrice: 390,
    quantity: 200,
    sku: "CS-SOY-001",
    status: "active",
    tags: ["wax", "candle making", "soy wax"]
  },
  {
    id: "PROD-AG-004",
    title: "Organic Melt & Pour Soap Base (Clear/White)",
    description: "เบสสบู่กลีเซอรีนเกรดออร์แกนิค ฟองนุ่ม ฟองละเอียด ให้ความชุ่มชื้นสูง ปราศจากสาร SLS/SLES",
    media: ["https://images.unsplash.com/photo-1607006314644-88f58b7aeb88?w=800&auto=format&fit=crop&q=80"],
    category: "Soap Making",
    price: 250,
    compareAtPrice: 320,
    quantity: 180,
    sku: "SM-BASE-001",
    status: "active",
    tags: ["soap base", "organic", "glycerin"]
  },
  {
    id: "PROD-AG-005",
    title: "Luxury Amber Candle Glass Jar 200ml with Wooden Lid",
    description: "แก้วเทียนหอมสีชาหนาพิเศษ พร้อมฝาไม้ธรรมชาติ ช่วยเก็บกักกลิ่นหอมและป้องกันฝุ่น เพิ่มความพรีเมียมให้ผลงาน",
    media: ["https://images.unsplash.com/photo-1596433809252-260c2745dfdd?w=800&auto=format&fit=crop&q=80"],
    category: "Accessories",
    price: 120,
    compareAtPrice: 160,
    quantity: 300,
    sku: "ACC-JAR-001",
    status: "active",
    tags: ["jar", "candle glass", "accessories"]
  }
];

export interface HeroSlide {
  id: string | number;
  title: string;
  genre: string;
  tagline: string;
  subtitle?: string;
  imageUrl: string;
  titleLogoUrl?: string;
  primaryBtnText: string;
  primaryBtnHref: string;
  secondaryBtnText?: string;
  secondaryBtnHref?: string;
  brand?: "apple" | "ganhom";
}

export const INITIAL_HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    title: "The Family Plan 2",
    genre: "ตลกเบาสมอง",
    tagline: "ครอบครัวเดิม เพิ่มเติมคือแผนใหม่",
    subtitle: "ครอบครัวเดิม เพิ่มเติมคือแผนใหม่",
    imageUrl: "https://is1-ssl.mzstatic.com/image/thumb/8rF8s5lmPuF1fmRHAMrzKQ/1960x1044sr.jpg",
    primaryBtnText: "สตรีมเลย",
    primaryBtnHref: "https://tv.apple.com/th/movie/the-family-plan-2/umc.cmc.1wj0ab94s7t1wy7sqv5dt6bfy",
    brand: "apple"
  },
  {
    id: 2,
    title: "Pluribus",
    genre: "ดราม่า",
    tagline: "เมื่อความสุขคือสภาวะเดียวของจิตใจ",
    subtitle: "เมื่อความสุขคือสภาวะเดียวของจิตใจ",
    imageUrl: "https://is1-ssl.mzstatic.com/image/thumb/S9dLxU_nCvhomqGnI3-d_g/1960x1044sr.jpg",
    primaryBtnText: "สตรีมเลย",
    primaryBtnHref: "https://tv.apple.com/th/show/pluribus/umc.cmc.37axgovs2yozlyh3c2cmwzlza",
    brand: "apple"
  },
  {
    id: 3,
    title: "Down Cemetery Road",
    genre: "ระทึกขวัญ",
    tagline: "คำตอบที่ค้นหาอาจมาพร้อมภัยที่ไม่คาดคิด",
    subtitle: "คำตอบที่ค้นหาอาจมาพร้อมภัยที่ไม่คาดคิด",
    imageUrl: "https://is1-ssl.mzstatic.com/image/thumb/1A5UrdlUF6-zEu5cfQvZag/1960x1044sr.jpg",
    primaryBtnText: "สตรีมเลย",
    primaryBtnHref: "https://tv.apple.com/th/show/down-cemetery-road/umc.cmc.3i55uxosnfpzw7rw1q525iksh",
    brand: "apple"
  },
  {
    id: 4,
    title: "Slow Horses",
    genre: "ระทึกขวัญ",
    tagline: "เหล่าสายลับสุดแสบของ MI5 กลับมาแล้วและกำลังตกเป็นเป้า",
    subtitle: "เหล่าสายลับสุดแสบของ MI5 กลับมาแล้วและกำลังตกเป็นเป้า",
    imageUrl: "https://is1-ssl.mzstatic.com/image/thumb/x5JjmiSD75wN12-HmmZRcg/1960x1044sr.jpg",
    primaryBtnText: "สตรีมเลย",
    primaryBtnHref: "https://tv.apple.com/th/show/slow-horses/umc.cmc.2szz3fdt71tl1ulnbp8utgq5o",
    brand: "apple"
  },
  {
    id: 5,
    title: "Knife Edge: Chasing Michelin Stars",
    genre: "สารคดี",
    tagline: "เพราะวัตถุดิบหลักคือแพสชัน",
    subtitle: "เพราะวัตถุดิบหลักคือแพสชัน",
    imageUrl: "https://is1-ssl.mzstatic.com/image/thumb/NYVrbe6J5p8oSnrx8VoJUA/1960x1044sr.jpg",
    primaryBtnText: "สตรีมเลย",
    primaryBtnHref: "https://tv.apple.com/th/show/knife-edge-chasing-michelin-stars/umc.cmc.2yhce9h11ctctdi23b29k1ek3",
    brand: "apple"
  },
  {
    id: 6,
    title: "The Last Frontier",
    genre: "แอ็กชัน",
    tagline: "ดินแดนนี้ไม่มีที่ให้ซ่อน",
    subtitle: "ดินแดนนี้ไม่มีที่ให้ซ่อน",
    imageUrl: "https://is1-ssl.mzstatic.com/image/thumb/O8r6H31q_AdlrDbNhGhkAg/1960x1044sr.jpg",
    primaryBtnText: "สตรีมเลย",
    primaryBtnHref: "https://tv.apple.com/th/show/the-last-frontier/umc.cmc.6kmzwhcm9cj30piuuiymr4u7m",
    brand: "apple"
  },
  {
    id: 7,
    title: "The Morning Show",
    genre: "ดราม่า",
    tagline: "ไม่มีข่าวไหนใหญ่กว่าความจริง",
    subtitle: "ไม่มีข่าวไหนใหญ่กว่าความจริง",
    imageUrl: "https://is1-ssl.mzstatic.com/image/thumb/EvRDcABkXaaZtPZhuzqbkA/1960x1044sr.jpg",
    primaryBtnText: "สตรีมเลย",
    primaryBtnHref: "https://tv.apple.com/th/show/the-morning-show/umc.cmc.25tn3v8ku4b39tr6ccgb8nl6m",
    brand: "apple"
  },
  {
    id: 8,
    title: "The Lost Bus",
    genre: "ระทึกขวัญ",
    tagline: "แรงบันดาลใจจากเรื่องจริงสุดระทึกที่มีชีวิตเป็นเดิมพัน",
    subtitle: "แรงบันดาลใจจากเรื่องจริงสุดระทึกที่มีชีวิตเป็นเดิมพัน",
    imageUrl: "https://is1-ssl.mzstatic.com/image/thumb/HNwryvUxII-66e0CC_HPQg/1960x1044sr.jpg",
    primaryBtnText: "สตรีมเลย",
    primaryBtnHref: "https://tv.apple.com/th/movie/the-lost-bus/umc.cmc.4p7gv4trt1rt0kuiwzmitibiv",
    brand: "apple"
  },
  {
    id: 9,
    title: "Chief of War",
    genre: "ดราม่า",
    tagline: "นักรบผู้น่าเกรงขามเริ่มต้นภารกิจครั้งประวัติศาสตร์เพื่อรวมผู้คนของเขาให้เป็นหนึ่งเดียว",
    subtitle: "นักรบผู้น่าเกรงขามเริ่มต้นภารกิจครั้งประวัติศาสตร์เพื่อรวมผู้คนของเขาให้เป็นหนึ่งเดียว",
    imageUrl: "https://is1-ssl.mzstatic.com/image/thumb/YL1VpLwWejCAxTI1wFdgYg/1960x1044sr.jpg",
    primaryBtnText: "สตรีมเลย",
    primaryBtnHref: "https://tv.apple.com/th/show/chief-of-war/umc.cmc.6ag0zq020ielwv7m83v8r4dkw",
    brand: "apple"
  }
];
