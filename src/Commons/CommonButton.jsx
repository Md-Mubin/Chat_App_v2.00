import React from 'react'

const CommonButton = ({commonButtonName, commonButtonDesign, commonClick}) => {
    return (
        <>
            <button onClick={commonClick} className={` py-2 font-brandFont font-normal text-lg text-textColor-lightMode dark:text-textColor-darkMode rounded-xl ${commonButtonDesign}`}>{commonButtonName}</button>
        </>
    )
}

export default CommonButton