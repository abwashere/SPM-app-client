import React, { Component } from "react";
import eventApiHandler from "./../../api/eventApiHandler";

class Event extends Component {
  state = {
    event: null,
  };

  componentDidMount() {
    const eventId = this.props.match.params.id;

    eventApiHandler
      .getOneEvent(eventId)
      .then((apiRes) => {
        console.log(apiRes);
        this.setState({ event: apiRes });
      })
      .catch((apiError) => console.log(apiError));
  }

  render() {
    console.log(this.state);
    if (!this.state.event) return null;

    return (
      <div>
        <h1>{this.state.event.title}</h1>
        <img src={this.state.event.image} alt={this.state.event.title} />
        <br />
        <p>
          <span className="bold">Club : </span>
          {this.state.event.owner.clubName}
        </p>
        <br />
        <p>{this.state.event.owner.image}</p>
        <br />
        <p>
          <span className="bold">Sport : </span>
          {this.state.event.sport}
        </p>
        <br />
        <p>
          <span className="bold">Date : </span>
          {this.state.event.date}
        </p>
        )}
        <br />
        {this.state.event.time && (
          <p>
            <span className="bold">Horaire : </span>
            {this.state.event.time}
          </p>
        )}
        <br />
        {!this.state.event.location.formattedAddress &&
          this.state.event.address && (
            <p>
              <span className="bold">Lieu : </span>
              {this.state.event.address}
            </p>
          )}
        {this.state.event.location.formattedAddress && (
          <p>
            <span className="bold">Lieu : </span>
            {this.state.event.location.formattedAddress}
          </p>
        )}
        <br />
        {this.state.event.description && (
          <p>
            <span className="bold">Plus d'infos sur l'événement : </span>
            {this.state.event.description}
          </p>
        )}
      </div>
    );
  }
}

export default Event;
