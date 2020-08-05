import React, { Component } from "react";
import { Link } from "react-router-dom";

import eventApiHandler from "./../api/eventApiHandler";

import "./../styles/EventsList.css";

class EventsList extends Component {
	state = {
		events: null,
	};

	componentDidMount() {
		eventApiHandler
			.getEvents()
			.then((dbRes) => {
				this.setState({ events: dbRes });
			})
			.catch((error) => console.log(error));
	}

	render() {
		const { events } = this.state;
		return (
			<div className="ContentMain EventsList">
				<h1 className="title">Tous les évènements</h1>
				<div className="events-container slide-top">
					<table className="event-table border-round box-shadowed">
						<thead>
							<tr>
								<th colSpan="2">Evènement</th>
								<th>Quand ?</th>
								<th>Ville</th>
								<th>Organisateur</th>
							</tr>
						</thead>
						<tbody>
							{!events && (
								<tr>
									<td>Loading events list ...</td>
								</tr>
							)}
							{events &&
								events.map((event, i) => (
									<tr key={i}>
										<td>
											<img
												src={event.image}
												alt="event pic"
												className="event-img-small "
											/>
										</td>
										<td>
											<Link to={`/event/${event._id}`} className="link">
												{event.title}
											</Link>
										</td>
										<td>
											{event.date.day} à {event.time}
										</td>
										<td>{event.location.formattedAddress} </td>
										<td>
											<Link to={`/club/${event.club._id}`} className="link">
												<strong>{event.club.clubName}</strong>
											</Link>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default EventsList;
