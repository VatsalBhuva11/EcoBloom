import React from 'react'
import logo from '../assets/images/logo.png'
import login from '../assets/images/login.png'

export default function Login() {
  return (
    <div>
        <div className=' bg-[#EEF0E5]'> 
            <div className=" flex justify-between items-center">
                <div class="flex flex-col items-center px-6 py-8 w-[50rem] justify-center md:h-screen lg:py-0 ">
                    <div class="w-full rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 bg-gradient-to-b from-[#9db39b] to-transparent">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <div className="content">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Login
                            </h1>
                            <p className=" text-xs">Glad you're back!</p>
                            </div>
                            
                            <form class="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label for="text" class="block mb-2 text-sm font-medium text-gray-900 ">Your Username</label>
                                    <input type="text" name="text" id="text" class=" bg-transparent border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-black" placeholder="Username" required="" />
                                </div>
                                <div>
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" class=" bg-transparent border border-black text-gray-900 sm:text-sm rounded-lg focyus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-black" required="" />
                                </div>
                                <div class="flex items-center justify-between">
                                    <div class="flex items-start">
                                        <div class="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required="" />
                                        </div>
                                        <div class="ml-3 text-sm">
                                            <label for="remember" class="text-black font-medium">Remember me</label>
                                        </div>
                                    </div>
                                    <a href="#" class="text-sm font-medium text-primary-600 hover:underline">Forgot password?</a>
                                </div>
                                <button type="submit" class="w-full bg-[#0F1035] text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                                <p class="text-sm  text-black">
                                    Don’t have an account yet? <a href="#" class="font-bold text-primary-600 hover:underline ">Sign up</a>
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
                <div className="image">
                    <img src={login} alt=".." className=' w-[50rem] h-auto' />
                </div>
            </div>
        </div>      
    </div>
  )
}