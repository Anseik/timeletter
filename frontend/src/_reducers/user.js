import { createSlice } from '@reduxjs/toolkit';
import { mypage } from '../_actions/user';

const initialState = {
  data:{letters:[]}
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => builder
    .addCase(mypage.pending, (state, action) => {
      state.data.letters = [];
    })
    .addCase(mypage.fulfilled, (state, action) => {
      state.data = action.payload;
    })
    .addCase(mypage.rejected, (state, action) => {
      state.error = action.payload;
    })
})


export default userSlice;
