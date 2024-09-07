import React from 'react'
import image from '../assets/images/construction.png'

export default function UnderConsruction() {
  return (
    <div className='bg-[#b4c6b6] h-screen'>
      <div className="flex items-center justify-around ">
        <div className="content font-inter flex-col justify-center">
          <h1 className="heading text-6xl">Page is under construction</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas numquam, quasi nobis labore facere voluptates enim eveniet? Esse tenetur, nihil vitae itaque magnam iusto nostrum voluptate, repellendus odit, nisi quos.
          </p>
          </div>
        <div className="img">
            <img src={image}/>
        </div>
      </div>

    </div>
  )
}
