import React, { Component } from "react";
import { connect } from "react-redux";
import { createEvent, updateEvent } from "../eventActions"
import cuid from "cuid"
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { reduxForm, Field } from 'redux-form'
import { composeValidators, combineValidators, isRequired, hasLengthGreaterThan } from 'revalidate'
import moment from "moment"

import TextInput from "../../../app/common/form/TextInput"
import TextArea from "../../../app/common/form/TextArea"
import SelectInput from "../../../app/common/form/SelectInput"
import DateInput from "../../../app/common/form/DateInput"
const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {}

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0]
  }
  return { intialValues: event }
}
const actions = { createEvent, updateEvent }

const category = [
  { key: 'drinks', text: 'Drinks', value: 'drinks' },
  { key: 'culture', text: 'Culture', value: 'culture' },
  { key: 'film', text: 'Film', value: 'film' },
  { key: 'food', text: 'Food', value: 'food' },
  { key: 'music', text: 'Music', value: 'music' },
  { key: 'travel', text: 'Travel', value: 'travel' },
];
const validate = combineValidators({
  title: isRequired({ message: "The event titlte is required" }),
  caregory: isRequired({ message: "Please proivde a category" }),
  description: composeValidators(
    isRequired({ message: "Please enter a descriptio" }),
    hasLengthGreaterThan(4)({ message: "Description needs to be at least 5 characters" }))(),
  city: isRequired("city"),
  venue: isRequired("venue"),
  date: isRequired("date")

})
class EventForm extends Component {

  onFormSubmit = values => {
    values.date = moment(values.date).format()
    if (this.props.initialValues.id) {
      this.props.updateEvent(values)
      this.props.history.goBack();
    } else {
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoURL: "/assets/user.png",
        hostedBy: "Bob"
      }
      this.props.createEvent(newEvent)
      this.props.history.push("/events")
    }
  };
  render() {
    const { invalide, submitting, pristine } = this.props
    return (
      <Grid>
        <Grid.Column with={10}>
          <Segment>
            <Header sub color="teal" content="Event Details" />

            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field name="title" type="text" component={TextInput} placeholder="Give ypur event to your name" />
              <Field name="category" type="text" options={category} component={SelectInput} placeholder="what is ypur event about" />
              <Field name="description" type="text" rows={3} component={TextArea} placeholder="tell us about your event" />
              <Header sub color="teal" content="Event Location Details" />
              <Field name="city" type="text" component={TextInput} placeholder="event city" />
              <Field name="venue" type="text" component={TextInput} placeholder="event venue" />
              <Field name="date" type="text" component={DateInput} dateFormat="YYYY-MM-DD HH:mm" timeFormat="HH:mm" showTimeSelect placeholder="Event date" />
              <Button disabled={invalide || submitting || pristine} positive type="submit">
                Submit
              </Button>
              <Button onClick={this.props.history.goBack} type="button">
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(mapState, actions)(reduxForm({ form: "eventForm", enableReinitialize: true, validate })(EventForm));
