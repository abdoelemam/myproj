import React, { useContext, useEffect, useState } from 'react'
import Style from './ProductDetails.module.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from "react-slick";
import { CartContext } from '../CartContext/CartContext';
import { toast } from 'react-toastify';

export default function ProductDetails() {
    let [product, setProduct]  = useState(null)
    let [RelatedProducts, setRelatedProducts] = useState([])
    let {id, category} = useParams() ;
    let [sliderSettings, setSliderSettings] = useState({});
    var settings = {
      dots: true,
      infinite: true,
      arrows: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };


  
    var settingsRelated = {
      dots: true,
      infinite: true,
      arrows: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 3,
      prevArrow: <div className={Style.slickArrow}>‹</div>,
      nextArrow: <div className={Style.slickArrow}>›</div>,
    };

    var XSMsettings = {
      dots: true,
      infinite: true,
      arrows: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: <div className={Style.slickArrow}>‹</div>,
      nextArrow: <div className={Style.slickArrow}>›</div>,
    };

    var SMsettings = {
      dots: true,
      infinite: true,
      arrows: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 2,
      prevArrow: <div className={Style.slickArrow}>‹</div>,
      nextArrow: <div className={Style.slickArrow}>›</div>,
    };

    var mdsettings = {
      dots: true,
      infinite: true,
      arrows: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
      prevArrow: <div className={Style.slickArrow}>‹</div>,
      nextArrow: <div className={Style.slickArrow}>›</div>,
    };



          // Function to update settings based on screen width
    const updateSliderSettings = () => {
      if (window.innerWidth < 400) {
        setSliderSettings(XSMsettings); // Extra small settings
      } 
      else if (window.innerWidth < 640) { // Use else if correctly
        setSliderSettings(SMsettings); // Small settings
      } 
      else if (window.innerWidth < 768) { // Use else if correctly
        setSliderSettings(mdsettings); // Small settings
      } 
      else {
        setSliderSettings(settingsRelated); // Default settings for larger screens
      }
    };

    async function getProducts(id){
      let {data} = await axios(`https://ecommerce.routemisr.com/api/v1/products/${id}`) ;
      setProduct(data.data)
    }

    let {CartCount, setCartCount, addToCart, getCart}  = useContext(CartContext)

    async function getRelatedProducts(category){
      let {data} = await axios(`https://ecommerce.routemisr.com/api/v1/products`) ;

      let allProducts =  data.data
      let relatedProducts = allProducts.filter(product =>( product.category.name == category ))
      setRelatedProducts(relatedProducts)
    }

    async function addProductToCart(productId){
      let data = await addToCart(productId)

      if(data.status == "success"){
        toast("Item Added Successfully", {theme:'dark', type:'success'});
      }
    }

    useEffect(()=>{
      getProducts(id)
      getRelatedProducts(category)
      updateSliderSettings(); 
      window.addEventListener("resize", updateSliderSettings); // Listen for screen resize
      return () => window.removeEventListener("resize", updateSliderSettings); // Cleanup
    }, [id])

  return (
    <>
        <div className='container py-10 my-[2rem] '>
          <div className='flex flex-col gap-y-6 gap-x-12 sm:flex-row justify-center items-center'>
            <div className='w-full sm:w-1/3'>
            <Slider {...settings}>
              {product?.images.map((src) => <img src={src} alt="" className='h-[500px]' /> )}  
            </Slider>
              
            </div>

            <div className='w-full  px-3 sm:w-3/4  mx-auto' >
              <h1 className='text-2xl'>{product?.title}</h1>
              <div className='my-5 text-lg text-gray-500'>{product?.description}</div>
              <div className='flex justify-between'> 
                  <span className='text-xl'>{product?.price} EGP</span>
                  <span className='text-xl'>{product?.ratingsAverage} <i className="fa-solid fa-star text-yellow-400 text-xl"></i>
                  </span>
                </div>
              <button onClick={()=>(addProductToCart(product.id))} type="button" className="w-full my-8 focus:outline-none text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add To Cart</button>
            </div>
          </div>

          
          <div className='w-full my-[5rem] '>
            <Slider {...sliderSettings}>
            { RelatedProducts.map((product) => (
              
              <div className='w-1/6 px-5 py-5 ' key={product.id}>
                  <Link to={`/productdetails/${product.id}/${product.category.name}`} >
                    <img src={product.imageCover} className='' alt="" />
                    <div> {product.category.name} </div>
                    <h3>{product.title}</h3>
                    <div className='flex justify-between'> 
                      <span>{product.price} EGP</span>
                      <span>{product.ratingsAverage} <i class="fa-solid fa-star text-yellow-400 text-xl"></i>
                      </span>
                    </div>
                  </Link>
            
              </div>
              
            )) }

          
          </Slider>
          </div>
          
        </div>
    </>
  )
}
