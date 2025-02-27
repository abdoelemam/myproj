import React, { useEffect, useState } from 'react'
import Style from './Products.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import RecentProducts from '../RecentProducts/RecentProducts'

export default function Products() {
    // let [allProducts, setallProducts]  = useState([])

    // async function getAllProducts(){
    //   let {data} = await axios(`https://ecommerce.routemisr.com/api/v1/products`)
    //   setallProducts(data)
    //   console.log(data)
    // }

    useEffect(()=>{
      // getAllProducts()
    }, [])

  return (
    <>
        <div className='py-10'>
          <RecentProducts/>
        </div>

    </>
  )
}
