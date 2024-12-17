import React from 'react'

const CommonHead = ({ commonHeadName }) => {
    return (
        <>
            <h1 className='text-center font-brandFont font-semibold text-3xl xl:text-5xl text-textColor-lightMode dark:text-textColor-darkMode'>
                {commonHeadName}
                <div className='w-[80%] m-auto h-[2px] bg-slate-300 dark:bg-[#707070] mt-2 '></div>
                <div className='w-full m-auto h-[2px] bg-slate-300 dark:bg-[#707070] mt-2 '></div>
            </h1>
        </>
    )
}

export default CommonHead