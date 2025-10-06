import Header from '../components/Header'
import Footer from '../components/Footer'
import ImageCarousel from '../components/ImageCarousel'
import Favicon from '../components/Favicon'

import cidades from '../cidades-filtradas.json'
import { normalizeText } from '../utils/normalize'
import { galleryImages } from '../data/gallery'
import Head from 'next/head'

export default function Home() {
  // Agrupar cidades por estado
  const cidadesPorEstado = cidades.reduce((acc, cidade) => {
    if (!acc[cidade.estado]) {
      acc[cidade.estado] = [];
    }
    acc[cidade.estado].push(cidade);
    return acc;
  }, {});

  // Definir principais cidades (primeiras 5 de cada estado)
  const principaisCidades = Object.keys(cidadesPorEstado).reduce((acc, estado) => {
    acc[estado] = cidadesPorEstado[estado].slice(0, 5);
    return acc;
  }, {});

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
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900 leading-tight">
              Pá-chego Fretes - <span className="text-blue-600">Fretes Rápidos e Mudanças</span> em Goiânia e Região
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
              Serviços de fretes rápidos e mudanças em Goiânia, Trindade, Senador Canedo, 
              Aparecida de Goiânia e região. +25 anos de experiência com equipe confiável.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                              <a 
                  href="https://pachego.com.br/orcar-frete/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-xl transition duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg"
                >
                  📞 Solicite um orçamento
                </a>
              <a 
                href="https://api.whatsapp.com/send?phone=5562991103510&text=Ol%C3%A1!%20vim%20pelo%20site%20gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os!" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-10 rounded-xl transition duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg"
              >
                💬 Falar conosco
              </a>
            </div>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="max-w-6xl mx-auto p-6">

        {/* Estados e Principais Cidades */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Serviços de Frete por Estado
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.keys(cidadesPorEstado).map((estado) => (
              <div key={estado} className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                <div className="bg-blue-600 text-white p-4">
                  <h3 className="text-xl font-bold">{estado}</h3>
                  <p className="text-blue-100 text-sm">
                    {cidadesPorEstado[estado].length} cidades atendidas
                  </p>
                </div>
                
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Principais cidades:</h4>
                  <div className="space-y-2">
                    {principaisCidades[estado].map((cidade, index) => (
                      <a 
                        key={index}
                        href={`/fretes/${estado.toLowerCase()}/${normalizeText(cidade.cidade)}`}
                        className="block text-blue-600 hover:text-blue-800 hover:underline transition duration-200"
                      >
                        • Frete em {cidade.cidade}
                      </a>
                    ))}
                  </div>
                  
                  {cidadesPorEstado[estado].length > 5 && (
                    <div className="mt-4 pt-3 border-t border-gray-200">
                      <a 
                        href={`/fretes/estado/${estado.toLowerCase()}`}
                        className="text-sm text-gray-600 hover:text-blue-600 hover:underline"
                      >
                        Ver todas as {cidadesPorEstado[estado].length} cidades de {estado} →
                      </a>
                    </div>
                  )}
                </div>
              </div>
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
              href="https://pachego.com.br/orcar-frete/"  
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg transition duration-300 hover:bg-gray-100"
            >
              💬 Solicitar Orçamento
            </a>
            <a 
              href="https://api.whatsapp.com/send?phone=5562991103510&text=Ol%C3%A1!%20vim%20pelo%20site%20gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os!" 
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