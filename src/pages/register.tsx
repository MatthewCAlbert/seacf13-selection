import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Input from '../components/forms/Input';
import Layout from '../components/layouts/Layout';
import SEO from '../components/layouts/SEO';
import { fetch } from '../utils/fetch';
import { AuthContext } from '../stores/authContext';
import LoadingScreen from '../components/LoadingScreen';

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

  function validateEmpty(data, except = []){
    let res = true;
    Object.keys(data).forEach((key)=>{
      if( !(key in except) )
        if(String(data[key]).trim().length === 0) res = false;
    })
    return res;
  }

  const submitForm = async ()=>{
    if( submitted ) return;
    setSubmitted(true);
    if( formData.password !== formData.cpassword ){
      alert("Password not matching!")
      setSubmitted(false);
      return;
    }
    if( !formData.username.match(/^(?=[a-zA-Z0-9._]{4,32}$)(?!.*[_.]{2})[^_.].*[^_.]$/gi) ){
      alert("Username invalid!")
      setSubmitted(false);
      return;
    }
    if( !formData.email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi) ){
      alert("Email invalid!")
      setSubmitted(false);
      return;
    }
    if( !formData.password.match(/^.{5,32}$/gi) ){
      alert("Password too short or too long [5-32]!")
      setSubmitted(false);
      return;
    }
    if( validateEmpty(formData)  )
      try{
        const res = await fetch().post("/register", JSON.stringify(formData));
        if( res && res.data ){
          const data = res.data.data;
          login(data);
          router.push("/");
        }
        router.push("/");
      }catch(e){
        alert("Register Failed!")
      }
    else
      alert("Please fill required fields first!");
    setSubmitted(false);
  }

  return (
    <>
      <SEO title="Register"/>
      <Layout>
        <LoadingScreen show={submitted}/>
        <section className="section section-first">
          <div className="section-inner flex justify-center py-10">
            <div className="flex-grow px-5 md:px-10">
              <h1 className="font-bold text-3xl mb-4">Register Form</h1>
              <div className="form rounded-md shadow-md px-10 py-7 w-full">
                <Input form={formData} setForm={setFormData} title="Username" type="text" name="username" />
                <Input form={formData} setForm={setFormData} title="Email" type="email" name="email"/>
                <Input form={formData} setForm={setFormData} title="First Name" type="text" name="firstName"/>
                <Input form={formData} setForm={setFormData} title="Last Name" type="text" name="lastName"/>
                <Input form={formData} setForm={setFormData} title="Age" type="number" name="age" min="0"/>
                <Input form={formData} setForm={setFormData} title="Password" type="password" name="password"/>
                <Input form={formData} setForm={setFormData} title="Confirm Password" type="password" name="cpassword"/>
                <button className={`btn btn-blue ${submitted ?? "disabled"}`} onClick={submitForm} type="button" disabled={submitted}>Register</button>
              </div>
            </div>
          </div>
        </section>
      </Layout> 
    </>
  )
}

export default register
