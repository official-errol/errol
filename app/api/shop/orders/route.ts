import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendOrderNotification } from "@/lib/mail";
import { checkRateLimit, getClientIp, identifierForIp } from "@/lib/rate-limit";

type ProductConfig = {
  slug: string;
  name: string;
  amount: number;
};

const PRODUCTS: Record<string, ProductConfig> = {
  "canva-pro": {
    slug: "canva-pro",
    name: "Canva Pro Access",
    amount: 69,
  },
};

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rate = await checkRateLimit(identifierForIp(ip), {
    action: "order",
    limit: 5,
    windowSeconds: 60 * 60,
  });

  if (!rate.ok) {
    return NextResponse.json(
      { error: "Too many orders. Try again later." },
      { status: 429 },
    );
  }

  const body = await request.json();
  const { productSlug, customerName, customerEmail, paymentReference, notes } =
    body as {
      productSlug?: string;
      customerName?: string;
      customerEmail?: string;
      paymentReference?: string;
      notes?: string;
    };

  if (!productSlug || !PRODUCTS[productSlug]) {
    return NextResponse.json({ error: "Invalid product" }, { status: 400 });
  }

  if (!customerName?.trim()) {
    return NextResponse.json({ error: "Name required" }, { status: 400 });
  }

  if (
    !customerEmail?.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)
  ) {
    return NextResponse.json(
      { error: "Valid email required" },
      { status: 400 },
    );
  }

  if (!paymentReference?.trim()) {
    return NextResponse.json(
      { error: "GCash reference required" },
      { status: 400 },
    );
  }

  if (customerName.trim().length > 100) {
    return NextResponse.json({ error: "Name too long" }, { status: 400 });
  }

  if (paymentReference.trim().length > 50) {
    return NextResponse.json({ error: "Reference too long" }, { status: 400 });
  }

  if (notes && notes.trim().length > 1000) {
    return NextResponse.json({ error: "Notes too long" }, { status: 400 });
  }

  const product = PRODUCTS[productSlug];
  const supabase = await createClient();

  const { data: order, error } = await supabase
    .from("shop_orders")
    .insert({
      product_slug: product.slug,
      product_name: product.name,
      amount_php: product.amount,
      customer_name: customerName.trim(),
      customer_email: customerEmail.trim().toLowerCase(),
      payment_reference: paymentReference.trim(),
      notes: notes?.trim() || null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  try {
    await sendOrderNotification({
      productName: product.name,
      amountPhp: product.amount,
      customerName: order.customer_name,
      customerEmail: order.customer_email,
      paymentReference: order.payment_reference,
      notes: order.notes ?? undefined,
      orderId: order.id,
    });
  } catch (err) {
    console.error("[order] email failed:", err);
  }

  return NextResponse.json({ order });
}
