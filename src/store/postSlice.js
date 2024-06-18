import { createSlice } from '@reduxjs/toolkit';
import { set } from 'date-fns';

const initialState = {
  posts: [],
  savedPosts: [],
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    }
  }
});
export const { setPosts } = postSlice.actions;

export default postSlice.reducer;