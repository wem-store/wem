"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Phone, MapPin, User, CheckCircle, MessageCircle } from "lucide-react"

interface OrderFormProps {
  product: {
    name: string
    price: number
    oldPrice: number
    deliveryWave: number
    deliveryCash: number
  }
  onClose: () => void
}

type PaymentMethod = "wave" | "mtn" | "orange" | "moov" | "delivery"

const paymentOptions: Record<string, { name: string; number: string; color: string; ussd: string }> = {
  wave: { name: "Wave", number: "0506007934", color: "blue", ussd: "*144*4*2*0506007934*AMOUNT#" },
  mtn: { name: "MTN Money", number: "0505040647", color: "yellow", ussd: "*133*1*1*0505040647*AMOUNT#" },
  orange: { name: "Orange Money", number: "0702087781", color: "orange", ussd: "*144*1*1*0702087781*AMOUNT#" },
  moov: { name: "Moov Money", number: "0151360707", color: "emerald", ussd: "*155*1*1*0151360707*AMOUNT#" },
}

function OrderForm({ product, onClose }: OrderFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    paymentMethod: "delivery" as PaymentMethod,
  })
  const [formSubmitted, setFormSubmitted] = useState(false)

  const whatsappNumber = "2250506007934"

  const isAdvancePayment = formData.paymentMethod !== "delivery"
  const totalAmount = product.price + (isAdvancePayment ? product.deliveryWave : product.deliveryCash)

  const openPaymentApp = (method: PaymentMethod) => {
    const option = paymentOptions[method]
    if (!option) return

    const amount = totalAmount.toString()
    const ussdCode = `tel:${option.ussd.replace("AMOUNT", amount)}`

    if (method === "wave") {
      const waveDeepLink = `wave://send?phone=${option.number}&amount=${amount}`
      window.location.href = waveDeepLink
      setTimeout(() => {
        const confirmFallback = confirm(
          `L'application Wave ne s'est pas ouverte.\n\nComposez ce code USSD :\n${option.ussd.replace("AMOUNT", amount)}\n\nOuvrir le composeur ?`,
        )
        if (confirmFallback) {
          window.location.href = ussdCode
        }
      }, 2000)
    } else {
      window.location.href = ussdCode
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.phone || !formData.location) {
      alert("Veuillez remplir tous les champs obligatoires")
      return
    }



    setFormSubmitted(true)
  }

  const sendToWhatsApp = () => {
    const selectedOption = paymentOptions[formData.paymentMethod]
    const paymentLabel = formData.paymentMethod === "delivery" 
      ? "A la livraison" 
      : `${selectedOption.name} - ${selectedOption.number}`

    const message = formData.paymentMethod === "delivery"
      ? encodeURIComponent(
          `NOUVELLE COMMANDE\n\n` +
          `Produit: ${product.name}\n\n` +
          `Nom: ${formData.name}\n` +
          `Telephone: ${formData.phone}\n` +
          `Lieu de livraison: ${formData.location}\n\n` +
          `Prix produit: ${product.price.toLocaleString()} FCFA\n` +
          `Livraison Abidjan: ${product.deliveryCash.toLocaleString()} FCFA\n` +
          `TOTAL A PAYER: ${totalAmount.toLocaleString()} FCFA\n\n` +
          `Mode de paiement: A la livraison`,
        )
      : encodeURIComponent(
          `PAIEMENT EFFECTUE\n\n` +
          `Produit: ${product.name}\n\n` +
          `Nom: ${formData.name}\n` +
          `Telephone: ${formData.phone}\n` +
          `Lieu de livraison: ${formData.location}\n\n` +
          `Montant paye: ${totalAmount.toLocaleString()} FCFA (produit + livraison)\n` +
          `Paiement: ${paymentLabel}\n\n` +
          `J'envoie la capture d'ecran maintenant.`,
        )
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank")
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-foreground/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          {formSubmitted ? (
            /* Ecran de confirmation avec bouton WhatsApp */
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-success" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-foreground">Commande Validee!</h2>
              <p className="text-muted-foreground mb-6">
                Vos informations ont ete enregistrees. Cliquez sur le bouton ci-dessous pour finaliser votre commande sur WhatsApp.
              </p>

              <Card className="p-6 bg-zinc-800/50 border-zinc-700 mb-6 text-left">
                <h3 className="font-bold text-lg mb-4 text-white">Recapitulatif:</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-zinc-300">
                    <span>Nom:</span>
                    <span className="font-medium text-white">{formData.name}</span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span>Telephone:</span>
                    <span className="font-medium text-white">{formData.phone}</span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span>Livraison:</span>
                    <span className="font-medium text-white">{formData.location}</span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span>Produit:</span>
                    <span className="font-medium text-white">{product.name}</span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span>Paiement:</span>
                    <span className="font-medium text-white">
                      {formData.paymentMethod === "delivery" ? "A la livraison" : `${paymentOptions[formData.paymentMethod]?.name} - ${paymentOptions[formData.paymentMethod]?.number}`}
                    </span>
                  </div>
                  <div className="border-t border-zinc-600 pt-2 mt-2 flex justify-between text-lg font-bold">
                    <span className="text-white">TOTAL:</span>
                    <span className="text-cyan-400">{totalAmount.toLocaleString()} FCFA</span>
                  </div>
                </div>
              </Card>

              <Button
                onClick={sendToWhatsApp}
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700 text-white text-xl py-8 rounded-xl font-bold shadow-xl animate-pulse"
              >
                <MessageCircle className="w-8 h-8 mr-3" />
                Envoyer sur WhatsApp
              </Button>

              <p className="text-xs text-muted-foreground mt-4">
                Vous allez etre redirige vers WhatsApp avec toutes vos informations de commande.
              </p>

              <Button
                onClick={() => setFormSubmitted(false)}
                variant="outline"
                className="mt-4 text-muted-foreground"
              >
                Modifier mes informations
              </Button>
            </div>
          ) : (
            /* Formulaire de commande */
            <div>
              <h2 className="text-4xl font-bold mb-2 text-foreground">{product.name}</h2>
              <p className="text-muted-foreground mb-8">Remplissez le formulaire pour finaliser votre commande</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    <User className="w-4 h-4 inline mr-2" />
                    Nom Complet *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue bg-background text-foreground"
                    placeholder="Votre nom"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Numéro de Téléphone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue bg-background text-foreground"
                    placeholder="Ex: 0707123456"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Lieu de Livraison (Abidjan) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue bg-background text-foreground"
                    placeholder="Ex: Cocody, Angré 7e tranche"
                  />
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium mb-3 text-foreground">
                    Choisissez votre mode de paiement *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {/* Paiement a la livraison - RECOMMANDE */}
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: "delivery" })}
                      className={`p-3 border-2 rounded-lg text-left transition-all relative col-span-2 md:col-span-3 ${
                        formData.paymentMethod === "delivery"
                          ? "border-green-500 bg-green-500/10 shadow-lg scale-[1.02]"
                          : "border-border hover:border-green-500/50"
                      }`}
                    >
                      <div className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                        RECOMMANDE
                      </div>
                      <div className="font-bold text-lg text-foreground">Paiement a la Livraison</div>
                      <div className="text-xs text-muted-foreground">Payez quand vous recevez votre commande</div>
                      <div className="text-xs text-green-400 font-bold mt-1">
                        Livraison: {product.deliveryCash.toLocaleString()} FCFA
                      </div>
                    </button>

                    {/* Wave */}
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: "wave" })}
                      className={`p-3 border-2 rounded-lg text-left transition-all ${
                        formData.paymentMethod === "wave"
                          ? "border-blue-500 bg-blue-500/10 shadow-lg scale-105"
                          : "border-border hover:border-blue-500/50"
                      }`}
                    >
                      <div className="font-bold text-foreground">Wave</div>
                      <div className="text-xs text-blue-400 font-medium">{paymentOptions.wave.number}</div>
                      <div className="text-[10px] text-success font-bold mt-1">
                        Livraison: {product.deliveryWave.toLocaleString()} F
                      </div>
                    </button>

                    {/* MTN Money */}
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: "mtn" })}
                      className={`p-3 border-2 rounded-lg text-left transition-all ${
                        formData.paymentMethod === "mtn"
                          ? "border-yellow-500 bg-yellow-500/10 shadow-lg scale-105"
                          : "border-border hover:border-yellow-500/50"
                      }`}
                    >
                      <div className="font-bold text-foreground">MTN Money</div>
                      <div className="text-xs text-yellow-400 font-medium">{paymentOptions.mtn.number}</div>
                      <div className="text-[10px] text-success font-bold mt-1">
                        Livraison: {product.deliveryWave.toLocaleString()} F
                      </div>
                    </button>

                    {/* Orange Money */}
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: "orange" })}
                      className={`p-3 border-2 rounded-lg text-left transition-all ${
                        formData.paymentMethod === "orange"
                          ? "border-orange-500 bg-orange-500/10 shadow-lg scale-105"
                          : "border-border hover:border-orange-500/50"
                      }`}
                    >
                      <div className="font-bold text-foreground">Orange Money</div>
                      <div className="text-xs text-orange-400 font-medium">{paymentOptions.orange.number}</div>
                      <div className="text-[10px] text-success font-bold mt-1">
                        Livraison: {product.deliveryWave.toLocaleString()} F
                      </div>
                    </button>

                    {/* Moov Money */}
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: "moov" })}
                      className={`p-3 border-2 rounded-lg text-left transition-all ${
                        formData.paymentMethod === "moov"
                          ? "border-emerald-500 bg-emerald-500/10 shadow-lg scale-105"
                          : "border-border hover:border-emerald-500/50"
                      }`}
                    >
                      <div className="font-bold text-foreground">Moov Money</div>
                      <div className="text-xs text-emerald-400 font-medium">{paymentOptions.moov.number}</div>
                      <div className="text-[10px] text-success font-bold mt-1">
                        Livraison: {product.deliveryWave.toLocaleString()} F
                      </div>
                    </button>
                  </div>
                </div>

                {/* Instructions de paiement mobile */}
                {isAdvancePayment && (
                  <Card className="p-4 bg-zinc-800/50 border-zinc-600">
                    <p className="text-sm text-zinc-300 text-center mb-3">
                      Envoyez <span className="font-bold text-cyan-400">{totalAmount.toLocaleString()} FCFA</span> au{" "}
                      <span className="font-bold text-white">{paymentOptions[formData.paymentMethod]?.number}</span> via{" "}
                      <span className="font-bold text-white">{paymentOptions[formData.paymentMethod]?.name}</span>
                    </p>
                    <div className="bg-zinc-900 rounded-lg p-3 mb-3 text-center">
                      <p className="text-xs text-zinc-400 mb-1">Code USSD :</p>
                      <p className="text-lg font-mono font-bold text-yellow-400">
                        {paymentOptions[formData.paymentMethod]?.ussd.replace("AMOUNT", totalAmount.toString())}
                      </p>
                    </div>
                    <Button
                      type="button"
                      onClick={() => openPaymentApp(formData.paymentMethod)}
                      className={`w-full font-bold py-3 rounded-lg shadow-lg transition-all hover:scale-105 text-white ${
                        formData.paymentMethod === "wave" ? "bg-blue-600 hover:bg-blue-700" :
                        formData.paymentMethod === "mtn" ? "bg-yellow-600 hover:bg-yellow-700" :
                        formData.paymentMethod === "orange" ? "bg-orange-600 hover:bg-orange-700" :
                        "bg-emerald-600 hover:bg-emerald-700"
                      }`}
                    >
                      {formData.paymentMethod === "wave" ? "Ouvrir Wave" : "Composer le code USSD"} pour payer
                    </Button>
                  </Card>
                )}

                <Card className="p-6 bg-brand-purple-light/10 border-brand-purple/30">
                  <h3 className="font-bold text-lg mb-4 text-foreground">Récapitulatif de la Commande</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-foreground">
                      <span>{product.name}</span>
                      <span className="font-bold">{product.price.toLocaleString()} FCFA</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Livraison Abidjan</span>
                      <span>
                        {isAdvancePayment
                          ? `${product.deliveryWave.toLocaleString()} FCFA`
                          : `${product.deliveryCash.toLocaleString()} FCFA`}
                      </span>
                    </div>
                    <div className="border-t-2 border-brand-purple/30 pt-2 mt-2 flex justify-between text-xl font-bold text-foreground">
                      <span>TOTAL</span>
                      <span className="text-brand-purple">{totalAmount.toLocaleString()} FCFA</span>
                    </div>
                  </div>
                </Card>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-brand-purple to-brand-blue hover:from-brand-purple-dark hover:to-brand-blue-dark text-white text-lg py-6 rounded-lg font-bold shadow-xl"
                >
                  {formData.paymentMethod === "delivery" ? "Confirmer la Commande" : "Soumettre la Commande"}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  En commandant, vous acceptez nos conditions de vente. Livraison sous 24-48h à Abidjan.
                </p>
              </form>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

export default OrderForm
