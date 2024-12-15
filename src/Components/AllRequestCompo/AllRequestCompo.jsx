import React, { useEffect, useState } from 'react'
import './AllRequestCompo.css'
import CommonHead from '../../Commons/CommonHead'
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database'
import { useSelector } from 'react-redux'
import CommonUsers from '../../Commons/CommonUsers'
import CommonButton from '../../Commons/CommonButton'

const AllRequestCompo = () => {

  // ============ All useState
  const [request, setRequest] = useState([])
  
  // ========== Redux Slice Variable
  const userSlice = useSelector((state) => state.userData.value)

  // ========== firebase Database variable
  const db = getDatabase()

  // ========== Rendering data from firebase
  useEffect(() => {

    // ========= to ptint all requests
    onValue(ref(db, "friendRequest/"), (snapshot) => {
      let requestArray = []
      snapshot.forEach((items) => {
        if (items.val().reciverId === userSlice.uid) {
          requestArray.push({ ...items.val(), key: items.key })
        }
      })
      setRequest(requestArray)
    })
  }, [])

  // ========= Accepting Friend Request
  const handleAcceptRequest = (confirmUser)=>{
    set(push(ref(db, "allFriends/")),{
      currentUserId : userSlice.uid,
      currentUserName : userSlice.displayName,
      currentUserImg : userSlice.photoURL,
      acceptUserId :  confirmUser.senderId,
      acceptUserName : confirmUser.senderName,
      acceptUserImg : confirmUser.senderImg
    })

    // removing from friend requests lists
    remove(ref(db, "friendRequest/" + confirmUser.key))
  }

  // ========= Cancelling Friend Request
  const handleRemoveRequest = (cancelRequest)=>{
    remove(ref(db, "friendRequest/" + cancelRequest.key))
  }

  return (
    <>
      <section className='allRequestSection'>
        <CommonHead commonHeadName={"All Request"} />

        <div className="allRequestCol">
          {
            request.map((items) => (
              <ul key={items.key} className="allRequestRow">
                <CommonUsers commonUsersName={items.senderName} comonUsersImage={items.senderImg} />
                <li className='allRequestButtons'>
                  <CommonButton 
                  
                  commonButtonName={"Accept"} 
                  
                  commonButtonDesign={"w-[150px] bg-green-400 hover:bg-green-600 duration-200 hover:translate-y-[-2px]"}
                  
                  commonClick={()=>handleAcceptRequest(items)}
                  />
                  
                  <CommonButton 
                  
                  commonButtonName={"Cancel"} 
                  
                  commonButtonDesign={"w-[150px] bg-red-400 hover:bg-red-600 duration-200 hover:translate-y-[-2px]"}
                  
                  commonClick={()=>handleRemoveRequest(items)}
                  />
                </li>
              </ul>
            ))
          }
        </div>
      </section>
    </>
  )
}

export default AllRequestCompo