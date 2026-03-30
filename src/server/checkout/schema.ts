import { z } from "zod";

export const checkoutItemSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  price: z.number().int().nonnegative(),
  originalPrice: z.number().int().nonnegative(),
  image: z.string().min(1),
  quantity: z.number().int().positive(),
});

export const checkoutContactSchema = z.object({
  name: z.string().trim().min(2),
  phone: z.string().trim().min(10),
  email: z.string().trim().email(),
  city: z.string().trim().min(2),
});

export const checkoutPickupPointSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  address: z.string().min(1),
  eta: z.string().trim().min(1).optional().nullable(),
  note: z.string().trim().min(1).optional().nullable(),
});

export const createCheckoutOrderSchema = z.object({
  contact: checkoutContactSchema,
  deliveryMethod: z.literal("yandex_pickup"),
  pickupPoint: checkoutPickupPointSchema,
  paymentMethod: z.enum(["full_online", "split"]),
  applyAvailableBonuses: z.boolean().optional(),
  consentAccepted: z.literal(true),
  items: z.array(checkoutItemSchema).min(1),
});

export type CreateCheckoutOrderInput = z.infer<typeof createCheckoutOrderSchema>;
