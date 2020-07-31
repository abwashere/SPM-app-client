import React from "react";
import { withRouter, Link } from "react-router-dom";

import "bulma/css/bulma.css";
import "./../../styles/Cards.css";

const TeamCard = ({ group }) => {
	return (
		<div className="Card team">
			<Link to={`/team/${group.id}`}>
				<div className="card">
					<div className="card-image">
						<figure className="image is-4by3">
							<img src={group.image} alt="Placeholder image" />
						</figure>
					</div>

					<div className="card-content">
						<div className="media">
							<div className="media-content">
								<p className="title is-4">{group.teamName}</p>
								<p className="subtitle is-6"> {group.club.clubName}</p>
							</div>
						</div>
						<div className="content is-8">
							{/* FIXME: get formattedAddress */}
							{group.formattedAddress}
						</div>
						<div className="content">
		
							{group.formattedAddress}
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default TeamCard;
