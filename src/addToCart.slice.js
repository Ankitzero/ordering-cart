import { createSlice } from "@reduxjs/toolkit";

export const addToCartSlice = createSlice({
    name: "addtocard",
    initialState: {
        itemInCart: [],
        itemList: [
            { id: 1, imgSrc: "https://images.dominos.co.in/new_margherita_2502.jpg", name: "Margherita", description: "Classic delight with 100% real mozzarella cheese", cost: 100 },
            { id: 2, imgSrc: "https://images.dominos.co.in/farmhouse.png", name: "Farmhouse", description: "Delightful combination of onion, capsicum, tomato & grilled mushroom", cost: 200 },
            { id: 3, imgSrc: "https://images.dominos.co.in/new_veg_extravaganza.jpg", name: "Veg Extravaganza", description: "Black olives, capsicum, onion, grilled mushroom, corn, tomato, jalapeno & extra cheese", cost: 300 },
            { id: 4, imgSrc: "https://images.dominos.co.in/new_cheese_n_corn.jpg", name: "Veggie Paradise", description: "The awesome foursome! Golden corn, black olives, capsicum, red paprika", cost: 400 },
            { id: 5, imgSrc: "https://images.dominos.co.in/new_pepper_barbeque_chicken.jpg", name: "Cheese n Corn", description: "Sweet & Juicy Golden corn and 100% real mozzarella cheese in a delectable combination !", cost: 500 },
        ]
    },
    reducers: {
        setAddToCart: (state, { payload }) => {
            state.itemInCart = [...state.itemInCart, payload];
        },
        removeItemFromCart: (state, { payload }) => {
            state.itemInCart = payload;
        },
    }
});

export const { setAddToCart, removeItemFromCart } = addToCartSlice.actions;
export default addToCartSlice.reducer;
