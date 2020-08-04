import React, { Component } from "react";
import playerApiHandler from "./../../api/playerApiHandler";

import "./../../styles/Profiles.css";
import "./../../styles/global.css";

class Player extends Component {
	state = {
		player: null,
	};

	componentDidMount() {
		const playerId = this.props.match.params.id;

		playerApiHandler
			.getOnePlayer(playerId)
			.then((apiRes) => {
				console.log(apiRes);
				this.setState({ player: apiRes });
			})
			.catch((apiError) => console.log(apiError));
	}

	render() {
		console.log(this.state);
		if (!this.state.player) return null;

		return (
			<div className="ContentMain Profiles">
				<h1 className="title">
					{this.state.player.firstName} {this.state.player.lastName}
				</h1>
				<div className="flex space-btw">
					<div
						className="profile-logo-container round-box box-shadowed"
						style={{
							backgroundImage: `url(${this.state.player.picture})`,
						}}
					></div>
					<div className="description-player">
						{this.state.player.practice.map((sports) => {
							return (
								<p key={sports._id}>
									<span className="bold green">Sport : </span>
									{sports.level === "intermédiaire" && (
										<span>Niveau {sports.level}</span>
									)}
									{sports.level !== "intermédiaire" && (
										<span>{sports.level} </span>
									)}
									en {sports.sport.sportName}
								</p>
							);
						})}
						<br />
						{!this.state.player.location.formattedPlace &&
							this.state.player.address && (
								<p>
									<span className="bold green">Ville : </span>
									{this.state.player.address}
								</p>
							)}
						{this.state.player.location.formattedPlace && (
							<p>
								<span className="bold green">Ville : </span>
								{this.state.player.location.formattedPlace}
							</p>
						)}
						<br />
						{this.state.player.description && (
							<p>
								<span className="bold green">Plus d'infos sur moi : </span>
								{this.state.player.description}
							</p>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default Player;
