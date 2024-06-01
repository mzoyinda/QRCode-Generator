import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPlaceholders = createAsyncThunk(
  "fetchPlaceholders",
  async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos`);
    return response.json();
  }
);

const initialState = {
  isLoading: false,
  album: []
};

const placeholderSlice = createSlice({
  name: "placeholders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaceholders.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchPlaceholders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.album = action.payload;
      })
      .addCase(fetchPlaceholders.rejected, (state, action) => {
        state.isLoading = false;
        state.album = []
      });
  },
});

export default placeholderSlice.reducer;
