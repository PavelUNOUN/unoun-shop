"use client";

import { useRouter } from "next/navigation";
import { type StorefrontProduct } from "@/lib/catalog";
import { useFlagshipProduct } from "@/hooks/useFlagshipProduct";
import { reachMetrikaGoal } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

type AddToCartButtonProps = {
  label: string;
  redirectTo?: string;
  className?: string;
  product?: StorefrontProduct;
};

export default function AddToCartButton({
  label,
  redirectTo = "/cart",
  className,
  product: productOverride,
}: AddToCartButtonProps) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const flagshipProduct = useFlagshipProduct();
  const product = productOverride ?? flagshipProduct;

  const handleClick = () => {
    if (!product.isActive || product.stock <= 0) {
      return;
    }

    addItem(product);
    reachMetrikaGoal("add_to_cart", {
      product: product.slug,
      redirect_to: redirectTo,
      price: product.price,
    });
    router.push(redirectTo);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!product.isActive || product.stock <= 0}
      className={cn(className)}
    >
      {!product.isActive || product.stock <= 0 ? "Нет в наличии" : label}
    </button>
  );
}
