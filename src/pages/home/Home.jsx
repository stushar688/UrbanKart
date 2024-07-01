import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import myContext from '../../context/data/mycontext'
import HeroSection from '../../components/herosection/HeroSection'
import Filter from '../../components/filter/Filter'
import ProductCard from '../../components/productcard/ProductCard'
import Track from '../../components/track/Track'
import Testimonial from '../../components/testimonial/Testimonial'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, deleteFromCart } from '../../redux/cartSlice'
import { Link } from 'react-router-dom'

export default function Home() {

    // const dispatch=useDispatch();
    // const cartItem = useSelector((state)=>state.cart)
    // console.log(cartItem)
    // const addcart=()=>{
    //     dispatch(addToCart("shirt"))
    // }
    // const dltcart=()=>{
    //     dispatch(deleteFromCart("shirt"))
    // }
  return (
    <Layout>
        {/* <div className="flex">
            <button onClick={()=>addcart()}>add</button>
            <button onClick={()=>dltcart()}>dlt</button>
        </div> */}
        <HeroSection/>
        <Filter/>
        <ProductCard/>
        <div className='flex justify-center py-5 -mt-10 mb-4'>
            <Link to={'/allproducts'}>
                <button className='bg-gray-300 px-5 py-2 rounded-xl'>See more</button>
            </Link>

        </div>
        <Track/>
        <Testimonial/>
    </Layout>
     
  )
}
