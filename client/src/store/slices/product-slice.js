import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('products');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('products', serializedState);
    } catch {
        // Ignore write errors
    }
};

const productSlice = createSlice({
    name: 'product',
    initialState: loadState() || { products: [] },
    reducers: {
        setProducts(state, action) {
            state.products = action.payload;
            saveState(state);
        }
    },
});


export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
