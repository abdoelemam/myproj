import React, { useEffect, useState } from 'react'
import Style from './Footer.module.css'

export default function Footer() {
    let [Name, setName]  = useState('A')

    useEffect(()=>{

    }, [])

  return (
    <>
        <footer className='bg-[rgb(242,242,242)] mt-8  '>
          <div className='container    py-10  justify-center items-center'>
            <h2 className='text-2xl px-2'>Get the FreshCart app</h2>
            <p className='text-gray-500 px-2'>we will send you a link open it on your phone to Download the app</p>

            <form class="flex flex-wrap items-center gap-y-3 px-4 mt-4">   
              <div class="relative w-3/4 me-4">
                  <input type="text" id="voice-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-3 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required />
              </div>
              <button type="submit" class="inline-flex block gap-1 items-center py-2.5 px-3  text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <span>share </span>
              <span> App </span>
              <span> Link </span>
              </button>
          </form>

          <hr class="h-px my-8 mx-4 bg-gray-300 border-0 dark:bg-gray-700"></hr>

          <div className='flex px-4 flex-wrap gap-y-4 justify-between'>
            
            <div className='flex flex-wrap gap-2'>
              <h2 className='text-xl'>Parteners Payment</h2>
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" width={30} />
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg" alt="Bitcoin" width={30} />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" alt="Mastercard" width={30} />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" width={50} />
            </div>

            <div className='flex flex-wrap gap-2'>
              <h2 className='text-xl'>Get Delivries with FreshCart</h2>
              <div className='flex flex-wrap gap-2'>
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" width={100} />
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" width={100} />
              </div>
            </div>
          </div>

          <hr class="h-px mx-4  my-8 bg-gray-300 border-0 dark:bg-gray-700"></hr>

          </div>
        </footer>
    </>
  )
}

// max-w-screen-xl
// fixed bottom-0 left-0 w-full