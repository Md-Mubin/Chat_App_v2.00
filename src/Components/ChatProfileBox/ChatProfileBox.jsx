// ============== All Imports
import                                     './ChatProfileBox.css'
import CommonHead                     from '../../Commons/CommonHead'
import CommonUsers                    from '../../Commons/CommonUsers'
import { useNavigate }                from 'react-router-dom'
import { chatSliceReducer }           from '../../Slices/ChatSlice'
import { useDispatch, useSelector }   from 'react-redux'
import { getDatabase, onValue, ref }  from 'firebase/database'
import React, { useEffect, useState } from 'react'

const ChatProfileBox = () => {

  // ============ All useState
  const [chatUser, setChatUser] = useState([])

  // ========== Redux Slice Variable
  const userSlice = useSelector((state) => state.userData.value)

  // ========== firebase Database variable
  const db = getDatabase()

  // ========== dispatch variable
  const dispatch = useDispatch()

  // ========== navigate variable
  const navigate = useNavigate()

  // ========== Rendering data from firebase
  useEffect(() => {

    // ========= to ptint all friends in chat user box
    onValue(ref(db, "allFriends/"), (snapshot) => {
      let chatUserArray = []
      snapshot.forEach((items) => {
        console.log(items.val())
        if (items.val().acceptUserId === userSlice.uid) {
          chatUserArray.push({
            friendName: items.val().currentUserName,
            friendImage: items.val().currentUserImg,
            friendId: items.val().currentUserId,
            key: items.key
          })
        } else if (items.val().currentUserId === userSlice.uid) {
          chatUserArray.push({
            friendName: items.val().acceptUserName,
            friendImage: items.val().acceptUserImg,
            friendId: items.val().acceptUserId,
            key: items.key
          })
        }
      })
      setChatUser(chatUserArray)
    })
  }, [])

  // ========= To see & write selected freinds chat
  const handleChatUser = (chatUsers) => {
    localStorage.setItem("chatUser", JSON.stringify(chatUsers))
    dispatch(chatSliceReducer(chatUsers))
    navigate("/chats")
  }

  return (
    <>
      {/* ======================== Chat Users Section ======================== */}

      <section className='chatProfileBoxSection'>

        {/* header */}
        <CommonHead commonHeadName={"Chat User"} />

        {/* chat users col */}
        <ul className="chatUsersCol">
          {
            chatUser.map((items) => (
              <li onClick={() => handleChatUser(items)} key={items.key} className='chatUserRow'>
                <CommonUsers commonUsersName={items.friendName} comonUsersImage={items.friendImage} />
              </li>
            ))
          }
        </ul>

      </section>
    </>
  )
}

export default ChatProfileBox