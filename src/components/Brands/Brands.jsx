import React, { useEffect, useState } from 'react'
import Style from './Brands.module.css'
import axios from 'axios'
import Loader from '../Loader/Loader'

export default function Brands() {
    let [Brands, setBrands]  = useState([])
    let[Loading, setLoading] = useState(true)
    
    async function getBrands(){
      let {data} = await axios(`https://ecommerce.routemisr.com/api/v1/brands`)
      console.log(data)
      setBrands(data.data)
      setLoading(false)
    }

    useEffect(()=>{
      getBrands()
    }, [])

  return (
    <>
      <div className='container'>
        {Loading ? <Loader/> : <>
          <h1 className='text-center my-4 py-10 text-3xl text-main'>All Brands</h1>

          <div className="w-full justify-center gap-y-8 gap-x-8 flex flex-wrap">
            {Brands && Brands?.map((cat) => (
              <div  onClick={()=> gatSubOnCat(cat._id)} className="block" key={cat._id}>
                <div className="border-4 border-[#0aad0a]">
                  <div className='border-2 shadow  border-gray'>
                    <img src={cat.image} alt="" className="w-[300px] h-[370px]" />
                  </div>

                  <div className='bg-gray-200'>
                  <h2 className="text-center  text-2xl py-4">{cat.name}</h2>
                  </div>
                </div>
              </div>
            ))}
          </div>  
        </>}
      </div>
    </>
  )
}
