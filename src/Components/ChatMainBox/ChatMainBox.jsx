// ============== All Imports
import                                     './ChatMainBox.css'
import CommonHead                     from '../../Commons/CommonHead'
import InputEmoji                     from "react-input-emoji"
import CommonUsers                    from '../../Commons/CommonUsers'
import { useSelector }                from 'react-redux'
import React, { useEffect, useState } from 'react'
import { getDatabase, onValue, push, ref, set } from 'firebase/database'

const ChatMainBox = () => {

  // ============ All useState
  const [text, setText] = useState("")
  const [allChats, setAllChats] = useState([])

  // ========== Redux Slice Variables
  const userSlice = useSelector((state) => state.userData.value)
  const chatSlice = useSelector((state) => state.chatData.value)

  // ========== firebase Database variable
  const db = getDatabase()

  // ========== sending massage with enter
  const handleMassages = (msgData) => {
    set(push(ref(db, "allMassages/")), {
      massage: msgData,
      senderID: userSlice.uid,
      reciverID: chatSlice.friendId
    })
  }

  // ========= to ptint datas from firebase
  useEffect(() => {

    // ========= to ptint all massages
    onValue(ref(db, "allMassages/"), (snapshot) => {
      let allMsgArray = []
      snapshot.forEach((items) => {
        if (items.val().senderID === userSlice.uid && items.val().reciverID === chatSlice.friendId) {
          allMsgArray.push({ ...items.val(), key: items.key })
        } else if (items.val().senderID === chatSlice.friendId && items.val().reciverID === userSlice.uid) {
          allMsgArray.push({ ...items.val(), key: items.key })
        }
      })
      setAllChats(allMsgArray)
    })
  }, [db, chatSlice])

  return (
    <>
      {/* ======================== Chat Box Section ======================== */}
      <section className='chatsBoxSection'>

        {/* chat box header */}
        <CommonHead commonHeadName={"Chats"} />

        {/* chat name */}
        <div className="chatUserNamePart">
          <CommonUsers commonUsersName={chatSlice?.friendName} comonUsersImage={chatSlice?.friendImage} />
        </div>

        {/* chat area part */}
        <ul className='chatArea'>
          {
            allChats.map((items) => (
              items.senderID === userSlice.uid ?
                <li key={items.key} className='userMsg'>{items.massage}</li>
                :
                <li key={items.key} className='chatMsg'>{items.massage}</li>
            ))
          }
        </ul>

        {/* imoji + input field */}
        <InputEmoji
          value={text}
          onChange={setText}
          cleanOnEnter
          onEnter={handleMassages}
          placeholder="Message..."
        />
      </section>
    </>
  )
}

export default ChatMainBox