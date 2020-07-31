import React from "react";
import { withRouter, Link } from "react-router-dom";

import "bulma/css/bulma.css";
import "./../../styles/Cards.css";

const ClubCard = ({ group }) => {
	return (
		<div className="Card club">
			<Link to={`/club/${group.id}`}>
				<div className="card">
					<div className="card-image">
						<figure className="image is-4by3">
							<img src={group.image} alt="Placeholder image" />
						</figure>
					</div>

					<div className="card-content">
						<div className="media">
							<p className="title is-4">{group.clubName}</p>
						</div>
						<div className="content is-8">
							{/* FIXME: get formattedAddress */}
							{group.formattedAddress}
						</div>
						<div className="content">{group.sport.description}</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default ClubCard;
