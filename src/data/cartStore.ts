export interface CartItem {
  id: string;
  name: string;
  variation: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: "cart-1",
    name: "สารกระตุ้นเรซิ่นไม้กฤษณา กานหอม พรีเมียม",
    variation: "ขนาด 3 ลิตร (3L)",
    price: 950,
    quantity: 1,
    imageUrl: "https://images.unsplash.com/photo-1608500218890-c4f86641bc34?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "cart-2",
    name: "น้ำหอมกฤษณาแท้ CHUN Eau De Parfum Force Vive",
    variation: "ขวดแก้วหรูหรา 50 ml",
    price: 1890,
    quantity: 1,
    imageUrl: "https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "cart-3",
    name: "ชุดถุงให้สารกระตุ้นต้นไม้พร้อมสาย",
    variation: "ความจุ 1,000 ml",
    price: 320,
    quantity: 2,
    imageUrl: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=400&auto=format&fit=crop&q=80",
  },
];

const CART_STORAGE_KEY = "ganhom_cart_items";

export function getCartItems(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
    // Only initialize mock items on the very first visit
    const isInitialized = localStorage.getItem("ganhom_cart_initialized");
    if (!isInitialized) {
      localStorage.setItem("ganhom_cart_initialized", "true");
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(INITIAL_CART_ITEMS));
      return INITIAL_CART_ITEMS;
    }
    return [];
  } catch (err) {
    console.error("Failed to read cart items from localStorage:", err);
    return [];
  }
}

export function saveCartItems(items: CartItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("cartUpdated"));
  } catch (err) {
    console.error("Failed to save cart items to localStorage:", err);
  }
}

export function addToCart(product: any, quantity: number = 1): { success: boolean; message: string; cart: CartItem[] } {
  if (!product) {
    return { success: false, message: "ไม่พบข้อมูลสินค้า", cart: [] };
  }

  const currentCart = getCartItems();
  const title = product.title || product.name || "สินค้า";
  const id = product.id ? String(product.id) : `PROD-${Date.now()}`;
  const price = typeof product.price === "number" ? product.price : (Number(product.price) || 0);
  
  let imageUrl = "https://images.unsplash.com/photo-1608500218890-c4f86641bc34?w=400&auto=format&fit=crop&q=80";
  if (Array.isArray(product.media) && product.media.length > 0 && product.media[0]) {
    imageUrl = product.media[0];
  } else if (product.imageUrl) {
    imageUrl = product.imageUrl;
  }

  const variation = product.category || product.variation || "ขนาดมาตรฐาน";

  // Check if item already exists in cart by id or title
  const existingIndex = currentCart.findIndex(
    (item) => item.id === id || item.name.trim().toLowerCase() === title.trim().toLowerCase()
  );

  let updatedCart: CartItem[];
  if (existingIndex > -1) {
    updatedCart = currentCart.map((item, idx) => {
      if (idx === existingIndex) {
        return { ...item, quantity: item.quantity + quantity };
      }
      return item;
    });
  } else {
    const newItem: CartItem = {
      id,
      name: title,
      variation,
      price,
      quantity,
      imageUrl,
    };
    updatedCart = [newItem, ...currentCart];
  }

  saveCartItems(updatedCart);

  return {
    success: true,
    message: `เพิ่ม "${title}" ลงในตะกร้าเรียบร้อยแล้ว!`,
    cart: updatedCart,
  };
}

export function getCartTotalCount(): number {
  const items = getCartItems();
  return items.length;
}
