import React from "react";
import { Link } from "react-router-dom";

import "bulma/css/bulma.css";
import "./../../styles/Cards.css";

const Card = ({ elem }) => {
	let isClub;
	if (elem.clubName) isClub = true;

	return (
		<div className={`card ${isClub ? "club" : "team"}`}>
			<Link to={`/${isClub ? "club" : "team"}/${elem._id}`}>
				<div className="card-image">
					<figure
						className="image"
						style={{ backgroundImage: `url(${elem.image})` }}
					></figure>
				</div>
			</Link>
			<div className="card-content">
				<div className="media">
					<div className="media-content">
						<p className="name title is-4">
							{isClub ? elem.clubName : elem.teamName}
						</p>
						<p className="club-name subtitle is-6">
							Club :
							{!isClub && (
								<Link to={`/club/${elem.club._id}`}>{elem.club.clubName}</Link>
							)}
						</p>
					</div>
				</div>
				<div className="address content">
					{/* FIXME: get formattedAddress */}
					{elem.location.formattedAddress}
				</div>
				{!isClub && (
					<div className="sport content">
						{elem.sport.sportName} en {elem.practice}
					</div>
				)}
				{isClub && (
					<div className="description content"> {elem.description}</div>
				)}
			</div>
		</div>
	);
};

export default Card;
