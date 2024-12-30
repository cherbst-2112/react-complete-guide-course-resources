import Modal from './Modal.jsx';
import { useContext } from 'react';
import CartContext from '../store/CartContext.jsx';
import { currencyFormatter } from '../util/formatting.js';
import Input from './Input.jsx';
import Button from './Button.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';
import useHttp from '../hooks/useHttp.js';
import Error from './Error.jsx';

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}

export default function Checkout()  {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const { data, isLoading: isSending, error, sendRequest, clearData } = useHttp({
    url: 'http://localhost:3000/orders',
    config: requestConfig
  });

  const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  async function checkoutAction(fd) {
    const customerData = Object.fromEntries(fd.entries());

    await sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData
        }
      })
    );
  }

  let actions = <>
    <Button type='button' textOnly onClick={handleClose}>Close</Button>
    <Button>Submit Order</Button>
  </>

  if (isSending) {
    actions = <span>sending data...</span>
  }

  if (data && !error) {
    return <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleFinish}>
      <h2>OK</h2>
      <p>order submitted</p>
      <p className='modal-actions'>
        <Button onClick={handleFinish}>OK</Button>
      </p>
    </Modal>
  }

  return <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
    <form action={checkoutAction}>
      <h2>Checkout</h2>
      <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

      <Input label='Full Name' type='text' id='name' />
      <Input label='Email' type='email' id='email' />
      <Input label='Street' type='emaitextl' id='street' />
      <div className='control-row'>
        <Input label='Postal Code' type='text' id='postal-code' />
        <Input label='City' type='text' id='city' />
      </div>

      {error && <Error title='failed' message={error} />}

      <p className='modal-actions'>{actions}</p>
    </form>
  </Modal>
}
