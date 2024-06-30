import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import appwriteService from "../appwrite/config";

const initialState = {
  status: "idle",
  posts: [],
  error: null,
};

export const fetchAllPost = createAsyncThunk("post/fetchAllPost", async () => {
  const posts = await appwriteService.getPosts([]);
  console.log(posts);
  return posts.documents;
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    editPost: (state, action) => {
      const index = state.posts.findIndex(
        (post) => post.$id === action.payload.$id
      );

      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter(
        (post) => post.$id !== action.payload.$id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchAllPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addPost, editPost, deletePost } = postSlice.actions;

export default postSlice.reducer;
