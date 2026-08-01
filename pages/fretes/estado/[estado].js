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
      <main className="bg-white">
        {/* Hero */}
        <div className="py-16 px-6 border-b border-gray-200">
          <div className="max-w-6xl mx-auto">
            <p className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">
              Estado
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Fretes em {nomeEstado}
            </h1>
            <p className="text-lg text-gray-600">
              {cidades.length} cidades • {populacaoTotal.toLocaleString('pt-BR')} habitantes
            </p>
          </div>
        </div>

        {/* Cidades */}
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="mb-16">
            <p className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">
              Principais cidades
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Top {cidades.length} cidades
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cidades.map((cidade, idx) => (
              <Link
                key={cidade.cidade}
                href={`/fretes/cidade/${estado}/${normalizeText(cidade.cidade)}`}
                className="p-6 border border-gray-200 rounded-lg hover:border-gray-900 hover:bg-gray-50 transition-all duration-200"
              >
                <p className="text-xs text-gray-500 font-semibold mb-2">#{idx + 1}</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{cidade.cidade}</h3>
                <p className="text-lg text-gray-900 font-semibold mb-4">
                  {cidade.populacao.toLocaleString('pt-BR')}
                </p>
                <p className="text-sm text-gray-600">habitantes</p>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm font-semibold text-gray-900 group-hover:underline">
                    Ver profissionais →
                  </p>
                </div>
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
