import React, { useContext, useState } from 'react'
import myContext from '../../../context/data/mycontext'
import Loader from '../../../components/loader/Loader';
import axios from 'axios';

function AddProduct() {
    const context=useContext(myContext);
    const {setLoading,addProduct,product,setProduct,loading}=context;
    
    const [image,setimage]=useState("");

    const uploadimage=(e)=>{
        setLoading(true);
        const data = new FormData();
        const f=e.target.files[0];
            data.append("file", f)
            data.append("upload_preset", "ecommerceewebsite")
            data.append("cloud_name", "ewebsite");
            fetch(`https://api.cloudinary.com/v1_1/ewebsite/image/upload`, {
                method: "post",
                body: data
            })
                .then((res => res.json()))
                .then((data) => {
                    setProduct({ ...product, imageUrl: data.secure_url })
                    console.log(data.secure_url)
                    setLoading(false);
                })
                .catch(err => console.log(err))
    }


    return (
        <div>
            {loading &&<Loader/>}
            <div className=' flex justify-center items-center h-screen'>
                <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                    <div className="">
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Add Product</h1>
                    </div>
                    <div>
                        <input type="text"
                            name='title'
                            value={product.title}
                            onChange={(e)=>setProduct({...product,title: e.target.value})}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product title'
                        />
                    </div>
                    <div>
                        <input type="text"
                            name='price'
                            value={product.price}
                            onChange={(e)=>setProduct({...product,price: e.target.value})}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product price'
                        />
                    </div>
                    <div>
                        <input type="file"
                            name='imageurl'
                            // value={product.imageUrl}
                            onChange={uploadimage}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product imageUrl'
                        />
                    </div>
                    <div>
                        <input type="text"
                            name='category'
                            value={product.category}
                            onChange={(e)=>setProduct({...product,category: e.target.value})}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product category'
                        />
                    </div>
                    <div>
                       <textarea cols="30" rows="10" name='title'
                            value={product.description}
                            onChange={(e)=>setProduct({...product,description: e.target.value})}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product description'>

                       </textarea>
                    </div>
                    <div className=' flex justify-center mb-3'>
                        <button
                            onClick={addProduct}
                            className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg'>
                            Add Product
                        </button>
                    </div>
                 
                </div>
            </div>
        </div>
    )
}

export default AddProduct 