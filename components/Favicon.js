import Head from 'next/head'

const Favicon = () => {
  return (
    <Head>
      {/* Favicon */}
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/favicon.png" />
      <meta name="theme-color" content="#1e40af" />
    </Head>
  )
}

export default Favicon 