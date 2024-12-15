import React, { useState } from 'react'
import './Login.css'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Bounce, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userSliceReducer } from '../../Slices/UserSlice'
import { getDatabase, ref, set } from 'firebase/database'

const Login = ({ toggleMode, showing }) => {

  // ================= All Hooks
  const [showPass, setShowPass] = useState(false)

  // ================= For form data
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [loginFormError, setLoginFormError] = useState({ emailError: "", passwordError: "" })

  // ================= firebase auth variable
  const auth = getAuth()
  
  // ================= firebase real time database variable
  const db = getDatabase()

  // ================= dispatch variable
  const dispatch = useDispatch()

  // ================= navigation variable
  const navigate = useNavigate()

  // ================= All Function Start
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!loginForm.email) {
      setLoginFormError((prev) => ({ ...prev, emailError: "Please Enter Your Email" }))
    }
    if (!loginForm.password) {
      setLoginFormError((prev) => ({ ...prev, passwordError: "Please Enter Password" }))
    }
    else {
      signInWithEmailAndPassword(auth, loginForm.email, loginForm.password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          if (user.emailVerified == false) {
            // toastyfy animation for not varified
            toast.error('Email is not Verified ☹️', {
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
          else {
            
            navigate("/") // navigate to home

            dispatch(userSliceReducer(user)) // sending user data to redux's reducers to update the store

            localStorage.setItem("currentUser" , JSON.stringify(user)) // setting data in local storage

            set(ref(db, "allUsers/" + user.uid),{ // write data in firebase
              userName : user.displayName,
              userImage : user.photoURL
            })
          }
        })
        .catch((error) => {
          const errorCode = error.code
          if (errorCode == "auth/invalid-credential") {

            // toastyfy animation for wrong input
            toast.error('Soemthing Went Wrong! 🤷🤷', {
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

          if (errorCode == 'auth/user-disabled') {

            // toastyfy animation for disabled account
            toast.error('Sorry, Account is Disabled ☹️', {
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
        })
    }
  }

  // ============== For forget password
  const handleForgetPass=()=>{
    navigate("/forgetPassword")
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={`loginSection ${showing ? "translate-x-[400px] duration-200 pointer-events-none" : "translate-x-0 duration-[1.2s]"}`}>
        <ul className='loginCol'>
          <h1>Login</h1>

          <ul className="loginEmail">
            <input

              type="email"

              placeholder='example@gmail.com...'

              onChange={(e) => (setLoginForm((prev) => ({ ...prev, email: e.target.value })), setLoginFormError((prev) => ({ ...prev, emailError: "" })))} />

            <li>{loginFormError.emailError}</li>
          </ul>

          <ul className="loginPassword">
            <input

              type={showPass ? "text" : "password"}

              placeholder='Password...'

              onChange={(e) => (setLoginForm((prev) => ({ ...prev, password: e.target.value })), setLoginFormError((prev) => ({ ...prev, passwordError: "" })))} />
            <li className='top-6'>
              {loginFormError.passwordError}

            </li>
            <button type='button' onClick={() => setShowPass(!showPass)} className='loginPassShow'>
              {
                showPass ? <FaRegEye /> : <FaRegEyeSlash />
              }
            </button>
            <div onClick={handleForgetPass} className='forgetPass'>
              Forgot Password ?
            </div>
          </ul>

          <button className='loginButton'>Login</button>
          <ul className='noAccount'>
            Don't Have Account? Go to <li onClick={toggleMode}>Register</li>
          </ul>
        </ul>
      </form>

      {/* information */}
      <ul className={`loginInfoCol ${showing ? "left-[-400px] duration-200" : "left-5 duration-1000"}`}>
        <h2>Welcome</h2>
        <p>Please Login From Here. <br /> <br />If you don't have account than please click on Register down below. If you forget password than click on forget password to change your password.</p>
      </ul>
    </>
  )
}

export default Login