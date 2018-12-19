import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";
import EventList from "../eventList/EventList";
import EventForm from "../eventForm/EventForm";
import cuid from "cuid";
const eventsDashBoard = [
  {
    id: "1",
    title: "Trip to Tower of London",
    date: "2018-03-07",
    category: "culture",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "London, UK",
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: "Bob",
    hostPhotoURL: "https://randomuser.me/api/portraits/men/20.jpg",
    attendees: [
      {
        id: "a",
        name: "Bob",
        photoURL: "https://randomuser.me/api/portraits/men/20.jpg"
      },
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg"
      }
    ]
  },
  {
    id: "2",
    title: "Trip to Punch and Judy Pub",
    date: "2018-03-28",
    category: "drinks",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "London, UK",
    venue: "Punch & Judy, Henrietta Street, London, UK",
    hostedBy: "Tom",
    hostPhotoURL: "https://randomuser.me/api/portraits/men/22.jpg",
    attendees: [
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg"
      },
      {
        id: "a",
        name: "Bob",
        photoURL: "https://randomuser.me/api/portraits/men/20.jpg"
      }
    ]
  }
];

class EventDashboard extends Component {
  state = {
    events: eventsDashBoard,
    isOpen: false,
    selectedEvent: null
    //this.handleFormOpen = this.handleFormOpen.bind(this);
    // this.handleCancel = this.handleCancel.bind(this);
  }
  handleFormOpen = () => {
    this.setState({ isOpen: true, selectedEvent: null });
  };
  handleCancel = () => {
    this.setState({ isOpen: false });
  };
  handleUpdateEvent = (updatedEvent) => {
    this.setState({
      events: this.state.events.map(event => {
        if (event.id === updatedEvent.id) {
          return Object.assign({}, updatedEvent)
        } else return event
      }),
      isOpen: false,
      selectedEvent: null
    })
  }
  handleOpenEvent = (eventToUpdate) => () => {
    this.setState({
      selectedEvent: eventToUpdate,
      isOpen: true
    });
  };
  handleCreateEvent = newEvent => {
    newEvent.id = cuid();
    newEvent.photoURL = "/assets/user.png";
    const updatedEvents = [...this.state.events, newEvent];
    this.setState({
      events: updatedEvents,
      isOpen: false
    });
  };
  handleDelete = (eventId) => () => {
    const updatedEvents = this.state.events.filter(e => e.id !== eventId);
    this.setState({ events: updatedEvents })
    this.setState({ isOpen: false });
  };
  render() {
    const { selectedEvent } = this.state;
    //console.log(this.handleEditEvent);
    //console.log("dashboard");
    return (
      <Grid>
        <Grid.Column width={10}>
          <h2>
            <EventList
              onEventOpen={this.handleOpenEvent}
              events={this.state.events}
              deleteEvent={this.handleDelete}
            />
          </h2>
        </Grid.Column>
        <Grid.Column width={6}>
          <Button
            onClick={this.handleFormOpen}
            positive
            content="Create event"
          />
          {this.state.isOpen && (
            <EventForm
              selectedEvent={selectedEvent}
              createEvent={this.handleCreateEvent}
              handleCancel={this.handleCancel}
              updateEvent={this.handleUpdateEvent}

            />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

export default EventDashboard;
