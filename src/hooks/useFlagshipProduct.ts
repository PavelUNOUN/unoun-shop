"use client";

import { useEffect, useState } from "react";
import { FLAGSHIP_PRODUCT, type StorefrontProduct } from "@/lib/catalog";

export function useFlagshipProduct() {
  const [product, setProduct] = useState<StorefrontProduct>(FLAGSHIP_PRODUCT);

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

        const data = (await response.json()) as StorefrontProduct;

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
