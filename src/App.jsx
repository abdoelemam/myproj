// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Categories from './components/Categories/Categories';
import Cart from './components/Cart/Cart';
import Brands from './components/Brands/Brands';
import Products from './components/Products/Products';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Notfound from './components/Notfound/Notfound';
import { UserContextProvider } from './components/UserContext/UserContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartContextProvider from './components/CartContext/CartContext';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ✅ Import the styles
import ShippingCart from './components/ShippingCart/ShippingCart';
import {  OrdersContextProvider } from './components/ordersContext/ordersContext';
import { WishlistContextProvider } from './components/WishlistContext/WishlistContext';
import Whishlist from './components/Whishlist/Whishlist';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import VerifyCode from './components/VerifyCode/VerifyCode';
import ResetPassword from './components/ResetPassword/ResetPassword';
import AllOrders from './components/AllOrders/AllOrders';



const routes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute>  },
      { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute>  },
      { path: "brands", element: <ProtectedRoute> <Brands /> </ProtectedRoute>  },
      { path: "products", element: <ProtectedRoute><Products /></ProtectedRoute>  },
      { path: "productdetails/:id/:category", element: <ProtectedRoute><ProductDetails/> </ProtectedRoute>  },
      { path: "shippingcart", element: <ProtectedRoute> <ShippingCart/> </ProtectedRoute>  }, 
      { path: "allorders", element: <ProtectedRoute> <AllOrders/> </ProtectedRoute>  },
      { path: "wishlist", element: <ProtectedRoute> <Whishlist/> </ProtectedRoute>  },
      { path: "forgotpassword", element:  <ForgotPassword/>   },
      { path: "verifycode", element: <VerifyCode/>   },
      { path: "resetpassword", element:  <ResetPassword/>   },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  return <>
        <UserContextProvider>
          <CartContextProvider>
            <WishlistContextProvider>
              <OrdersContextProvider>
              <RouterProvider router={routes}>  </RouterProvider>
              </OrdersContextProvider>
            </WishlistContextProvider>
          </CartContextProvider>
          <ToastContainer />
        </UserContextProvider>
  </>


}

export default App;
