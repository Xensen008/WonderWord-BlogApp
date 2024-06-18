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
    setSavedPosts(state, action){
      state.savedPosts = action.payload
    },
    toggleSavePost(state, action) {
      if (typeof action.payload === "object") {
        const post = action.payload;
        const isPostSaved = state.savedPosts.some(savedPost => savedPost.$id === post.$id);

        if (isPostSaved) {
          state.savedPosts = state.savedPosts.filter((savedPost) => savedPost.$id !== post.$id);
        } else {
          state.savedPosts.push(post);
        }
      }
    },
  },
});

export const { setPosts, toggleSavePost, setSavedPosts } = postSlice.actions;

export default postSlice.reducer;