import MealItem from './MealItem.jsx';
import useHttp from '../hooks/useHttp.js';
import Error from './Error.jsx';

export default function Meals() {
  const { data: loadedMeals, isLoading, error } = useHttp({ url: 'http://localhost:3000/meals', initialData: [] });

  if (isLoading) {
    return <p className='center'>Fetching...</p>
  }

  console.log(error);

  if (error) {
    return <Error title='failed' message={error} />
  }

  return <ul id='meals'>
    {loadedMeals.map((meal) => <MealItem key={meal.id} meal={meal} />)}
  </ul>
}
