import { createSlice } from '@reduxjs/toolkit'

export const ChatSlice = createSlice({
  name: 'counter',
  initialState: {
    value: JSON.parse(localStorage.getItem("chatUser")) ? JSON.parse(localStorage.getItem("chatUser")) : null,
  },
  reducers: {
    chatSliceReducer: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { chatSliceReducer } = ChatSlice.actions

export default ChatSlice.reducer