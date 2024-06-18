import { createSlice } from '@reduxjs/toolkit';

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
    },
    savedPosts(state, action) {
      state.savedPosts = action.payload;
    }
  }
});
export const { setPosts } = postSlice.actions;

export default postSlice.reducer;