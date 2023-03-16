import { combineReducers } from "redux";

// login slice
import addToCartSlice from "../addToCart.slice";


export default combineReducers({
    addtocard: addToCartSlice,
});
