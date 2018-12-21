import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import EventList from "../eventList/EventList";
import EventForm from "../eventForm/EventForm";
import cuid from "cuid";
import { createEvent, deleteEvent, updateEvent } from "../eventActions"

const mapState = (state) => ({
  events: state.events
})
const actions = {
  createEvent, deleteEvent, updateEvent
}
class EventDashboard extends Component {
  state = {
    isOpen: false,
    selectedEvent: null
  }
  handleFormOpen = () => {
    this.setState({ isOpen: true, selectedEvent: null });
  };
  handleCancel = () => {
    this.setState({ isOpen: false });
  };
  handleUpdateEvent = (updatedEvent) => {
    this.props.updateEvent(updatedEvent)
    this.setState({
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
    this.props.createEvent(newEvent)
    this.setState({
      isOpen: false
    });
  };
  handleDelete = (eventId) => () => {
    this.props.deleteEvent(eventId)
  };
  render() {
    const { selectedEvent } = this.state;
    const { events } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <h2>
            <EventList
              onEventOpen={this.handleOpenEvent}
              events={events}
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

export default connect(mapState, actions)(EventDashboard);
