import React, { useEffect, useState } from 'react'
import './BlockListCompo.css'
import CommonHead from '../../Commons/CommonHead'
import { useSelector } from 'react-redux'
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database'
import CommonUsers from '../../Commons/CommonUsers'
import CommonButton from '../../Commons/CommonButton'

const BlockListCompo = () => {

  // ============ All useState
  const [blocks, setBlocks] = useState([])

  // ========== Redux Slice Variable
  const userSlice = useSelector((state) => state.userData.value)

  // ========== firebase Database variable
  const db = getDatabase()

  // ========== Rendering data from firebase
  useEffect(() => {
    onValue(ref(db, "blockList/"), (snapshot) => {
      let blockArray = []
      snapshot.forEach((items) => {
        if (items.val().currentUserId === userSlice.uid) {
          blockArray.push({ ...items.val(), key: items.key })
        }
      })
      setBlocks(blockArray)
    })
  },[])

  // ========= Remove From Block List
  const handleUnblock = (unblockUser) => {
    remove(ref(db, "blockList/" + unblockUser.key))

    set(ref(db, "allFriends/" + unblockUser.key), {
      currentUserId: userSlice.uid,
      currentUserName: userSlice.displayName,
      currentUserImg: userSlice.photoURL,
      acceptUserId: unblockUser.blockUserId,
      acceptUserName: unblockUser.blockUserName,
      acceptUserImg: unblockUser.blockUserImg
    })
  }

  return (
    <>
      <section className='blockListSection'>
        <CommonHead commonHeadName={"Block Lists"} />

        <ul className="blockListCol">
          {
            blocks.map((items) => (
              <li key={items.key} className='blockListRow'>
                <CommonUsers

                  commonUsersName={items.blockUserName}

                  comonUsersImage={items.blockUserImg} />

                <CommonButton

                  commonClick={() => handleUnblock(items)}

                  commonButtonName={"Unblock"}

                  commonButtonDesign={"w-[150px] bg-yellow-500 hover:bg-yellow-600 duration-200 hover:translate-y-[-2px] will-change-transform mr-4"} />
              </li>
            ))
          }
        </ul>

      </section>
    </>
  )
}

export default BlockListCompo