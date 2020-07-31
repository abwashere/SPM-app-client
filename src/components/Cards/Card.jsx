import React from "react";
import { withRouter, Link } from "react-router-dom";

import "bulma/css/bulma.css";
import "./../../styles/Cards.css";

const Card = ({ group }) => {
	let isClub;
	if (group.role === "Club") isClub = true;

	return (
		<div className="Card">
			<Link to={`/${isClub ? "club" : "team"}/${group.id}`}>
				<div className="card">
					<div className="card-image">
						<figure className="image is-4by3">
							<img src={group.image} alt="Placeholder image" />
						</figure>
					</div>

					<div className="card-content">
						<div className="media">
							<div className="media-content">
								<p className="title is-4">
									{isClub ? group.clubName : group.teamName}
								</p>
								<p className="subtitle is-6">
									{" "}
									{!isClub && group.club.clubName}
								</p>
							</div>
						</div>
						<div className="content is-7">
							{/* FIXME: get formattedAddress */}
							{group.address.formattedAddress}
						</div>
						<div className="content">{isClub && group.description}</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default Card;
