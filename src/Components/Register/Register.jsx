// ============== All Imports
import './Register.css'
import { Bounce, toast }           from 'react-toastify'
import React, { useState }         from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth'

const Register = ({ showing, toggleMode }) => {

  // ================= All Hooks
  const [showPass, setShowPass] = useState(false)

  // ================= For form data
  const [form, setForm] = useState({ userName: "", email: "", password: "" })
  const [formError, setFormError] = useState({ userNameError: "", emailError: "", passwordError: "" })

  // ================= firebase auth variable
  const auth = getAuth()

  // ================= All Function Start
  const handleSubmit = (e) => { // for handaling form submit
    e.preventDefault()

    if (!form.userName) {
      setFormError((prev) => ({ ...prev, userNameError: "PLease Enter Your Name" }))
    }
    if (!form.email) {
      setFormError((prev) => ({ ...prev, emailError: "PLease Enter Your Email" }))
    }
    if (!form.password) {
      setFormError((prev) => ({ ...prev, passwordError: "PLease Enter Your Password" }))
    } else {

      // create users in firebase
      createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user; // user

          updateProfile(auth.currentUser, {
            displayName: formData.userName,
            photoURL: "images/default_profile_id.png"

          }).then(() => {
            // Profile updated!
            sendEmailVerification(auth.currentUser)
              .then(() => {

                // --- Email Verification Sent Toast
                toast.success('Email Verified Send', { // email verified send toast massage
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
              })
          })
        })
        .catch((error) => {
          const errorCode = error.code;

          if (errorCode == "auth/email-already-in-use") {

            // --- Email Alreday in Used Toast
            toast.info('Email is already in use', { // email already in use toast massage
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
          }

          // if password is lower than 6 charecter
          if (errorCode == "auth/weak-password") {

            setFormError((prev) => ({ ...prev, passwordError: "Weak Password" }))
          }
        })
    }
  }

  return (
    <>
      {/* ========================== Register Form ========================== */}

      <form onSubmit={handleSubmit} className={`registerSection ${showing ? "translate-x-[-400px] duration-200 pointer-events-none" : "translate-x-0 duration-[1.2s]"}`}>

        <ul className='registerCol'>
          <h1>Register</h1>

          {/* username input */}
          <ul className="userNamePart">

            <input

              type="text"

              placeholder='User Name...'

              onChange={(e) => (setForm((prev) => ({ ...prev, userName: e.target.value })), setFormError((prev) => ({ ...prev, userNameError: "" })))} />

            <li>{formError.userNameError}</li> {/* username error */}
          </ul>

          {/* email input */}
          <ul className="emailPart">
            <input

              type='email'

              placeholder='example@gmail.com...'

              onChange={(e) => (setForm((prev) => ({ ...prev, email: e.target.value })), setFormError((prev) => ({ ...prev, emailError: "" })))} />

            <li>{formError.emailError}</li> {/* email error */}
          </ul>

          {/* password input */}
          <ul className="passwordPart">
            <input

              type={showPass ? "text" : "password"}

              placeholder='Password...'

              onChange={(e) => (setForm((prev) => ({ ...prev, password: e.target.value })), setFormError((prev) => ({ ...prev, passwordError: "" })))} />

            <li>{formError.passwordError}</li> {/* password error */}

            <button type='button' onClick={() => setShowPass(!showPass)} className='passShow'>
              {
                showPass ?
                  <FaRegEye />
                  :
                  <FaRegEyeSlash />
              }
            </button>
          </ul>

          {/* reguster button */}
          <button className='registerButton'>Register</button>

          {/* to go to Login page */}
          <ul className='haveAccount'>
            Already Have Account? Go to <li onClick={toggleMode}>Login</li>
          </ul>
        </ul>
      </form>

      {/* information */}
      <ul className={`registerInfoCol ${showing ? "translate-x-[400px] duration-200" : "right-0 duration-1000"}`}>
        <h2>Welcome</h2>
        <p>Please Register From Here. <br /> <br /> You must register first to start this chat app experiences. But if you have already an Account than click on Login at the down below .</p>
      </ul>
    </>
  )
}

export default Register