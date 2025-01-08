import classes from './CartButton.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { uiSliceActions } from '../../store/ui-slice';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const cartIsVisible = useSelector(state => state.ui.cartIsVisible);

  const toggleCart = () => {
    dispatch(uiSliceActions.toggle());
   }

  return (
    <button onClick={toggleCart} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
