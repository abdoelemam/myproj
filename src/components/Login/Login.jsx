import React, { useContext, useEffect, useState } from 'react'
import Style from './Login.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { UserContext } from '../UserContext/UserContext';






export default function Login() {
  let [Name, setName]  = useState('A')
  let navigate = useNavigate();
  let [isLoading, setisLoading] = useState(false)
  let [apiError, setapiError] = useState(null)
  let {userLogin, setUserLogin} = useContext(UserContext)

  let yupValidation = Yup.object().shape({
    email:Yup.string().email('invalid email').required('email is required') ,
    password:Yup.string()
  .min(3, 'Password must be at least 3 characters')
  .max(9, 'Password must not exceed 9 characters')
  .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{3,9}$/, 'Password must start with an uppercase letter, include at least one lowercase letter and one digit')
  .required('Password is required')
  })

  function handleLogin(formvalues){
    setisLoading(true)
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", formvalues)
    .then((apiresponse) =>{console.log(apiresponse) ;
      localStorage.setItem('userToken',apiresponse?.data.token)
      setUserLogin(apiresponse?.data.token)
      navigate('/')
      setisLoading(false) ;
      setapiError(null)
       
      })
      .catch((apiresponse) => { console.log(apiresponse?.response?.data?.message);
       setapiError(apiresponse?.response?.data?.message) ;
       setisLoading(false)  
      })
    
  
  }

  let formik = useFormik({
    initialValues:{
      email:'' ,
      password:'' ,
    } ,

    validationSchema:yupValidation ,
    onSubmit:handleLogin
  })

  useEffect(()=>{

  }, [])

return (
  <>
      <div className='container h-[60vh] flex items-center '>
        
        <form onSubmit={formik.handleSubmit} className='w-3/4 md:w-[60%]   mx-auto '>

        {apiError ?   <div class="p-4 mb-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                      <span class="font-medium">{apiError}</span> 
                    </div>:null}

            <div>
              <h1 className='fa-2x'>Login Now :</h1>
            </div>

            <div className="grid mt-7  gap-6 mb-6 ">
        

            </div>
            <div className="mb-6">
                <label htmlFor="email" claclassNames="block mb-2 text-sm focus:ring-[#0aad0a] font-medium text-gray-900 dark:text-white">Email</label>
                <input type="email" name='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
                
                {formik.errors.email && formik.touched.email?  <div class="p-4 mb-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                      <span class="font-medium">{formik.errors.email}</span> 
                    </div>:null}
            </div> 

            <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                
                {formik.errors.password && formik.touched.password?  <div class="p-4 mb-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                      <span class="font-medium"> {formik.errors.password} </span> 
                    </div>:null}    
            
            </div> 

            
            <div className="flex items-center mb-6 mt-6">
              {isLoading ?     <button className=" text-white bg-[#0aad0a] hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <i class="fas fa-spinner animate-spin text-2xl text-white-500"></i>
                 </button>
                 :    <>
                 <div className=''>
                  <button type="submit" className="block text-white bg-[#0aad0a] hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                  <Link to={'/forgotpassword'} className='block w-full mt-6'> Forgot Password</Link>
                 </div>

                  

                 </>
              }
                
            </div>
            
        </form>

      </div>
  </>
)
}