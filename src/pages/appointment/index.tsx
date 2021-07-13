import Link from 'next/link';
import { useMemo } from 'react';
import Layout from '../../components/layouts/Layout';
import SEO from '../../components/layouts/SEO';
import DataTable from '../../components/tables/DataTable';

const myAppointment = () => {
  
  const data = useMemo(()=>[
    {
      id: "iniuuid",
      datetime: "1970-01-01",
      doctorName: "Budi Hermawan",
      description: "Ini deskripsi"
    }
  ].map((el)=>{
    return {...el,
    description: el.description.substr(0,20) + (el.description.length > 20 ? ".." : ""),
    action: <>
    <Link href=""><button className="btn btn-red"><i className="fas fa-times"></i></button></Link>
    </>
  }
  }),[]);

  const columns = useMemo(() => [
    {
      Header: 'Date & Time',
      accessor: "datetime",
    },
    {
      Header: 'Doctor Name',
      accessor: "doctorName",
    },
    {
      Header: 'Description',
      accessor: "description",
    },
    {
      Header: 'Action',
      accessor: "action",
    }
  ], []);

  return (
    <>
      <SEO title="My Appointment"/>
      <Layout>
        <section className="section section-first">
          <div className="section-inner flex justify-center pt-10">
            <div className="flex-grow px-10">
              <h1 className="font-bold text-3xl mb-4">My Appointment</h1>
              <DataTable tableRow={data} tableCol={columns}/>
            </div>
          </div>
        </section>
      </Layout> 
    </>
  )
}

export default myAppointment
