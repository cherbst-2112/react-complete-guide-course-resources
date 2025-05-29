import { useParams } from 'react-router-dom'

const EventDetailPage = () => {
  const params = useParams();

  return <h3>EventDetailPage for {params.eventId}</h3>;
}

export default EventDetailPage;
