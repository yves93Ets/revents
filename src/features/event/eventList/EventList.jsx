import React, { Component } from "react";
import EventListItem from "./EventListItem";
class EventList extends Component {
  state = {};
  render() {
    const { events, onEventEdit } = this.props;
    console.log(events);
    console.log(onEventEdit === undefined);

    console.log(" EventList ");
    return (
      <div>
        {events.map(event => (
          <EventListItem
            key={event.id}
            event={event}
            onEventEdit={onEventEdit}
          />
        ))}
      </div>
    );
  }
}

export default EventList;
