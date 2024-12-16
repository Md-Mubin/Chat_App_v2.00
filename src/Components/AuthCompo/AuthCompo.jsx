import React, { useState } from 'react'
import './AuthCompo.css'
import Register from '../Register/Register'
import Login from '../Login/Login'

const AuthCompo = () => {

  // ============ All useState
  const [change, setChange] = useState(false)

  // ========= To control auth
  const handleAuth = () => {
    setChange(!change)
  }

  return (
    <>
      {/* ======================== Auth Section ======================== */}

      <section className='authSection'>
        <div className="container">
          <h1>Welcome to Mubin's Domain</h1>
          <ul className='authRow'>
            <li className='authHeadPart'>
              <img src="/images/hello_icon.gif" alt="hello_icon" />
              <p>
                Welcome to my Chat App. Here You can chat with your friends.
              </p>
            </li>
            <li className='authCard'>
              <span className={change ? "translate-x-[-750px] md:translate-x-[-700px] rotate-[-70deg]" : "translate-x-[250px] md:translate-x-[300px] rotate-[70deg]"}></span>
              <Register showing={change} toggleMode={handleAuth} />
              <Login showing={!change} toggleMode={handleAuth} />
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}

export default AuthCompo