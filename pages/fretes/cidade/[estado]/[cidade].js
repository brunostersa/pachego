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
      <main>
        {/* Hero */}
        <div className="bg-white py-16 px-6 border-b border-gray-200">
          <div className="max-w-6xl mx-auto">
            <p className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">
              {estadoUpper}
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Fretes em {cidadeDisplay}
            </h1>
            <p className="text-lg text-gray-600">
              {cidadeDados?.populacao?.toLocaleString('pt-BR')} habitantes
            </p>
          </div>
        </div>

        {/* Profissionais */}
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="mb-16">
            <p className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">
              Melhores avaliados
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Top 5 profissionais
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {profissionais.map((prof, idx) => (
              <div
                key={prof.id}
                className="p-6 border border-gray-200 rounded-lg hover:border-gray-900 transition-all duration-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-semibold mb-2">#{idx + 1}</p>
                    <h3 className="text-2xl font-bold text-gray-900">{prof.nome}</h3>
                  </div>
                  <div className="text-2xl">⭐</div>
                </div>

                <p className="text-sm text-gray-600 mb-6">{prof.descricao}</p>

                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                  <div>
                    <div className="text-3xl font-bold text-gray-900">{prof.rating}</div>
                    <p className="text-sm text-gray-600">{prof.reviews} avaliações</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <a
                    href={`https://wa.me/${prof.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-3 font-semibold text-white bg-green-600 rounded hover:bg-green-700 transition-colors duration-200 text-center text-sm"
                  >
                    💬 WhatsApp
                  </a>
                  <a
                    href={`tel:${prof.telefone.replace(/\D/g, '')}`}
                    className="flex-1 px-4 py-3 font-semibold text-white bg-gray-900 rounded hover:bg-gray-800 transition-colors duration-200 text-center text-sm"
                  >
                    ☎️ Ligar
                  </a>
                </div>
              </div>
            ))}
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
