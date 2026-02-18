"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Phone, MapPin, User, CheckCircle, MessageCircle, Copy, Check, Smartphone } from "lucide-react"

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

const paymentOptions: Record<
  string,
  { name: string; number: string; icon: string; bgClass: string; borderClass: string; textClass: string; ussd: string }
> = {
  wave: {
    name: "Wave",
    number: "0506007934",
    icon: "🔵",
    bgClass: "bg-blue-500/10",
    borderClass: "border-blue-500",
    textClass: "text-blue-400",
    ussd: "*144*4*2*0506007934*AMOUNT#",
  },
  mtn: {
    name: "MTN Money",
    number: "0505040647",
    icon: "🟡",
    bgClass: "bg-yellow-500/10",
    borderClass: "border-yellow-500",
    textClass: "text-yellow-400",
    ussd: "*133*1*1*0505040647*AMOUNT#",
  },
  orange: {
    name: "Orange Money",
    number: "0702087781",
    icon: "🟠",
    bgClass: "bg-orange-500/10",
    borderClass: "border-orange-500",
    textClass: "text-orange-400",
    ussd: "*144*1*1*0702087781*AMOUNT#",
  },
  moov: {
    name: "Moov Money",
    number: "0151360707",
    icon: "🟢",
    bgClass: "bg-emerald-500/10",
    borderClass: "border-emerald-500",
    textClass: "text-emerald-400",
    ussd: "*155*1*1*0151360707*AMOUNT#",
  },
}

function OrderForm({ product, onClose }: OrderFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    paymentMethod: "wave" as PaymentMethod,
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

  const [copiedNumber, setCopiedNumber] = useState<string | null>(null)
  const [copiedUssd, setCopiedUssd] = useState(false)

  const selectedOption = formData.paymentMethod !== "delivery" ? paymentOptions[formData.paymentMethod] : null
  const ussdWithAmount = selectedOption ? selectedOption.ussd.replace("AMOUNT", totalAmount.toString()) : ""

  const copyToClipboard = (text: string, type: "number" | "ussd") => {
    navigator.clipboard.writeText(text).catch(() => {})
    if (type === "number") {
      setCopiedNumber(text)
      setTimeout(() => setCopiedNumber(null), 2000)
    } else {
      setCopiedUssd(true)
      setTimeout(() => setCopiedUssd(false), 2000)
    }
  }

  const sendToWhatsApp = () => {
    const paymentName = selectedOption ? selectedOption.name : "A la livraison"
    const paymentNum = selectedOption ? selectedOption.number : ""
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
          `PAIEMENT ${paymentName.toUpperCase()} EFFECTUE\n\n` +
          `Produit: ${product.name}\n\n` +
          `Nom: ${formData.name}\n` +
          `Telephone: ${formData.phone}\n` +
          `Lieu de livraison: ${formData.location}\n\n` +
          `Montant paye: ${totalAmount.toLocaleString()} FCFA (produit + livraison)\n` +
          `Paiement: ${paymentName} - ${paymentNum}\n\n` +
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
                      {formData.paymentMethod === "delivery" ? "A la livraison" : selectedOption?.name}
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

                  {/* Mobile Money Options */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {(Object.keys(paymentOptions) as Array<keyof typeof paymentOptions>).map((key) => {
                      const opt = paymentOptions[key]
                      const isSelected = formData.paymentMethod === key
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setFormData({ ...formData, paymentMethod: key as PaymentMethod })}
                          className={`p-3 border-2 rounded-lg text-left transition-all relative ${
                            isSelected
                              ? `${opt.borderClass} ${opt.bgClass} shadow-lg scale-[1.03]`
                              : `border-border hover:${opt.borderClass}/50`
                          }`}
                        >
                          {key === "wave" && (
                            <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                              RECOMMANDE
                            </div>
                          )}
                          <div className="text-xl mb-1">{opt.icon}</div>
                          <div className="font-bold text-sm text-foreground">{opt.name}</div>
                          <div className="text-xs text-muted-foreground">{opt.number}</div>
                          <div className={`text-xs font-bold mt-1 ${opt.textClass}`}>
                            Livraison: {product.deliveryWave.toLocaleString()} FCFA
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  {/* Cash on Delivery */}
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: "delivery" })}
                    className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                      formData.paymentMethod === "delivery"
                        ? "border-zinc-400 bg-zinc-500/10 shadow-lg scale-[1.02]"
                        : "border-border hover:border-zinc-500/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-zinc-400" />
                      <div>
                        <div className="font-bold text-foreground">Paiement a la Livraison</div>
                        <div className="text-xs text-muted-foreground">Payez quand vous recevez</div>
                      </div>
                      <div className="ml-auto text-xs text-warning font-bold">
                        Livraison: {product.deliveryCash.toLocaleString()} FCFA
                      </div>
                    </div>
                  </button>
                </div>

                {/* Dynamic Payment Instructions */}
                {formData.paymentMethod !== "delivery" && selectedOption && (
                  <Card className={`p-5 ${selectedOption.bgClass} border ${selectedOption.borderClass}/30`}>
                    <div className="flex flex-col gap-4">
                      {/* Header */}
                      <div className="text-center">
                        <p className={`text-lg font-bold ${selectedOption.textClass}`}>
                          {selectedOption.name}
                        </p>
                        <p className="text-sm text-zinc-300 mt-1">
                          Envoyez <span className="font-bold text-cyan-400">{totalAmount.toLocaleString()} FCFA</span> au numero ci-dessous
                        </p>
                      </div>

                      {/* Phone Number with Copy */}
                      <div className="flex items-center justify-center gap-3 bg-zinc-900/50 rounded-lg p-3">
                        <span className={`text-2xl font-bold font-mono ${selectedOption.textClass}`}>
                          {selectedOption.number}
                        </span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(selectedOption.number, "number")}
                          className="p-2 bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-colors"
                          aria-label="Copier le numero"
                        >
                          {copiedNumber === selectedOption.number ? (
                            <Check className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4 text-zinc-300" />
                          )}
                        </button>
                      </div>

                      {/* USSD Code with Copy */}
                      <div className="bg-zinc-900/50 rounded-lg p-3">
                        <p className="text-xs text-zinc-400 mb-2 text-center">Code USSD a composer :</p>
                        <div className="flex items-center justify-center gap-3">
                          <code className={`text-lg font-bold font-mono ${selectedOption.textClass}`}>
                            {ussdWithAmount}
                          </code>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(ussdWithAmount, "ussd")}
                            className="p-2 bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-colors"
                            aria-label="Copier le code USSD"
                          >
                            {copiedUssd ? (
                              <Check className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4 text-zinc-300" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-2">
                        {formData.paymentMethod === "wave" ? (
                          <>
                            <Button
                              type="button"
                              onClick={() => openPaymentApp("wave")}
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg transition-all hover:scale-[1.02]"
                            >
                              <Smartphone className="w-5 h-5 mr-2" />
                              Ouvrir Wave directement
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => {
                                window.location.href = `tel:${ussdWithAmount}`
                              }}
                              className="w-full border-blue-500/50 text-blue-400 hover:bg-blue-500/10 font-bold py-3 rounded-lg"
                            >
                              <Phone className="w-4 h-4 mr-2" />
                              Composer le code USSD
                            </Button>
                          </>
                        ) : (
                          <Button
                            type="button"
                            onClick={() => openPaymentApp(formData.paymentMethod)}
                            className={`w-full font-bold py-3 rounded-lg shadow-lg transition-all hover:scale-[1.02] text-white ${
                              formData.paymentMethod === "mtn"
                                ? "bg-yellow-600 hover:bg-yellow-700"
                                : formData.paymentMethod === "orange"
                                  ? "bg-orange-600 hover:bg-orange-700"
                                  : "bg-emerald-600 hover:bg-emerald-700"
                            }`}
                          >
                            <Phone className="w-5 h-5 mr-2" />
                            Composer le code USSD automatiquement
                          </Button>
                        )}
                      </div>

                      {/* Info */}
                      <p className="text-xs text-zinc-400 text-center">
                        Apres le paiement, validez votre commande et envoyez la capture sur WhatsApp.
                      </p>
                    </div>
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
                  {formData.paymentMethod === "delivery" ? "Confirmer la Commande" : `Valider - Paiement ${selectedOption?.name}`}
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
