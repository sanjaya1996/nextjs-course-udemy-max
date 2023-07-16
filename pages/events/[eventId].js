import EventSummary from '@/components/event-detail/event-summary';
import EventLogistics from '@/components/event-detail/event-logistics';
import EventContent from '@/components/event-detail/event-content';
import { getEventById } from '@/helpers/api-util';
import { getFeaturedEvents } from '@/data/dummy-data';

function EventDetailPage(props) {
  const event = props.event;
  if (!event) {
    return (
      <div className='center'>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}

export default EventDetailPage;

export async function getStaticProps(context) {
  const { params } = context;
  const eventId = params.eventId;

  const event = await getEventById(eventId);
  if (!event) {
    return { notFound: true };
  }

  return { props: { event }, revalidate: 30 };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths,
    fallback: 'blocking',
  };
}
