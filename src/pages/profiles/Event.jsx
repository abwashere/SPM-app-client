import React, { Component } from "react";
import eventApiHandler from "./../../api/eventApiHandler";

import "./../../styles/Profiles.css";
import "./../../styles/global.css";

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
    const date = this.state.event.date.slice(0, 10);

    return (
      <div className="ContentMain Profiles">
        <h1 className="bold">{this.state.event.title}</h1>
        <img
          className="logo"
          src={this.state.event.image}
          alt={this.state.event.title}
        />
        <br />
        <p>
          <span className="bold green">Club : </span>
          {this.state.event.club.clubName}
        </p>
        <br />
        <img
          className="logoClub"
          src={this.state.event.club.image}
          alt={this.state.event.club.clubName}
        />
        <br />
        <p>
          <span className="bold green">Sport : </span>
          {this.state.event.sport.sportName}
        </p>
        <br />
        <p>
          <span className="bold green">Date : </span>
          {date}
        </p>
        <br />
        {this.state.event.time && (
          <p>
            <span className="bold green">Horaire : </span>
            {this.state.event.time}
          </p>
        )}
        <br />
        {!this.state.event.location.formattedAddress &&
          this.state.event.address && (
            <p>
              <span className="bold green">Lieu : </span>
              {this.state.event.address}
            </p>
          )}
        {this.state.event.location.formattedAddress && (
          <p>
            <span className="bold green">Lieu : </span>
            {this.state.event.location.formattedAddress}
          </p>
        )}
        <br />
        {this.state.event.description && (
          <p>
            <span className="bold green">Plus d'infos sur l'événement : </span>
            {this.state.event.description}
          </p>
        )}
      </div>
    );
  }
}

export default Event;
