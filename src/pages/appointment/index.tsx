import Link from 'next/link';
import { useContext, useEffect, useMemo, useState } from 'react';
import Layout from '../../components/layouts/Layout';
import SEO from '../../components/layouts/SEO';
import DataTable from '../../components/tables/DataTable';
import { AuthContext } from '../../stores/authContext';
import { fetch } from '../../utils/fetch';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import moment from 'moment';
import LoadingScreen from '../../components/LoadingScreen';

const MySwal = withReactContent(Swal);

const myAppointment = () => {
  const {user, isAdmin} = useContext(AuthContext);
  if( !user ) return <p>Login First please</p>;
  const [dataResult, setDataResult] = useState([]);
  const [isLoading, setLoading] = useState(false);

  async function refreshList(){
    setLoading(true);
    try{
      const res = await fetch(user.token).get("/appointment-my");
      if( res && res.data ){
        const data = res.data.data;
        setDataResult(data);
      }
    }catch(e){
    }
    setLoading(false);
  }

  async function onCancelAppointment(e){
    const id = e.target.getAttribute('data-id');
    MySwal.fire({
      title: <p>Do you want to cancel?</p>,
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true
    }).then(async (result)=>{
      if( result.isConfirmed && id ){
        setLoading(true);
        try{
          const res = await fetch(user.token).delete("/appointment-cancel", {
            data: {
              id
            }
          });
          if( res && res.data && res.data.success ){
            MySwal.fire({
              title: <p>Cancellation Success!</p>,
              icon: "success"
            });
          }
          setLoading(false);
        }catch(e){
          MySwal.fire({
            title: <p>Cancellation Failed!</p>,
            icon: "error"
          });
        }
        refreshList();
      }
    });
  }
  
  useEffect(() => {
    if( user ) refreshList();
  }, [user])

  
  const data = useMemo(()=>[
    ...dataResult
  ].map((el)=>{
    return {...el,
    date: moment(el.date).format("LLLL"),
    description: el.description.substr(0,50) + (el.description.length > 50 ? ".." : ""),
    action: <>
    <button className="btn btn-red" onClick={onCancelAppointment} data-id={el.id}><i className="fas fa-times"></i></button>
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
      Header: 'Action',
      accessor: "action",
    }
  ], []);

  return (
    <>
      <SEO title="My Appointment"/>
      <Layout>
        <LoadingScreen show={isLoading}/>
        <section className="section section-first">
          <div className="section-inner flex justify-center pt-10">
            <div className="flex-grow px-10">
              <h1 className="font-bold text-3xl mb-4">My Appointment</h1>
              <button className="btn btn-blue mb-4" onClick={refreshList}><i className="fas fa-sync"></i></button>
              <DataTable tableRow={data} tableCol={columns}/>
            </div>
          </div>
        </section>
      </Layout> 
    </>
  )
}

export default myAppointment
