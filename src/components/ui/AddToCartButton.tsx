"use client";

import { useRouter } from "next/navigation";
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
