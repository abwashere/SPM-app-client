import React from "react";
import { Link } from "react-router-dom";

import "./../../styles/Card.css";

const Card = ({ elem }) => {
	let isClub;
	if (elem.role === "Club") isClub = true;

	return (
		<div className={`Card ${isClub ? "club" : "team"} box-shadowed hvr-grow`}>
			<div className="card-image-box">
				<Link to={`/${isClub ? "club" : "team"}/${elem._id}`}>
					<figure
						className="image"
						style={{ backgroundImage: `url(${elem.image})` }}
					></figure>
				</Link>
			</div>
			<div className="card-content">
				<div className="heading">
					<p className="name">{isClub ? elem.clubName : elem.teamName}</p>
					{!isClub && (
						<p className="team-owner">
							Club :{" "}
							<Link to={`/club/${elem.club._id}`}>{elem.club.clubName}</Link>
						</p>
					)}
				</div>
				<div className="address">
					{/* FIXME: get formattedAddress */}
					{elem.location.formattedAddress}
				</div>
				{!isClub && (
					<div className="sport">
						{elem.sport.sportName} en {elem.practice}
					</div>
				)}
				{/* {isClub && <div className="description"> {elem.description}</div>} */}
			</div>
		</div>
	);
};

export default Card;
