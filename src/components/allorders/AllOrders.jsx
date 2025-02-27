import React, { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Modal } from "flowbite";
import { UserContext } from "../UserContext/UserContext";
import { OrdersContext } from "../OrdersContext/OrdersContext";

export default function AllOrders() {
  const { userLogin } = useContext(UserContext);
  const { getOrders } = useContext(OrdersContext);
  const [userId, setUserId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [selectOrders, setSelectOrders] = useState([]);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    if (userLogin) {
      const decoded = jwtDecode(userLogin);
      setUserId(decoded.id);
    }
  }, [userLogin]);

  useEffect(() => {
    if (userId) {
      getOrders(userId).then((data) => setOrders(data.slice().reverse()));
    }
  }, [userId]);

  useEffect(() => {
    const modalElement = document.getElementById("modalEl");
    if (modalElement) {
      const newModal = new Modal(modalElement, {
        placement: "bottom-right",
        backdrop: "dynamic",
        closable: true,
      });
      setModal(newModal);
    }
  }, []);

  function openModal(order) {
    if (modal) {
      setSelectOrders(order);
      console.log(order)
      modal.show();
    }
  }

  function closeModal() {
    if (modal) {
      modal.hide();
    }
  }

  return (
    <>
      <div className="container min-h-[70vh]">
        <div className="relative overflow-x-auto   ">
          <table className="w-full  m-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Product ID</th>
                <th className="px-6 py-3">Is Paid</th>
                <th className="px-6 py-3">Payment Method</th>
                <th className="px-6 py-3">Details</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order.id} className="bg-white dark:bg-gray-800">
                  <td className="px-6 py-4">{order.id}</td>
                  <td className="px-6 py-4">{order.isPaid ? "Paid" : "Not Paid"}</td>
                  <td className="px-6 py-4">{order.paymentMethodType}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openModal(order)}
                      className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


        {/* Modal */}
        <div
          id="modalEl"
          tabIndex={-1}
          className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-full"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Products
                </h3>
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8"
                >
                  ✕
                </button>
              </div>
              <div className="p-4 space-y-4">
                <div className='flex justify-between text-2xl m-12'>
                <div><h2>Total product number: <span className='text-main'>{selectOrders?.cartItems?.length}</span></h2></div>
                <div><h2>Total Price: <span className='text-main'>${selectOrders?.totalOrderPrice}</span></h2></div>
                </div>

                <table className="w-full text-sm text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-16 py-3">Image</th>
                      <th className="px-6 py-3">Product</th>
                      <th className="px-6 py-3">Qty</th>
                      <th className="px-6 py-3">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectOrders.cartItems?.map((product, index) => (
                      <tr key={index} className="bg-white dark:bg-gray-800 border-b">
                        <td className="p-4">
                          <img
                            src={product.product.imageCover}
                            className="w-16 md:w-32"
                            alt="Product"
                          />
                        </td>
                        <td className="px-6 py-4">{product?.product?.category?.name}</td>
                        <td className="px-6 py-4">{product.count}</td>
                        <td className="px-6 py-4">${product.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

    </>
  );
}
























// import React, { useContext, useEffect, useState } from 'react'
// import Style from './AllOrders.module.css'
// import axios from 'axios'
// import { CartContext } from '../CartContext/CartContext'
// import { UserContext } from '../UserContext/UserContext'
// import { OrdersContext } from '../ordersContext/ordersContext'
// import { jwtDecode } from "jwt-decode"
// import { Modal } from 'flowbite';

// export default function AllOrders() {
//     let [Name, setName]  = useState('A')
//     let {userLogin} = useContext(UserContext)
//     let {getOrders} = useContext(OrdersContext)
//     let [userId, setuserId] = useState(null)
//     let [Orders, setOrders] = useState([])  
//     let [selectOrders, setselectOrders] = useState([]) 
    
//     // set the modal menu element
//   const $targetEl = document.getElementById('modalEl');

// // options with default values
//   // const options = {
//   //     placement: 'bottom-right',
//   //     backdrop: 'dynamic',
//   //     backdropClasses:
//   //         'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
//   //     closable: true,
//   //     onHide: () => {
//   //         console.log('modal is hidden');
//   //     },
//   //     onShow: () => {
//   //         console.log('modal is shown');
//   //     },
//   //     onToggle: () => {
//   //         console.log('modal has been toggled');
//   //     },
//   // };

//   // instance options object
//   const instanceOptions = {
//     id: 'modalEl',
//     override: true
//   };


//     // const modal = new Modal($targetEl, options, instanceOptions);
    
//     function openModal(order){
//       modal.show()
//       setselectOrders(order)
//     }

//     function colseModal(){
//       modal.hide()
//     }



//     function getuserId(){
//       let decoded = jwtDecode(userLogin)
//       setuserId(decoded.id)
//     }


//     async function getAllOrders(){
//       console.log(userId)
//       getuserId()
//       console.log(userId)
//       let data = await getOrders(userId)
//       console.log(data)
//       setOrders(data)

//     }

//     if(userId == null){
//       getAllOrders()
//     }

//     const [modal, setModal] = useState(null);
  
//     useEffect(()=>{

//         {      userLogin &&  getAllOrders()  ;
        
//         const modalElement = document.getElementById('modalEl');
//         if (modalElement) {
//             const options = {
//                 placement: 'bottom-right',
//                 backdrop: 'dynamic',
//                 closable: true,
//                 onHide: () => console.log('modal is hidden'),
//                 onShow: () => console.log('modal is shown'),
//                 onToggle: () => console.log('modal has been toggled'),
//             };
//             const newModal = new Modal(modalElement, options);
//             setModal(newModal);}

  
//     }, [userLogin && userId]) 
    

//   return (
//     <>
        

// <div classname="container">
//   <div className="relative overflow-x-auto">
//     <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//       <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
//         <tr>
//           <th scope="col" className="px-6 py-3">
//             Product id
//           </th>
//           <th scope="col" className="px-6 py-3">
//             isPaid
//           </th>
//           <th scope="col" className="px-6 py-3">
//             paymentMethod
//           </th>
//           <th scope="col" className="px-6 py-3">
//             Details
//           </th>
//         </tr>
//       </thead>
//       <tbody>
//       {console.log(Orders)}
//                 {Orders?.map((order) =>             <tr class="bg-white dark:bg-gray-800">
//                       <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                         {order?.id}
//                       </th>
//                       <td class="px-6 py-4">
//                       {order?.isPaid ? 'Paid' : 'Not Paid'}
//                       </td>
//                       <td class="px-6 py-4">
//                         {order?.paymentMethodType}
//                       </td>
//                       <td class="px-6 py-4">
//                       <button id='modalEl' onClick={()=> openModal(order.cartItems) } className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
//                         Toggle modal
//                       </button>
//                       </td>
//                   </tr>)}
//       </tbody>
//     </table>
//   </div>
// </div>




//   <div>
//     {/* Modal toggle */}

//     {/* Main modal */}
//     <div id="modalEl" tabIndex={-1} aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
//       <div className="relative p-4 w-full max-w-2xl max-h-full">
//         {/* Modal content */}
//         <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
//           {/* Modal header */}
//           <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
//             <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//               Products
//             </h3>
//             <button type="button"  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="modalEl">
//               <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
//                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
//               </svg>
//               <span className="sr-only">Close modal</span>
//             </button>
//           </div>
//           {/* Modal body */}
//           <div className="p-4 md:p-5 space-y-4">
//           <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

            
//             {/* <div className='flex justify-between text-2xl m-12'>
//                 <div><h2>Total product number: <span className='text-main'>{cartDetails?.numOfCartItems}</span></h2></div>
//                 <div><h2>Total Price: <span className='text-main'>${cartDetails?.data.totalCartPrice}</span></h2></div>
//               </div> */}

//             <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//               <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//                 <tr>
//                   <th scope="col" className="px-16 py-3">
//                     <span className="sr-only">Image</span>
//                   </th>
//                   <th scope="col" className="px-6 py-3">
//                     Product
//                   </th>
//                   <th scope="col" className="px-6 py-3">
//                     Qty
//                   </th>
//                   <th scope="col" className="px-6 py-3">
//                     Price
//                   </th>
//                   <th scope="col" className="px-6 py-3">
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                   {selectOrders?.map((product)=>       <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
//                   <td className="p-4">
//                     <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
//                   </td>
//                   <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
//                     {product?.product?.category?.name}
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center">
//                       {product.count}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
//                     ${product.price}
//                   </td>
//                   <td className="px-6 py-4">
//                     {/* <a href="#" onClick={()=> removeItem(product.product.id)} className="font-medium remove-btn text-red-600 dark:text-red-500 hover:underline">Remove</a> */}
//                   </td>
//                 </tr>
//               )}


//               </tbody>
//             </table>

//             </div>
//           </div>
          
//         </div>
//       </div>
//     </div>
//   </div>




//     </>
//   )
// }
