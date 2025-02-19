import React, { useContext, useEffect, useState } from 'react'
import Style from './Cart.module.css'
import { UserContext } from '../UserContext/UserContext'
import { CartContext } from '../CartContext/CartContext'
import { Link } from 'react-router-dom'
import Loader from '../Loader/Loader'


export default function Cart() {
    let [Name, setName]  = useState('A')  
    let {userLogin, setUserLogin} = useContext(UserContext)  
    let {numOfCartItems, cartDetails, getCart, removeItem, updateCart} = useContext(CartContext)
    let[Loading, setLoading] = useState(true)

      useEffect(()=>{
        
        cartDetails &&  setLoading(false)
        console.log(cartDetails)

      }, [cartDetails])

  return (
    <>
        

    <div className='container py-12'>

      {Loading ? <Loader/> : <>
      
        {cartDetails?.numOfCartItems != 0 ? <>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

            
      <div className='flex justify-between text-2xl m-12'>
          <div><h2>Total product number: <span className='text-main'>{cartDetails?.numOfCartItems}</span></h2></div>
          <div><h2>Total Price: <span className='text-main'>${cartDetails?.data.totalCartPrice}</span></h2></div>
        </div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-16 py-3">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-6 py-3">
              Product
            </th>
            <th scope="col" className="px-6 py-3">
              Qty
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
            {cartDetails?.data.products.map((product)=>       <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="p-4">
              <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              {product?.product?.category?.name}
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center">
                <button onClick={()=> updateCart(product.product.id, product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                  <span className="sr-only">Quantity button</span>
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                  </svg>
                </button>
                <div>
                <span>{product.count}</span>
                </div>
                <button onClick={()=> updateCart(product.product.id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                  <span className="sr-only">Quantity button</span>
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                  </svg>
                </button>
              </div>
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              ${product.price}
            </td>
            <td className="px-6 py-4">
              <a href="#" onClick={()=> removeItem(product.product.id)} className="font-medium remove-btn text-red-600 dark:text-red-500 hover:underline">Remove</a>
            </td>
          </tr>
        )}


        </tbody>
      </table>

      </div>

      <div className=''><Link to={'/shippingcart'} type="button" class="text-center mx-auto self-center w-3/4 block mt-12 focus:outline-none text-white bg-main hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Checkout</Link>   </div>
    </> : 
    <>
        <div className='container shadow   flex justify-center items-center w-3/4 h-[500px] bg-gray-300'>
            <h1>Your Cart is Empty</h1>
        </div>
    </> }
      </>}


    </div>

    </>
  )
}
