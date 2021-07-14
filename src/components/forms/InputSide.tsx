import React, { ReactEventHandler } from 'react'

const InputSide = ({title, form={}, name, setForm=(x)=>{}, children=null, ...props}) => {
  
  const handleChange = (e)=>{
    setForm({...form, [name]:e.target.value});
  }

  return (
    <div className="md:flex md:items-center mb-6">
      <div className="md:w-1/6">
        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
          {title}
        </label>
      </div>
      <div className="md:w-5/6">
        {
          !children ?
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" {...props} value={form[name]} onChange={handleChange}/>
          :
            children
        }
      </div>
    </div>
  )
}

export default InputSide;
