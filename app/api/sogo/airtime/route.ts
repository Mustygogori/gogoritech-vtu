import { NextRequest, NextResponse } from "next/server";

import { sendSogoSandboxAirtime } from "@/lib/sogo";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body || typeof body.phone !== "string" || !body.phone.trim()) {
      return NextResponse.json(
        { ok: false, message: "A valid phone number is required." },
        { status: 400 },
      );
    }

    const amount = Number(body.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json(
        { ok: false, message: "A valid airtime amount is required." },
        { status: 400 },
      );
    }

    if (!body.network || typeof body.network !== "string") {
      return NextResponse.json(
        { ok: false, message: "A valid network code is required." },
        { status: 400 },
      );
    }

    const result = await sendSogoSandboxAirtime({
      phone: body.phone,
      network: body.network,
      amount,
      reference: body.reference,
      currency: body.currency ?? "NGN",
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        ok: false,
        message,
        mode: "sandbox",
      },
      { status: 500 },
    );
  }
}
