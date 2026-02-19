"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ShoppingCart, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import OrderForm from "@/components/order-form"

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

function CheckoutContent() {
  const searchParams = useSearchParams()
  const [selectedProduct, setSelectedProduct] = useState<typeof PRODUCTS[string] | null>(null)
  const [cartItems, setCartItems] = useState<{ product: typeof PRODUCTS[string]; quantity: number }[]>([])
  const [coupon, setCoupon] = useState<string | null>(null)
  const [discount, setDiscount] = useState(0)

  useEffect(() => {
    const productsParam = searchParams.get("products")
    const couponParam = searchParams.get("coupon")

    if (couponParam) setCoupon(couponParam)

    if (productsParam) {
      const items: { product: typeof PRODUCTS[string]; quantity: number }[] = []

      for (const entry of productsParam.split(",")) {
        const [productId, quantityStr] = entry.split(":")
        const quantity = Number.parseInt(quantityStr || "1", 10)
        const product = PRODUCTS[productId]

        if (product) {
          items.push({ product, quantity })
        }
      }

      setCartItems(items)

      // Appliquer coupon
      if (couponParam) {
        const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
        if (couponParam === "WEM10") {
          setDiscount(Math.round(subtotal * 0.1))
        } else if (couponParam === "WEM500") {
          setDiscount(500)
        }
      }

      // Facebook Pixel - InitiateCheckout
      if (typeof window !== "undefined" && window.fbq) {
        const totalValue = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
        window.fbq("track", "InitiateCheckout", {
          content_ids: productsParam,
          value: totalValue,
          currency: "XOF",
          num_items: items.length,
        })
      }
    }
  }, [searchParams])

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const total = subtotal - discount

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-brand-navy-dark via-brand-navy to-brand-slate text-foreground flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md w-full bg-zinc-900/80 border-zinc-700">
          <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-zinc-500" />
          <h1 className="text-2xl font-bold text-white mb-2">Aucun produit selectionne</h1>
          <p className="text-zinc-400 mb-6">Utilisez un lien de paiement valide ou retournez a la boutique.</p>
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour a la boutique
            </Button>
          </Link>
        </Card>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-brand-navy-dark via-brand-navy to-brand-slate text-foreground">
      {selectedProduct && <OrderForm product={selectedProduct} onClose={() => setSelectedProduct(null)} />}

      {/* Header */}
      <nav className="sticky top-0 z-40 bg-brand-navy-dark/95 backdrop-blur-md border-b border-brand-blue/20">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/gemini-generated-image-envbfyenvbfyenvb.jpg"
              alt="WEM-STORE Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <h1 className="text-lg font-bold text-white">WEM-STORE</h1>
              <p className="text-xs text-zinc-400">Checkout</p>
            </div>
          </Link>
          <Link href="/">
            <Button variant="outline" size="sm" className="text-zinc-300 border-zinc-600 bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Boutique
            </Button>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <h1 className="text-3xl font-bold text-white text-center mb-8">Votre Commande</h1>

        {/* Produits */}
        <Card className="p-6 bg-zinc-900/80 border-zinc-700 mb-6">
          <h2 className="text-lg font-bold text-white mb-4">Produit(s)</h2>
          <div className="space-y-4">
            {cartItems.map((item, i) => (
              <div key={i} className="flex justify-between items-center border-b border-zinc-700 pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium text-white">{item.product.name}</p>
                  <p className="text-sm text-zinc-400">Quantite: {item.quantity}</p>
                </div>
                <p className="font-bold text-cyan-400">{(item.product.price * item.quantity).toLocaleString()} FCFA</p>
              </div>
            ))}
          </div>

          <div className="border-t border-zinc-600 mt-4 pt-4 space-y-2">
            <div className="flex justify-between text-zinc-300">
              <span>Sous-total:</span>
              <span className="text-white">{subtotal.toLocaleString()} FCFA</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-400">
                <span>Coupon ({coupon}):</span>
                <span>-{discount.toLocaleString()} FCFA</span>
              </div>
            )}
            <div className="flex justify-between text-xl font-bold pt-2 border-t border-zinc-600">
              <span className="text-white">Total:</span>
              <span className="text-cyan-400">{total.toLocaleString()} FCFA</span>
            </div>
          </div>
        </Card>

        {/* Boutons commander */}
        <div className="space-y-4">
          {cartItems.map((item, i) => (
            <Button
              key={i}
              size="lg"
              onClick={() => setSelectedProduct(item.product)}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-lg py-6 rounded-xl font-bold shadow-xl animate-pulse"
            >
              Commander {item.product.name}
            </Button>
          ))}
        </div>

        <p className="text-center text-xs text-zinc-500 mt-8">WEM-STORE - Votre Boutique Connectee - Abidjan</p>
      </div>
    </main>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gradient-to-br from-brand-navy-dark via-brand-navy to-brand-slate flex items-center justify-center">
        <p className="text-white text-lg">Chargement...</p>
      </main>
    }>
      <CheckoutContent />
    </Suspense>
  )
}
