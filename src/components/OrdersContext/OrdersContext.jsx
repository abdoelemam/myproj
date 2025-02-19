import axios from "axios";
import { createContext, useEffect, useState } from "react";



export let OrdersContext = createContext(0)

export function OrdersContextProvider(props){

      async function getOrders(Id){
        let {data} = await axios(`https://ecommerce.routemisr.com/api/v1/orders/user/${Id}`)
        return data
      }

    useEffect(()=>{

    }, [])

    return <>
        <OrdersContext.Provider value={{getOrders}}>
            {props.children}
        </OrdersContext.Provider>
    </>
}