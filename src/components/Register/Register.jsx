import React, { useContext, useEffect, useState } from 'react'
import Style from './Register.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { UserContext } from '../UserContext/UserContext'





export default function Register() {
    let [Name, setName]  = useState('A')
    let navigate = useNavigate();
    let [isLoading, setisLoading] = useState(false)
    let [apiError, setapiError] = useState(null)

    let {userLogin, setUserLogin} = useContext(UserContext) 

    let yupValidation = Yup.object().shape({
      name:Yup.string().min(3,'name minlength is 3').max(7,'name maxlength is 7').required('name is required') ,
      email:Yup.string().email('invalid email').required('email is required') ,
      phone:Yup.string().matches(/^01[0125][0-9]{8}$/,'phone in invalid').required('phone is required') ,
       password:Yup.string()
        .min(3, 'Password must be at least 3 characters')
        .max(9, 'Password must not exceed 9 characters')
        .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{3,9}$/, 'Password must start with an uppercase letter, include at least one lowercase letter and one digit')
        .required('Password is required') ,
        rePassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords do not match') // Corrected error message
        .required('Confirm password is required'),
      
      
    })

    async function handleRegister(formvalues){
      setisLoading(true)
      try{
        let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", formvalues)
      
        console.log(data.token) ;
        console.log(data.message) ;
        
        setapiError(null)
        localStorage.setItem('userToken',data?.token)
        setUserLogin(data?.token)
        navigate("/");
          
        setisLoading(false) ;
        // setapiError(null)

      } 
      catch(error){
        console.log(error);
        setapiError(error?.response?.data.message)
        setisLoading(false)  
      } 
         
      
      
    }

    let formik = useFormik({
      initialValues:{
        name:'' ,
        phone:'' ,
        email:'' ,
        password:'' ,
        rePassword:'' ,
      } ,

      validationSchema:yupValidation ,
      onSubmit:handleRegister
    })

    useEffect(()=>{

    }, [])

  return (
    <>
        <div className='container h-[85vh] flex items-center '>
          
          <form onSubmit={formik.handleSubmit} className='w-3/4 md:w-[60%]  mx-auto '>

          {apiError ?   <div class="p-4 mb-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span class="font-medium">{apiError}</span> 
                      </div>:null}

              <div>
                <h1 className='fa-2x'>Register Now :</h1>
              </div>

              <div className="grid mt-7  gap-6 mb-6 ">
                  <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">name</label>
                      <input type="text" name='name' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />

                      {formik.errors.name && formik.touched.name?  <div class="p-4 mb-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span class="font-medium">{formik.errors.name}</span>
                      </div>:null}
                  </div>
          

              </div>
              <div className="mb-6">
                  <label htmlFor="email" claclassNames="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                  <input type="email" name='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
                  
                  {formik.errors.email && formik.touched.email?  <div class="p-4 mb-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span class="font-medium">{formik.errors.email}</span> 
                      </div>:null}
              </div> 

              <div className="mb-6">
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" name='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                  
                  {formik.errors.password && formik.touched.password?  <div class="p-4 mb-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span class="font-medium">{formik.errors.password}</span> 
                      </div>:null}    
              
              </div> 

              <div className="mb-6">
                  <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">rePassword</label>
                  <input type="password" name='rePassword' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} id="rePassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                    
                  {formik.errors.rePassword && formik.touched.rePassword?  <div class="p-4 mb-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span class="font-medium">{formik.errors.rePassword}</span>
                      </div>:null}  
                
              </div> 

              <div>
                  <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">phone</label>
                  <input type="text" name='phone' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
                  
                  {formik.errors.phone && formik.touched.phone?  <div class="p-4 mb-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span class="font-medium">{formik.errors.phone}</span> 
                      </div>:null}   
              
              </div>
              
              <div className="flex items-center mb-6 mt-6">
                {isLoading ?     <button className=" text-white bg-[#0aad0a] hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  <i class="fas fa-spinner animate-spin text-2xl text-white-500"></i>
                   </button>
                   :    <button type="submit" className=" text-white bg-[#0aad0a] hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                }
                  
              </div>
              
          </form>

        </div>
    </>
  )
}


{/* <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Login</label> */}