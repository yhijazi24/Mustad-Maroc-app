import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            const existingProductIndex = state.products.findIndex(
                item => item._id === action.payload._id && item.size === action.payload.size
            );

            if (existingProductIndex !== -1) {
                // If product with same ID and size exists, just update quantity
                state.products[existingProductIndex].quantity += action.payload.quantity;
            } else {
                // Otherwise, add as new product
                state.products.push(action.payload);
                state.quantity += 1;
            }

            state.total += action.payload.price * action.payload.quantity;
        },
        updateProductQuantity: (state, action) => {
            const product = state.products.find((item) => item._id === action.payload.id);
            if (product) {
                state.total -= product.price * product.quantity;
                product.quantity = action.payload.quantity;
                state.total += product.price * product.quantity;
            }
        },

        removeProduct: (state, action) => {
            const productIndex = state.products.findIndex((item) => item._id === action.payload.id);
            if (productIndex > -1) {
                const product = state.products[productIndex];
                state.total -= product.price * product.quantity;
                state.products.splice(productIndex, 1);
                state.quantity -= 1;
            }
        },
    },
});

export const { addProduct, updateProductQuantity, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;