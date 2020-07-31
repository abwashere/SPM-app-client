import React from "react";
import { withRouter, Link } from "react-router-dom";

import "bulma/css/bulma.css";
import "./../../styles/Cards.css";

const Card = ({ elem }) => {
	let isClub;
	if (elem.clubName) isClub = true;

	return (
		<div className={`card ${isClub ? "club" : "team"}`}>
			<Link to={`/${isClub ? "club" : "team"}/${elem._id}`}>
				<div className="card-image">
					<figure className="image is-4by3">
						<img src={elem.image} alt="Placeholder image" />
					</figure>
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
				<div className="address content is-10">
					{/* FIXME: get formattedAddress */}
					{elem.address.formattedAddress}
				</div>
				<div className="sport content">
					{!isClub && `${elem.sport.sportName} en ${elem.practice}`}
				</div>
				<div className="description content">{isClub && elem.description}</div>
			</div>
		</div>
	);
};

export default Card;
