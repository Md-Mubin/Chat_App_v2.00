import React, { useEffect, useState } from 'react'
import './AllUserCompo.css'
import CommonHead from '../../Commons/CommonHead'
import CommonUsers from '../../Commons/CommonUsers'
import CommonButton from '../../Commons/CommonButton'
import { get, getDatabase, onValue, push, ref, remove, set } from 'firebase/database'
import { useSelector } from 'react-redux'
import { Bounce, toast } from 'react-toastify'

const AllUserCompo = () => {

  // ============ All useState
  const [allUsers, setAllUsers] = useState([])
  const [sentRequest, setSentRequest] = useState([])
  const [friends, setFriends] = useState([])

  // ========== Redux Slice Variable
  const userSlice = useSelector((state) => state.userData.value)

  // ========== firebase Database variable
  const db = getDatabase()

  // ========== Rendering data from firebase
  useEffect(() => {

    // ========= to ptint all the users c
    onValue(ref(db, "allUsers/"), (snapshot) => {
      let allUsersArray = []
      snapshot.forEach((items) => {
        if (items.key != userSlice.uid) {
          allUsersArray.push({ ...items.val(), key: items.key })
        }
      })
      setAllUsers(allUsersArray)
    })

    // ========= to check if the request has been send 
    onValue(ref(db, "friendRequest/"), (snapshot) => {
      let friendRequestArray = []
      snapshot.forEach((items) => {
        if (items.val().reciverId == userSlice.uid) {
          friendRequestArray.push(items.val().senderId + userSlice.uid)
        } else if (items.val().senderId == userSlice.uid) {
          friendRequestArray.push(userSlice.uid + items.val().reciverId)
        }
      })
      setSentRequest(friendRequestArray)
    })

    // ========= to check if any users is my friend
    onValue(ref(db, "allFriends/"), (snapshot) => {
      let friendArray = []
      snapshot.forEach((items) => {
        if (items.val().currentUserId == userSlice.uid) {
          friendArray.push({ friendUid: items.val().acceptUserId })
        } else if (items.val().acceptUserId == userSlice.uid) {
          friendArray.push({ friendUid: items.val().currentUserId })
        }
      })
      setFriends(friendArray)
    })
  }, [])

  // ========= Sending Friend Request 
  const handleAdd = (addUser) => {
    set(push(ref(db, "friendRequest/")), {
      senderId: userSlice.uid,
      senderName: userSlice.displayName,
      senderImg: userSlice.photoURL,
      reciverId: addUser.key,
      reciverName: addUser.userName,
      reciverImg: addUser.userImage
    })
  }

  // ========= Removing Friend Request
  const handleRemoveRequest = (removeRequest) => {
    get(ref(db, "friendRequest/"))
      .then((snapshot) => {
        snapshot.forEach((items) => {
          if (items.val().senderId + items.val().reciverId === removeRequest) {
            remove(ref(db, "friendRequest/" + items.key))
              .then(() => {
                setSentRequest((prev) => prev.filter((key) => key !== removeRequest))
              })
          }
        })
      })
  }

  return (
    <>
      <section className='allUserSection'>
        <CommonHead commonHeadName={"All User"} />

        <div className="allUsersCol">
          {
            allUsers.map((items) => (

              <div key={items.key} className="allUsersRow">

                <CommonUsers

                  commonUsersName={items.userName}

                  comonUsersImage={items.userImage} />

                <CommonButton

                  commonClick={friends.some(frnd => frnd.friendUid === items.key)
                    ? null
                    : sentRequest.includes(userSlice.uid + items.key)
                      ? (() => handleRemoveRequest(userSlice.uid + items.key))
                      : sentRequest.includes(items.key + userSlice.uid)
                        ? null
                        : (() => handleAdd(items))
                  }

                  commonButtonDesign={friends.some(frnd => frnd.friendUid === items.key)
                    ? "w-[200px] bg-green-600 opacity-40 pointer-events-none mr-4"
                    : sentRequest.includes(userSlice.uid + items.key)
                      ? "w-[200px] bg-red-400 hover:bg-red-600 mr-4"
                      : sentRequest.includes(items.key + userSlice.uid)
                        ? "w-[200px] bg-slate-700 pointer-event-none cursor-default mr-4"
                        : "w-[200px] bg-slate-300 hover:bg-slate-400 dark:bg-[#707070] dark:hover:bg-[#3c3c3c] duration-300 mr-4 "
                  }

                  commonButtonName={friends.some(frnd => frnd.friendUid === items.key)
                    ? "Friend"
                    : sentRequest.includes(userSlice.uid + items.key)
                      ? "Cancel Request"
                      : sentRequest.includes(items.key + userSlice.uid)
                        ? "Request Sent"
                        : "Send Request"
                  } />
              </div>
            ))
          }
        </div>
      </section>
    </>
  )
}

export default AllUserCompo