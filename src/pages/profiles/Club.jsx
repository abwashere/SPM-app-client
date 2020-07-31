import React, { Component } from "react";
import clubApiHandler from "./../../api/clubApiHandler";

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
      <div>
        <h1>{this.state.club.clubName}</h1>

        <img src={this.state.club.image} alt={this.state.club.clubName} />
        <br />
        <h3>Nous joindre :</h3>
        {!this.state.club.location.formattedAddress && this.state.club.address && (
          <p>
            <span className="bold">Adresse : </span>
            {this.state.club.address}
          </p>
        )}
        {this.state.club.location.formattedAddress && (
          <p>
            <span className="bold">Adresse : </span>
            {this.state.club.location.formattedAddress}
          </p>
        )}
        {this.state.club.phoneNumber && (
          <p>
            <span className="bold">Téléphone : </span>
            {this.state.club.phoneNumber}
          </p>
        )}
        <p>
          <span className="bold">Email : </span>
          {this.state.club.email}
        </p>
        <br />
        {this.state.club.website && (
          <p>
            <span className="bold">Site web : </span>
            {this.state.club.website}
          </p>
        )}
        {this.state.club.videoURL && (
          <p>
            <span className="bold">Vidéo : </span>
            {this.state.club.videoURL}
          </p>
        )}
        <br />
        {this.state.club.description && (
          <p>
            <span className="bold">Plus d'infos : </span>
            {this.state.club.description}
          </p>
        )}
      </div>
    );
  }
}

export default Club;
