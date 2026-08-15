import crypto from "node:crypto";

export type SogoAirtimeRequest = {
  phone: string;
  network: string;
  amount: number | string;
  reference?: string;
  currency?: string;
};

const OFFICIAL_SANDBOX_BASE_URL = "https://sandbox.sogo.africa/v1";

function getSogoApiKey() {
  const apiKey = process.env.SOGO_API_KEY;

  if (!apiKey || !apiKey.trim()) {
    throw new Error("SOGO_API_KEY is not configured.");
  }

  return apiKey.trim();
}

function getSogoSandboxBaseUrl() {
  const configuredUrl = process.env.SOGO_API_BASE_URL?.trim() || OFFICIAL_SANDBOX_BASE_URL;
  const normalized = configuredUrl.replace(/\/+$/, "");

  if (normalized !== OFFICIAL_SANDBOX_BASE_URL) {
    throw new Error(
      `Sogo sandbox base URL must be ${OFFICIAL_SANDBOX_BASE_URL}.`,
    );
  }

  return normalized;
}

export function prepareSogoAirtimeRequest(payload: SogoAirtimeRequest) {
  const apiKey = getSogoApiKey();
  const baseUrl = getSogoSandboxBaseUrl();
  const idempotencyKey = crypto.randomUUID();
  const normalizedPayload = {
    ...payload,
    amount: Number(payload.amount),
    reference: payload.reference ?? `GVT-${Date.now()}`,
    currency: payload.currency ?? "NGN",
  };

  return {
    url: new URL("/bills/airtime", baseUrl).toString(),
    idempotencyKey,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify(normalizedPayload),
  };
}

export async function sendSogoSandboxAirtime(payload: SogoAirtimeRequest) {
  const prepared = prepareSogoAirtimeRequest(payload);

  if (process.env.SOGO_ALLOW_SANDBOX_REQUESTS !== "true") {
    return {
      ok: true,
      mode: "sandbox-preview",
      message:
        "Sandbox request prepared but no real transaction was sent. Set SOGO_ALLOW_SANDBOX_REQUESTS=true only when you intentionally want to transmit a request to the official Sogo sandbox endpoint.",
      request: {
        url: prepared.url,
        idempotencyKey: prepared.idempotencyKey,
      },
    };
  }

  const response = await fetch(prepared.url, {
    method: "POST",
    headers: prepared.headers,
    body: prepared.body,
    cache: "no-store",
  });

  const responseText = await response.text();
  let parsedBody: unknown = null;

  try {
    parsedBody = responseText ? JSON.parse(responseText) : null;
  } catch {
    parsedBody = responseText;
  }

  if (!response.ok) {
    throw new Error(
      `Sogo sandbox Airtime request failed with status ${response.status}: ${typeof parsedBody === "string" ? parsedBody : JSON.stringify(parsedBody)}`,
    );
  }

  return {
    ok: true,
    mode: "sandbox",
    data: parsedBody,
  };
}
