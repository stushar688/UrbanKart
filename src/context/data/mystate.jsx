import React, { useEffect, useState } from 'react'
import myContext from './mycontext'
import { QuerySnapshot, Timestamp, addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { collapseToast, toast } from 'react-toastify';
import { fireDB } from '../../firebase/FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import { setAnalyticsCollectionEnabled } from 'firebase/analytics';
import axios from "axios";

function Mystate(props) {
    const [mode, setmode] = useState('light');
    const navigate = useNavigate

    const toggleMode = () => {
        if (mode == 'light') {
            setmode('dark');
            document.body.style.backgroundColor = "rgb(17,24,39)"
        }
        else {
            setmode('light');
            document.body.style.backgroundColor = "white"
        }
    }

    const [loading, setLoading] = useState(false);

    const [product, setProduct] = useState({
        title: null,
        price: null,
        imageUrl: null,
        description: null,
        category: null,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-us",
            {
                month: "short",
                day: "2-digit",
                year: "numeric"
            }
        )
    })

    const [image, setImage] = useState("");
    const addProduct = async () => {
        if (product.title == null || product.price == null || product.category == null || product.description == null) {
            return toast.error('Please fill all fields')
        }
        setLoading(true);
        try {
            
                const productRef = collection(fireDB, 'products');
                await addDoc(productRef, product);
                toast.success("Product added successfuly");
                setTimeout(() => {
                    window.location.href = '/dashboard'
                    setLoading(false)
                }, 800);
                getProductData();
        }
        catch (err) {
            console.log(err)
            setLoading(false)
        }
    }
    const [products, setProducts] = useState([])

    const getProductData = async () => {
        setLoading(true)
        try {
            const q = query(
                collection(fireDB, 'products'),
                orderBy('time')
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let productArray = [];
                QuerySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id })
                })
                setProducts(productArray)
                setLoading(false)
            })
            // console.log(()=>data)
            return () => data;
        }
        catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    const edithandle = (item) => {
        setProduct(item)

    }
    const updateProduct = async () => {
        setLoading(true)
        try {
            await setDoc(doc(fireDB, 'products', product.id), product)
            toast.success("Product Updated successfully")
            setTimeout(() => {
                window.location.href = '/dashboard'
                setLoading(false)
            }, 800);
            getProductData();
            setLoading(false);
        }
        catch (err) {
            console.log(err)
            setLoading(false)
        }

    }
    const deleteProduct = async (item) => {
        setLoading(true)
        try {
            await deleteDoc(doc(fireDB, 'products', item.id))
            toast.success("Product Deleted successfully")
            getProductData();
            setLoading(false);
        }
        catch (err) {
            console.log(err)
            setLoading(false)
        }

    }

    // -----------------order------------------

    const [order, setOrder] = useState([]);

    const getOrderData = async () => {
        setLoading(true)
        try {
            const result = await getDocs(collection(fireDB, "orders"))
            const ordersArray = [];
            result.forEach((doc) => {
                ordersArray.push(doc.data());
                setLoading(false)
            });
            setOrder(ordersArray);
            console.log(ordersArray)
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    //   user---------------------------

    const [user, setUser] = useState([]);

    const getUserData = async () => {
        setLoading(true)
        try {
            const result = await getDocs(collection(fireDB, "users"))
            const usersArray = [];
            result.forEach((doc) => {
                usersArray.push(doc.data());
                setLoading(false)
            });
            setUser(usersArray);
            console.log(usersArray)
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getProductData();
        getOrderData()
        getUserData();
    }, []);

    const [searchkey, setSearchkey] = useState('')
    const [filterType, setFilterType] = useState('')
    const [filterPrice, setFilterPrice] = useState('')
    return (
        <myContext.Provider value={{ image, setImage, searchkey, setSearchkey, filterType, setFilterType, filterPrice, setFilterPrice, mode, toggleMode, loading, setLoading, products, setProduct, product, addProduct, edithandle, updateProduct, deleteProduct, order, user }}>
            {props.children}
        </myContext.Provider>
    )
}

export default Mystate
