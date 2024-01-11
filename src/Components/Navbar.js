import React,{useState} from 'react'
import {AiOutlineClose,AiOutlineMenu} from 'react-icons/ai'
import logo from '../assets/images/logo.png'
import {
  Link
} from "react-router-dom";

const Navbar = () => {
    const [nav,setNav] = useState(true)

    const handleNav=()=>{
      setNav(!nav)
    }

  return (
    <div className='bg-[#0F1035] w-full'>
    <div className='bg-[#0F1035] flex justify-between text-white  w-full  mx-auto items-center h-28'>
      <img className='h-36 mt-6' src={logo} alt="" />

      <ul className='hidden md:flex md:items-center'>
        <a className=' lg:text-[23px] md:text-[20px] lg:mx-6 md:mx-3' href="">Home</a>
        <a className='lg:text-[23px] md:text-[20px] lg:mx-6 md:mx-3' href="">About</a>
        <a className='lg:text-[23px] md:text-[20px] lg:mx-6 md:mx-3' href="">Contact</a>
        <Link to='/login'>
        <button className='lg:text-[17px] md:text-[14px] lg:ml-6 lg:mr-4 md:ml-3 md:mr-2 font-bold border  border-white px-7 py-2 mb-0 rounded-lg'>Login</button>
        </Link>
        <Link to='/signup'>
        <button className='lg:text-[17px] md:text-[14px] font-bold lg:ml-4 md:ml-2 border border-white px-6 py-2 mb-0 rounded-lg lg:mr-12 md:mr-6'>Sign Up</button>
        </Link>
        
      </ul>
      <div onClick={handleNav} className='block md:hidden mx-10'>
        {!nav ? <AiOutlineClose size={30}/> : <AiOutlineMenu size={30}/>}
        
      </div>
      <div className={!nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#365468] ease-in-out duration-500 md:hidden' : 'fixed left-[-100%] md:hidden'}>
      
        <div className=' uppercase p-4 grid grid-cols-1 text-[18px]'>
          <a className='p-4 border-b border-gray-100'>Home</a>
          <a className='p-4 border-b border-gray-100'>About</a>
          <a className='p-4 border-b border-gray-100'>Contact</a>
          <Link to='/login' className='p-4 border-b border-gray-100'>Login</Link>
          <Link to='/signup' className='p-4 '>Sign Up</Link>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Navbar
