export const trackEvent = {
  // Événement: Vue de produit
  viewProduct: (productName: string, price: number) => {
    if (typeof window !== "undefined") {
      // Facebook Pixel
      if (window.fbq) {
        window.fbq("track", "ViewContent", {
          content_name: productName,
          value: price,
          currency: "XOF",
        })
      }

      // Google Analytics
      if (window.gtag) {
        window.gtag("event", "view_item", {
          items: [
            {
              item_name: productName,
              price: price,
              currency: "XOF",
            },
          ],
        })
      }

      // TikTok Pixel
      if (window.ttq) {
        window.ttq.track("ViewContent", {
          content_name: productName,
          value: price,
          currency: "XOF",
        })
      }
    }
  },

  // Événement: Ajout au panier / Initiation de commande
  initiateCheckout: (productName: string, price: number) => {
    if (typeof window !== "undefined") {
      if (window.fbq) {
        window.fbq("track", "InitiateCheckout", {
          content_name: productName,
          value: price,
          currency: "XOF",
        })
      }

      if (window.gtag) {
        window.gtag("event", "begin_checkout", {
          items: [
            {
              item_name: productName,
              price: price,
              currency: "XOF",
            },
          ],
        })
      }

      if (window.ttq) {
        window.ttq.track("InitiateCheckout", {
          content_name: productName,
          value: price,
          currency: "XOF",
        })
      }
    }
  },

  // Événement: Achat complété
  purchase: (productName: string, price: number, orderId: string) => {
    if (typeof window !== "undefined") {
      if (window.fbq) {
        window.fbq("track", "Purchase", {
          content_name: productName,
          value: price,
          currency: "XOF",
        })
      }

      if (window.gtag) {
        window.gtag("event", "purchase", {
          transaction_id: orderId,
          value: price,
          currency: "XOF",
          items: [
            {
              item_name: productName,
              price: price,
            },
          ],
        })
      }

      if (window.ttq) {
        window.ttq.track("CompletePayment", {
          content_name: productName,
          value: price,
          currency: "XOF",
        })
      }
    }
  },

  // Événement: Contact WhatsApp
  contactWhatsApp: () => {
    if (typeof window !== "undefined") {
      if (window.fbq) {
        window.fbq("track", "Contact")
      }

      if (window.gtag) {
        window.gtag("event", "contact", {
          method: "whatsapp",
        })
      }

      if (window.ttq) {
        window.ttq.track("Contact")
      }
    }
  },
}

declare global {
  interface Window {
    fbq?: any
    gtag?: any
    ttq?: any
  }
}
