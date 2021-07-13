import Link from 'next/link';
import { useContext, useEffect, useMemo, useState } from 'react';
import AppointmentAddModal from '../../components/forms/AppointmentAddModal';
import Layout from '../../components/layouts/Layout';
import SEO from '../../components/layouts/SEO';
import DataTable from '../../components/tables/DataTable';
import { AuthContext } from '../../stores/authContext';
import { fetch } from '../../utils/fetch';

const list = () => {
  const {user, isAdmin} = useContext(AuthContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dataResult, setDataResult] = useState([]);

  function applyModal(e){
    console.log(e.target.getAttribute('data-id'))
  }
  function addModal(){
    setModalIsOpen(true);
  }
  function deleteModal(){
    
  }

  useEffect(() => {
    if( user ) refreshList();
  }, [user])

  async function refreshList(){
    try{
      const res = await fetch(user.token).get("/appointment-all");
      if( res && res.data ){
        const data = res.data.data;
        setDataResult(data);
      }
    }catch(e){
    }
  }
  
  const data = useMemo(()=>[
    ...dataResult
  ].map((el)=>{
    return {...el,
    description: el.description.substr(0,20) + (el.description.length > 20 ? ".." : ""),
    action: <>
    {
      isAdmin() && 
      <><Link href={`/appointment/detail/${el.id}`}><button className="btn btn-blue"><i className="fas fa-eye"></i></button></Link>&nbsp;
      <button className="btn btn-red" data-id={el.id} onClick={deleteModal}><i className="fas fa-trash"></i></button>&nbsp;
      </>
    }
    {
      (el.quotaLeft > 0 && !isAdmin()) && <button className="btn btn-green"><i className="fas fa-plus" onClick={applyModal} data-id={el.id}></i></button>
    }
    </>
  }
  }),[dataResult]);

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
      Header: 'Quota Left',
      accessor: "quotaLeft",
    },
    {
      Header: 'Action',
      accessor: "action",
    }
  ], []);

  return (
    <>
      <SEO title="Appointment List"/>
      <Layout>
        <section className="section section-first">
          <div className="section-inner flex justify-center pt-10">
            <div className="flex-grow px-5 md:px-10">
              <h1 className="font-bold text-3xl mb-4">Appointment List</h1>
              {
                isAdmin() && <div className="my-5">
                <button className="btn btn-blue" onClick={addModal}>Add Appointment</button>
              </div>
              }
              <DataTable tableRow={data} tableCol={columns}/>
            </div>
          </div>
        </section>
        <AppointmentAddModal modalIsOpen={modalIsOpen} setIsOpen={setModalIsOpen}/>
      </Layout> 
    </>
  )
}

export default list
