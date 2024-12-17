import React from 'react'

const CommonUsers = ({commonUsersName, comonUsersImage}) => {
    return (
        <>
            <ul className="w-full flex items-center gap-20">
                <img src={comonUsersImage} className='w-[60px] xl:w-[80px]'/>
                <li className='font-brandFont font-semibold text-lg xl:text-xl text-textColor-lightMode dark:text-textColor-darkMode'>{commonUsersName}</li>
            </ul>
        </>
    )
}

export default CommonUsers