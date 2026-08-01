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
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Fretes em {cidadeDisplay}</h1>
            <p className="text-lg opacity-90">{estadoUpper} • {cidadeDados?.populacao?.toLocaleString('pt-BR')} habitantes</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">🏆 Top 5 Profissionais</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {profissionais.map((prof) => (
              <div key={prof.id} className="rounded-lg border-2 border-gray-200 bg-white p-6 shadow-md hover:shadow-xl transition">
                <h3 className="text-xl font-bold text-gray-900">{prof.nome}</h3>
                <p className="text-sm text-gray-600">{prof.descricao}</p>
                <div className="flex justify-between items-center mt-3 mb-3">
                  <div className="text-2xl font-bold text-yellow-500">{prof.rating}</div>
                  <div className="text-xs text-gray-600">{prof.reviews} reviews</div>
                </div>
                <div className="flex gap-2">
                  <a href={`https://wa.me/${prof.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded text-center text-sm">
                    💬 WhatsApp
                  </a>
                  <a href={`tel:${prof.telefone.replace(/\D/g, '')}`} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-center text-sm">
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
