import React, { useContext, useEffect, useState } from 'react'
import Style from './RecentProducts.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { CartContext } from '../CartContext/CartContext'
import { toast } from 'react-toastify'
import { WishlistContext } from '../WishlistContext/WishlistContext'
import { UserContext } from '../UserContext/UserContext'
import Loader from '../Loader/Loader'

export default function RecentProducts() {
    let [Rproducts, setRproducts] = useState([])
    let {userLogin} = useContext(UserContext)
    let {addToWhishlist, WishlistItems, removeItem} = useContext(WishlistContext)
    let[Loading, setLoading] = useState(true)
    let [productLoading, setProductLoading] = useState({})
    
    

    async function handleWishlistClick(productId) {
      if (!userLogin) return;
      
      if(WishlistItems.includes(productId)){
        await removeItem(productId)
      }
      else{
        await  addToWhishlist(productId);
      }
      

    }

    async function getProducts(){
      try{
        let data = await axios(`https://ecommerce.routemisr.com/api/v1/products`) ;
        setRproducts(data.data.data)
        setLoading(false)
      }
      catch{
        setLoading(false)
      }
    }

    let {CartCount, setCartCount, addToCart, getCart}  = useContext(CartContext)

    async function addProductToCart(productId){
      setProductLoading(prev => ({ ...prev, [productId]: true }));  ///
      let data = await addToCart(productId) 

      if(data?.status == "success"){
        toast("Item Added Successfully", {theme:'dark', type:'success'});
      }

      setProductLoading(prev => ({ ...prev, [productId]: false }));  /// 
    }

    useEffect(()=>{
      getProducts()
    }, [])

    


  return (
    <>
      <div className='container justify-center  flex flex-wrap gap-y-7 mt-10'>
        {Loading ? <Loader/> : <>
          {Rproducts.map((product) => (
            <div className='w-full card mx-4 sm:mx-0 border border-2 border-transparent hover:border-green-500 transition duration-300 px-5 py-5 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6' id={product.id} key={product.id}>
              <Link to={`/productdetails/${product.id}/${product.category.name}`} >
                <img src={product.imageCover} className='w-full ' alt="" />
                <div className='con px-2 mt-2'>
                  <div className='text-xl'> {product.category.name} </div>
                  <h3 className='text-lg text-gray-500'>{product.title.split(' ').slice(0,2).join(' ')}</h3>
                  <div className='flex  justify-between my-1'> 
                  <span className='flex px-1 justify-end'><button onClick={()=> handleWishlistClick(product.id)}> <i className={`fa-solid fa-heart  text-xl ${WishlistItems?.includes(product.id) ? "text-red-500" : "text-black"}`}></i> </button></span>
                    <span>
                      
                      {product.ratingsAverage} <i class="fa-solid fa-star text-yellow-400 text-xl"></i>
                    </span>
                  </div>
                </div>
              </Link>
              
              <span className='text-xl px-2'>{product.price} EGP</span>
              {productLoading[product.id] ?    <div className="w-full text-center my-5 focus:outline-none text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 spinner-border text-white" role="status">
                    <span className="block px-2">Loading...</span>
                  </div>
                   : <> <div className='w-full flex justify-center '><button onClick={()=>( addProductToCart(product.id)) } className='w-[90%]  px-2 my-5 focus:outline-none text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>Add To Cart</button></div> </>
                   }
              
          </div>
      
        ))}
        </>}

      </div>

    </>
  )
}
