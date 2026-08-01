import Header from '../components/Header'
import Footer from '../components/Footer'
import ImageCarousel from '../components/ImageCarousel'
import Favicon from '../components/Favicon'
import Link from 'next/link'
import Head from 'next/head'

import { topCidadesPorPopulacao, getTopEstados } from '../data/cidades-population'
import { normalizeText } from '../utils/normalize'
import { galleryImages } from '../data/gallery'

export default function Home({ topEstados, allCidades }) {

  return (
    <div>
      <Head>
        <title>Pá-chego Fretes - Fretes Rápidos e Mudanças em Goiânia e Região</title>
        <meta name="description" content="Pá-chego Fretes oferece serviços de fretes rápidos e mudanças em Goiânia, Trindade, Senador Canedo, Aparecida de Goiânia e região. +25 anos de experiência." />
        <meta name="keywords" content="frete, mudanças, Goiânia, Trindade, Senador Canedo, Aparecida de Goiânia, Pá-chego, frete rápido, mudanças residenciais" />
        <meta name="author" content="Pá-chego Fretes" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://pachego.com.br" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pachego.com.br" />
        <meta property="og:title" content="Pá-chego Fretes - Fretes Rápidos e Mudanças" />
        <meta property="og:description" content="Fretes rápidos e mudanças em Goiânia e região. +25 anos de experiência com equipe confiável e profissional." />
        <meta property="og:image" content="https://www.pachego.com.br/og-image.jpg" />
        
        {/* Twitter Card */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://pachego.com.br" />
        <meta property="twitter:title" content="Pá-chego Fretes - Fretes Rápidos e Mudanças" />
        <meta property="twitter:description" content="Fretes rápidos e mudanças em Goiânia e região. +25 anos de experiência com equipe confiável e profissional." />
        <meta property="twitter:image" content="https://www.pachego.com.br/og-image.jpg" />
      </Head>

      <Favicon />
      <Header />
      
      <main>
        {/* Hero Section - Estilo CIR */}
        <div className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm font-semibold text-blue-600 mb-3 uppercase tracking-wider">
              ✨ Desde 1994 • Brasil Todo
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900 leading-tight">
              Fretes e Mudanças<br />
              <em className="text-blue-600 font-normal">em {topEstados.length}0+ Cidades do Brasil</em>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
              Encontre os melhores profissionais de fretes e mudanças avaliados, com contato direto.
              Cobertura nacional com qualidade garantida.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="/orcamento"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-xl transition duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg"
              >
                💰 Solicitar Orçamento
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=62991103510&text=Ol%C3%A1!%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es!"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-10 rounded-xl transition duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg"
              >
                💬 Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="max-w-6xl mx-auto p-6">

        {/* TOP ESTADOS - Estilo CIR Grid */}
        <div className="mb-16">
          <p className="text-sm font-semibold text-blue-600 mb-3 uppercase tracking-wider text-center">
            🎯 Cobertura Nacional
          </p>
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Os 10 Melhores Estados
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topEstados.map((est) => (
              <Link key={est.estado} href={`/fretes/estado/${est.estado.toLowerCase()}`} className="group block p-6 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all hover:shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition">
                      {est.estado}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {est.cidadesAtendidas} cidades
                    </p>
                  </div>
                  <div className="text-2xl">📍</div>
                </div>

                <p className="text-xs text-gray-600 mb-3 font-semibold">TOP CIDADES:</p>
                <div className="space-y-1 mb-4">
                  {est.cidadesMaiorDemanda.map((cidade, i) => (
                    <p key={i} className="text-sm text-gray-700">
                      {i + 1}. {cidade}
                    </p>
                  ))}
                </div>

                <p className="text-sm text-blue-600 group-hover:text-blue-800 font-semibold transition">
                  Ver tudo →
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Galeria de Trabalhos */}
        <div className="mb-16">
          <ImageCarousel 
            images={galleryImages} 
            title="Tipos de cargas que transportamos"
            autoPlay={true}
            interval={4000}
          />
        </div>



        {/* Serviços */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Nossos Serviços
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition duration-300">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Frete Rápido</h3>
              <p className="text-gray-600 mb-4">
                Entrega rápida e segura para cargas urgentes com prazo 
                garantido e cuidado especial.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Entrega em até 24h</li>
                <li>• Cuidado total</li>
                <li>• Equipamentos próprios</li>
                <li>• Atendimento 24h</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition duration-300">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Frete Econômico</h3>
              <p className="text-gray-600 mb-4">
                Solução ideal para cargas não urgentes com preços competitivos 
                e qualidade garantida.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Preços acessíveis</li>
                <li>• Entrega em 2-5 dias</li>
                <li>• Cuidado especial</li>
                <li>• Motorista educado</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition duration-300">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Frete Empresarial</h3>
              <p className="text-gray-600 mb-4">
                Soluções personalizadas para empresas com contratos mensais 
                e condições especiais.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Contratos mensais</li>
                <li>• Descontos especiais</li>
                <li>• Atendimento dedicado</li>
                <li>• Horários flexíveis</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition duration-300">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Mudanças Residenciais</h3>
              <p className="text-gray-600 mb-4">
                Serviços completos de mudanças com equipe especializada 
                e cuidado total.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Equipe de carregadores</li>
                <li>• Cuidado com móveis</li>
                <li>• Embalagem inclusa</li>
                <li>• Montagem e desmontagem</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition duration-300">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Frete Frágil</h3>
              <p className="text-gray-600 mb-4">
                Cuidado especial para produtos delicados com embalagem 
                e manuseio diferenciado.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Embalagem especial</li>
                <li>• Manuseio cuidadoso</li>
                <li>• Atenção total</li>
                <li>• Proteção garantida</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition duration-300">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Frete de Cargas</h3>
              <p className="text-gray-600 mb-4">
                Transporte de cargas gerais com segurança e pontualidade 
                garantidas.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Cargas gerais</li>
                <li>• Equipamentos próprios</li>
                <li>• Motorista profissional</li>
                <li>• Horários flexíveis</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Por que escolher a Pachego */}
        <div className="bg-gray-50 p-8 rounded-lg mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Por que escolher a Pá-chego Fretes?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">⭐</div>
              <h3 className="font-semibold mb-2 text-gray-900">Nota 5.0</h3>
              <p className="text-sm text-gray-600">Avaliação dos clientes</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="font-semibold mb-2 text-gray-900">Equipe Confiável</h3>
              <p className="text-sm text-gray-600">Profissionais qualificados</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">📅</div>
              <h3 className="font-semibold mb-2 text-gray-900">+25 Anos</h3>
              <p className="text-sm text-gray-600">De experiência no mercado</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🚚</div>
              <h3 className="font-semibold mb-2 text-gray-900">Fretes Rápidos</h3>
              <p className="text-sm text-gray-600">Atendimento 24h</p>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="text-center bg-blue-600 text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">
            Precisa de serviços de frete?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Entre em contato conosco e solicite seu orçamento gratuito!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/form"
              className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg transition duration-300 hover:bg-gray-100"
            >
              💬 Solicitar Orçamento
            </a>
            <a 
              href="https://api.whatsapp.com/send?phone=62991103510&text=Ol%C3%A1!%20vim%20pelo%20site%20gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os!" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-lg transition duration-300 hover:bg-white hover:text-blue-600"
            >
              💬 Falar conosco
            </a>
          </div>
        </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
export async function getStaticProps() {
  const topEstados = getTopEstados()
  const allCidades = Object.values(topCidadesPorPopulacao).flat()

  return {
    props: {
      topEstados,
      allCidades,
    },
    revalidate: 3600,
  }
}
