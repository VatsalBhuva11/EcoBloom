import React from 'react'
import Parallax from './Parallax'
import About from './About'
import PastCampaigns from './PastCampaigns'
import JoinUs from './JoinUs'
import CreateCampaigns from './CreateCampaigns'
import Carousel from './Carousel'
import Footer from './Footer'
import { useScroll, motion } from 'framer-motion'
import { useRef } from 'react'

export default function All_Home({useParallax , id}) {

    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useParallax(scrollYProgress, 300);
    if(id===1){
        return(
            <> 
            <Parallax/>
            {/* <motion.h2 style={{ y }} className='text-3xl'>Hello</motion.h2> */}
            </>
           
        )
    }
    if(id===2){
        return(
            <> <About/>
            {/* <motion.h2 style={{ y }} className='text-3xl'>Hello</motion.h2> */}
            </>
           
        )
    }
    if(id===3){
        return(
            <> <PastCampaigns/>
            {/* <motion.h2 style={{ y }} className='text-3xl'>Hello</motion.h2> */}
            </>
           
        )
    }
    if(id===4){
        return(
            <> <JoinUs/>
            {/* <motion.h2 style={{ y }} className='text-3xl'>Hello</motion.h2> */}
            </>
           
        )
    }
    if(id===5){
        return(
            <> <CreateCampaigns/>
            {/* <motion.h2 style={{ y }} className='text-3xl'>Hello</motion.h2> */}
            </>
           
        )
    }
    if(id===6){
        return(
            <> <Carousel/>
            {/* <motion.h2 style={{ y }} className='text-3xl'>Hello</motion.h2> */}
            </>
           
        )
    }


}
