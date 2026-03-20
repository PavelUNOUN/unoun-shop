import { NextResponse } from "next/server";
import { createCheckoutOrder } from "@/server/checkout/createCheckoutOrder";
import { createCheckoutOrderSchema } from "@/server/checkout/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createCheckoutOrderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Некорректные данные checkout.",
          details: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const result = await createCheckoutOrder(parsed.data);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Checkout API error", error);

    return NextResponse.json(
      {
        error:
          "Не удалось оформить заказ на сервере. Попробуйте еще раз или вернитесь позже.",
      },
      { status: 500 }
    );
  }
}
