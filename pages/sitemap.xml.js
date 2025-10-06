import cidades from '../cidades-filtradas.json'
import { normalizeText } from '../utils/normalize'

const Sitemap = () => { return null }

export const getServerSideProps = async ({ res }) => {
  const baseUrl = 'https://pachego.com.br'
  const estados = [...new Set(cidades.map(c => c.estado))]
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  ${estados.map(estado => `
  <url>
    <loc>${baseUrl}/fretes/estado/${estado.toLowerCase()}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
  ${cidades.map(cidade => `
  <url>
    <loc>${baseUrl}/fretes/${cidade.estado.toLowerCase()}/${normalizeText(cidade.cidade)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`).join('')}
</urlset>`

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return { props: {}, }
}

export default Sitemap 