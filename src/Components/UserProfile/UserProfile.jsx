// ============== All Imports
import                      './UserProfile.css'
import React           from 'react'
import { useSelector } from 'react-redux'
import CommonHead from '../../Commons/CommonHead'

const UserProfile = () => {

  // ========== Redux Slice Variable
  const userSlice = useSelector((state) => state.userData.value)

  return (
    <>
      {/* ======================== User Profile Section ======================== */}

      <section className='userProfileSection'>
        <CommonHead commonHeadName={"Profile"}/>
        <ul className="profileCol">
          <img src={userSlice?.photoURL} alt="user_images" />

          {/* profile info */}
          <div className="profileInfo">
            <li><span>Name:</span> {userSlice?.displayName}</li>
            <li><span>Email:</span> {userSlice?.email}</li>
          </div>
        </ul>
      </section>
    </>
  )
}

export default UserProfile