import React, { useEffect, useState } from 'react'
import Style from './Categories.module.css'
import axios from 'axios'
import { data, Link } from 'react-router-dom'
import Loader from '../Loader/Loader'

export default function Categories() {
    let [Name, setName]  = useState('A')
    let [allCat, setallCat]  = useState([])
    let [allSub, setallSub]  = useState([])
      let[Loading, setLoading] = useState(true)

    async function getAllCat(){
      let {data} = await axios(`https://ecommerce.routemisr.com/api/v1/categories`)
      setallCat(data)
      setLoading(false)
    }

    async function gatSubOnCat(id){
      
      let {data} = await axios(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
      console.log(data)
      setallSub(data.data)
      setLoading(false)
    }

    useEffect(()=>{
      getAllCat()
    }, [])


  return (
    <>
      <div className='container'>

        {Loading ? <Loader/> : <>
          <h1 className='text-center my-4 py-10 text-3xl text-main'>All Categories</h1>

          <div className="w-full  justify-center gap-y-8 gap-x-8 flex flex-wrap">
            {allCat?.data?.map((cat) => (
              <Link   onClick={() => {setLoading(true); gatSubOnCat(cat._id); }}  className="block" key={cat._id}>
                <div className="border-4 border-[#0aad0a]">
                  <img src={cat.image} alt="" className="w-[300px] h-[370px] " />
                  <h2 className="text-center text-2xl my-6">{cat.name}</h2>
                </div>
              </Link>
            ))}
          </div>


          <div className='flex flex-wrap justify-center my-10'>
              {allSub.length >0 && allSub?.map((category)=> 
                <div className='w-1/3 mx-8 mt-8' key={category.id}>
                  <span className='text-xl p-4 border-2 border-gray-400 block text-center  '>{category?.name}</span>
                  
                </div>
              )}
          </div>  
        </>}


      </div>
    </>
  )
}
