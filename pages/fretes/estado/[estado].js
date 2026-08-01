import Head from 'next/head'
import Link from 'next/link'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import { getTop10CidadesPorEstado } from '../../../data/cidades-population'
import { normalizeText } from '../../../utils/normalize'

export default function EstadoFretes({ estado, cidades }) {
  const estadoUpper = estado.toUpperCase()
  const nomeEstado = {
    'sp': 'São Paulo',
    'rj': 'Rio de Janeiro',
    'mg': 'Minas Gerais',
    'ba': 'Bahia',
    'rs': 'Rio Grande do Sul',
    'pr': 'Paraná',
    'sc': 'Santa Catarina',
    'go': 'Goiás',
    'pe': 'Pernambuco',
    'ce': 'Ceará',
  }[estado.toLowerCase()] || estadoUpper

  const populacaoTotal = cidades.reduce((sum, c) => sum + c.populacao, 0)

  return (
    <>
      <Head>
        <title>Fretes em {nomeEstado} - {cidades.length} Cidades Atendidas</title>
        <meta name="description" content={`Encontre profissionais de fretes e mudanças em ${nomeEstado}. Atendimento em ${cidades.length} cidades.`} />
        <meta name="keywords" content={`frete ${nomeEstado}, mudanças ${nomeEstado}, transporte ${nomeEstado}`} />
      </Head>

      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Hero Section */}
        <div className="relative overflow-hidden py-24 px-4">
          {/* Animated background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          </div>

          <div className="relative max-w-6xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full">
              <p className="text-sm font-bold text-white uppercase tracking-widest">
                🗺️ Estado
              </p>
            </div>
            <h1 className="text-6xl md:text-7xl font-black text-white mb-6 leading-tight">
              Fretes em <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">{nomeEstado}</span>
            </h1>
            <p className="text-2xl text-gray-200 font-light mb-2">
              {cidades.length} cidades conectadas
            </p>
            <p className="text-xl text-gray-300">
              {populacaoTotal.toLocaleString('pt-BR')} habitantes
            </p>
          </div>
        </div>

        {/* Cities Grid */}
        <div className="relative px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-3">
                📊 Principais Cidades
              </h2>
              <p className="text-lg text-gray-300">
                Clique em qualquer cidade para ver os melhores profissionais
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cidades.map((cidade, idx) => (
                <Link
                  key={cidade.cidade}
                  href={`/fretes/cidade/${estado}/${normalizeText(cidade.cidade)}`}
                  className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer"
                >
                  {/* Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 opacity-90"></div>

                  {/* Animated border gradient */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg -z-10 rounded-2xl"></div>

                  {/* Rank badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                      <span className="font-black text-white text-sm">#{idx + 1}</span>
                    </div>
                  </div>

                  <div className="relative p-8">
                    <h3 className="text-2xl font-bold text-white mb-3 pr-16">
                      {cidade.cidade}
                    </h3>

                    <div className="mb-6 pb-6 border-b border-gray-700">
                      <p className="text-gray-300 text-lg font-bold">
                        {cidade.populacao.toLocaleString('pt-BR')}
                      </p>
                      <p className="text-sm text-gray-400">habitantes</p>
                    </div>

                    <div className="flex items-center gap-2 text-purple-300 group-hover:text-purple-200 font-bold transition-colors">
                      <span>Ver profissionais</span>
                      <span className="transform group-hover:translate-x-2 transition-transform">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export async function getStaticProps({ params }) {
  const { estado } = params
  const cidades = getTop10CidadesPorEstado(estado.toUpperCase())
  if (!cidades || cidades.length === 0) return { notFound: true }
  return { props: { estado: estado.toLowerCase(), cidades: cidades.sort((a, b) => b.populacao - a.populacao) }, revalidate: 3600 }
}

export async function getStaticPaths() {
  const estados = ['SP', 'RJ', 'MG', 'BA', 'RS', 'PR', 'SC', 'GO', 'PE', 'CE']
  return { paths: estados.map(e => ({ params: { estado: e.toLowerCase() } })), fallback: 'blocking' }
}
