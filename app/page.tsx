"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Zap, Shield, CreditCard, Smartphone, Truck, Phone, X, Share2 } from "lucide-react"
import { useState } from "react"
import OrderForm from "@/components/order-form"
import PromoMarquee from "@/components/promo-marquee"

function formatPrice(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<{
    name: string
    price: number
    oldPrice: number
    deliveryWave: number
    deliveryCash: number
  } | null>(null)

  const cable240w = {
    name: "Cable USB-C 240W + Support Telephone",
    price: 10000,
    oldPrice: 15000,
    deliveryWave: 1000,
    deliveryCash: 1500,
  }

  const adapter5in1 = {
    name: "Adaptateur 5-en-1 Multi-Fonctions",
    price: 7500,
    oldPrice: 12000,
    deliveryWave: 1000,
    deliveryCash: 1500,
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-brand-navy-dark via-brand-navy to-brand-slate text-foreground">
      <PromoMarquee />

      {selectedProduct && <OrderForm product={selectedProduct} onClose={() => setSelectedProduct(null)} />}

      <div className="relative">
        {/* Navigation avec Logo */}
        <nav className="sticky top-0 z-40 bg-brand-navy-dark/95 backdrop-blur-md border-b border-brand-blue/20">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/images/gemini-generated-image-envbfyenvbfyenvb.png"
                alt="WEM-STORE Logo"
                width={50}
                height={50}
                className="w-12 h-12 md:w-14 md:h-14"
              />
              <div className="flex flex-col">
                <span className="text-brand-blue-light font-bold text-lg md:text-xl tracking-tight">WEM-STORE</span>
                <span className="text-zinc-400 text-xs hidden md:block">{"Votre Boutique Connect\u00e9e"}</span>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setSelectedProduct(cable240w)}
              className="bg-success hover:bg-success/90 border-success text-white"
            >
              <Phone className="w-4 h-4 mr-2" />
              Commander
            </Button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="text-center space-y-8 mb-16 animate-fade-in">
            <div className="inline-block">
              <span className="text-brand-blue-light text-sm tracking-[0.3em] uppercase font-medium">
                {"WEM-STORE - Votre Boutique Tech \u00e0 Abidjan"}
              </span>
            </div>

            <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-balance text-white">
              Accessoires Premium
              <span className="block bg-gradient-to-r from-brand-blue-light to-brand-teal bg-clip-text text-transparent mt-2">
                Pour Tous Vos Appareils
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-zinc-200 max-w-2xl mx-auto text-pretty leading-relaxed">
              {"D\u00e9couvrez nos produits innovants avec livraison rapide \u00e0 Abidjan"}
            </p>

            <div className="flex gap-4 justify-center items-center flex-wrap">
              <Button
                size="lg"
                onClick={() => setSelectedProduct(cable240w)}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-lg px-8 py-6 rounded-full font-bold shadow-xl animate-pulse"
              >
                Commander Maintenant
              </Button>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">{"C\u00e2ble 240W Charge Rapide + Support"}</h2>
              <p className="text-xl text-zinc-300 mb-6">{"Support pliable int\u00e9gr\u00e9 - Chargez en regardant vos vid\u00e9os"}</p>
              <div className="flex justify-center items-center gap-6 flex-wrap">
                <div>
                  <span className="text-2xl line-through text-zinc-400">
                    {formatPrice(cable240w.oldPrice)} FCFA
                  </span>
                </div>
                <div>
                  <span className="text-4xl font-bold text-cyan-400">{formatPrice(cable240w.price)} FCFA</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div
                className="group cursor-pointer md:col-span-2 lg:col-span-3"
                onClick={() => setSelectedProduct(cable240w)}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:border-cyan-400">
                  <video src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/_storage_emulated_0_Android_data_com.fawazapp.blackhole_files_DCIM_blackhole_PDP5EB83F8%201-k6ZorvTkxf5cHUxn0y1tOcFlUmDewY.mp4" autoPlay loop muted playsInline className="w-full h-auto" />
                  <div className="p-4 bg-zinc-900">
                    <p className="text-white font-medium text-center">
                      {"D\u00e9monstration du c\u00e2ble 240W avec support pliable"}
                    </p>
                    <p className="text-cyan-400 text-sm text-center mt-2">Cliquez pour commander</p>
                  </div>
                </Card>
              </div>

              {/* Image sp\u00e9ciale iPhone 6-14 Pro Max */}
              <div
                className="group cursor-pointer md:col-span-2 lg:col-span-3"
                onClick={() => setSelectedProduct(cable240w)}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:border-cyan-400 border-2 border-cyan-500/50">
                  <div className="relative">
                    <Image
                      src="/images/alibaba93b99b744ec6fd2fd6a8fa6eca60f840-original-1.png"
                      alt="Type-C to Lightning - Compatible iPhone 6 \u00e0 14 Pro Max"
                      width={800}
                      height={800}
                      className="w-full h-auto"
                    />
                    <div className="absolute top-4 left-4 bg-cyan-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                      iPhone 6 - 14 Pro Max
                    </div>
                  </div>
                  <div className="p-4 bg-zinc-900">
                    <p className="text-white font-bold text-xl text-center mb-2">Type-C vers Lightning - Pour iPhone</p>
                    <p className="text-zinc-300 text-center mb-3">Compatible iPhone 6, 7, 8, X, XR, XS, 11, 12, 13, 14 Pro Max</p>
                    <p className="text-cyan-400 text-sm text-center">Cliquez pour commander</p>
                  </div>
                </Card>
              </div>

              {[
                { src: "/images/1766778459643-20-20copie.png", desc: "C\u00e2ble tress\u00e9 avec serre-c\u00e2ble et support m\u00e9tal" },
                { src: "/images/1766778407224.png", desc: "Support t\u00e9l\u00e9phone pliable int\u00e9gr\u00e9" },
                { src: "/images/1766778442891.png", desc: "C\u00e2ble haute r\u00e9sistance 240W" },
                { src: "/images/1766778452804.png", desc: "Compatible tous appareils" },
              ].map((image, i) => (
                <div key={i} className="group cursor-pointer" onClick={() => setSelectedProduct(cable240w)}>
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:border-cyan-400">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.desc}
                      width={400}
                      height={400}
                      className="w-full h-auto"
                    />
                    <div className="p-4 bg-zinc-900">
                      <p className="text-white font-medium text-center">{image.desc}</p>
                      <p className="text-cyan-400 text-sm text-center mt-2">Cliquez pour commander</p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>

            <div className="flex gap-4 justify-center items-center flex-wrap mb-8">
              <Button
                size="lg"
                onClick={() => setSelectedProduct(cable240w)}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-lg px-8 py-6 rounded-full font-bold shadow-xl animate-pulse"
              >
                Commander Maintenant
              </Button>

              <Button
                size="lg"
                onClick={() => setSelectedProduct(cable240w)}
                className="bg-info hover:bg-info/90 text-white text-lg px-8 py-6 rounded-full font-bold shadow-xl animate-pulse"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Payer avec Wave
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-zinc-900 py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">Adaptateur 5-en-1 Multi-Fonctions</h2>
                <p className="text-xl text-zinc-300 mb-6">
                  {"Lecteur SIM, Carte M\u00e9moire, USB, Type-C - Charge rapide 60W"}
                </p>
                <div className="flex justify-center items-center gap-6 flex-wrap">
                  <div>
                    <span className="text-2xl line-through text-zinc-400">
                      {formatPrice(adapter5in1.oldPrice)} FCFA
                    </span>
                  </div>
                  <div>
                    <span className="text-4xl font-bold text-cyan-400">{formatPrice(adapter5in1.price)} FCFA</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {[
                  { src: "/images/1767547079318.png", desc: "Design compact - Tous les 5 adaptateurs int\u00e9gr\u00e9s" },
                  { src: "/images/1767547011225.png", desc: "Kit complet avec c\u00e2bles et adaptateurs" },
                  { src: "/images/1767549447648.png", desc: "Compatible avec tous vos appareils Apple & Android" },
                  { src: "/images/1767547143112.png", desc: "Solution 6-en-1 avec bo\u00eetier de rangement SIM/cartes" },
                  { src: "/images/cache-2.png", desc: "Adaptateur compact 5-en-1 avec lecteur SIM" },
                  { src: "/images/cacje4.png", desc: "Charge rapide 60W pour tous appareils" },
                ].map((image, i) => (
                  <div key={i} className="group cursor-pointer" onClick={() => setSelectedProduct(adapter5in1)}>
                    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:border-cyan-400">
                      <Image
                        src={image.src || "/placeholder.svg"}
                        alt={image.desc}
                        width={400}
                        height={400}
                        className="w-full h-auto"
                      />
                      <div className="p-4 bg-zinc-800">
                        <p className="text-white font-medium text-center">{image.desc}</p>
                        <p className="text-cyan-400 text-sm text-center mt-2">Cliquez pour commander</p>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 justify-center items-center flex-wrap mb-8">
                <Button
                  size="lg"
                  onClick={() => setSelectedProduct(adapter5in1)}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-lg px-8 py-6 rounded-full font-bold shadow-xl animate-pulse"
                >
                  Commander Maintenant
                </Button>

                <Button
                  size="lg"
                  onClick={() => setSelectedProduct(adapter5in1)}
                  className="bg-info hover:bg-info/90 text-white text-lg px-8 py-6 rounded-full font-bold shadow-xl animate-pulse"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payer avec Wave
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-zinc-900 py-24 md:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-balance text-white">{"Pourquoi Nous Choisir ?"}</h2>
              <p className="text-xl text-zinc-300 max-w-2xl mx-auto text-pretty">
                {"Le c\u00e2ble le plus avanc\u00e9 du march\u00e9 ivoirien"}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="p-8 bg-zinc-800 border-zinc-700 hover:border-violet-500 transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-violet-500 text-white w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">240W Ultra-Rapide</h3>
                <p className="text-zinc-300 leading-relaxed">
                  {"Charge votre MacBook, iPad, iPhone ou Android en un temps record. Transfert de donn\u00e9es \u00e0 480Mbps"}
                </p>
              </Card>

              <Card className="p-8 bg-zinc-800 border-zinc-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-blue-500 text-white w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <Smartphone className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Support Pliable</h3>
                <p className="text-zinc-300 leading-relaxed">
                  {"Support t\u00e9l\u00e9phone int\u00e9gr\u00e9 et pliable. Regardez vos vid\u00e9os ou jouez tout en chargeant confortablement"}
                </p>
              </Card>

              <Card className="p-8 bg-zinc-800 border-zinc-700 hover:border-green-500 transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-green-500 text-white w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{"100% S\u00e9curis\u00e9"}</h3>
                <p className="text-zinc-300 leading-relaxed">
                  {"Protection intelligente contre surchauffe, surtension et court-circuit. Certifi\u00e9 pour votre s\u00e9curit\u00e9"}
                </p>
              </Card>

              <Card className="p-8 bg-zinc-800 border-zinc-700 hover:border-pink-500 transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-pink-500 text-white w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <X className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{"Qualit\u00e9 Premium"}</h3>
                <p className="text-zinc-300 leading-relaxed">
                  {"C\u00e2ble tress\u00e9 ultra-r\u00e9sistant. Test\u00e9 pour 30.000+ flexions. Dure des ann\u00e9es sans s\u2019ab\u00eemer"}
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Compatibility Section */}
        <section className="bg-gradient-to-br from-info via-brand-blue to-brand-navy py-24 md:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">Compatible avec Tous vos Appareils</h2>
              <p className="text-xl text-white/90">{"iPhone, Android, MacBook, iPad et plus encore"}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 text-center hover:shadow-xl transition-all transform hover:-translate-y-2">
                <div className="text-5xl mb-4">{"🍎"}</div>
                <h3 className="text-2xl font-bold mb-3 text-white">Apple</h3>
                <p className="text-white/80">
                  iPhone 15, 16, 17
                  <br />
                  MacBook Pro, iPad Pro
                </p>
              </Card>

              <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 text-center hover:shadow-xl transition-all transform hover:-translate-y-2">
                <div className="text-5xl mb-4">{"📱"}</div>
                <h3 className="text-2xl font-bold mb-3 text-white">Android</h3>
                <p className="text-white/80">
                  Samsung, Huawei
                  <br />
                  Xiaomi, Honor, Oppo
                </p>
              </Card>

              <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 text-center hover:shadow-xl transition-all transform hover:-translate-y-2">
                <div className="text-5xl mb-4">{"💻"}</div>
                <h3 className="text-2xl font-bold mb-3 text-white">Ordinateurs</h3>
                <p className="text-white/80">
                  Laptops USB-C
                  <br />
                  Tablettes, Consoles
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="bg-gradient-to-b from-violet-950/20 to-blue-950/20 py-24 md:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-balance">{"Chargez en Toute Libert\u00e9"}</h2>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">{"Le c\u00e2ble qui s\u2019adapte \u00e0 votre style de vie"}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="p-8 bg-zinc-900 border-zinc-800 text-center hover:shadow-xl hover:border-violet-500 transition-all transform hover:-translate-y-2">
                <div className="text-6xl mb-4">{"🎮"}</div>
                <h3 className="text-2xl font-bold mb-3">Gaming</h3>
                <p className="text-zinc-400">{"Jouez confortablement avec le support int\u00e9gr\u00e9 tout en chargeant"}</p>
              </Card>

              <Card className="p-8 bg-zinc-900 border-zinc-800 text-center hover:shadow-xl hover:border-blue-500 transition-all transform hover:-translate-y-2">
                <div className="text-6xl mb-4">{"📺"}</div>
                <h3 className="text-2xl font-bold mb-3">{"Vid\u00e9os"}</h3>
                <p className="text-zinc-400">{"Regardez Netflix, YouTube \u00e0 l\u2019angle parfait pendant la charge"}</p>
              </Card>

              <Card className="p-8 bg-zinc-900 border-zinc-800 text-center hover:shadow-xl hover:border-pink-500 transition-all transform hover:-translate-y-2">
                <div className="text-6xl mb-4">{"💼"}</div>
                <h3 className="text-2xl font-bold mb-3">Travail</h3>
                <p className="text-zinc-400">{"Visioconf\u00e9rence mains-libres avec votre t\u00e9l\u00e9phone bien positionn\u00e9"}</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Order Process Section */}
        <section className="bg-gradient-to-br from-brand-slate/30 to-brand-navy/30 py-24 md:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">{"Commande Facile & Rapide"}</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="p-8 bg-gradient-to-br from-brand-slate to-info border-brand-blue/30 text-center hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className="bg-white/20 text-white w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto backdrop-blur-sm">
                  <Truck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Livraison Rapide</h3>
                <p className="text-white/90 mb-4 font-medium">{"Livraison partout \u00e0 Abidjan sous 24-48h"}</p>
                <div className="space-y-2 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <p className="text-sm text-white font-semibold">
                    {"Paiement \u00e0 l\u2019avance (Wave): "}<span className="font-bold text-white text-base">1.000 FCFA</span>
                  </p>
                  <p className="text-sm text-white font-semibold">
                    {"Paiement \u00e0 la livraison: "}<span className="font-bold text-white text-base">1.500 FCFA</span>
                  </p>
                </div>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-success to-success/80 border-success/50 text-center hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className="bg-white/20 text-white w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto backdrop-blur-sm">
                  <Phone className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Paiement WhatsApp</h3>
                <p className="text-white/90 mb-4 font-medium">{"Commandez et confirmez directement via WhatsApp"}</p>
                <p className="text-2xl font-bold text-white bg-white/20 px-4 py-2 rounded-lg inline-block">0506007934</p>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-info to-brand-blue border-info/50 text-center hover:shadow-2xl transition-all transform hover:-translate-y-2">
                <div className="bg-white/20 text-white w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto backdrop-blur-sm">
                  <CreditCard className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{"Wave Accept\u00e9"}</h3>
                <p className="text-white/90 mb-4 font-semibold">{"Payez facilement avec Wave Mobile Money"}</p>
                <p className="text-lg font-bold text-white bg-white/20 px-4 py-2 rounded-lg inline-block">0506007934</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Specs Section */}
        <section className="bg-zinc-50 text-zinc-900 py-24 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center">{"Sp\u00e9cifications Techniques"}</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="border-b border-zinc-300 pb-6">
                  <h3 className="text-zinc-600 text-sm uppercase tracking-wider mb-2">Puissance de Charge</h3>
                  <p className="text-3xl font-bold">240W Maximum</p>
                </div>

                <div className="border-b border-zinc-300 pb-6">
                  <h3 className="text-zinc-600 text-sm uppercase tracking-wider mb-2">{"Transfert de donn\u00e9es"}</h3>
                  <p className="text-3xl font-bold">480 Mbps</p>
                </div>

                <div className="border-b border-zinc-300 pb-6">
                  <h3 className="text-zinc-600 text-sm uppercase tracking-wider mb-2">{"Mat\u00e9riau"}</h3>
                  <p className="text-3xl font-bold">{"Nylon Tress\u00e9"}</p>
                </div>

                <div className="border-b border-zinc-300 pb-6">
                  <h3 className="text-zinc-600 text-sm uppercase tracking-wider mb-2">{"Support T\u00e9l\u00e9phone"}</h3>
                  <p className="text-3xl font-bold">{"Pliable en m\u00e9tal"}</p>
                </div>

                <div className="border-b border-zinc-300 pb-6">
                  <h3 className="text-zinc-600 text-sm uppercase tracking-wider mb-2">Connecteur</h3>
                  <p className="text-3xl font-bold">USB-C</p>
                </div>

                <div className="border-b border-zinc-300 pb-6">
                  <h3 className="text-zinc-600 text-sm uppercase tracking-wider mb-2">Longueur</h3>
                  <p className="text-3xl font-bold">{"1.2 m\u00e8tres"}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="bg-gradient-to-br from-brand-blue via-info to-brand-teal relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="container relative z-10 mx-auto px-4 text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-balance text-white drop-shadow-lg">
              {"Offre Limit\u00e9e !"}
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto text-pretty leading-relaxed">
              {"Stock limit\u00e9 ! Commandez maintenant et profitez de la livraison rapide \u00e0 Abidjan"}
            </p>

            <div className="bg-white/15 backdrop-blur-md rounded-3xl p-8 max-w-2xl mx-auto mb-12 border border-white/30">
              <div className="flex justify-between items-center mb-6">
                <span className="text-2xl font-bold text-white">Prix Normal:</span>
                <span className="text-2xl line-through text-zinc-300 font-bold">15.000 FCFA</span>
              </div>
              <div className="flex justify-between items-center mb-6 pb-6 border-b border-white/30">
                <span className="text-2xl font-bold text-white">Prix Promo:</span>
                <span className="text-4xl font-bold text-white drop-shadow-lg">10.000 FCFA</span>
              </div>
              <div className="space-y-2 text-lg">
                <div className="flex justify-between items-center">
                  <span className="text-white/90">Livraison Abidjan (Wave):</span>
                  <span className="font-bold text-white">+ 1.000 FCFA</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-white/30">
                  <span className="text-white/90">{"Livraison Abidjan (\u00e0 la livraison):"}</span>
                  <span className="font-bold text-white">+ 1.500 FCFA</span>
                </div>
                <div className="flex justify-between items-center pt-4 text-2xl">
                  <span className="font-bold text-white">TOTAL:</span>
                  <span className="font-bold text-white drop-shadow-lg">10.500 - 11.000 FCFA</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center items-center flex-wrap">
              <Button
                size="lg"
                onClick={() => setSelectedProduct(cable240w)}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-lg px-12 py-6 rounded-full font-bold shadow-2xl transform hover:scale-105 transition-all animate-pulse"
              >
                Commander Maintenant
              </Button>

              <Button
                size="lg"
                onClick={() => setSelectedProduct(cable240w)}
                className="bg-info hover:bg-info/90 text-white text-lg px-8 py-6 rounded-full font-bold shadow-xl animate-pulse"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Payer avec Wave
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-brand-blue/20 bg-brand-navy-dark/80 backdrop-blur-sm py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center gap-6 mb-8">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/gemini-generated-image-envbfyenvbfyenvb.png"
                  alt="WEM-STORE Logo"
                  width={60}
                  height={60}
                  className="w-16 h-16"
                />
                <div className="flex flex-col">
                  <span className="text-brand-blue-light font-bold text-2xl tracking-tight">WEM-STORE</span>
                  <span className="text-zinc-400 text-sm">{"Votre Boutique Connect\u00e9e"}</span>
                </div>
              </div>
              <p className="text-zinc-400 text-center max-w-md">
                {"Votre destination pour des accessoires tech de qualit\u00e9 \u00e0 Abidjan. Livraison rapide et paiement s\u00e9curis\u00e9."}
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-center text-zinc-400 text-sm">
              <div>
                <span className="block mb-2">Contactez-nous</span>
                <button onClick={() => setSelectedProduct(cable240w)} className="block mb-2 hover:text-cyan-400 transition-colors">
                  <Phone className="w-4 h-4 mr-2 inline-block" />
                  Commander: 0506007934
                </button>
                <span className="block">{"📍 Abidjan, C\u00f4te d\u2019Ivoire"}</span>
              </div>

              <div>
                <span className="block mb-3">Partagez avec vos proches</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: "WEM-STORE - Accessoires Premium",
                        text: "D\u00e9couvrez les accessoires tech de qualit\u00e9 chez WEM-STORE. Livraison rapide \u00e0 Abidjan!",
                        url: window.location.href,
                      })
                    } else {
                      navigator.clipboard.writeText(window.location.href)
                      alert("Lien copi\u00e9 dans le presse-papier!")
                    }
                  }}
                  className="border-brand-blue/40 text-brand-blue-light hover:bg-brand-blue/10"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Republier
                </Button>
              </div>
            </div>

            <p className="mt-8 text-xs text-zinc-600">
              {"© 2025 WEM-STORE. Tous droits r\u00e9serv\u00e9s. Livraison rapide partout \u00e0 Abidjan."}
            </p>
          </div>
        </footer>
      </div>
    </main>
  )
}
