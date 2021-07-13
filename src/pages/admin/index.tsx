import Link from 'next/link';
import Layout from '../../components/layouts/Layout';
import SEO from '../../components/layouts/SEO';

const login = () => {
  return (
    <>
      <SEO title="Admin"/>
      <Layout>
        <section className="section section-first">
          <div className="section-inner flex justify-center pt-10">
            <div className="flex-grow px-10">
              <h1 className="font-bold text-3xl mb-4">Admin Dashboard</h1>
              <Link href=""><button className="btn btn-blue">Create New Doctor Appointment</button></Link>
              <Link href=""><button className="btn btn-blue">Update</button></Link>
              <Link href=""><button className="btn btn-blue">Delete</button></Link>
            </div>
          </div>
        </section>
      </Layout> 
    </>
  )
}

export default login
