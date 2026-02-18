"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, CreditCard, Phone, Copy, Check } from "lucide-react"
import QRCode from "react-qr-code"

interface WaveQRModalProps {
  amount: number
  productName: string
  onClose: () => void
}

export default function WaveQRModal({ amount, productName, onClose }: WaveQRModalProps) {
  const [copied, setCopied] = useState(false)
  const waveNumber = "0506007934"
  const waveNumberFull = "+2250506007934"
  
  // Wave payment data for QR code
  const wavePaymentData = `wave://pay?phone=${waveNumberFull}&amount=${amount}&note=Commande%20WEM-STORE%20-%20${encodeURIComponent(productName)}`
  
  const handleCopy = () => {
    navigator.clipboard.writeText(waveNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleOpenWave = () => {
    window.location.href = wavePaymentData
  }

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <Card className="w-full max-w-md bg-gradient-to-br from-blue-900 to-blue-950 border-blue-500/50 p-6 relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          aria-label="Fermer"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <CreditCard className="w-8 h-8 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Paiement Wave</h2>
            </div>
            <p className="text-blue-200 text-sm">{productName}</p>
          </div>

          {/* Amount */}
          <div className="bg-blue-800/50 rounded-xl p-4">
            <p className="text-blue-200 text-sm mb-1">Montant a payer</p>
            <p className="text-4xl font-bold text-white">{amount.toLocaleString()} FCFA</p>
          </div>

          {/* QR Code */}
          <div className="bg-white p-6 rounded-2xl mx-auto w-fit">
            <QRCode
              value={wavePaymentData}
              size={200}
              level="H"
              fgColor="#1e3a8a"
            />
          </div>

          <p className="text-blue-200 text-sm">
            Scannez ce QR code avec votre application Wave pour payer
          </p>

          {/* Wave Number */}
          <div className="bg-blue-800/50 rounded-xl p-4">
            <p className="text-blue-200 text-sm mb-2">Ou envoyez manuellement au numero :</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl font-bold text-white">{waveNumber}</span>
              <button
                onClick={handleCopy}
                className="p-2 bg-blue-700 hover:bg-blue-600 rounded-lg transition-colors"
                aria-label="Copier le numero"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-400" />
                ) : (
                  <Copy className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
            {copied && <p className="text-green-400 text-sm mt-2">Numero copie !</p>}
          </div>

          {/* Instructions */}
          <div className="text-left bg-zinc-800/50 rounded-xl p-4 text-sm">
            <p className="text-white font-semibold mb-2">Comment payer :</p>
            <ol className="text-blue-200 space-y-1 list-decimal list-inside">
              <li>Ouvrez votre application Wave</li>
              <li>Scannez le QR code ci-dessus</li>
              <li>Ou envoyez {amount.toLocaleString()} FCFA au {waveNumber}</li>
              <li>Envoyez la capture de paiement sur WhatsApp</li>
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={handleOpenWave}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-6 text-lg font-bold rounded-full"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              Ouvrir Wave
            </Button>
            
            <Button
              asChild
              variant="outline"
              className="w-full bg-green-600 hover:bg-green-500 border-green-500 text-white py-6 text-lg font-bold rounded-full"
            >
              <a
                href={`https://wa.me/2250506007934?text=${encodeURIComponent(`Bonjour WEM-STORE!\n\nJe viens d'effectuer un paiement Wave de ${amount.toLocaleString()} FCFA pour:\n${productName}\n\nJe vous envoie la capture d'écran.`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="w-5 h-5 mr-2" />
                Confirmer sur WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
