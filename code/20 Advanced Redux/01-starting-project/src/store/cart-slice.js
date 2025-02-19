import { createSlice } from '@reduxjs/toolkit'
import { uiActions } from './ui-slice';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], totalQuantity: 0 },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);

      state.totalQuantity++;

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      } else {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title
        });
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);

      state.totalQuantity--;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    }
  }
});

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'sending...',
        message: 'sending cart data'
      })
    );

    const sendRequest = async () => {
      const response = await fetch('https://verbose-disco-default-rtdb.firebaseio.com/cart.json', {
        method: 'PUT', body: JSON.stringify(cart)
      });

      if (!response.ok) {
        throw new Error('sending cart');
      }
    }

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'sent',
          message: 'sent cart data'
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'error!',
          message: 'sending cart data failed'
        })
      );
    }
  }
}

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
