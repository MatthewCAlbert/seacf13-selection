import router, { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import Input from '../components/forms/Input';
import Layout from '../components/layouts/Layout';
import SEO from '../components/layouts/SEO';
import { AuthContext } from '../stores/authContext';
import { fetch } from '../utils/fetch';

const login = () => {
  const router = useRouter();
  const {user, login} = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [submitted, setSubmitted] = useState(false);

  if( user ) router.push("/");

  async function onSubmitLogin(){
    setSubmitted(true);
    
    try{
      const res = await fetch().post("/login", formData);
      if( res && res.data ){
        const data = res.data.data;
        login(data);
        router.push("/");
      }
      setSubmitted(false);
    }catch(e){
      setSubmitted(false);
    }
  }

  return (
    <>
      <SEO title="Login"/>
      <Layout>
        <section className="section section-first">
          <div className="section-inner flex justify-center pt-10">
            <div className="flex-grow px-5 md:px-10">
              <h1 className="font-bold text-3xl mb-4">Login Form</h1>
              <div className="form rounded-md shadow-md px-10 py-7 w-full">
                <Input form={formData} setForm={setFormData} title="Username / Email" type="text" name="username"/>
                <Input form={formData} setForm={setFormData} title="Password" type="password" name="password"/>
                <button className="btn btn-blue" onClick={onSubmitLogin} disabled={submitted}>Login</button>
              </div>
            </div>
          </div>
        </section>
      </Layout> 
    </>
  )
}

export default login
