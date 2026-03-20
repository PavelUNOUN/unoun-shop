import { NextResponse } from "next/server";
import { getStorefrontFlagshipProduct } from "@/server/catalog/flagshipProduct";

export async function GET() {
  try {
    const product = await getStorefrontFlagshipProduct();

    return NextResponse.json(product);
  } catch (error) {
    console.error("Storefront flagship product error", error);

    return NextResponse.json(
      {
        error: "Не удалось загрузить продукт для витрины.",
      },
      { status: 500 }
    );
  }
}
