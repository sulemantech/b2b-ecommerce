// searchSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchResults: [], // Set searchResults to an empty array by default
  error: null,
  loading: false,
  hasSearched: false,
};

const searchSlice = createSlice({
  name: 'searchpro',
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
      state.error = null;
      state.loading = false;
      state.hasSearched = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.hasSearched = true;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
      state.error = null;
      state.hasSearched = false;
    },
    clearSearchState: () => initialState, // Simplify the clearSearchState reducer
  },
});

export const { setSearchResults, setError, setLoading, clearSearchState } = searchSlice.actions;
export default searchSlice.reducer;
