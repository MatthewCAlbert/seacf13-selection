import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Input from '../components/forms/Input';
import Layout from '../components/layouts/Layout';
import SEO from '../components/layouts/SEO';
import { fetch } from '../utils/fetch';
import { AuthContext } from '../stores/authContext';

const register = () => {
  const router = useRouter();
  const {user, login} = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    age: "",
    password: "",
    cpassword: "",
  });
  const [submitted, setSubmitted] = useState(false);

  if( user ) router.push("/");

  const submitForm = async ()=>{
    if( submitted ) return;
    setSubmitted(true);
    try{
      const res = await fetch().post("/register", JSON.stringify(formData));
      if( res && res.data ){
        const data = res.data.data;
        login(data);
        router.push("/");
      }
      setSubmitted(false);
      router.push("/");
    }catch(e){
      setSubmitted(false);
    }
  }
  
  useEffect(()=>{
  },[])

  return (
    <>
      <SEO title="Register"/>
      <Layout>
        <section className="section section-first">
          <div className="section-inner flex justify-center py-10">
            <form className="flex-grow px-5 md:px-10">
              <h1 className="font-bold text-3xl mb-4">Register Form</h1>
              <div className="form rounded-md shadow-md px-10 py-7 w-full">
                <Input form={formData} setForm={setFormData} title="Username" type="text" name="username" />
                <Input form={formData} setForm={setFormData} title="Email" type="email" name="email"/>
                <Input form={formData} setForm={setFormData} title="First Name" type="text" name="firstName"/>
                <Input form={formData} setForm={setFormData} title="Last Name" type="text" name="lastName"/>
                <Input form={formData} setForm={setFormData} title="Age" type="number" name="age" min="0"/>
                <Input form={formData} setForm={setFormData} title="Password" type="password" name="password"/>
                <Input form={formData} setForm={setFormData} title="Confirm Password" type="password" name="cpassword"/>
                <button className={`btn btn-blue ${submitted ?? "disabled"}`} onClick={submitForm} disabled={submitted}>Register</button>
              </div>
            </form>
          </div>
        </section>
      </Layout> 
    </>
  )
}

export default register
