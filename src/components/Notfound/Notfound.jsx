import React, { useEffect, useState } from 'react'
import Style from './Notfound.module.css'
import error from '../../assets/404.jpg'

export default function Notfound() {
    let [Name, setName]  = useState('A')

    useEffect(()=>{

    }, [])

  return (
    <>
        <img src={error} alt="Not Found" />
    </>
  )
}
