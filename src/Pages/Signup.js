import React from 'react'
import login from '../assets/images/login.png'
import { Link } from 'react-router-dom'

export default function Signup() {
  return (
    <div className='h-screen'>
       <div className=' bg-[#EEF0E5]'> 
            <div className=" flex justify-between items-center">
                <div class="flex flex-col items-center px-6 py-8 w-[50rem] justify-center md:h-screen lg:py-0 ">
                    <div class="w-full rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 bg-gradient-to-b from-[#9db39b] to-transparent">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <div className="content">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Create Account
                            </h1>
                            <p className=" text-xs">Just some details to get you in!</p>
                            </div>
                            
                            <form class="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label for="text" class="block mb-2 text-sm font-medium text-gray-900 ">Your Username</label>
                                    <input type="text" name="text" id="text" class=" bg-transparent border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-black" placeholder="Username" required="" />
                                </div>
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Your Email</label>
                                    <input type="email" name="email" id="email" class=" bg-transparent border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-black" placeholder="youremail@company.com" required="" />
                                </div>
                                <div>
                                    <label for="tel" class="block mb-2 text-sm font-medium text-gray-900 ">Your Phone</label>
                                    <input type="tel" name="tel" id="tel" class=" bg-transparent border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-black" placeholder="0000000000" required="" />
                                </div>
                                <div>
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" class=" bg-transparent border border-black text-gray-900 sm:text-sm rounded-lg focyus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-black" required="" />
                                </div>
                                <div>
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900"> Confirm Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" class=" bg-transparent border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-black" required="" />
                                </div>
                                <button type="submit" class="w-full bg-[#0F1035] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:scale-105 duration-300">Create Account</button>
                                <p class="text-sm  text-black">
                                    Already have an account? <Link to="/login" class="font-bold text-primary-600 hover:underline ">Log In</Link>
                                </p>
                            </form>
                        </div>
                        <div className='flex justify-between my-2'>
                            <div  className=' cursor-pointer hover:underline'>Terms&Conditions</div>
                            <div className=' cursor-pointer hover:underline '>Support</div>
                            <div className=' cursor-pointer hover:underline'>Customer Care</div>
                    </div>
                    </div>
                    
                </div>
                <div className="image ">
                    <img src={login} alt=".." className='hidden md:flex w-[50rem] h-auto' />
                </div>
            </div>
    </div>
   </div> 
  )
}
