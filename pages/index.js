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
        {/* Hero Section - Modern Startup */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-32 px-6">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
          </div>

          <div className="relative max-w-6xl mx-auto text-center">
            <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full">
              <p className="text-sm font-bold text-white uppercase tracking-widest">
                ⚡ Marketplace Nacional de Fretes
              </p>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 text-white leading-tight">
              Fretes &<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                Mudanças
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 mb-4 max-w-4xl mx-auto leading-relaxed font-light">
              Conectando profissionais certificados com clientes em
            </p>
            <p className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-12">
              100+ cidades do Brasil
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/orcamento"
                className="group relative px-8 py-4 font-bold text-white overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl"
                style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity"></div>
                <span className="relative">💰 Solicitar Orçamento</span>
              </a>

              <a
                href="https://api.whatsapp.com/send?phone=62991103510&text=Ol%C3%A1!%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es!"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-4 font-bold text-white overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl"
                style={{background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'}}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity"></div>
                <span className="relative">💬 Falar no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="max-w-6xl mx-auto p-6">

        {/* TOP ESTADOS - Modern Startup Grid */}
        <div className="mb-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full">
                <p className="text-sm font-bold text-purple-600 uppercase tracking-wider">
                  📊 Cobertura em Tempo Real
                </p>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
                Top 10 <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Estados</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Acesse as principais cidades onde a demanda por fretes é maior
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {topEstados.map((est, idx) => (
                <Link
                  key={est.estado}
                  href={`/fretes/estado/${est.estado.toLowerCase()}`}
                  className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                >
                  {/* Gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 opacity-90 group-hover:opacity-95 transition-opacity"></div>

                  {/* Animated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Border gradient effect */}
                  <div className="absolute inset-0 rounded-2xl border border-gradient-to-r from-purple-400/20 to-blue-400/20 group-hover:from-purple-400/40 group-hover:to-blue-400/40 transition-all"></div>

                  <div className="relative p-8 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex-1">
                        <div className="inline-block px-3 py-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mb-3">
                          <span className="text-xs font-bold text-white">#{idx + 1}</span>
                        </div>
                        <h3 className="text-4xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-blue-300 transition">
                          {est.estado}
                        </h3>
                        <p className="text-sm text-gray-300 mt-2 font-medium">
                          {est.cidadesAtendidas} cidades conectadas
                        </p>
                      </div>
                      <div className="text-4xl transform group-hover:scale-125 transition-transform">📍</div>
                    </div>

                    <div className="flex-1">
                      <p className="text-xs text-gray-400 mb-4 font-bold uppercase tracking-wider">
                        ⭐ Principais Cidades
                      </p>
                      <div className="space-y-2 mb-6">
                        {est.cidadesMaiorDemanda.map((cidade, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="text-purple-400 font-bold text-sm">{i + 1}.</span>
                            <span className="text-gray-200 text-sm">{cidade}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-purple-300 group-hover:text-purple-200 font-bold text-sm transition-colors">
                      <span>Explorar</span>
                      <span className="transform group-hover:translate-x-2 transition-transform">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
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



        {/* Serviços - Modern Cards */}
        <div className="mb-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full">
                <p className="text-sm font-bold text-purple-600 uppercase tracking-wider">
                  🎯 Serviços
                </p>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
                Soluções para <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Todos</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: '🚚', title: 'Frete Rápido', desc: 'Entrega urgente em até 24h', features: ['Entrega em até 24h', 'Cuidado total', 'Equipamentos próprios', 'Atendimento 24h'] },
                { icon: '💰', title: 'Frete Econômico', desc: 'Opção acessível e confiável', features: ['Preços acessíveis', 'Entrega em 2-5 dias', 'Cuidado especial', 'Motorista educado'] },
                { icon: '🏢', title: 'Frete Empresarial', desc: 'Soluções B2B personalizadas', features: ['Contratos mensais', 'Descontos especiais', 'Atendimento dedicado', 'Horários flexíveis'] },
                { icon: '🏠', title: 'Mudanças Residenciais', desc: 'Serviço completo de mudanças', features: ['Equipe de carregadores', 'Cuidado com móveis', 'Embalagem inclusa', 'Montagem/desmontagem'] },
                { icon: '⚡', title: 'Frete Frágil', desc: 'Proteção para itens delicados', features: ['Embalagem especial', 'Manuseio cuidadoso', 'Atenção total', 'Proteção garantida'] },
                { icon: '📦', title: 'Frete de Cargas', desc: 'Transporte de cargas gerais', features: ['Cargas gerais', 'Equipamentos próprios', 'Motorista profissional', 'Horários flexíveis'] },
              ].map((service, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer"
                >
                  {/* Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 group-hover:from-slate-900 group-hover:to-slate-800 transition-colors duration-500"></div>

                  {/* Gradient accent */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg -z-10"></div>

                  <div className="relative p-8 h-full">
                    <div className="text-5xl mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                      {service.icon}
                    </div>

                    <h3 className="text-2xl font-bold mb-2 text-gray-900 group-hover:text-white transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 group-hover:text-gray-200 mb-6 transition-colors">
                      {service.desc}
                    </p>

                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li
                          key={i}
                          className="text-sm text-gray-600 group-hover:text-gray-200 flex items-center gap-2 transition-colors"
                        >
                          <span className="text-purple-500 group-hover:text-purple-300">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose - Modern Stats */}
        <div className="mb-24 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-black text-center mb-16 text-gray-900">
              Por que <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">somos diferentes</span>?
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '⭐', stat: '4.9', label: 'Nota Média', sub: 'De 50+ profissionais' },
                { icon: '👥', stat: '50+', label: 'Profissionais', sub: 'Verificados e certificados' },
                { icon: '🌍', stat: '100+', label: 'Cidades', sub: 'Em todo o Brasil' },
                { icon: '🚀', stat: '24h', label: 'Suporte', sub: 'Atendimento sempre ativo' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-500"></div>
                  <div className="relative p-8 text-center">
                    <div className="text-5xl mb-4 transform group-hover:scale-150 group-hover:rotate-12 transition-all duration-300">
                      {item.icon}
                    </div>
                    <div className="text-4xl font-black text-gray-900 group-hover:text-white transition-colors mb-2">
                      {item.stat}
                    </div>
                    <p className="font-bold text-gray-900 group-hover:text-white transition-colors">
                      {item.label}
                    </p>
                    <p className="text-sm text-gray-600 group-hover:text-gray-100 transition-colors mt-1">
                      {item.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Final - Modern */}
        <div className="mb-8 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-16 text-white">
              {/* Animated background */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
              </div>

              <div className="relative text-center">
                <h2 className="text-5xl md:text-6xl font-black mb-6">
                  Pronto para <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300">começar?</span>
                </h2>
                <p className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed">
                  Conecte-se com profissionais certificados ou anuncie seu serviço em nosso marketplace. Gratuito e sem compromisso.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <a
                    href="/form"
                    className="group relative px-10 py-5 font-bold text-lg rounded-2xl overflow-hidden transition-all duration-300 hover:scale-110 active:scale-95"
                    style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity"></div>
                    <span className="relative">📋 Solicitar Orçamento</span>
                  </a>

                  <a
                    href="https://api.whatsapp.com/send?phone=62991103510&text=Ol%C3%A1!%20vim%20pelo%20site%20gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative px-10 py-5 font-bold text-lg rounded-2xl overflow-hidden transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-white"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-white transition-opacity"></div>
                    <span className="relative">💬 Falar com especialista</span>
                  </a>
                </div>
              </div>
            </div>
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
