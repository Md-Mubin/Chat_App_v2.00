import React, { useEffect, useState } from 'react'
import './AllFriendsCompo.css'
import CommonHead from '../../Commons/CommonHead'
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database'
import { useSelector } from 'react-redux'
import CommonUsers from '../../Commons/CommonUsers'
import CommonButton from '../../Commons/CommonButton'

const AllFriendsCompo = () => {

  // ============ All useState
  const [friends, setFriends] = useState([])

  // ========== Redux Slice Variable
  const userSlice = useSelector((state) => state.userData.value)

  // ========== firebase Database variable
  const db = getDatabase()

  // ========== Rendering data from firebase
  useEffect(() => {

    // ========= to ptint all friends
    onValue(ref(db, "allFriends/"), (snapshot) => {
      let freindArray = []
      snapshot.forEach((items) => {
        if (items.val().acceptUserId === userSlice.uid) {
          freindArray.push({
            friendName: items.val().currentUserName,
            friendImg: items.val().currentUserImg,
            friendId: items.val().currentUserId,
            key: items.key
          })
        } else if (items.val().currentUserId === userSlice.uid) {
          freindArray.push({
            friendName: items.val().acceptUserName,
            friendImg: items.val().acceptUserImg,
            friendId: items.val().acceptUserId,
            key: items.key
          })
        }
      })
      setFriends(freindArray)
    })
  },[])

  // ========= Remove From Friend List
  const handleRemoveFriend=(unfriend)=>{
    remove(ref(db, "allFriends/" + unfriend))
  }

  // ========= Add in Block List
  const handleBlock = (blockUser)=>{
    set(ref(db, "blockList/" + blockUser.key),{
      blockUserName : blockUser.friendName,
      blockUserImg : blockUser.friendImg,
      blockUserId : blockUser.friendId,
      currentUserId : userSlice.uid
    })

    remove(ref(db, "allFriends/" + blockUser.key))
  }
  
  return (
    <>
      <section className='allFriendSection'>
        <CommonHead commonHeadName={"All Friends"} />

        <div className="allFriendsCol">
          {
            friends.map((items) => (
              <ul key={items.key} className='allFriendsRow'>

                <CommonUsers 
                
                commonUsersName={items.friendName} 
                
                comonUsersImage={items.friendImg} />
                
                <li className='friendsButton'>
                  <CommonButton 

                  commonClick={()=>handleRemoveFriend(items.key)}
                  
                  commonButtonName={"Unfriend"} 
                  
                  commonButtonDesign={"w-[150px] bg-orange-400 hover:bg-orange-600 duration-200 hover:translate-y-[-2px]"}/>
                  
                  <CommonButton 

                  commonClick={()=>handleBlock(items)}
                  
                  commonButtonName={"Block"} 
                  
                  commonButtonDesign={"w-[150px] bg-red-500 hover:bg-red-600 duration-200 hover:translate-y-[-2px]"}/>
                </li>
              </ul>
            ))
          }
        </div>
      </section>
    </>
  )
}

export default AllFriendsCompo