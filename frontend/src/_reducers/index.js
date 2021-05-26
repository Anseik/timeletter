import {combineReducers} from 'redux';
import userSlice from './user';
// const postSlice = require('./post');

export default combineReducers({
    user: userSlice.reducer,
    // post: postSlice.reducer,
})