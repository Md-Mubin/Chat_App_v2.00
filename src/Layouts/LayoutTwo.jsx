import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar/Navbar'
import ChatProfileBox from '../Components/ChatProfileBox/ChatProfileBox'

const LayoutTwo = () => {
    return (
        <>
            <div className="container">
                <div className='h-screen py-28 flex items-center justify-center gap-2'>
                    <ChatProfileBox />
                    <div className="w-full h-full bg-bgColor-lightMode dark:bg-bgColor-darkMode rounded-xl border-2 border-slate-300 dark:border-[#707070]">
                        <Outlet />
                    </div>
                    <Navbar />
                </div>
            </div>
        </>
    )
}

export default LayoutTwo