import React, { useState } from 'react'
import './ForgetPassCompo.css'
import CommonHead from '../../Commons/CommonHead'
import { Link } from 'react-router-dom'
import { Bounce, toast } from 'react-toastify'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'

const ForgetPassCompo = () => {

    // ============ All useState
    const [resetEmail, setResetEmail] = useState("")
    const [resetEmailError, setResetEmailError] = useState("")

    // ========== firebase auth variable
    const auth = getAuth()

    // =============== reset password button function
    const handleResetPassword = (e) => {
        e.preventDefault()

        if (!resetEmail) {
            setResetEmailError("Enter Email to Reset Password")
        } else {
            sendPasswordResetEmail(auth, resetEmail)
                .then(() => {
                    toast.info('Password Reset Massgae Send!', { // passowrd reset massage
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                    });
                })
        }
    }

    // =============== function will run after pressing "Enter" 
    const handleEnter = (e) => {
        if (e.key == "Enter") {
            handleResetPassword(e)
        }
    }

    return (
        <>
            <section className='forgetPasswordSection'>
                <CommonHead commonHeadName={"Reset Password"} />
                <ul className='forgetPassRow'>
                    <input 

                    onKeyDown={(e)=>handleEnter(e)}

                    onChange={(e)=>{setResetEmail(e.target.value), setResetEmailError("")}}
                    
                    type="email" 
                    
                    placeholder='Email for Reset Password...' />

                    <li>{resetEmailError}</li>

                    <button onClick={handleResetPassword}>Reset</button>
                </ul>
                <Link to={"/"} className='goBack'>← Go Back</Link>
            </section>
        </>
    )
}

export default ForgetPassCompo