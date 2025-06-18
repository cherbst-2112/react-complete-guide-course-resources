import EventDetailPage from './EventDetailPage';
import { Link } from 'react-router-dom';

const DUMMY_EVENTS = [
  { id: '1', title: 'Event 1'},
  { id: '2', title: 'Event 2'}
];

const EventsPage = () => {
  return <>
    <h2>EventsPage</h2>
    <EventDetailPage />
    <ul>
      {DUMMY_EVENTS.map(event => <li key={event.id}>
        <Link to={event.id}>{event.title}</Link>
      </li>)}
    </ul>
  </>;
}

export default EventsPage;
