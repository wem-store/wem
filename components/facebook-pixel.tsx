"use client"

import { useEffect, Suspense } from "react"
import { usePathname, useSearchParams } from "next/navigation"

declare global {
  interface Window {
    fbq: any
    _fbq: any
  }
}

function FacebookPixelInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Track les changements de page
    if (window.fbq) {
      window.fbq("track", "PageView")
    }
  }, [pathname, searchParams])

  return null
}

export function FacebookPixel() {
  useEffect(() => {
    const FB_PIXEL_ID = "1037867975214900"

    // Initialisation du pixel Facebook
    ;((f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) => {
      if (f.fbq) return
      n = f.fbq = () => {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      }
      if (!f._fbq) f._fbq = n
      n.push = n
      n.loaded = !0
      n.version = "2.0"
      n.queue = []
      t = b.createElement(e)
      t.async = !0
      t.src = v
      s = b.getElementsByTagName(e)[0]
      s.parentNode.insertBefore(t, s)
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js")

    window.fbq("init", FB_PIXEL_ID)
    window.fbq("track", "PageView")

    console.log("[WEM-STORE] Facebook Pixel initialisé:", FB_PIXEL_ID)
  }, [])

  return (
    <Suspense fallback={null}>
      <FacebookPixelInner />
    </Suspense>
  )
}

// Fonctions de tracking pour les événements
export const trackFBEvent = {
  // Voir un produit
  viewContent: (productName: string, value: number, currency = "XOF") => {
    if (window.fbq) {
      window.fbq("track", "ViewContent", {
        content_name: productName,
        value: value,
        currency: currency,
      })
      console.log("[WEM-STORE] FB Event: ViewContent -", productName)
    }
  },

  // Ajouter au panier (clic sur Commander)
  addToCart: (productName: string, value: number, currency = "XOF") => {
    if (window.fbq) {
      window.fbq("track", "AddToCart", {
        content_name: productName,
        value: value,
        currency: currency,
      })
      console.log("[WEM-STORE] FB Event: AddToCart -", productName)
    }
  },

  // Initier le checkout (ouvrir formulaire)
  initiateCheckout: (productName: string, value: number, currency = "XOF") => {
    if (window.fbq) {
      window.fbq("track", "InitiateCheckout", {
        content_name: productName,
        value: value,
        currency: currency,
      })
      console.log("[WEM-STORE] FB Event: InitiateCheckout -", productName)
    }
  },

  // Contact WhatsApp
  contact: (method = "WhatsApp") => {
    if (window.fbq) {
      window.fbq("track", "Contact", {
        contact_method: method,
      })
      console.log("[WEM-STORE] FB Event: Contact -", method)
    }
  },

  // Paiement Wave
  purchase: (productName: string, value: number, currency = "XOF") => {
    if (window.fbq) {
      window.fbq("track", "Purchase", {
        content_name: productName,
        value: value,
        currency: currency,
      })
      console.log("[WEM-STORE] FB Event: Purchase -", productName, value, currency)
    }
  },
}

export default FacebookPixel
