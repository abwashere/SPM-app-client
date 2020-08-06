import React, { Component } from "react";
import { Link } from "react-router-dom";
import eventApiHandler from "./../../api/eventApiHandler";
import moment from "moment";

import "./../../styles/Profiles.css";
import "./../../styles/global.css";

require("moment/locale/fr.js");

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
		const date =
			moment(this.state.event.date).format("dddd") +
			" " +
			moment(this.state.event.date).format("LL");

		return (
			<div className="ContentMain Profiles">
				<h1 className="title">{this.state.event.title}</h1>
				<img
					className="event-img box-shadowed"
					src={this.state.event.image}
					alt={this.state.event.title}
				/>
				<br />
				{this.state.event.club && (
					<div>
						<p>
							<span className="bold green">Club : </span>
							{this.state.event.club.clubName}
						</p>
						<br />
						<Link to={`/club/${this.state.event.club._id}`}>
							<div
								className="profile-logo-container round-box box-shadowed"
								style={{
									backgroundImage: `url(${this.state.event.club.image})`,
								}}
							></div>
						</Link>
					</div>
				)}
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
