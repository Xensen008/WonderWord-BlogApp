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
    fetchPostsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPostsSuccess: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    },
    fetchPostsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    savePost: (state, action) => {
      state.savedPosts.push(action.payload);
    },
    unsavePost: (state, action) => {
      state.savedPosts = state.savedPosts.filter(postId => postId !== action.payload);
    },
  },
});

export const { fetchPostsStart, fetchPostsSuccess, fetchPostsFailure, savePost } = postSlice.actions;

export default postSlice.reducer;