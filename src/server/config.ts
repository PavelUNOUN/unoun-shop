export type CheckoutStorageMode = "mock" | "database";

export function getCheckoutStorageMode(): CheckoutStorageMode {
  const explicitMode = process.env.CHECKOUT_STORAGE_MODE;

  if (explicitMode === "database") {
    return "database";
  }

  if (explicitMode === "mock") {
    return "mock";
  }

  return process.env.DATABASE_URL ? "database" : "mock";
}
