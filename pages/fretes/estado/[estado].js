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
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Fretes em {nomeEstado}</h1>
            <p className="text-lg opacity-90">{cidades.length} cidades • {populacaoTotal.toLocaleString('pt-BR')} habitantes</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">📊 Top 10 Cidades</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cidades.map((cidade, idx) => (
              <Link key={cidade.cidade} href={`/fretes/cidade/${estado}/${normalizeText(cidade.cidade)}`} className="block p-6 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition">
                <h3 className="text-xl font-bold">{idx + 1}. {cidade.cidade}</h3>
                <p className="text-gray-600">{cidade.populacao.toLocaleString('pt-BR')} hab.</p>
                <p className="text-sm text-blue-600 mt-3">Ver profissionais →</p>
              </Link>
            ))}
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
