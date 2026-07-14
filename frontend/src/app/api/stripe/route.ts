import { NextRequest, NextResponse } from "next/server";

const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY || "";
const PRICE_IDS: Record<string, string> = {
  pro: process.env.STRIPE_PRO_PRICE_ID || "",
  team: process.env.STRIPE_TEAM_PRICE_ID || "",
};

export async function POST(req: NextRequest) {
  try {
    const { plan, email } = await req.json();
    const priceId = PRICE_IDS[plan];
    if (!priceId) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    if (!STRIPE_SECRET) {
      return NextResponse.json(
        {
          error: "Stripe not configured",
          message: "Set STRIPE_SECRET_KEY and price IDs in environment variables.",
        },
        { status: 503 }
      );
    }

    // Use raw fetch to Stripe API (avoids needing stripe npm package)
    const params = new URLSearchParams();
    params.append("line_items[0][price]", priceId);
    params.append("line_items[0][quantity]", "1");
    params.append("mode", "subscription");
    params.append("success_url", `${req.nextUrl.origin}/app?checkout=success`);
    params.append("cancel_url", `${req.nextUrl.origin}/pricing?checkout=cancelled`);
    if (email) params.append("customer_email", email);
    params.append("allow_promotion_codes", "true");

    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${STRIPE_SECRET}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: "Stripe API error", detail: err }, { status: 502 });
    }

    const session = await response.json();
    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal error", detail: String(err) },
      { status: 500 }
    );
  }
}
