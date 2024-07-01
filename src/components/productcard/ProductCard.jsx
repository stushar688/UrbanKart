import React, { useContext, useEffect } from 'react'
import myContext from '../../context/data/mycontext'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../redux/cartSlice'
import { toast } from 'react-toastify'

export default function ProductCard() {
    const context = useContext(myContext)
    const { mode, products, loading, searchkey, setSearchkey, filterType, setFilterType, filterPrice, setFilterPrice } = context

    const dispatch = useDispatch()
    const cartitems = useSelector((state) => state.cart)

    const addCart = (product) => {
        dispatch(addToCart(product));
        toast.success('added to cart')
    }
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartitems))

    }, [cartitems])
    // console.log(cartitems)
    return (
        <section className="text-gray-600 md:mx-20 sm:mx-10 body-font">
            <div className="container px-7 py-8  md:py-16 ">
                <div class="lg:w-1/2 w-full mb-6 lg:mb-10">
                    <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>Our Latest Collection</h1>
                    <div class="h-1 w-20 bg-pink-600 rounded"></div>
                </div>

                <div className="flex flex-wrap -m-4">
                    {products.filter((obj) => obj.title.toLowerCase().includes(searchkey))
                        .filter((obj) => obj.category.toLowerCase().includes(filterType))
                        .filter((obj) => obj.price.includes(filterPrice)).slice(0, 8)
                        .map((item, index) => {
                            return (
                                <div onClick={() => window.location.href = `/productinfo/${item.id}`} key={index} className="p-4 md:w-80 lg:w-1/4 drop-shadow-lg " >
                                    <div className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out    border-gray-200 border-opacity-60 rounded-2xl overflow-hidden" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                        <div className=" flex justify-center cursor-pointer" >
                                            
                                            <img className=" rounded-2xl h-80 w-full p-2 object-cover object-center hover:scale-110 transition-scale-110  duration-300 ease-in-out" src={item.imageUrl} alt="blog" />
                                
                                        </div>
                                        <div className="p-5 border-t-2">
                                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{ color: mode === 'dark' ? 'white' : '', }}>UrbanKart</h2>
                                            <h1 className="line-clamp-1 title-font text-lg font-medium text-gray-900 mb-3" style={{ color: mode === 'dark' ? 'white' : '', }}>{item.title}</h1>
                                            <p className="line-clamp-3 leading-relaxed mb-3">{item.description}</p>
                                            <p className="leading-relaxed mb-3" style={{ color: mode === 'dark' ? 'white' : '' }}>car {item.price}</p>
                                            <div className=" flex justify-center">
                                                <button
                                                    onClick={() => addCart(item)}
                                                    type="button"
                                                    className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full  py-2">Add To Cart</button>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )

                        })}


                </div>

            </div>
        </section >
    )
}
