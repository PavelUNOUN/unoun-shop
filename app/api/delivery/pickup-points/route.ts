import { NextResponse } from "next/server";
import { listYandexDeliveryPickupPoints } from "@/server/delivery/yandexDelivery";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city")?.trim() ?? "";
    const result = await listYandexDeliveryPickupPoints(city);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Pickup points API error", error);

    return NextResponse.json(
      {
        error: "Не удалось загрузить список ПВЗ Яндекс Доставки.",
      },
      { status: 500 }
    );
  }
}
