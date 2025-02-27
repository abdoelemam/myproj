import React, { useContext, useEffect, useState } from 'react'
import Style from './Whishlist.module.css'
import { WishlistContext } from '../WishlistContext/WishlistContext'
import { UserContext } from '../UserContext/UserContext'
import Loader from '../Loader/Loader'

export default function Whishlist() {
    let {userLogin} = useContext(UserContext)
    let {getWishlist, removeItem, whishData} = useContext(WishlistContext)
    let[Loading, setLoading] = useState(true)

    async function getData(){
      let data = await getWishlist()
      setLoading(false)
      // console.log(whishData)
      // console.log(data)
    }

    useEffect(()=>{
      userLogin && getData()
    }, [userLogin])

  return (
    <>
<div className='container min-h-[60vh] py-10'>
    {Loading ? <Loader/> : 
      <>
            {whishData?.data?.length > 0  ? <>
      <h1 className='text-3xl  my-8'>Favourite</h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

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
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                remove
              </th>
            </tr>
          </thead>
          <tbody>
              {whishData?.data?.map((product)=>       <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="p-4">
                <img src={product?.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {product?.category?.name}
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                ${product?.price}
              </td>
              <td className="px-6 py-4">
                <a href="#" onClick={()=> removeItem(product.id)} className="font-medium remove-btn text-red-600 dark:text-red-500 hover:underline">Remove</a>
              </td>
            </tr>
          )}


          </tbody>
        </table>

      </div>
          </> : 
              <>
              <div className='h-screen flex justify-center p-12' >
                <div className='container shadow  flex justify-center items-center w-3/4 h-[500px] bg-gray-300'> <h1>Your Wishlist is Empty</h1> </div> 
              </div>
          </>

    }
      </>
    }

</div>
    </>
  )
}
