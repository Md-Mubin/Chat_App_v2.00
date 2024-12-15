import React from 'react'
import CommonButton from './CommonButton'

const CommonUsers = ({commonUsersName, comonUsersImage}) => {
    return (
        <>
            <ul className="w-full flex items-center gap-20">
                <img src={comonUsersImage} className='w-[80px]'/>
                <li className='font-brandFont font-semibold text-xl text-textColor-lightMode dark:text-textColor-darkMode'>{commonUsersName}</li>
            </ul>
        </>
    )
}

export default CommonUsers