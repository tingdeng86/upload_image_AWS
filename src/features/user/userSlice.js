import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createUser: (state, action) => {
      state.user = action.payload
    },
    deleteUser: (state) => {
      state.user= null
    }
  },
});

// Action creators are generated for each case reducer function
export const { createUser, deleteUser } = userSlice.actions

export default userSlice.reducer;