import React, { useEffect, useState, useContext } from 'react'
import Style from './ShippingCart.module.css'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { CartContext } from '../CartContext/CartContext'
import { useNavigate } from 'react-router-dom'



export default function ShippingCart() {
  let [isLoading, setisLoading] = useState(false)
  let {payCash, getCart, payOnline} = useContext(CartContext)
  let [isOnline, setisOnline] = useState(false)
  let navigate = useNavigate()

  let yupValidation = Yup.object().shape({
    details:Yup.string().required('email is required') ,
    phone:Yup.string().required('phone is required') ,
    city:Yup.string().required('city is required') ,
  })

  async function handleShippingCart(formvalues){
    try{
      if(isOnline){
        let data =  await payOnline(formvalues)
        console.log(data)
        if(data.status == 'success'){
          window.location.href = data.session.url
        }
      }
      else{
        let data = await payCash(formvalues)
        if(data.status == 'success'){
          await getCart()
          navigate('/AllOrders')
        }
      }
    }
    catch(error){
      console.log(error)
    }

  }

  let formik = useFormik({
    initialValues:{
      details:'' ,
      phone:'' ,
      city: ''
    } ,

    validationSchema:yupValidation ,
    onSubmit:handleShippingCart
  })

  useEffect(()=>{

  }, [])

return (
  <>
      <div className='container h-[60vh] flex items-center '>
        
        <form onSubmit={formik.handleSubmit} className='w-3/4 md:w-[60%]   mx-auto '>

            <div>
              <h1 className='fa-2x'>ShippingCart :</h1>
            </div>

            <div className="grid mt-7  gap-6 mb-6 ">
        

            </div>
            <div className="mb-6">
                <label htmlFor="details" claclassNames="block mb-2 text-sm focus:ring-[#0aad0a] font-medium text-gray-900 dark:text-white">details</label>
                <input type="text" name='details' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.details} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Details" required />
                
                {formik.errors.details && formik.touched.details?  <div class="p-4 mb-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                      <span class="font-medium">{formik.errors.details}</span>
                    </div>:null}
            </div> 

            <div className="mb-6">
                <label htmlFor="phone" className="block mb-2 text-sm font-medium  text-gray-900 dark:text-white">phone</label>
                <input type="phone" name='phone' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} id="password" className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="phone" required />
                
                {formik.errors.phone && formik.touched.phone?  <div class="p-4 mb-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                      <span class="font-medium">{formik.errors.phone}</span>
                    </div>:null}    
            
            </div> 

            <div className="mb-6">
                <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">city</label>
                <input type="phone" name='city' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="city" required />
                
                {formik.errors.city && formik.touched.city?  <div class="p-4 mb-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                      <span class="font-medium">{formik.errors.city}</span> Change a few things up and try submitting again.
                    </div>:null}    
            
            </div> 

            
            <div className="flex items-center mb-6 mt-6">
              {isLoading ?     <button className=" text-white bg-[#0aad0a] hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <i class="fas fa-spinner animate-spin text-2xl text-white-500"></i>
                 </button>
                 :    <>
                <div className="flex items-center mb-4 me-5 ">
                  <input id="default-checkbox" value={'online'} onChange={()=> setisOnline(true)} type="checkbox" defaultValue className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">online</label>
                </div>

                <button type="submit" className=" text-white bg-[#0aad0a] hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Pay now</button>
                 </>
              }
                
            </div>
            
        </form>

      </div>
  </>
)
}
