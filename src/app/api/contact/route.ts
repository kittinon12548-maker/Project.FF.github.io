import { NextResponse } from "next/server";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  tag: string;
  message: string;
  createdAt: string;
}

// In-memory message store with sample data
let messagesStore: ContactMessage[] = [
  {
    id: "msg-1",
    name: "สมชาย รักการเรียน",
    email: "somchai@tsu.ac.th",
    tag: "Question",
    message: "สอบถามเรื่องระยะเวลาจัดส่งน้ำหอม Fragrance Oil ไปยังต่างจังหวัด ใช้เวลากี่วันครับ",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: "msg-2",
    name: "วิภาดา สดใส",
    email: "wipada@gmail.com",
    tag: "General",
    message: "ประทับใจกลิ่น Fresh Coffee Roasted มากค่ะ เทียนหอมกระจายกลิ่นได้ดีมาก จะกลับมาอุดหนุนอีกแน่นอนค่ะ",
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    messages: messagesStore,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, tag, message } = body;

    // Email validation: must end with @tsu.ac.th or @gmail.com
    const emailLower = (email || "").toLowerCase().trim();
    const isValidDomain =
      emailLower.endsWith("@tsu.ac.th") || emailLower.endsWith("@gmail.com");

    if (!isValidDomain) {
      return NextResponse.json(
        {
          success: false,
          error: "อีเมลต้องเป็นโดเมน @tsu.ac.th หรือ @gmail.com เท่านั้น",
        },
        { status: 400 }
      );
    }

    if (!name || !message) {
      return NextResponse.json(
        { success: false, error: "กรุณากรอกข้อมูลให้ครบถ้วน" },
        { status: 400 }
      );
    }

    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: name.trim(),
      email: emailLower,
      tag: tag || "General",
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    messagesStore.unshift(newMessage);

    return NextResponse.json({
      success: true,
      message: "ส่งข้อความติดต่อสำเร็จ",
      data: newMessage,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "เกิดข้อผิดพลาดในการส่งข้อความ" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });
    }
    messagesStore = messagesStore.filter((m) => m.id !== id);
    return NextResponse.json({ success: true, message: "ลบข้อความเรียบร้อย" });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Error deleting message" }, { status: 500 });
  }
}
