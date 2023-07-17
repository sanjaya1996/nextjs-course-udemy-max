import Head from 'next/head';

import EventList from '@/components/events/event-list';
import { getFeaturedEvents } from '@/data/dummy-data';

function HomePage(props) {
  return (
    <div>
      <Head>
        <title>NextJs Events</title>
        <meta
          name='description'
          content='Find a lot of great events that allow you to evolve...'
        />
      </Head>
      <EventList items={props.events} />
    </div>
  );
}

export default HomePage;

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return { props: { events: featuredEvents }, revalidate: 1800 };
}
