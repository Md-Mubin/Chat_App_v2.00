import { createSlice } from '@reduxjs/toolkit'

export const UserSlice = createSlice({
  name: 'counter',
  initialState: {
    value: JSON.parse(localStorage.getItem("currentUser")) ? JSON.parse(localStorage.getItem("currentUser")) : null,
  },
  reducers: {
    userSliceReducer: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { userSliceReducer } = UserSlice.actions

export default UserSlice.reducer