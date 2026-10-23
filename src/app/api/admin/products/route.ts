import { NextResponse } from "next/server";
import { INITIAL_PRODUCTS } from "@/data/mockData";

export async function GET() {
  return NextResponse.json({
    products: INITIAL_PRODUCTS,
  });
}
