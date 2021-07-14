import { useContext, useEffect, useState } from 'react';
import InputSide from '../components/forms/InputSide';
import Layout from '../components/layouts/Layout';
import SEO from '../components/layouts/SEO';
import { AuthContext } from '../stores/authContext';

export default function account() {
  const {user} = useContext(AuthContext);
  if( !user ) return <p>Log in first</p>;

  useEffect(() => {
    if( user )
      setFormData({
      username: user && user.username ? user.username : "",
      email: user && user.email ? user.email : "",
      firstName: user && user.firstName ? user.firstName : "",
      lastName: user && user.lastName ? user.lastName : "",
      age: user && user.age ? user.age : ""
    })
  }, [user]);
  
  const [formData, setFormData] = useState({});
  
  return (
    <>
      <SEO title="Account"/>
      <Layout>
        <section className="section section-first">
          <div className="section-inner flex justify-center pt-10">
            <div className="flex-grow px-10">
              <h1 className="font-bold text-3xl mb-4">My Account</h1>
              <form className="form rounded-md shadow-md px-10 py-7 w-full">
                <InputSide form={formData} setForm={setFormData} disabled={true} title="Username" type="text" name="username" />
                <InputSide form={formData} setForm={setFormData} disabled={true} title="Email" type="email" name="email"/>
                <InputSide form={formData} setForm={setFormData} disabled={true} title="First Name" type="text" name="firstName"/>
                <InputSide form={formData} setForm={setFormData} disabled={true} title="Last Name" type="text" name="lastName"/>
                <InputSide form={formData} setForm={setFormData} disabled={true} title="Age" type="number" name="age" min="0"/>
              </form>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}