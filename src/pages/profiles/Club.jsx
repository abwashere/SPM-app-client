import React, { Component } from "react";
import clubApiHandler from "./../../api/clubApiHandler";

import "./../../styles/Profiles.css";
import "./../../styles/global.css";

class Club extends Component {
  state = {
    club: null,
  };

  componentDidMount() {
    const clubId = this.props.match.params.id;

    clubApiHandler
      .getOneClub(clubId)
      .then((apiRes) => {
        console.log(apiRes);
        this.setState({ club: apiRes });
      })
      .catch((apiError) => console.log(apiError));
  }

  render() {
    if (!this.state.club) return null;

    return (
      <div className="ContentMain Profiles">
        <h1 className="bold">{this.state.club.clubName}</h1>

        <img
          className="logo"
          src={this.state.club.image}
          alt={this.state.club.clubName}
        />
        <br />
        <h3 className="bold">Nous (re)joindre :</h3>
        {!this.state.club.location.formattedAddress && this.state.club.address && (
          <p>
            <span className="bold green">Adresse : </span>
            {this.state.club.address}
          </p>
        )}
        {this.state.club.location.formattedAddress && (
          <p>
            <span className="bold green">Adresse : </span>
            {this.state.club.location.formattedAddress}
          </p>
        )}
        {this.state.club.phoneNumber && (
          <p>
            <span className="bold green">Téléphone : </span>
            {this.state.club.phoneNumber}
          </p>
        )}
        <p>
          <span className="bold green">Email : </span>
          {this.state.club.email}
        </p>
        <br />
        {this.state.club.website && (
          <p>
            <span className="bold green">Site web : </span>
            <a href={this.state.club.website}>{this.state.club.website}</a>
          </p>
        )}
        {this.state.club.videoURL && (
          <p>
            <span className="bold green">Vidéo : </span>
            <a href={this.state.club.videoURL}>{this.state.club.videoURL}</a>
          </p>
        )}
        <br />
        {this.state.club.description && (
          <p>
            <span className="bold green">Plus d'infos : </span>
            {this.state.club.description}
          </p>
        )}
      </div>
    );
  }
}

export default Club;
