import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import EventList from "../eventList/EventList";

const mapState = (state) => ({
  events: state.events
})

class EventDashboard extends Component {
  handleDelete = (eventId) => () => {
    this.props.deleteEvent(eventId)
  };
  render() {
    const { events, deleteEvent } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <h2>
            <EventList
              events={events}
              deleteEvent={deleteEvent}
            />
          </h2>
        </Grid.Column>
        <Grid.Column width={6}>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(mapState)(EventDashboard);
