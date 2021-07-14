import Link from 'next/link';
import { useContext } from 'react';
import Layout from '../components/layouts/Layout';
import SEO from '../components/layouts/SEO';
import { AuthContext } from '../stores/authContext';

export default function Home() {
  const {user, isAdmin} = useContext(AuthContext);
  return (
    <>
      <SEO useSuffix={false}/>
      <Layout>
        <section className="section section-first">
          <div className="section-inner flex justify-center pt-10">
            <div className="flex-grow px-10">
              <h1 className="font-bold text-3xl mb-4">Ini Beranda</h1>
              {
                user ? <p>Yay kamu sudah login sebagai { isAdmin() ? "admin" : "pasien" } 🎉 , silahkan cek menu.</p>
                :
                <p>
                  Kamu belum login dulu dong, klik <Link href="/login"><a className="text-blue-600 hover:underline">di sini</a></Link> untuk login. 😇
                </p>
              }
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}