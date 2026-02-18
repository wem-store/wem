import { NextRequest, NextResponse } from "next/server"

const PRODUCTS: Record<string, { name: string; price: number; oldPrice: number; deliveryWave: number; deliveryCash: number }> = {
  "cable-240w": {
    name: "Cable USB-C 240W + Support Telephone",
    price: 10000,
    oldPrice: 15000,
    deliveryWave: 1000,
    deliveryCash: 1500,
  },
  "adapter-5in1": {
    name: "Adaptateur 5-en-1 Multi-Fonctions",
    price: 7500,
    oldPrice: 12000,
    deliveryWave: 1000,
    deliveryCash: 1500,
  },
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const productsParam = searchParams.get("products")
  const coupon = searchParams.get("coupon")

  if (!productsParam) {
    return NextResponse.json({ error: "Parametre 'products' requis" }, { status: 400 })
  }

  const productQuantities: Record<string, { product: typeof PRODUCTS[string]; quantity: number }> = {}
  let totalPrice = 0

  for (const productEntry of productsParam.split(",")) {
    const [productId, quantityStr] = productEntry.split(":")
    const quantity = Number.parseInt(quantityStr || "1", 10)
    const product = PRODUCTS[productId]

    if (product) {
      productQuantities[productId] = { product, quantity }
      totalPrice += product.price * quantity
    }
  }

  let discount = 0
  if (coupon === "WEM10") {
    discount = Math.round(totalPrice * 0.1)
  } else if (coupon === "WEM500") {
    discount = 500
  }

  return NextResponse.json({
    products: productQuantities,
    coupon: coupon || null,
    subtotal: totalPrice,
    discount,
    total: totalPrice - discount,
    currency: "XOF",
  })
}
