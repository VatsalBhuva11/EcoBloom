import React from 'react'
import ChatLeftBar from '../Components/ChatLeftBar'
import ChatRightBar from '../Components/ChatRightBar'
import Chatbar from '../Components/Chatbar'


export default function CommunityChat() {
    return (
        <div className='flex justify-between'>
            <div className="w-[20%]"><ChatLeftBar/></div>
            <div className='w-[60%]'><Chatbar/></div>
            <div className="w-[20%]"><ChatRightBar/></div>         
         
        </div>
    )
}
