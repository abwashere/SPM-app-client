import React from "react";
import { withRouter, Link } from "react-router-dom";

import "bulma/css/bulma.css";
import "./../../styles/Cards.css";

const CardTest = () => {
  let isClub;
  let role = "Team";
	if (role === "Club") isClub = true;

	return (
		<div className="Card">
			<Link to={`/${isClub ? "club" : "team"}/someId`}>
				<div className="card">
					<div className="card-image">
						<figure className="image is-4by3">
							<img
								src="https://bulma.io/images/placeholders/96x96.png"
								alt="Placeholder image"
							/>
						</figure>
					</div>

					<div className="card-content">
						<div className="media">
							<div className="media-content">
								<p className="title is-4">
									{isClub ? "Les Zazas" : "Les Zouzous"}
								</p>
								<p className="subtitle is-6">
									{!isClub && "Les Zazas"}
								</p>
							</div>
						</div>
						<div className="content is-7">
							{/* FIXME: get formattedAddress */}
							{/* {group.address.formattedAddress} */}
						</div>
						{/* <div className="content">{isClub && group.description}</div> */}
					</div>
				</div>
			</Link>
		</div>
	);
};

export default CardTest;
