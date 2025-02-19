import React, { useContext, useEffect, useState } from 'react'
import Style from './Navbar.module.css'
import logo from '../../assets/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../UserContext/UserContext';
import { CartContext } from '../CartContext/CartContext';
import { WishlistContext } from '../WishlistContext/WishlistContext';


export default function Navbar() {
    let [Name, setName]  = useState('A')
    let navigate = useNavigate()
    let {userLogin, setUserLogin} = useContext(UserContext)
    let {numOfCartItems} = useContext(CartContext)

    let {whishData} = useContext(WishlistContext)
    

    function logOut(){
      localStorage.removeItem('userToken')
      setUserLogin(null)
      navigate('/login')
    }

    useEffect(()=>{
      
    }, [])

  return (
    <>
        

<nav className="bg-[#F2F2F2] dark:bg-gray-900  fixed  w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
  <div className="container flex flex-wrap items-center justify-between mx-auto p-4">
    <div className='flex gap-5'>
      <Link to='/' href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src={logo} className="h-8" alt="FreshCart Logo" />
      </Link>

      <div className=" absolute left-0 top-[55px] md:relative md:top-0  block justify-center lg:items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          {userLogin ?         <ul className="flex flex-col md:items-center p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-[#F2F2F2] dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li className=''>
            <NavLink to='/'  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#0aad0a] md:p-0 md:dark:hover:text-[#0aad0a] dark:text-white dark:hover:bg-gray-700 dark:hover:text-[#0aad0a] md:dark:hover:bg-transparent dark:border-gray-700 " aria-current="page" >Home</NavLink>
          </li>
          <li>
          <NavLink 
            to={'cart'} 
            className="relative block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 
                      md:hover:bg-transparent md:hover:text-[#0aad0a] md:p-0 md:dark:hover:text-[#0aad0a] 
                      dark:text-white dark:hover:bg-gray-700 dark:hover:text-[#0aad0a] md:dark:hover:bg-transparent 
                      dark:border-gray-700"
          >
            Cart
            {numOfCartItems > 0 && (
              <span className="absolute -top-2 -right-5 bg-[#0aad0a] text-white text-xs font-bold 
                              px-2 py-0.5 rounded-full">
                {numOfCartItems}
              </span>
            )}
        </NavLink>
          </li>
          <li>
            <NavLink to={'products'} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#0aad0a] md:p-0 md:dark:hover:text-[#0aad0a] dark:text-white dark:hover:bg-gray-700 dark:hover:text-[#0aad0a] md:dark:hover:bg-transparent dark:border-gray-700">Products</NavLink>
          </li>
          <li>
            <NavLink to={'categories'} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#0aad0a] md:p-0 md:dark:hover:text-[#0aad0a] dark:text-white dark:hover:bg-gray-700 dark:hover:text-[#0aad0a] md:dark:hover:bg-transparent dark:border-gray-700">Categories</NavLink>
          </li>
          <li>
            <NavLink to={'brands'} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#0aad0a] md:p-0 md:dark:hover:text-[#0aad0a] dark:text-white dark:hover:bg-gray-700 dark:hover:text-[#0aad0a] md:dark:hover:bg-transparent dark:border-gray-700">Brands</NavLink>
          </li>


            {userLogin ?           <li class="md:hidden">
            <span onClick={()=>{ logOut() }} className='block cursor-pointer py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#0aad0a] md:p-0 md:dark:hover:text-[#0aad0a] dark:text-white dark:hover:bg-gray-700 dark:hover:text-[#0aad0a] md:dark:hover:bg-transparent dark:border-gray-700'>Logout</span>
          </li> : <>

          <li class="md:hidden">
            <Link to={'login'} className=' block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#0aad0a] md:p-0 md:dark:hover:text-[#0aad0a] dark:text-white dark:hover:bg-gray-700 dark:hover:text-[#0aad0a] md:dark:hover:bg-transparent dark:border-gray-700'>Login</Link>
          </li>

          <li class="md:hidden">
            <Link to={'register'} className='block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#0aad0a] md:p-0 md:dark:hover:text-[#0aad0a] dark:text-white dark:hover:bg-gray-700 dark:hover:text-[#0aad0a] md:dark:hover:bg-transparent dark:border-gray-700'>Register</Link>
          </li>    
          </>}
        </ul> : null}
      </div>
    </div>


    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <div className='flex items-center gap-6'>
      <Link to={'/wishlist'}> 
            <span className="relative inline-block">
              {/* Heart Icon */}
              <i className="fa-solid fa-heart text-black text-xl "></i>

              {/* Count Badge */}
              
                {whishData.count ? <span className="absolute -top-2 -right-2 bg-[#0aad0a] text-white text-xs font-bold px-2 py-1 rounded-full"> {whishData.count} </span>: null } 
              
            </span>

          
          </Link> 
        <ul className=' hidden lg:flex items-center gap-3  '>
          <a className='block' href=""><i class="fa-brands  fa-facebook "></i></a>
          <a href=""><i class="fa-brands fa-twitter"></i></a>
          <a href=""><i class="fa-brands fa-tiktok "></i></a>
          <a href=""><i class="fa-brands fa-youtube"></i></a>
          <a href=""><i class="fa-brands fa-instagram"></i></a>
        </ul>

        <ul className='hidden md:flex items-center gap-3' >
          {userLogin ?   
          <>                           
          <li>
            <span onClick={()=>{ logOut() }} className='block cursor-pointer py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#0aad0a] md:p-0 md:dark:hover:text-[#0aad0a] dark:text-white dark:hover:bg-gray-700 dark:hover:text-[#0aad0a] md:dark:hover:bg-transparent dark:border-gray-700'>Logout</span>
          </li>
          </> : <>

          <li>
            <Link to={'login'} className='block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#0aad0a] md:p-0 md:dark:hover:text-[#0aad0a] dark:text-white dark:hover:bg-gray-700 dark:hover:text-[#0aad0a] md:dark:hover:bg-transparent dark:border-gray-700'>Login</Link>
          </li>

          <li>
            <Link to={'register'} className='block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#0aad0a] md:p-0 md:dark:hover:text-[#0aad0a] dark:text-white dark:hover:bg-gray-700 dark:hover:text-[#0aad0a] md:dark:hover:bg-transparent dark:border-gray-700'>Register</Link>
          </li>
          </> }
        </ul>
      </div>

      <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>
    </div>

  </div>
</nav>


    </>
  )
}
