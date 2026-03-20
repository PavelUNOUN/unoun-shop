"use client";

import { useEffect, useState } from "react";
import type { CatalogProduct } from "@/lib/catalog";
import { FLAGSHIP_PRODUCT } from "@/lib/catalog";

type StorefrontFlagshipProduct = CatalogProduct & {
  isActive: boolean;
  stock: number;
};

export function useFlagshipProduct() {
  const [product, setProduct] =
    useState<StorefrontFlagshipProduct>({
      ...FLAGSHIP_PRODUCT,
      isActive: true,
      stock: 20,
    });

  useEffect(() => {
    let isMounted = true;

    async function loadProduct() {
      try {
        const response = await fetch("/api/storefront/flagship-product", {
          cache: "no-store",
        });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as StorefrontFlagshipProduct;

        if (isMounted) {
          setProduct(data);
        }
      } catch {
        // Keep fallback product for storefront resilience.
      }
    }

    void loadProduct();

    return () => {
      isMounted = false;
    };
  }, []);

  return product;
}
