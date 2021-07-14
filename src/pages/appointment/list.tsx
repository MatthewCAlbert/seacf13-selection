import Link from 'next/link';
import { useContext, useEffect, useMemo, useState } from 'react';
import AppointmentAddModal from '../../components/forms/AppointmentAddModal';
import Layout from '../../components/layouts/Layout';
import SEO from '../../components/layouts/SEO';
import DataTable from '../../components/tables/DataTable';
import { AuthContext } from '../../stores/authContext';
import { fetch } from '../../utils/fetch';
import Swal from 'sweetalert2';
import moment from 'moment';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const list = () => {
  const {user, isAdmin} = useContext(AuthContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dataResult, setDataResult] = useState([]);

  async function refreshList(){
    try{
      const res = await fetch(user.token).get("/appointment-all");
      if( res && res.data && res.data.data && res.data.data.all && res.data.data.list ){
        const all = res.data.data.all || [];
        const list = res.data.data.list || [];
        const data = await all.map((a)=>{
          let currentCount = list.filter((b)=> a.id === b.appointmentId).length;
          let alreadyApply = list.filter((b)=> user.id === b.userId && a.id === b.appointmentId).length > 0;
          const quotaLeft = a.maxRegistrant - currentCount;
          return {...a, quotaLeft: quotaLeft > 0 ? quotaLeft : 0, alreadyApply }
        })
        setDataResult(data);
      }
    }catch(e){
    }
  }

  async function applyModal(e){
    const id = e.target.getAttribute('data-id');
    MySwal.fire({
      title: <p>Do you want to book this doctor appointment?</p>,
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true
    }).then(async (result)=>{
      if( result.isConfirmed && id ){
        try{
          const res = await fetch(user.token).post("/appointment-apply", {
            id
          });
          if( res && res.data && res.data.success ){
            MySwal.fire({
              title: <p>Booking Success!</p>,
              icon: "success"
            });
          }
        }catch(e){
        }
        refreshList();
      }
    })
  }
  async function addModal(){
    setModalIsOpen(true);
  }
  async function deleteModal(e){
    const id = e.target.getAttribute('data-id');
    MySwal.fire({
      title: <p>Do you want to delete this doctor appointment?</p>,
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true
    }).then(async (result)=>{
      if( result.isConfirmed && id ){
        try{
          const res = await fetch(user.token).delete("/appointment-destroy", {
            data: {
              id
            }
          });
          if( res && res.data && res.data.success ){
            MySwal.fire({
              title: <p>Deletion Success!</p>,
              icon: "success"
            });
          }
        }catch(e){
        }
        refreshList();
      }
    })
  }

  useEffect(() => {
    if( user ) refreshList();
  }, [user])
  
  const data = useMemo(()=>dataResult.map((el)=>{
    return {...el,
    date: moment(el.date).format("LLLL"),
    description: el.description.substr(0,20) + (el.description.length > 20 ? ".." : ""),
    action: <>
    {
      isAdmin() && 
      <><Link href={`/appointment/detail/${el.id}`}><button className="btn btn-blue"><i className="fas fa-eye"></i></button></Link>&nbsp;
      <button className="btn btn-red" data-id={el.id} onClick={deleteModal}><i className="fas fa-trash"></i></button>&nbsp;
      </>
    }
    {
      (!isAdmin() && !el.alreadyApply && el.quotaLeft > 0) && <button className="btn btn-green" onClick={applyModal} data-id={el.id} ><i className="fas fa-plus"></i></button>
    }
    </>
  }
  }),[dataResult]);

  const columns = useMemo(() => [
    {
      Header: 'Date & Time',
      accessor: "date",
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
            <div className="flex-grow px-5 md:px-10 max-w-full">
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
        <AppointmentAddModal modalIsOpen={modalIsOpen} setIsOpen={setModalIsOpen} refresh={refreshList}/>
      </Layout> 
    </>
  )
}

export default list
