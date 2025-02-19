import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../UserContext/UserContext'
import { toast } from 'react-toastify'


export let CartContext = createContext(0) 


export default function CartContextProvider({children}) {

  let [CartCount, setCartCount] = useState(0)
  let {userLogin} = useContext(UserContext)
  let [numOfCartItems, setnumOfCartItems] = useState(0)
  let [cartDetails, setcartDetails] = useState(null)
  let [cartId, setcartId] = useState(null)
  let [userId, setuserId] = useState(null)
  
  

  
  async function addToCart(productId){
    let testdata = await getCart()
    
    let lstId = testdata.data.products.map(item => item.product.id)

    if(lstId.includes(productId)){
      toast("Item Added Before", {theme:'dark', type:'info'});
    }
    else{
        let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
          {productId} ,
          {"headers": {
            token: userLogin
          }}
          )
          console.log(data)
          if(data.status == "success"){
            setnumOfCartItems(data.numOfCartItems)
            getCart()
            let lstId =   data.data.products.map(item => item.id)
            
          }
          return data
    }

  }

  async function getCart(){
    let {data}= await axios(`https://ecommerce.routemisr.com/api/v1/cart`,
      {
        headers:{
          token: userLogin
         }
      }
    )
    if(data.status == "success"){
      setnumOfCartItems(data.numOfCartItems)
      setcartDetails(data)
      setcartId(data.cartId)
    }
    return data
    
  }

  async function removeItem(Id) {
    let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${Id}`,
      {
        headers:{
          token: userLogin
         }
      }
    )

    if(data.status == "success"){
      getCart()
      toast("Product deleted Successfully", {theme:'dark', type:'success'});
    }
  }


  async function updateCart(Id, count){
    let {data}= await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${Id}`,

      {
        count
      } ,
      
      {
        headers:{
          token: userLogin
         }
      }
    )
    if(data.status == "success"){
      setnumOfCartItems(data.numOfCartItems)
      setcartDetails(data)
      console.log(data)
    }
    
  }


  async function payCash(formvalues){

    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
    {
      "shippingAddress": formvalues
      
    } ,
    {"headers": {
      token: userLogin
    }}
    )
    setuserId(data.data.user)
    console.log(data)

    return data
  }

  async function payOnline(formvalues){
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
      {
        "shippingAddress": formvalues
      },

      {"headers": {
        token: userLogin
      }}
    )
    return data ;
  }

  useEffect(()=>{
    userLogin && getCart()
  }, [userLogin])

  return (
    <>
      <CartContext.Provider value={{CartCount, setCartCount, addToCart, getCart, numOfCartItems, setnumOfCartItems, cartDetails, setcartDetails, removeItem, updateCart, payCash, payOnline, userId  }}>
        {children}
      </CartContext.Provider>
    </>
  )
}
