import React from 'react'
import ChatLeftBar from '../Components/ChatLeftBar'
import ChatRightBar from '../Components/ChatRightBar'
import Chatbar from '../Components/Chatbar'


export default function CommunityChat() {
    return (
        <div className='flex justify-between'>
            <div className="hidden lg:flex lg:w-[20%]"><ChatLeftBar/></div>
            <div className='lg:w-[60%] w-[100%]'><Chatbar/></div>
            <div className="hidden lg:flex lg:w-[20%]"><ChatRightBar/></div>         
         
        </div>
    )
}
