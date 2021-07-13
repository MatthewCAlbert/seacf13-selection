import Layout from '../components/layouts/Layout';
import SEO from '../components/layouts/SEO';

export default function Home() {
  return (
    <>
      <SEO useSuffix={false}/>
      <Layout>
        <h1>Hello World</h1>
      </Layout>
    </>
  )
}