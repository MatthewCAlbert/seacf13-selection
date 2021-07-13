import Head from 'next/head'
import common from './common.json'

const SEO = ({ title = "", description = "", meta = [], image = null, useSuffix = true }) => {
  const metaDescription = description || common.siteMetadata.description;
  const suffix = common.siteMetadata.suffix;
  const defaultTitle = title || common.siteMetadata.title || "HIMTI Bandung";
  // const titleTemplate = `%s | ${defaultTitle}`;
  const renderedTitle = defaultTitle && useSuffix ? `${defaultTitle} | ${suffix}` : defaultTitle;

  return (
    <>
    <Head>
      <title>{renderedTitle}</title>
      <meta name="description" content={description}/>
      <link rel="shortcut icon" href="/img/favicon.png" type="image/x-icon" />
    </Head>
    </>
  )
}

export default SEO;