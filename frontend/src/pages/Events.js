// import { useEffect, useState } from "react";

import { Suspense } from "react";

import { useLoaderData, Await } from "react-router-dom";

import EventsList from "../components/EventsList";

function EventsPage() {
  // const [isLoading, setIsLoading] = useState(false);
  // const [fetchedEvents, setFetchedEvents] = useState();
  // const [error, setError] = useState();

  // useEffect(() => {
  //   async function fetchEvents() {
  //     setIsLoading(true);

  //     const response = await fetch("http://localhost:8080/events");

  //     if (!response.ok) {
  //       setError("Fetching events failed.");
  //     } else {
  //       const resData = await response.json();
  //       setFetchedEvents(resData.events);
  //     }

  //     setIsLoading(false);
  //   }

  //   fetchEvents();
  // }, []);

  const data = useLoaderData();

  if (data.isError) {
    return <p>{data.message}</p>;
  }

  const events = data.events;

  return (
    <>
      {/*<div style={{ textAlign: "center" }}>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        </div>*/}
      {/*!isLoading && fetchedEvents && <EventsList events={fetchedEvents} />*/}

      {/* {<EventsList events={events} />} */}

      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadEvents) => <EventsList events={loadEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventsPage;

// import { Link } from "react-router-dom";

// const EVENTS = [
//   { id: "e1", title: "Event 1" },
//   { id: "e2", title: "Event 2" },
//   { id: "e3", title: "Event 3" },
// ];

// function EventsPage() {
//   return (
//     <>
//       <h1>Events Page</h1>
//       <ul>
//         {EVENTS.map((event) => (
//           <li key={event.id}>
//             <Link to={event.id}>{event.title}</Link>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// }

// export default EventsPage;

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // setError("Fetching events failed.");
    // return { isError: true, message: "Could not fetch events" };
    throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
      status: 500,
    });
    // return json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    // const resData = await response.json();
    // setFetchedEvents(resData.events);
    // return resData.events;

    // const res = new Response();
    // return res;
    //
    // return response;

    const resData = await response.json();
    return resData.events;
  }
}

export function loader() {
  return {
    events: loadEvents(),
  };
}
