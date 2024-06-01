import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPlaceholders = createAsyncThunk(
  "fetchPlaceholders",
  async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/images`);
    return res?.json();
  }
);

const initialState = {
  isLoading: false,
  data: []
};

const placeholderSlice = createSlice({
  name: "placeholder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaceholders.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchPlaceholders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchPlaceholders.rejected, (state, action) => {
        state.isLoading = false;
        state.data = []
      });
  },
});

export default placeholderSlice.reducer;
