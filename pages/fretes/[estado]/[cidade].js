import { useRouter } from 'next/router'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import ImageCarousel from '../../../components/ImageCarousel'
import Favicon from '../../../components/Favicon'
import cidades from '../../../cidades-filtradas.json'
import { galleryImages } from '../../../data/gallery'
import Head from 'next/head'
import { normalizeText } from '../../../utils/normalize'
import { getSeoKeywords, getMetaDescription, getPageTitle, getCanonicalUrl } from '../../../utils/seo-keywords'

export async function getStaticPaths() {
  const paths = cidades.map(c => ({
    params: { 
      estado: c.estado.toLowerCase(),
      cidade: normalizeText(c.cidade)
    }
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const cidadeData = cidades.find(c => 
    c.estado.toLowerCase() === params.estado && 
    normalizeText(c.cidade) === params.cidade
  );
  
  if (!cidadeData) {
    return {
      notFound: true
    };
  }

  // 🔗 pega cidades próximas do mesmo estado
  const cidadesProximas = cidades
    .filter(c => c.estado === cidadeData.estado && c.cidade !== cidadeData.cidade)
    .slice(0, 5);

  return {
    props: {
      cidade: cidadeData.cidade,
      estado: cidadeData.estado,
      cidadesProximas
    }
  };
}

export default function FreteCidade({ cidade, estado, cidadesProximas }) {
  const pageTitle = getPageTitle(cidade, estado);
  const pageDescription = getMetaDescription(cidade, estado);
  const canonicalUrl = getCanonicalUrl(cidade, estado, normalizeText);
  const seoKeywords = getSeoKeywords(cidade, estado);

  // ✅ Schema.org JSON-LD LocalBusiness + FAQ
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Pá-chego Fretes",
    "description": `Pá-chego Fretes em ${cidade}, referência em fretes rápidos e mudanças com +25 anos de experiência.`,
    "url": canonicalUrl,
    "telephone": "+5562991103510",
    "email": "atendimento@pachego.com.br",

    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -16.6864,
      "longitude": -49.2653
    },
    "openingHours": "Mo-Fr 08:00-18:00",
    "priceRange": "$$",
            "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "reviewCount": "200+"
        }
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Vocês fazem entrega de cargas em ${cidade}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Sim! Fazemos entrega de cargas em toda a cidade de ${cidade} e região metropolitana com rastreamento em tempo real.`
        }
      },
      {
        "@type": "Question",
        "name": `Qual o prazo médio de entrega?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `O prazo varia conforme o tipo de frete escolhido: expresso (até 24h), econômico (2-5 dias) ou padrão (3-7 dias).`
        }
      },
      {
        "@type": "Question",
        "name": `Vocês oferecem seguro para as cargas?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Sim! Todas as nossas cargas são seguradas para garantir total segurança durante o transporte.`
        }
      }
    ]
  };
  

  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={seoKeywords.join(', ')} />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
      </Head>

      <Favicon />
      <Header />

      <main className="max-w-4xl mx-auto p-6">

        {/* ✅ H1 */}
                  <h1 className="text-4xl font-bold mb-6 text-gray-900">
            Frete em <span className="text-blue-600">{cidade}</span> – Fretes Rápidos e Mudanças
          </h1>

          {/* ✅ Introdução */}
          <p className="text-lg text-gray-700 mb-6">
            A <strong>Pá-chego Fretes</strong> oferece serviços de <strong>frete em {cidade}</strong> e <strong>mudanças em {cidade}</strong> com +25 anos de experiência. 
            Especialistas em <strong>frete para {cidade}</strong>, <strong>transporte até {cidade}</strong> e <strong>mudanças para {cidade}</strong>. 
            Nota 5.0 de avaliação e atendimento personalizado.
          </p>

        {/* ✅ Imagem Padrão */}
        <img 
          src="/frete.jpg" 
          alt={`serviços de frete em ${cidade}`} 
          className="w-full h-auto rounded-lg shadow mb-8"
        />

        {/* ✅ Quem Somos */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-4">Nossa História em Fretes e Mudanças</h2>
          <p className="text-gray-700 leading-relaxed">
            Fundada com o compromisso de oferecer serviços de qualidade, a <strong>Pá-chego Fretes</strong> 
            se tornou referência em fretes rápidos e mudanças em Goiânia e região. Com <strong>+25 anos de experiência</strong>, 
            crescemos lado a lado com nossos clientes, sempre trazendo confiança para os serviços de 
            <strong>fretes rápidos</strong>, <strong>mudanças residenciais</strong> e <strong>transporte de cargas</strong>.
          </p>
        </section>

                 {/* ✅ Serviços */}
         <section className="mb-10">
           <h2 className="text-3xl font-bold mb-4">Serviços de Frete em {cidade} com Segurança e Agilidade</h2>
           <p className="text-gray-700 mb-6 leading-relaxed">
             Na Pachego Fretes, oferecemos uma ampla gama de serviços de transporte em {cidade}, unindo tecnologia de ponta, 
             atendimento personalizado e prazos flexíveis para atender todas as necessidades da sua empresa.
           </p>
           
           <div className="grid md:grid-cols-2 gap-6">
             <div className="bg-blue-50 p-6 rounded-lg">
               <h3 className="text-xl font-semibold mb-4 text-gray-900">✅ Frete Expresso</h3>
               <p className="text-gray-700 mb-3">Entrega rápida e segura para cargas urgentes com rastreamento em tempo real e prazo garantido.</p>
               <ul className="text-sm text-gray-600 space-y-1">
                 <li>• Entrega em até 24h</li>
                 <li>• Rastreamento online</li>
                 <li>• Seguro incluso</li>
                 <li>• Cobertura nacional</li>
               </ul>
             </div>

             <div className="bg-green-50 p-6 rounded-lg">
               <h3 className="text-xl font-semibold mb-4 text-gray-900">✅ Frete Econômico</h3>
               <p className="text-gray-700 mb-3">Solução ideal para cargas não urgentes com preços competitivos e qualidade garantida.</p>
               <ul className="text-sm text-gray-600 space-y-1">
                 <li>• Preços acessíveis</li>
                 <li>• Entrega em 2-5 dias</li>
                 <li>• Rastreamento incluído</li>
                 <li>• Cobertura ampla</li>
               </ul>
             </div>

             <div className="bg-yellow-50 p-6 rounded-lg">
               <h3 className="text-xl font-semibold mb-4 text-gray-900">✅ Frete Empresarial</h3>
               <p className="text-gray-700 mb-3">Soluções personalizadas para empresas com contratos mensais e condições especiais.</p>
               <ul className="text-sm text-gray-600 space-y-1">
                 <li>• Contratos mensais</li>
                 <li>• Descontos especiais</li>
                 <li>• Atendimento dedicado</li>
                 <li>• Relatórios detalhados</li>
               </ul>
             </div>



             <div className="bg-pink-50 p-6 rounded-lg">
               <h3 className="text-xl font-semibold mb-4 text-gray-900">✅ Frete Frágil</h3>
               <p className="text-gray-700 mb-3">Cuidado especial para produtos delicados com embalagem e manuseio diferenciado.</p>
               <ul className="text-sm text-gray-600 space-y-1">
                 <li>• Embalagem especial</li>
                 <li>• Manuseio cuidadoso</li>
                 <li>• Seguro ampliado</li>
                 <li>• Rastreamento detalhado</li>
               </ul>
             </div>

             <div className="bg-orange-50 p-6 rounded-lg">
               <h3 className="text-xl font-semibold mb-4 text-gray-900">✅ Logística Completa</h3>
               <p className="text-gray-700 mb-3">Soluções integradas de logística incluindo armazenagem, separação e entrega.</p>
               <ul className="text-sm text-gray-600 space-y-1">
                 <li>• Armazenagem</li>
                 <li>• Separação de pedidos</li>
                 <li>• Gestão de estoque</li>
                 <li>• Relatórios gerenciais</li>
               </ul>
             </div>
           </div>

           <div className="mt-8 bg-gray-50 p-6 rounded-lg">
             <p className="text-gray-700 leading-relaxed">
               <strong>Com uma frota moderna e tecnologia de ponta</strong>, realizamos desde pequenos fretes expressos 
               até grandes operações logísticas, garantindo a melhor relação custo-benefício. Cada entrega recebe atenção 
               aos detalhes para assegurar um transporte seguro e uma experiência diferenciada. Nossa equipe está preparada 
               para oferecer suporte completo, desde a coleta até a entrega, proporcionando resultados que fazem a diferença.
             </p>
           </div>
         </section>

         {/* ✅ Galeria de Trabalhos */}
         <section className="mb-10">
           <ImageCarousel 
             images={galleryImages} 
             title={`Tipos de cargas que transportamos em ${cidade}`}
             autoPlay={true}
             interval={5000}
           />
         </section>

        {/* ✅ Facilidade e Suporte */}
        <section className="bg-blue-50 p-6 rounded-lg mb-10">
          <h2 className="text-2xl font-bold mb-4">Facilidade e Suporte Completo</h2>
          <p className="text-gray-700">
            A <strong>Pá-chego Fretes</strong> torna o transporte simples e transparente. 
            Nosso time orienta na escolha do tipo de frete, embalagem adequada e oferece 
            <strong>atendimento personalizado</strong> e suporte rápido para que você 
            economize tempo e receba exatamente o que precisa.
          </p>
        </section>

        {/* ✅ Depoimentos */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-4">O que nossos clientes dizem</h2>
          <blockquote className="border-l-4 border-blue-600 pl-4 text-gray-700 italic">
            "Excelente atendimento, prazo cumprido e transporte seguro. Equipe muito profissional e cuidadosa!"
          </blockquote>
          <p className="mt-2 text-gray-600">⭐ Nota média: <strong>5.0/5</strong> (mais de 200 avaliações)</p>
        </section>

        {/* ✅ FAQ */}
        <section className="bg-gray-50 p-6 rounded-lg mb-10">
        <h2 className="text-2xl font-bold mb-4">Perguntas Frequentes</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li><strong>Vocês entregam em {cidade}?</strong> Sim! Entregamos em toda a cidade e região com cuidado total e pontualidade.</li>
          <li><strong>Qual o prazo médio?</strong> O prazo varia conforme o tipo de frete: expresso (24h), econômico (2-5 dias) ou padrão (3-7 dias).</li>
          <li><strong>Vocês oferecem seguro?</strong> Sim! Todas as cargas são tratadas com cuidado total para garantir total segurança durante o transporte.</li>
          <li><strong>Como acompanho minha encomenda?</strong> Você pode entrar em contato conosco pelo WhatsApp para acompanhar o status da sua entrega.</li>
          <li><strong>Posso pedir orçamento pelo WhatsApp?</strong> Sim! <a className="text-blue-600 hover:underline" target="_blank" href="https://api.whatsapp.com/send?phone=5562991103510&text=Ol%C3%A1!%20vim%20pelo%20site%20gostaria%20de%20um%20or%C3%A7amento%20de%20frete!">Clique aqui</a> para ser atendido</li>
        </ul>
      </section>

        {/* ✅ Rotas Estratégicas */}
        <section className="bg-blue-50 p-6 rounded-lg mb-10">
          <h3 className="text-xl font-semibold mb-4">🗺️ Principais rotas de frete e mudanças:</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Frete de {cidade} para:</h4>
              <ul className="list-disc ml-6 space-y-1">
                {cidadesProximas.slice(0, 5).map((c, i) => (
                  <li key={i}>
                    <a href={`/fretes/${c.estado.toLowerCase()}/${normalizeText(c.cidade)}`} className="text-blue-600 hover:underline">
                      Frete {cidade} até {c.cidade}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Mudanças de {cidade} para:</h4>
              <ul className="list-disc ml-6 space-y-1">
                {cidadesProximas.slice(0, 5).map((c, i) => (
                  <li key={i}>
                    <a href={`/fretes/${c.estado.toLowerCase()}/${normalizeText(c.cidade)}`} className="text-blue-600 hover:underline">
                      Mudanças {cidade} para {c.cidade}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ✅ Links internos */}
        <section className="bg-gray-50 p-6 rounded-lg mb-10">
          <h3 className="text-xl font-semibold mb-4">📍 Atendemos também em cidades próximas:</h3>
          <ul className="list-disc ml-6">
            {cidadesProximas.map((c, i) => (
              <li key={i}>
                <a href={`/fretes/${c.estado.toLowerCase()}/${normalizeText(c.cidade)}`} className="text-blue-600 hover:underline">
                  Frete em {c.cidade}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* ✅ CTA */}
        <div className="text-center bg-blue-600 text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Precisa de serviços de frete em {cidade}?</h2>
          <p className="text-lg mb-6">Solicite um orçamento rápido e veja por que somos referência em transporte seguro.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://pachego.com.br/orcar-frete/" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100">
              📞 Solicite um orçamento
            </a>
            <a href="https://api.whatsapp.com/send?phone=5562991103510&text=Ol%C3%A1!%20vim%20pelo%20site%20gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os!" target="_blank" rel="noopener noreferrer" className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600">
              💬 Falar conosco
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 