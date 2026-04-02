import type { CheckoutPickupPoint } from "@/lib/checkout";

const TEST_API_BASE = "https://b2b.taxi.tst.yandex.net";
const PRODUCTION_API_BASE = "https://b2b-authproxy.taxi.yandex.net";

type PickupPointsResult = {
  source: "mock" | "live";
  points: CheckoutPickupPoint[];
};

type YandexLocationDetectResponse = {
  variants?: Array<{
    geo_id?: number;
    address?: string;
  }>;
};

type YandexPickupPointAddress =
  | string
  | {
      full_address?: string;
      locality?: string;
      street?: string;
      house?: string;
      comment?: string;
    };

type YandexPickupPointResponse = {
  pickup_points?: Array<{
    pickup_point_id?: string;
    station_id?: string;
    partner_station_id?: string;
    logistic_point_id?: string;
    name?: string;
    title?: string;
    address?: YandexPickupPointAddress;
    full_address?: string;
    instruction?: string;
    description?: string;
  }>;
};

const MOCK_PICKUP_POINTS: CheckoutPickupPoint[] = [
  {
    id: "yandex-nn-rodionova-165a",
    title: "Яндекс Маркет ПВЗ на Родионова",
    address: "Нижний Новгород, ул. Родионова, 165А",
    eta: "2-4 рабочих дня",
  },
  {
    id: "yandex-nn-gorkogo-152",
    title: "Яндекс Маркет ПВЗ на Горького",
    address: "Нижний Новгород, ул. Максима Горького, 152",
    eta: "2-4 рабочих дня",
  },
  {
    id: "yandex-nn-belinskogo-63",
    title: "Яндекс Маркет ПВЗ на Белинского",
    address: "Нижний Новгород, ул. Белинского, 63",
    eta: "3-5 рабочих дней",
  },
];

function getYandexDeliveryEnv(): "test" | "production" {
  return process.env.YANDEX_DELIVERY_ENV === "production"
    ? "production"
    : "test";
}

function getYandexDeliveryApiBase() {
  return getYandexDeliveryEnv() === "production"
    ? PRODUCTION_API_BASE
    : TEST_API_BASE;
}

function getYandexDeliveryApiToken() {
  const value = process.env.YANDEX_DELIVERY_API_TOKEN?.trim();
  return value || null;
}

export function isYandexDeliveryPickupPointsEnabled() {
  return Boolean(getYandexDeliveryApiToken());
}

function buildMockPickupPoints(city: string): CheckoutPickupPoint[] {
  const normalizedCity = city.trim().toLowerCase();

  if (
    normalizedCity.includes("ниж") ||
    normalizedCity.includes("novgorod") ||
    normalizedCity.includes("новгород")
  ) {
    return MOCK_PICKUP_POINTS;
  }

  return MOCK_PICKUP_POINTS.map((point, index) => ({
    ...point,
    id: `${normalizedCity || "city"}-${index + 1}`,
    title: point.title.replace("Нижний Новгород", city.trim() || "Ваш город"),
    address: point.address.replace("Нижний Новгород", city.trim() || "Ваш город"),
  }));
}

function extractPickupPointAddress(
  address: YandexPickupPointAddress | undefined,
  fallback?: string
) {
  if (typeof address === "string") {
    return address;
  }

  if (address?.full_address) {
    return address.full_address;
  }

  const parts = [
    address?.locality,
    address?.street,
    address?.house,
    address?.comment,
  ].filter(Boolean);

  return parts.join(", ") || fallback || "";
}

async function yandexDeliveryRequest<T>(
  path: string,
  body?: Record<string, unknown>
): Promise<T> {
  const token = getYandexDeliveryApiToken();

  if (!token) {
    throw new Error("Yandex Delivery token is not configured.");
  }

  const response = await fetch(`${getYandexDeliveryApiBase()}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Accept-Language": "ru",
    },
    body: JSON.stringify(body ?? {}),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Yandex Delivery request failed: ${response.status} ${errorBody}`
    );
  }

  return (await response.json()) as T;
}

async function detectGeoId(city: string): Promise<number | null> {
  const response = await yandexDeliveryRequest<YandexLocationDetectResponse>(
    "/api/b2b/platform/location/detect",
    {
      location: city,
    }
  );

  const geoId = response.variants?.[0]?.geo_id;
  return typeof geoId === "number" ? geoId : null;
}

async function fetchPickupPointsByGeoId(
  geoId: number
): Promise<CheckoutPickupPoint[]> {
  const response = await yandexDeliveryRequest<YandexPickupPointResponse>(
    "/api/b2b/platform/pickup-points/list",
    {
      geo_id: geoId,
      type: "pickup_point",
      payment_method: "already_paid",
    }
  );

  return (response.pickup_points ?? [])
    .map((point): CheckoutPickupPoint | null => {
      const id =
        point.pickup_point_id ??
        point.station_id ??
        point.partner_station_id ??
        point.logistic_point_id;
      const address = extractPickupPointAddress(point.address, point.full_address);

      if (!id || !address) {
        return null;
      }

      return {
        id,
        title: point.name ?? point.title ?? "ПВЗ Яндекс Доставки",
        address,
        eta: null,
        note: point.instruction ?? point.description ?? null,
      };
    })
    .filter((point): point is CheckoutPickupPoint => point !== null);
}

export async function listYandexDeliveryPickupPoints(
  city: string
): Promise<PickupPointsResult> {
  const normalizedCity = city.trim();

  if (!normalizedCity || !isYandexDeliveryPickupPointsEnabled()) {
    return {
      source: "mock",
      points: buildMockPickupPoints(normalizedCity),
    };
  }

  try {
    const geoId = await detectGeoId(normalizedCity);

    if (!geoId) {
      return {
        source: "mock",
        points: buildMockPickupPoints(normalizedCity),
      };
    }

    const points = await fetchPickupPointsByGeoId(geoId);

    if (points.length === 0) {
      return {
        source: "mock",
        points: buildMockPickupPoints(normalizedCity),
      };
    }

    return {
      source: "live",
      points,
    };
  } catch (error) {
    console.error("Yandex Delivery pickup points error", error);

    return {
      source: "mock",
      points: buildMockPickupPoints(normalizedCity),
    };
  }
}
