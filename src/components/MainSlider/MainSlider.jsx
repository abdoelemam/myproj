import React, { useEffect, useState } from 'react'
import Style from './MainSlider.module.css'
import Slider from 'react-slick'
import img1 from '../../assets/slider/grocery-banner-2.jpeg'
import img2 from '../../assets/slider/grocery-banner.png'
import image1 from '../../assets/slider/slider-image-1.jpeg'
import image2 from '../../assets/slider/slider-image-2.jpeg'
import image3 from '../../assets/slider/slider-image-3.jpeg'


export default function MainSlider() {
    let [Name, setName]  = useState('A')
    var settings = {
      dots: false,
      arrows: false,
      infinite: true,
      speed: 3000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      
    };
    useEffect(()=>{

    }, [])

  return (
    <>
        <div className='container flex flex-wrap py-10 ' >
          <div className='w-full sm:w-3/4'>
            <Slider {...settings}>
              <div className=''>
                <img src={image1} className='w-full h-[400px]' alt="" />
              </div>
              <div className=''>
                <img src={image2} className='w-full h-[400px]' alt="" />
              </div>
              <div className=''>
                <img src={image3} className='w-full h-[400px]' alt="" />
              </div>
            </Slider>
          </div>

          <div className='hidden sm:w-1/4 sm:block'>
                <img src={image1} className='h-[200px] block w-full' alt="" />
                <img src={image2} className='h-[200px] block w-full' alt="" />
          </div>

          
        </div>
    </>
  )
}
