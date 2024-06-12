import React, { useEffect, useRef, useState } from 'react'
import SideNavContent from './SideNavContent';
import { motion } from "framer-motion"
import { useSelector } from 'react-redux';

const HeaderBottom = () => {
    const ref = useRef();
    const userInfo = useSelector((state)=> state.ecommerce.userInfo)
    const [sidebar, setSidebar] = useState(false);
    useEffect(() => {
        document.body.addEventListener("click", (e) => {
            if (e.target.contains(ref.current)) {
                setSidebar(false)
            }
        })
    }, [ref, setSidebar])
    return (
        <div className='w-full px-4 h-[36px] bg-amazon_light text-white flex items-center'>
            <ul className='flex items-center gap-2 text-sm tracking-wide'>
                <li onClick={() => setSidebar(true)} className='headerHover flex items-center gap-1'><i className="fa-solid fa-bars"></i>All</li>
                <li className='headerHover hidden md:inline-flex'>Today's Deals</li>
                <li className='headerHover hidden md:inline-flex'>Customer Service</li>
                <li className='headerHover hidden md:inline-flex'>Gift Cards</li>
                <li className='headerHover hidden md:inline-flex'>Registry</li>
                <li className='headerHover hidden md:inline-flex'>Sell</li>
            </ul>

            {
                sidebar && (
                    <div className='w-full h-screen text-black fixed top-0 left-0 bg-amazon_blue bg-opacity-50'>
                        <div className='w-full h-full relative'>
                            <motion.div initial={{ x: -500, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: .5 }} ref={ref} className='w-[80%] md:w-[350px] h-full bg-white border border-black'>
                                <div className='w-full bg-amazon_light text-white py-2 px-6 flex items-center gap-4'>
                                    <i className="fa-solid fa-user"></i>
                                    {
                                        userInfo?(
                                            <h3 className='font-titleFont font-bold text-lg tracking-wide'>Hello {userInfo.userName}</h3>
                                        ):(

                                            <h3 className='font-titleFont font-bold text-lg tracking-wide'>Hello, sign in</h3>
                                        )
                                    }
                                </div>
                                <SideNavContent/> 
                                <span onClick={() => setSidebar(false)} className='cursor-pointer absolute top-0 left-[360px] w-10 h-10 text-black
                            flex items-center justify-center border-none outline-none text-white hover:bg-red-500
                            duration-300'>
                                    <i className="fa-solid fa-xmark"></i>
                                </span>
                            </motion.div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default HeaderBottom