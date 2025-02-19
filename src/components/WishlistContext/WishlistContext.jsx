import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../UserContext/UserContext";



export let WishlistContext = createContext(0)

export function WishlistContextProvider(props){

    // let [userLogin , setUserLogin] = useState(null)
    let {userLogin} = useContext(UserContext)
    let [WishlistItems, setWishlistItems] = useState([]);
    let [whishData, setwhishData] = useState([])

    async function addToWhishlist(productId){
      let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
      {
        "productId": productId
      } ,

      {"headers": {
        token: userLogin
      }}

    )
    await getWishlist()
    setWishlistItems(data.data)
    console.log(data)
    toast("Product Added to Whislist", {theme:'dark', type:'success'});


    }


    async function getWishlist(){
      let {data}= await axios(`https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          headers:{
            token: userLogin
           }
        }
      )
      if(data.status == "success"){

        setWishlistItems(data.data.map(item => item.id)) 
        setwhishData(data)
      
        return data
      }
      
      
    }

    async function removeItem(Id) {
      let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${Id}`,
        {
          headers:{
            token: userLogin
           }
        }
      )
  
      if(data.status == "success"){
        await getWishlist()
        setWishlistItems(data.data)
        console.log(data)
        toast("Product removed from Whislist", {theme:'dark', type:'success'});
      }
    }

    useEffect(()=>{
      userLogin && getWishlist()
    }, [userLogin])

    useEffect(()=>{
      WishlistItems && console.log(WishlistItems)
    }, [WishlistItems])

    return <>
        <WishlistContext.Provider value={{addToWhishlist, getWishlist, removeItem, WishlistItems, setWishlistItems, whishData, setwhishData}}>
            {props.children}
        </WishlistContext.Provider>
    </>
}