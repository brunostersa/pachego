import Head from 'next/head'
import Favicon from '../components/Favicon'
import CalculadoraSimples from '../components/CalculadoraSimples'
import Image from 'next/image'

export default function CalculadoraPage() {
  return (
    <>
      <Head>
        <title>Calculadora de Frete - Pá-chego Fretes | Orçamento Online</title>
        <meta name="description" content="Calcule o valor do seu frete online. Ferramenta gratuita para estimar preços de frete e mudanças em Goiânia e região. Orçamento rápido e preciso." />
        <meta name="keywords" content="calculadora de frete, orçamento frete online, preço frete Goiânia, calculadora mudanças, frete rápido Goiânia" />
        <meta name="author" content="Pá-chego Fretes" />
        <link rel="canonical" href="https://pachego.com.br/form" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Calculadora de Frete - Pá-chego Fretes" />
        <meta property="og:description" content="Calcule o valor do seu frete online. Ferramenta gratuita para estimar preços de frete e mudanças em Goiânia e região." />
        <meta property="og:url" content="https://pachego.com.br/form" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Calculadora de Frete - Pá-chego Fretes" />
        <meta name="twitter:description" content="Calcule o valor do seu frete online. Ferramenta gratuita para estimar preços." />
      </Head>
      
      <Favicon />
      
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
        <div className="container mx-auto px-4">
          {/* Logo Centralizado */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Image
                src="/logo.png"
                alt="Pá-chego Fretes"
                width={200}
                height={80}
                className="object-contain"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Calcule seu transporte com a Pá-chego
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simples, rápido e preciso. Calcule o valor do seu frete em segundos.
            </p>
          </div>

          {/* Calculadora */}
          <div className="flex justify-center">
            <CalculadoraSimples />
          </div>
        </div>
      </main>
    </>
  )
} 