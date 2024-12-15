import { configureStore } from '@reduxjs/toolkit'
import UserSlice from './Slices/UserSlice'
import ChatSlice from './Slices/ChatSlice'

export default configureStore({
  reducer: {
    userData : UserSlice,
    chatData : ChatSlice,
  },
})