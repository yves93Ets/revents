import React, { Component } from "react";
import EventDashboard from "../../features/event/eventDashbord/EventDashboard";
import NavBar from "../../features/nav/navBar/NavBar";
import { Container } from "semantic-ui-react";
class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Container className="main">
          <EventDashboard />
        </Container>
      </div>
    );
  }
}

export default App;
