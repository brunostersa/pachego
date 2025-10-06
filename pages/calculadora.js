import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Favicon from '../components/Favicon'
import CalculadoraSimples from '../components/CalculadoraSimples'

export default function CalculadoraPage() {
  return (
    <>
      <Head>
        <title>Calculadora de Frete - Pá-chego Fretes | Orçamento Online</title>
        <meta name="description" content="Calcule o valor do seu frete online. Ferramenta gratuita para estimar preços de frete e mudanças em Goiânia e região. Orçamento rápido e preciso." />
        <meta name="keywords" content="calculadora de frete, orçamento frete online, preço frete Goiânia, calculadora mudanças, frete rápido Goiânia" />
        <meta name="author" content="Pá-chego Fretes" />
        <link rel="canonical" href="https://pachego.com.br/calculadora" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Calculadora de Frete - Pá-chego Fretes" />
        <meta property="og:description" content="Calcule o valor do seu frete online. Ferramenta gratuita para estimar preços de frete e mudanças em Goiânia e região." />
        <meta property="og:url" content="https://pachego.com.br/calculadora" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Calculadora de Frete - Pá-chego Fretes" />
        <meta name="twitter:description" content="Calcule o valor do seu frete online. Ferramenta gratuita para estimar preços." />
      </Head>
      
      <Favicon />
      
      <Header />
      
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Calculadora de Frete
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simples, rápido e preciso. Calcule o valor do seu frete em segundos.
            </p>
          </div>

          {/* Calculadora */}
          <div className="flex justify-center mb-20">
            <CalculadoraSimples />
          </div>

          {/* Benefícios */}
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Rápido</h3>
                <p className="text-gray-600">Cálculo instantâneo em segundos</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Preciso</h3>
                <p className="text-gray-600">Baseado em distâncias reais</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💯</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Simples</h3>
                <p className="text-gray-600">Interface limpa e intuitiva</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  )
} 