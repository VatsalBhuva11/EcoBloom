import React from 'react'
import { IoArrowBackSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import face from '../assets/images/face.jpg'

export default function VerifyUsers() {
    return (
        <div className='bg-[#eef0e5] h-screen flex flex-col'>
             <div className="flex items-center justify-between p-3">
                <Link to='/org/ongoing'><div className=' hover:scale-100 duration-300 text-3xl p-2'><IoArrowBackSharp/></div></Link>
                <p className="text-lg sm:text-2xl md:text-3xl font-bold">
                    Verify Users
                </p>
                <div className="flex items-center mr-4 gap-3">
                    <Link to="/user/profile">
                        <img
                            className="w-9 md:w-12  cursor-pointer hover:scale-105 duration-300 lg:w-14 rounded-full h-9 md:h-12 lg:h-14"
                            src= {face}
                            alt=""
                        />
                    </Link>
                    <p className="hidden sm:flex text-xl font-medium">
                        Hizrian
                    </p>
                </div>
            </div>
            
            <div className="flex justify-center">
                <div className="flex items-center rounded-3xl justify-around p-8 bg-gradient-to-r from-[#353657] to-[#404162] w-3/4 mt-14">
                    <div className='text-gray-100 border-r-2 border-b-gray-100 p-5'>Applications Submitted: 200 </div>
                    <div className='text-gray-100 border-r-2 border-b-gray-100 p-5'>Applications Accepted: 69</div>
                    <div className=' text-gray-100 border-r-2 border-b-gray-100 p-5'>Applications Rejected: 29</div>
                    <div className=' text-gray-100'>Applications Under Review: 102</div>
                </div>
            </div>

            <div className=" flex flex-col justify-end h-[56%] mt-14">
                <div class="relative overflow-x-hidden overflow-scroll shadow-md rounded-2xl p-6">
                    <table class="w-full text-sm  text-left rtl:text-right ">
                        <thead class=" text-sm bg-gradient-to-r from-[#353657] to-[#404162] ">
                            <tr>
                                <th scope="col" class="px-6 py-3 text-white">
                                    Name
                                </th>
                                <th scope="col" class="px-6 py-3 text-white">
                                    Email
                                </th>
                                <th scope="col" class="px-6 py-3 text-white">
                                    Phone No.
                                </th>
                                <th scope="col" class="px-6 py-3 text-white">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {data.map((data) => (

                                <tr class="bg-white border-b  hover:bg-gray-50 ">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                        {data.name}
                                    </th>
                                    <td class="px-6 py-4">
                                        {data.email}
                                    </td>
                                    <td class="px-6 py-4">
                                        {data.phone}
                                    </td>
                                    <td class="px-6 py-4">
                                        <a href="#"><button className='p-4 bg-gradient-to-r from-[#353657] to-[#404162] text-white rounded-full text-xs scale-105 duration-300 '>Verify</button></a>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}


const data = [
    {
        "name": "Trace Craven",
        "email": "tcraven0@buzzfeed.com",
        "phone": "+1 976 311 7776"
    },
    {
        "name": "Bail Rennock",
        "email": "brennock1@bigcartel.com",
        "phone": "+46 464 695 2743"
    },
    {
        "name": "Ernest Loos",
        "email": "eloos2@yale.edu",
        "phone": "+86 448 762 0015"
    },
    {
        "name": "Reeva Budleigh",
        "email": "rbudleigh3@cdc.gov",
        "phone": "+82 970 937 5584"
    },
    {
        "name": "Son Weeden",
        "email": "sweeden4@newyorker.com",
        "phone": "+61 175 105 6841"
    },
    {
        "name": "Nat Willock",
        "email": "nwillock5@de.vu",
        "phone": "+358 634 154 5856"
    },
    {
        "name": "Anetta Pugh",
        "email": "apugh6@ucla.edu",
        "phone": "+355 292 689 9302"
    },
    {
        "name": "Nananne Bartlomiej",
        "email": "nbartlomiej7@cpanel.net",
        "phone": "+504 659 509 6159"
    },
    {
        "name": "Ring MacFie",
        "email": "rmacfie8@nih.gov",
        "phone": "+48 432 655 2231"
    },
    {
        "name": "Caldwell Greggor",
        "email": "cgreggor9@shop-pro.jp",
        "phone": "+48 250 535 9404"
    },
    {
        "name": "Tommie Kun",
        "email": "tkuna@foxnews.com",
        "phone": "+63 417 775 2618"
    },
    {
        "name": "Rae Frazer",
        "email": "rfrazerb@va.gov",
        "phone": "+63 187 988 9296"
    },
    {
        "name": "Francesca Knocker",
        "email": "fknockerc@cbsnews.com",
        "phone": "+63 321 527 4213"
    },
    {
        "name": "Cherie Petriello",
        "email": "cpetriellod@ox.ac.uk",
        "phone": "+86 176 473 1876"
    },
    {
        "name": "Hanan Gravells",
        "email": "hgravellse@canalblog.com",
        "phone": "+54 384 877 8121"
    },
    {
        "name": "Reine Burch",
        "email": "rburchf@ezinearticles.com",
        "phone": "+46 206 719 2837"
    },
    {
        "name": "Jesse Bohden",
        "email": "jbohdeng@prweb.com",
        "phone": "+387 794 987 4653"
    },
    {
        "name": "Alair Norvill",
        "email": "anorvillh@buzzfeed.com",
        "phone": "+1 785 129 3755"
    },
    {
        "name": "Reinhold Phipard-Shears",
        "email": "rphipardshearsi@people.com.cn",
        "phone": "+7 116 764 0632"
    },
    {
        "name": "Wyatan MacBey",
        "email": "wmacbeyj@businessweek.com",
        "phone": "+62 743 343 7671"
    }
]