import { currencyFormatter } from '../util/formatting.js';
import Button from './Button.jsx';

export default function MealItem({ meal }) {
  return (
    <li className='meal-item'>
      <article>
        <img src={`http://localhost:3000/${meal.image}`}/>
        <div>
          <h3>{meal.name}</h3>
          <div className='meal-item-price'>{currencyFormatter.format(meal.price)}</div>
          <div className='meal-item-description'>{meal.description}</div>
        </div>
        <p className='meal-item-actions'>
          <Button>
            Add
          </Button>
        </p>
      </article>
    </li>
  );
}
