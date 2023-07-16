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
