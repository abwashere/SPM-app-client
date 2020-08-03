import React, { Component } from "react";
import teamApiHandler from "./../../api/teamApiHandler";

class Team extends Component {
  state = {
    team: null,
  };

  componentDidMount() {
    const teamId = this.props.match.params.id;

    teamApiHandler
      .getOneTeam(teamId)
      .then((apiRes) => {
        console.log(apiRes);
        this.setState({ team: apiRes });
      })
      .catch((apiError) => console.log(apiError));
  }

  render() {
    console.log(this.state);
    if (!this.state.team) return null;

    return (
      <div>
        <h1>{this.state.team.teamName}</h1>

        <img src={this.state.team.image} alt={this.state.team.teamName} />
        <br />
        <p>
          <span className="bold">Sport : </span>
          {this.state.team.sport.sportName} en {this.state.team.practice}
        </p>
        <br />
        {this.state.team.practice === "compétition" &&
          this.state.team.division && (
            <p>
              <span className="bold">Division : </span>
              {this.state.team.division}
            </p>
          )}
        <br />
        {this.state.team.year && (
          <p>
            <span className="bold">Créée en : </span>
            {this.state.team.year}
          </p>
        )}
        <br />
        {this.state.team.minAge && !this.state.team.maxAge && (
          <p>A partir de {this.state.team.minAge} ans</p>
        )}
        {this.state.team.minAge && this.state.team.maxAge && (
          <p>
            De {this.state.team.minAge} à {this.state.team.maxAge} ans
          </p>
        )}
        {!this.state.team.minAge && this.state.team.maxAge && (
          <p>Jusqu'à {this.state.team.maxAge} ans</p>
        )}
        <br />
        <br />
        <h3>Entraînements :</h3>
        {!this.state.team.location.formattedAddress && this.state.team.address && (
          <p>
            <span className="bold">Lieu : </span>
            {this.state.team.address}
          </p>
        )}
        {this.state.team.location.formattedAddress && (
          <p>
            <span className="bold">Lieu : </span>
            {this.state.team.location.formattedAddress}
          </p>
        )}
        <br />
        {this.state.team.practice && (
          <table>
            <thead>
              <tr>
                <th>Jour</th>
                <th>Début</th>
                <th>Durée</th>
              </tr>
            </thead>
            <tbody>
              {this.state.team.trainings.map((training) => {
                return (
                  <tr key={training._id}>
                    <td>{training.day}</td>
                    <td>{training.time}</td>
                    <td>{training.duration}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <br />
        {this.state.team.description && (
          <p>
            <span className="bold">Plus d'infos sur l'équipe : </span>
            {this.state.team.description}
          </p>
        )}
      </div>
    );
  }
}

export default Team;
