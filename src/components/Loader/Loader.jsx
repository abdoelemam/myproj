import React, { useEffect, useState } from 'react'
import Style from './Loader.module.css'
import { Circles } from 'react-loader-spinner';


export default function Loader() {
    let [Name, setName]  = useState('A')

    useEffect(()=>{

    }, [])

  return (
    
    <> 
      <div className="flex justify-center items-center h-screen w-full">
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          visible={true}
        />
      </div>
    </>
  )
}
