import { useRouter } from 'next/router'
import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
import InputSide from '../../../components/forms/InputSide';
import Layout from '../../../components/layouts/Layout';
import SEO from '../../../components/layouts/SEO';

const Appointment = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    dateTime: new Date()
  });
  const {id} = router.query;
  return (
    <>
      <SEO title="Appointment Detail"/>
      <Layout>
        <section className="section section-first">
          <div className="section-inner flex justify-center pt-10">
            <div className="flex-grow px-5 md:px-10">
              <form className="flex-grow">
                <h1 className="font-bold text-3xl mb-4">Appointment Detail</h1>
                <div className="form rounded-md shadow-md px-10 py-7 w-full">
                  <InputSide form={formData} setForm={setFormData} title="Doctor Name" type="text" name="doctorName" />
                  <InputSide form={formData} setForm={setFormData} title="Description" type="text" name="description"/>
                  <InputSide form={formData} setForm={setFormData} title="Quota" type="number" name="maxRegistrant"/>
                  <InputSide form={formData} setForm={setFormData} title="Date Time" name="datetime">
                    <DateTimePicker
                      onChange={(e)=>setFormData({...formData, dateTime:e})}
                      value={formData.dateTime}
                    />
                  </InputSide>
                </div>
              </form>
              <div className="flex-grow mt-5">
                <div className="form rounded-md shadow-md px-10 py-7 w-full">
                  <h2 className="font-bold text-xl mb-4">List of Registrant</h2>
                  <p>Ini tabel</p>
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
