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
        {/* Hero - Nubank Minimalista */}
        <div className="bg-white py-20 px-6 border-b border-gray-200">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm font-semibold text-gray-600 mb-8 uppercase tracking-wider">
              Fretes e mudanças em todo o Brasil
            </p>

            <h1 className="text-5xl md:text-6xl font-bold mb-8 text-gray-900 leading-tight">
              Conecte-se aos<br />
              <span className="text-gray-400">melhores profissionais</span>
            </h1>

            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Encontre empresas de frete e mudanças avaliadas em mais de 100 cidades do Brasil. Transparência, confiabilidade e atendimento 24h.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/orcamento"
                className="px-8 py-3 font-semibold text-white bg-gray-900 rounded hover:bg-gray-800 transition-colors duration-200"
              >
                Solicitar Orçamento
              </a>

              <a
                href="https://api.whatsapp.com/send?phone=62991103510&text=Ol%C3%A1!%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es!"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 font-semibold text-gray-900 border-2 border-gray-900 rounded hover:bg-gray-50 transition-colors duration-200"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-20">

        {/* TOP ESTADOS - Minimalista */}
        <div className="mb-32">
          <div className="mb-16">
            <p className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">
              Cobertura Nacional
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Os 10 principais estados
            </h2>
            <p className="text-lg text-gray-600">
              Acesse as principais cidades onde você precisa de frete ou mudança.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topEstados.map((est, idx) => (
              <Link
                key={est.estado}
                href={`/fretes/estado/${est.estado.toLowerCase()}`}
                className="group block p-6 border border-gray-200 rounded-lg hover:border-gray-900 hover:bg-gray-50 transition-all duration-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs text-gray-500 font-semibold mb-2">#{idx + 1}</p>
                    <h3 className="text-3xl font-bold text-gray-900">
                      {est.estado}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {est.cidadesAtendidas} cidades
                    </p>
                  </div>
                  <div className="text-2xl">📍</div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 font-semibold mb-3 uppercase">Principais cidades</p>
                  <div className="space-y-2 mb-4">
                    {est.cidadesMaiorDemanda.map((cidade, i) => (
                      <p key={i} className="text-sm text-gray-700">
                        {i + 1}. {cidade}
                      </p>
                    ))}
                  </div>
                </div>

                <p className="text-sm text-gray-900 font-semibold group-hover:underline transition">
                  Ver cidades →
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Galeria */}
        <div className="mb-32">
          <ImageCarousel
            images={galleryImages}
            title="Tipos de cargas que transportamos"
            autoPlay={true}
            interval={4000}
          />
        </div>

        {/* Serviços - Minimalista */}
        <div className="mb-32">
          <div className="mb-16">
            <p className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">
              Serviços
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Soluções para todos os tipos de carga
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🚚', title: 'Frete Rápido', desc: 'Entrega em até 24h', features: ['Entrega rápida', 'Cuidado total', 'Equipamentos próprios'] },
              { icon: '💰', title: 'Frete Econômico', desc: 'Opção acessível', features: ['Preços competitivos', 'Entrega em 2-5 dias', 'Qualidade garantida'] },
              { icon: '🏢', title: 'Frete Empresarial', desc: 'Soluções B2B', features: ['Contratos mensais', 'Atendimento dedicado', 'Horários flexíveis'] },
              { icon: '🏠', title: 'Mudanças Residenciais', desc: 'Mudanças completas', features: ['Equipe especializada', 'Embalagem inclusa', 'Montagem/desmontagem'] },
              { icon: '⚡', title: 'Frete Frágil', desc: 'Proteção especial', features: ['Embalagem especial', 'Manuseio cuidadoso', 'Proteção total'] },
              { icon: '📦', title: 'Frete de Cargas', desc: 'Cargas gerais', features: ['Qualquer tipo de carga', 'Segurança garantida', 'Pontualidade'] },
            ].map((service, idx) => (
              <div
                key={idx}
                className="p-6 border border-gray-200 rounded-lg hover:border-gray-900 hover:bg-gray-50 transition-all duration-200"
              >
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{service.desc}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="text-sm text-gray-700 flex items-center gap-2">
                      <span className="text-gray-900">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Por que escolher */}
        <div className="mb-32">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Por que confiar em nós
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '⭐', stat: '4.9', label: 'Nota média', sub: '50+ profissionais' },
              { icon: '👥', stat: '50+', label: 'Profissionais', sub: 'Verificados' },
              { icon: '🌍', stat: '100+', label: 'Cidades', sub: 'Em todo Brasil' },
              { icon: '🕐', stat: '24h', label: 'Suporte', sub: 'Sempre disponível' },
            ].map((item, idx) => (
              <div key={idx} className="p-6 border border-gray-200 rounded-lg text-center hover:border-gray-900 transition-all duration-200">
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{item.stat}</div>
                <p className="font-semibold text-gray-900 mb-1">{item.label}</p>
                <p className="text-sm text-gray-600">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Final */}
        <div className="bg-gray-900 text-white p-12 rounded-lg text-center">
          <h2 className="text-4xl font-bold mb-6">
            Pronto para começar?
          </h2>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            Conecte-se com profissionais certificados ou anuncie seu serviço. Gratuito e sem compromisso.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/form"
              className="px-8 py-3 font-semibold text-gray-900 bg-white rounded hover:bg-gray-100 transition-colors duration-200"
            >
              Solicitar Orçamento
            </a>

            <a
              href="https://api.whatsapp.com/send?phone=62991103510&text=Ol%C3%A1!%20vim%20pelo%20site%20gostaria%20de%20saber%20mais!"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 font-semibold text-white border-2 border-white rounded hover:bg-gray-800 transition-colors duration-200"
            >
              Falar no WhatsApp
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
