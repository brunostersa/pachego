import Head from 'next/head'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import { getTop5City } from '../../../../data/profissionais-merged'
import { topCidadesPorPopulacao } from '../../../../data/cidades-population'
import { normalizeText } from '../../../../utils/normalize'

export default function CidadeFretes({ cidade, estado, profissionais, cidadeDados }) {
  const cidadeDisplay = cidade.replace(/-/g, ' ')
  const estadoUpper = estado.toUpperCase()

  return (
    <>
      <Head>
        <title>Fretes em {cidadeDisplay}, {estadoUpper}</title>
        <meta name="description" content={`Melhores profissionais de fretes e mudanças em ${cidadeDisplay}. Top 5 com avaliações reais.`} />
        <meta name="keywords" content={`frete ${cidadeDisplay}, mudanças ${cidadeDisplay}`} />
      </Head>

      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Hero Section */}
        <div className="relative overflow-hidden py-20 px-4">
          {/* Animated background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="inline-block mb-6 px-4 py-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full">
              <p className="text-sm font-bold text-white uppercase tracking-widest">
                📍 {estadoUpper}
              </p>
            </div>
            <h1 className="text-6xl md:text-7xl font-black text-white mb-4 leading-tight">
              Fretes em<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                {cidadeDisplay}
              </span>
            </h1>
            <p className="text-xl text-gray-200 font-light">
              {cidadeDados?.populacao?.toLocaleString('pt-BR')} habitantes • Conectando você aos melhores profissionais
            </p>
          </div>
        </div>

        {/* Professionals Section */}
        <div className="relative px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
                🏆 Top 5 <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Profissionais</span>
              </h2>
              <p className="text-lg text-gray-300">
                Ranqueados por avaliação e experiência verificada
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {profissionais.map((prof, idx) => (
                <div
                  key={prof.id}
                  className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                >
                  {/* Gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 opacity-90"></div>

                  {/* Animated border gradient */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg -z-10 rounded-2xl"></div>

                  {/* Rank badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                      <span className="font-black text-white">#{idx + 1}</span>
                    </div>
                  </div>

                  <div className="relative p-8">
                    {/* Title and description */}
                    <h3 className="text-2xl font-black text-white mb-2 pr-20">
                      {prof.nome}
                    </h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {prof.descricao}
                    </p>

                    {/* Rating section */}
                    <div className="flex items-end gap-6 mb-8 pb-8 border-b border-gray-700">
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                          {prof.rating}
                        </span>
                        <span className="text-2xl text-yellow-400">⭐</span>
                      </div>
                      <div className="text-sm text-gray-400 font-medium">
                        <p className="text-gray-200 font-bold">{prof.reviews}</p>
                        <p>avaliações</p>
                      </div>
                    </div>

                    {/* CTA buttons */}
                    <div className="flex gap-3">
                      <a
                        href={`https://wa.me/${prof.whatsapp.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 active:scale-95 text-center"
                      >
                        💬 WhatsApp
                      </a>
                      <a
                        href={`tel:${prof.telefone.replace(/\D/g, '')}`}
                        className="flex-1 px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-blue-500 to-cyan-600 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 active:scale-95 text-center"
                      >
                        ☎️ Ligar
                      </a>
                    </div>
                  </div>
                </div>
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
  const { estado, cidade } = params
  const estadoData = topCidadesPorPopulacao[estado.toUpperCase()]
  const cidadeDados = estadoData?.find(c => normalizeText(c.cidade) === cidade)
  if (!cidadeDados) return { notFound: true }
  const profissionais = getTop5City(cidade)
  return { props: { cidade, estado, profissionais: profissionais.length > 0 ? profissionais : [], cidadeDados }, revalidate: 3600 }
}

export async function getStaticPaths() {
  const paths = []
  Object.entries(topCidadesPorPopulacao).forEach(([estado, cidades]) => {
    cidades.forEach(cidade => {
      paths.push({ params: { estado: estado.toLowerCase(), cidade: normalizeText(cidade.cidade) } })
    })
  })
  return { paths, fallback: 'blocking' }
}
