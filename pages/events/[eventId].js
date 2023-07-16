import EventSummary from '@/components/event-detail/event-summary';
import EventLogistics from '@/components/event-detail/event-logistics';
import EventContent from '@/components/event-detail/event-content';
import ErrorAlert from '@/components/ui/error-alert';
import { getEventById, getAllEvents } from '@/helpers/api-util';

function EventDetailPage(props) {
  const event = props.event;
  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found</p>
      </ErrorAlert>
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

  return { props: { event } };
}

export async function getStaticPaths() {
  const events = await getAllEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths,
    fallback: 'blocking',
  };
}
