import React, { useContext, useState } from 'react'
import myContext from '../../context/data/mycontext';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { BsFillCloudSunFill } from 'react-icons/bs'
import { FiSun } from 'react-icons/fi'
import { RxCross2 } from 'react-icons/rx'
import { MdClose, MdCloseFullscreen, MdDarkMode } from 'react-icons/md'
import { useSelector } from 'react-redux';
import logo from './urbankartlogo.jpg'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const context = useContext(myContext)
  const { toggleMode, mode } = context;

  const user = JSON.parse(localStorage.getItem('user'))
  // console.log(user.user.email)

  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear('user');
    navigate('/login')
  }
  const togglenavbar = () => {
    setOpen(!open);
  }
  const cartitems = useSelector((state) => state.cart)
  return (
    <header className='relative bg-white'>
      <nav aria-label='Top' className='bg-gray-100 px-4 sm:px-6 lg:px-8 shadow-xl' style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '' }}>
        <div className=''>
          <div className='flex h-16 items-center'>

            {/* <button onClick={togglenavbar} data-collapse-toggle="navbar-hamburger" type="button" className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-hamburger" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
            <div className="hidden w-full" id="navbar-hamburger">
              <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <li>
                  <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded dark:bg-blue-600" aria-current="page">Home</a>
                </li>
                <li>
                  <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Services</a>
                </li>
                <li>
                  <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white">Pricing</a>
                </li>
                <li>
                  <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Contact</a>
                </li>
              </ul>
            </div> */}
            <button
              type='button'
              className='rounded-md bg-white p-2 text-gray-400 lg:hidden'
              onClick={togglenavbar} style={{ backgroundColor: mode === 'dark' ? 'rgb(80 82 87)' : '', color: mode === 'dark' ? 'white' : '' }}
            >{open ? <MdClose size={24} /> :
              (
                <>
                  <span className='sr-only'>open menu</span>
                  <svg xmlns="" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                </>
              )
              }
            </button>

            <div className='ml-4 flex lg:ml-0'>
              <Link to={'/'} className='flex'>
                <div className='flex'>
                  <div>
                    <img src={logo} alt="na" width='55px' />
                  </div>

                  <h1 className='text-2xl font-bold text-black px-2 py-1 rounded' style={{ color: mode === 'dark' ? 'white' : '', }}>UrbanKart</h1>
                </div>
              </Link>
            </div>

            <div className='flex items-center ml-auto'>
              <div className=' hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
                <Link to={'/allproducts'} className='text-sm font-medium text-gray-700 ' style={{ color: mode == 'dark' ? 'white' : '' }}>
                  All Products
                </Link>

                {
                  user?.user?.email === "mank@gmail.com" ? <Link to={'/order'} className='text-sm font-medium text-gray-700 ' style={{ color: mode == 'dark' ? 'white' : '' }}>
                    Order
                  </Link> : ""
                }

                {
                  user?.user?.email === "mank@gmail.com" ? <Link to={'/dashboard'} className='text-sm font-medium text-gray-700 ' style={{ color: mode == 'dark' ? 'white' : '' }}>
                    Admin
                  </Link> : ""
                }

                {
                  user ? <a onClick={logout} className='text-sm font-medium text-gray-700 cursor-pointer' style={{ color: mode == 'dark' ? 'white' : '' }}>
                    Logout
                  </a> :
                    <a href='/login' className='text-sm font-medium text-gray-700 cursor-pointer' style={{ color: mode == 'dark' ? 'white' : '' }}>
                      Login
                    </a>
                }

              </div>

              {/* search */}

              <div className='flex lg:ml-6'>
                <button className='' onClick={toggleMode}>
                  {
                    mode === "light" ? (<FiSun className='' size={30} />) : 'dark' ? (<MdDarkMode size={30} />) : ''
                  }
                  {/* <MdDarkMode size={30} style={{ color: mode === 'dark' ? 'white' : '' }} /> */}
                </button>
              </div>

              {/* cart */}

              <div className='ml-4 flow-root lg:ml-6'>
                <Link to={'/cart'} className='group -m-2 flex items-center p-2' style={{ color: mode === 'dark' ? 'white' : '', }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                  <span className="ml-2 text-sm font-medium text-gray-700 group-" style={{ color: mode === 'dark' ? 'white' : '', }}>{cartitems.length}</span>
                  <span className="sr-only">items in cart, view bag</span>
                </Link>
              </div>

            </div>

          </div>
        </div>
      </nav>
      {
        open &&(
          <div className='transition ease-in-out duration-300 flex z-20 w-[60%] h-[220px] flex-col absolute items-start px-5 bg-gray-50 justify-center flex-wrap gap-2 shadow-2xl'>
            
                <Link to={'/allproducts'} className='text-lg font-medium text-gray-700 py-1' style={{ color: mode == 'dark' ? 'white' : '' }}>
                  All Products
                </Link>

                {
                  user?.user?.email === "mank@gmail.com" ? <Link to={'/order'} className='py-1 text-lg font-medium text-gray-700 ' style={{ color: mode == 'dark' ? 'white' : '' }}>
                    Order
                  </Link> : ""
                }

                {
                  user?.user?.email === "mank@gmail.com" ? <Link to={'/dashboard'} className='py-1 text-lg font-medium text-gray-700 ' style={{ color: mode == 'dark' ? 'white' : '' }}>
                    Admin
                  </Link> : ""
                }

                {
                  user ? <a onClick={logout} className='py-2 text-lg font-medium text-gray-700 cursor-pointer' style={{ color: mode == 'dark' ? 'white' : '' }}>
                    Logout
                  </a> :
                    <a href='/login' className='py-2 text-md font-medium text-gray-700 cursor-pointer' style={{ color: mode == 'dark' ? 'white' : '' }}>
                      Login
                    </a>
                }

              
          </div>
        )
      }
    </header>
  )
}
