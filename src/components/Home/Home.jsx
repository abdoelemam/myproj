import React, { useEffect, useState } from 'react'
import Style from './Home.module.css'
import RecentProducts from '../RecentProducts/RecentProducts'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'

export default function Home() {
    let [Name, setName]  = useState('A')
    

    useEffect(()=>{

    }, [])

  return (
    <>
        <MainSlider/>
        <CategorySlider/>
        <RecentProducts/>
    </>
  )
}
