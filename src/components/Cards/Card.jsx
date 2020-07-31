import React from "react";
import { withRouter, Link } from "react-router-dom";

import "bulma/css/bulma.css";
import "./../../styles/Cards.css";

const Card = ({ group }) => {
	let isClub;
	if (group.role === "Club") isClub = true;

	return (
		<div className={`card ${isClub ? "club" : "team"}`}>
			<Link to={`/${isClub ? "club" : "team"}/${group.id}`}>
				<div className="card-image">
					<figure className="image is-4by3">
						<img src={group.image} alt="Placeholder image" />
					</figure>
				</div>

				<div className="card-content">
					<div className="media">
						<div className="media-content">
							<p className="name title is-4">
								{isClub ? group.clubName : group.teamName}
							</p>
							<p className="club-name subtitle is-6">
								Club : 
								{!isClub && (
									<Link to={`/club/${group.club.id}`}> 
										{group.club.clubName}
									</Link>
								)}
							</p>
						</div>
					</div>
					<div className="address content is-10">
						{/* FIXME: get formattedAddress */}
						{group.address.formattedAddress}
					</div>
					<div className="sport content">
						{!isClub && `${group.sport.sportName} en ${group.practice}`}
					</div>
					<div className="description content">
						{isClub && group.description}
					</div>
				</div>
			</Link>
		</div>
	);
};

export default Card;
