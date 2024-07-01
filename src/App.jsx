import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Order from './pages/order/Order'
import Cart from './pages/cart/Cart'
import Dashboard from './pages/admin/dashboard/Dashboard'
import NoPage from './pages/nopage/NoPage'
import Mystate from './context/data/mystate'
import Signup from './components/registration/Signup'
import Login from './components/registration/Login'
import ProductInfo from './pages/productInfo/ProductInfo'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddProduct from './pages/admin/pages/AddProduct'
import UpdateProduct from './pages/admin/pages/UpdateProduct'
import Allproducts from './pages/allproducts/Allproducts'

export default function App() {
  return (
    <Mystate>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          } />
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRouteForAdmin>
              <Dashboard />
            </ProtectedRouteForAdmin>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Productinfo/:id" element={<ProductInfo />} />
          <Route path="/allproducts" element={<Allproducts />} />
          <Route path="/addproduct" element={
            <ProtectedRouteForAdmin>
              <AddProduct />
            </ProtectedRouteForAdmin>
          } />
          <Route path="/updateproduct" element={
            <ProtectedRouteForAdmin>
              <UpdateProduct />
            </ProtectedRouteForAdmin>
          } />
          <Route path="/*" element={<NoPage />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </Mystate>
  )
}

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user')
  if (user) {
    return children
  } else {
    return <Navigate to={'/login'} />
  }
}
const ProtectedRouteForAdmin = (props) => {
  const admin = JSON.parse(localStorage.getItem('user'))
  console.log(admin.user.email)
  if (admin.user.email == 'mank@gmail.com') {
    return props.children
  } else {
    return <Navigate to={'/login'} />
  }
}

