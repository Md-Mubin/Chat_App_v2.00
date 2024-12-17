import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { userSliceReducer } from '../../Slices/UserSlice'
import { FaUsersViewfinder } from 'react-icons/fa6'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import { GiExitDoor, GiThreeFriends } from 'react-icons/gi'
import { FaRegUserCircle, FaUsersSlash } from 'react-icons/fa'
import { PiMoonDuotone, PiSunDuotone } from 'react-icons/pi'
import { Bounce, toast } from 'react-toastify'
import { getDatabase, onValue, ref } from 'firebase/database'

const Navbar = () => {

    // ==================== All useStates 
    const [darkmode, setDarkmode] = useState(false)

    // ============== dispatch variable
    const dispatch = useDispatch()

    // ============== navigate variable
    const navigate = useNavigate()

    // ========== saving the mode when user visitor
    useEffect(() => {

        // ========== for darkMode from redux
        const savedMode = localStorage.getItem("mode") || "light";

        localStorage.setItem("mode", savedMode)
        document
            .querySelector("html")
            .classList.toggle("dark", savedMode === "dark")
    }, [])

    // ========== changing the mode on toggle
    const handelMode = () => {
        if (localStorage.getItem("mode") == "light") {
            localStorage.setItem("mode", "dark");
            document
                .querySelector("html")
                .classList.add("dark");
            setDarkmode(!darkmode);
        } else {
            localStorage.setItem("mode", "light");
            document
                .querySelector("html")
                .classList.remove("dark");
            setDarkmode(!darkmode);
        }
    }

    // ============== Logout Handle
    const handleLogout = () => {
        localStorage.removeItem("currentUser")
        dispatch(userSliceReducer())
        navigate("/")

        // toastyfy animation for log out
        toast.error('Loged Out', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        })
    }

    return (
        <>
            <nav>

                {/* ========== Navbar Items ========== */}
                <ul>
                    <Link className='hover:text-blue-500' to={"/allUsers"}><FaUsersViewfinder /> <span>Users</span> </Link>
                    <Link className='hover:text-orange-500' to={"/allRequests"}><AiOutlineUsergroupAdd /> <span>All Requests</span> </Link>
                    <Link className='hover:text-green-500' to={"/allFriends"}><GiThreeFriends /> <span>All Friends</span> </Link>
                    <Link className='hover:text-[#b9328c]' to={"/blockLists"}><FaUsersSlash /> <span>Block List</span> </Link>
                    <Link className='hover:text-purple-400' to={"/"}><FaRegUserCircle /> <span>Profile</span> </Link>
                    <button className='hover:text-red-600 h-fit' onClick={handleLogout}><GiExitDoor /> <span>Log Out</span> </button>
                </ul>

                {/* ========== Darkmode Toggle Button ========== */}
                <button className='mt-10' onClick={handelMode}>
                    {
                        darkmode ?
                            <PiSunDuotone />
                            :
                            <PiMoonDuotone />
                    }

                    <span>
                        {
                            darkmode ?
                                "Light Mode"
                                :
                                "Dark Mode"
                        }
                    </span>
                </button>
            </nav>
        </>
    )
}

export default Navbar