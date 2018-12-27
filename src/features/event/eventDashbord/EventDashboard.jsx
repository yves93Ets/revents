import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import EventList from "../eventList/EventList";
import EventActivity from "../EventActivity/EventActivity";
import { deleteEvent } from "../eventActions";
const mapState = state => ({
  events: state.firestore.ordered.events,
  loading: state.async.loading
});
const actions = { deleteEvent };
class EventDashboard extends Component {
  handleDelete = eventId => () => {
    this.props.deleteEvent(eventId);
  };
  render() {
    const { events, deleteEvent } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <h2>
            <EventList events={events} deleteEvent={deleteEvent} />
          </h2>
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapState,
  actions
)(firestoreConnect([{ collection: "events" }])(EventDashboard));
