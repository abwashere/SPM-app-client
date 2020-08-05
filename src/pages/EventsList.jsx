import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

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
											<Link to={`/event/${event._id}`}>
												<img
													src={event.image}
													alt="event pic"
													className="event-img-small hvr-grow"
												/>
											</Link>
										</td>
										<td>
											<Link to={`/event/${event._id}`} className="link">
												<strong>{event.title}</strong>
											</Link>
										</td>
										<td>
											<strong>
												{moment(event.date).format("dddd Do MMMM YYYY")} à {event.time}
											</strong>
										</td>
										<td>{event.location.formattedAddress} </td>
										<td>
											<Link
												to={`/club/${event.club._id}`}
												className="link hvr-underline-from-center"
											>
												{event.club.clubName}
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
