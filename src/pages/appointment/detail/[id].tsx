import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useContext, useEffect, useMemo, useState } from 'react';
import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
import InputSide from '../../../components/forms/InputSide';
import Layout from '../../../components/layouts/Layout';
import SEO from '../../../components/layouts/SEO';
import LoadingScreen from '../../../components/LoadingScreen';
import DataTable from '../../../components/tables/DataTable';
import { AuthContext } from '../../../stores/authContext';
import { fetch } from '../../../utils/fetch';

const Appointment = () => {
  const {user, isAdmin} = useContext(AuthContext);
  if( !isAdmin() ) return <p>Unauthorized</p>;
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  let {id} = router.query;
  const [formData, setFormData] = useState({
    doctorName: "",
    description: "",
    maxRegistrant: 0,
    date: new Date()
  });
  const [dataList, setDataList] = useState([]);
  
  async function fetchData(){
    setLoading(true);
    try{
      const res = await fetch(user.token).get(`/appointment-show`,{
        params: {
          id
        }
      });
      if( res && res.data ){
        const data = res.data.data;
        const {detail, list} = data;
        
        setFormData({...detail, date: moment(detail.date).toDate()});
        setDataList(list);
      }
    }catch(e){
    }
    setLoading(false);
  }

  async function onUpdateHandler(){
    setLoading(true);
    try{
      const res = await fetch(user.token).put("/appointment-update",{
        ...formData, id, date: moment(formData.date).format("YYYY-MM-DD HH:mm:ss")
      });
      if( res && res.data ){
        const data = res.data.data;
        const {detail, list} = data.detail;
      }
    }catch(e){
    }
    await fetchData();
  }

  useEffect(() => {
    if( user && id ) fetchData();
  }, [user, id]);

  const data = useMemo(()=>[
      ...dataList
    ].map((el)=>{
    return {...el,
      name: `${el.lastName}${el.lastName && "," } ${el.firstName}`
    }
  }),[dataList]);
  
  const columns = useMemo(() => [
    {
      Header: 'Email',
      accessor: "email",
    },
    {
      Header: 'Name',
      accessor: "name",
    },
    {
      Header: 'Age',
      accessor: "age",
    }
  ], []);

  return (
    <>
      <SEO title="Appointment Detail"/>
      <Layout>
        <LoadingScreen show={isLoading}/>
        <section className="section section-first">
          <div className="section-inner flex justify-center pt-10">
            <div className="flex-grow px-5 md:px-10">
              <div className="flex-grow">
                <h1 className="font-bold text-3xl mb-4"><Link href="/appointment/list"><a><i className="fas fa-chevron-left mr-4"></i></a></Link> Appointment Detail</h1>
                <div className="form rounded-md shadow-md px-10 py-7 w-full">
                  <InputSide form={formData} setForm={setFormData} title="Doctor Name" type="text" name="doctorName" />
                  <InputSide form={formData} setForm={setFormData} title="Description" type="text" name="description"/>
                  <InputSide form={formData} setForm={setFormData} title="Quota" type="number" name="maxRegistrant"/>
                  <InputSide form={formData} setForm={setFormData} title="Date Time" name="date">
                    <DateTimePicker
                      onChange={(e)=>setFormData({...formData, date:e})}
                      value={formData.date}
                    />
                  </InputSide>
                  <button className="btn btn-blue" onClick={onUpdateHandler}>Update</button>
                </div>
              </div>
              <div className="flex-grow mt-5">
                <div className="form rounded-md shadow-md px-10 py-7 w-full">
                  <h2 className="font-bold text-xl mb-4">List of Registrant</h2>
                  <DataTable tableRow={data} tableCol={columns}/>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}

export default Appointment;
