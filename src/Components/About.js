import React from 'react'
import about from '../assets/images/about.png'



export default function About_LandingPage() {
  return (
    <div className="bg-[#EEF0E5]">
      <h2 className=" font-semibold text-4xl font-inter text-center text-[#304D30]">ABOUT US</h2>
      <div className="flex justify-between items-center gap-8">
        <div className="About font-inter font-semibold">Step into the world of EcoBloom, where we're not just a platform; we're a collective movement toward a greener tomorrow. Within our digital space, we invite both organizations and individuals to participate in impactful cleanliness campaigns. It doesn't matter if you're a grassroots initiative or an established entity; EcoBloom is your canvas to amplify your environmental impact. Join us in this collaborative effort, where every small action contributes to a cleaner planet. As a heartfelt token of appreciation, unlock rewards and become part of a community dedicated to cultivating positive change. Consider this your warm welcome to EcoBloom, where your actions gently blossom into a brighter, more sustainable future.
        </div>
        <img src={about} alt='about' className='h-auto w-screen'/>

      </div>
      
      
    </div>
  )
}
