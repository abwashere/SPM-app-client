import React, { Component } from "react";
import { Link } from "react-router-dom";

import teamApiHandler from "./../../api/teamApiHandler";

import "./../../styles/Profiles.css";
import "./../../styles/global.css";

class Team extends Component {
	state = {
		team: "",
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
			<div className="ContentMain Profiles Teams flex slide-left">
				<div className="club-box">
					<Link to={`/club/${this.state.team.club._id}`}>
						<p className="subtitle">Club</p>
						<strong>{this.state.team.club.clubName}</strong>
					</Link>
					<br />
					<Link to={`/club/${this.state.team.club._id}`}>
						<div
							className="profile-logo-container round-box box-shadowed"
							style={{
								backgroundImage: `url(${this.state.team.club.image})`,
							}}
						></div>
					</Link>
				</div>
				<div className="team-box">
					<h2 className="subtitle">Equipe</h2>
					<h1 className="title">{this.state.team.teamName}</h1>
					<img
						className="logo box-shadowed"
						src={this.state.team.image}
						alt={this.state.team.teamName}
					/>

					<br />
					<p>
						<span className="bold green">Sport : </span>
						{this.state.team.sport.sportName} en {this.state.team.practice}
					</p>
					{this.state.team.practice === "compétition" &&
						this.state.team.division && (
							<p>
								<span className="bold green">Division : </span>
								{this.state.team.division}
							</p>
						)}
					<br />
					{this.state.team.year && (
						<p>
							<span className="bold green">Créée en : </span>
							{this.state.team.year}
						</p>
					)}

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
					<h3 className="bold">Entraînements :</h3>
					{this.state.team.coachName && (
						<p>
							<span className="bold green">Entraîneur(es) : </span>
							{this.state.team.coachName}
						</p>
					)}
					{!this.state.team.location.formattedAddress &&
						this.state.team.address && (
							<p>
								<span className="bold green">Lieu : </span>
								{this.state.team.address}
							</p>
						)}
					{this.state.team.location.formattedAddress && (
						<p>
							<span className="bold green">Lieu : </span>
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
						<div className="description-team">
							<p className="bold green">Plus d'infos sur l'équipe :</p>
							<p>{this.state.team.description}</p>
						</div>
					)}
					<br />
					<br />
					{this.state.team.registeredPlayers.length > 0 && (
						<div>
							<h3 className="bold">Membres de l'équipe :</h3>
							<div className="flex wrap">
								{this.state.team.registeredPlayers.map((player) => (
									<div
										key={player._id}
										className="small-player-profile flex col"
									>
										<img
											className="pic-player-team"
											src={player.picture}
											alt="player pic"
										/>
										<h4>
											<Link to={`/player/${player._id}`}>
												{player.firstName} {player.lastName}
											</Link>
										</h4>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default Team;
