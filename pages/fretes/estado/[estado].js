import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import Favicon from '../../../components/Favicon'
import cidades from '../../../cidades-filtradas.json'
import { normalizeText } from '../../../utils/normalize'
import Head from 'next/head'
import { getEstadoSeoKeywords, getEstadoMetaDescription, getEstadoPageTitle, getEstadoCanonicalUrl } from '../../../utils/seo-keywords'

export async function getStaticPaths() {
  const estados = [...new Set(cidades.map(c => c.estado))];
  const paths = estados.map(estado => ({
    params: { estado: estado.toLowerCase() }
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const estado = params.estado.toUpperCase();
  const cidadesDoEstado = cidades.filter(c => c.estado === estado);
  
  if (!cidadesDoEstado.length) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      estado,
      cidades: cidadesDoEstado
    }
  };
}

export default function FreteEstado({ estado, cidades }) {
  const pageTitle = getEstadoPageTitle(estado, cidades.length);
  const pageDescription = getEstadoMetaDescription(estado, cidades.length);
  const canonicalUrl = getEstadoCanonicalUrl(estado);
  const seoKeywords = getEstadoSeoKeywords(estado);

  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={seoKeywords.join(', ')} />
        <link rel="canonical" href={canonicalUrl} />
      </Head>

      <Favicon />
      <Header />

      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          Frete em <span className="text-blue-600">{estado}</span> – {cidades.length} Cidades Atendidas
        </h1>

        <p className="text-lg text-gray-700 mb-8">
          A <strong>Pá-chego Fretes</strong> oferece serviços de <strong>frete em {estado}</strong> e <strong>mudanças em {estado}</strong> em {cidades.length} cidades. 
          Especialistas em <strong>frete para {estado}</strong>, <strong>transporte até {estado}</strong> e <strong>mudanças para {estado}</strong>. 
          +25 anos de experiência e nota 5.0 de avaliação.
        </p>

        {/* 🗺️ Rotas Estratégicas */}
        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">🗺️ Principais rotas de frete e mudanças em {estado}:</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cidades.slice(0, 6).map((cidade, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-blue-600 mb-2">
                  {cidade.cidade}
                </h3>
                <div className="space-y-1 text-sm">
                  <a href={`/fretes/${estado.toLowerCase()}/${normalizeText(cidade.cidade)}`} className="block text-blue-600 hover:underline">
                    • Frete {cidade.cidade} até Goiânia
                  </a>
                  <a href={`/fretes/${estado.toLowerCase()}/${normalizeText(cidade.cidade)}`} className="block text-blue-600 hover:underline">
                    • Mudanças {cidade.cidade} para Anápolis
                  </a>
                  <a href={`/fretes/${estado.toLowerCase()}/${normalizeText(cidade.cidade)}`} className="block text-blue-600 hover:underline">
                    • Transporte {cidade.cidade} até Brasília
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 📍 Lista de Cidades */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cidades.map((cidade, index) => (
            <a 
              key={index}
              href={`/fretes/${estado.toLowerCase()}/${normalizeText(cidade.cidade)}`}
              className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-gray-200 hover:border-blue-300"
            >
              <h3 className="text-lg font-semibold text-blue-600 hover:text-blue-800 mb-2">
                Frete em {cidade.cidade}
              </h3>
              <p className="text-sm text-gray-600">
                Transporte seguro e rápido com cuidado total
              </p>
            </a>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Por que escolher a Pá-chego Fretes?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">⭐</div>
              <h3 className="font-semibold mb-2">Nota 5.0</h3>
              <p className="text-sm text-gray-600">Avaliação dos clientes</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="font-semibold mb-2">Equipe Confiável</h3>
              <p className="text-sm text-gray-600">Profissionais qualificados</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">📅</div>
              <h3 className="font-semibold mb-2">+25 Anos</h3>
              <p className="text-sm text-gray-600">De experiência</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center bg-blue-600 text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">
            Precisa de frete em {estado}?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Entre em contato conosco e solicite seu orçamento gratuito!
          </p>
          <a 
            href="/form"
            className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg transition duration-300 hover:bg-gray-100 inline-block"
          >
            💬 Solicitar Orçamento
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
} 