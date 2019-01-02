import React, { Component } from "react";
import EventListItem from "./EventListItem";
class EventList extends Component {
  state = {};
  render() {
    const { events, onEventOpen, deleteEvent } = this.props;
    console.log(events);

    console.log(" EventList ");
    return (
      <div>
        {events &&
          events.map(event => (
            <EventListItem
              key={event.id}
              event={event}
              onEventOpen={onEventOpen}
              deleteEvent={deleteEvent}
            />
          ))}
      </div>
    );
  }
}

export default EventList;
