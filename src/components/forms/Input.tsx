import React, { ReactEventHandler } from 'react'

const Input = ({title, form={}, name, setForm=(x)=>{}, ...props}) => {
  
  const handleChange = (e)=>{
    setForm({...form, [name]:e.target.value});
  }

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {title}
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...props} onChange={handleChange} defaultValue={form[name]}/>
    </div>
  )
}

export default Input;
