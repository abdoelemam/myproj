import React, { useEffect, useState } from 'react'
import Style from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'



export default function Layout() {
    let [Name, setName]  = useState('A')

    useEffect(()=>{

    }, [])

  return (
  <>
    <Navbar />
    <div className=" mt-[75px]  md:mt-[65px] md:">
      <Outlet />
    </div>
    <Footer />
  </>
  )
}
