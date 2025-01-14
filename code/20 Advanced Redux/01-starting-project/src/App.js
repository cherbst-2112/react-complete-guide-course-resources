import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';

import { uiActions } from './store/ui-slice';

let isInitial = true;

function App() {
  const dispatch = useDispatch()
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: 'pending',
          title: 'sending',
          message: 'sending cart data'
        })
      );

      const response = await fetch('https://verbose-disco-default-rtdb.firebaseio.com/cart.json', {
        method: 'PUT', body: JSON.stringify(cart)
      });

      if (!response.ok) {
        throw new Error('sending cart');
      }

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'success!',
          message: 'sent cart data'
        })
      );
    }

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch(error => {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'error!',
          message: 'sending cart data failed'
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <>
      {notification && <Notification
        status={notification.status}
        title={notification.title}
        message={notification.message}
      />}
      <Layout>
        {showCart && <Cart/>}
        <Products />
      </Layout>
    </>
  );
}

export default App;
