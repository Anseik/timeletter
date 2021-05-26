import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL,TOKEN } from '../constants';

const delay = (time, value) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(value);
  }, time);
});

// exports.logIn = createAsyncThunk('user/logIn', async (data, thunkAPI) => {
//   // throw new Error('비밀번호가 틀렸습니다.');
//   return await delay(500,{
//     userId: 1,
//     nickname: 'zerocho'
//   });
// });

export const mypage = createAsyncThunk('user/mypage', async (data, thunkAPI) => {
  console.log(data,'1232131')
  const response = await axios.get(BASE_URL+"user/get",{headers:{"Authorization":TOKEN}})
  // .then((res)=> setstate(res.data))
  // .catch((err)=> console.log(err))
  return response.data;

});
