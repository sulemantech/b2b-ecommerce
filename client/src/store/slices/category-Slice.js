const { createSlice } = require('@reduxjs/toolkit');

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        Categories: [],
    },
    reducers: {
        setCategory(state, action) {
            state.Categories = action.payload;
        }
    },
});
export const {setCategory } =categorySlice.actions;
export default categorySlice.reducer;
