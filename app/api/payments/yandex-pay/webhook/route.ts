import { NextResponse } from "next/server";
import { applyYandexPayWebhook } from "@/server/payments/yandexPay";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await applyYandexPayWebhook(body);

    return NextResponse.json(
      {
        ok: true,
        ...result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Yandex Pay webhook error", error);

    return NextResponse.json(
      {
        ok: false,
        error: "webhook_processing_failed",
      },
      { status: 500 }
    );
  }
}
