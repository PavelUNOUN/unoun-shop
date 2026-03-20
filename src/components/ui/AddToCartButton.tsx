"use client";

import { useRouter } from "next/navigation";
import { reachMetrikaGoal } from "@/lib/analytics";
import { FLAGSHIP_PRODUCT } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

type AddToCartButtonProps = {
  label: string;
  redirectTo?: "/cart" | "/checkout";
  className?: string;
};

export default function AddToCartButton({
  label,
  redirectTo = "/cart",
  className,
}: AddToCartButtonProps) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  const handleClick = () => {
    addItem(FLAGSHIP_PRODUCT);
    reachMetrikaGoal("add_to_cart", {
      product: FLAGSHIP_PRODUCT.slug,
      redirect_to: redirectTo,
      price: FLAGSHIP_PRODUCT.price,
    });
    router.push(redirectTo);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(className)}
    >
      {label}
    </button>
  );
}
