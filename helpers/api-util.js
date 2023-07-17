export async function getFeaturedEvents() {
  const events = await getAllEvents();
  const featuredEvents = events.filter((event) => event.isFeatured);
  return featuredEvents;
}

export async function getAllEvents() {
  const response = await fetch(
    'https://nextjs-course-9a78a-default-rtdb.firebaseio.com/events.json'
  );
  const data = await response.json();
  let events = [];

  for (const key in data) {
    events.push({ ...data[key], id: key });
  }

  return events;
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
