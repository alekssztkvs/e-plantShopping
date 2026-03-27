import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const {name, image, cost} = action.payload; //destructure product details from the action payload
      //check if item exists
      const existingItem = state.items.find(item=> item.name === name);
      if(existingItem) {
        //if exists increase quantity
        existingItem.quantity++;
      } else {
        //if does not exist, add it to cart with quantity 1
        state.items.push({name, image, cost, quantity: 1});
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item=> item.name !== action.payload);
    },
    updateQuantity: (state, action) => {
        const {name, quantity} = action.payload; //destructure
        //find
        const itemToUpdate = state.items.find(item=> item.name === name);
        if (itemToUpdate) {
          if (quantity < 1) {
            state.items = state.items.filter(item => item.name !== name);
          } else {
            itemToUpdate.quantity = quantity;
          }
        }
    
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
