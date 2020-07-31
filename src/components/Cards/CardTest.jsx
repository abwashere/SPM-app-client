import React from "react";
import { withRouter, Link } from "react-router-dom";

import "bulma/css/bulma.css";
import "./../../styles/Cards.css";

const CardTest = () => {
	let isClub;
	let role = "Team";
	if (role === "Club") isClub = true;

	return (
		<div className={`card ${isClub ? "club" : "team"}`}>
			<Link to={`/${isClub ? "club" : "team"}/someId`}>
				<div className="card-image">
					<figure className="image is-4by3">
						<img
							src="https://bulma.io/images/placeholders/96x96.png"
							alt="Placeholder image"
						/>
					</figure>
				</div>
			</Link>
			<div className="card-content">
				<div className="media">
					<div className="media-content">
						<p className="title is-4">{isClub ? "Les Zazas" : "Les Zouzous"}</p>
						<p className="subtitle is-6">Club : 
							{!isClub && <Link to={`/club/someClubId`}>Les Zazas</Link>}
						</p>
					</div>
				</div>
				<div className="content">150 rue des Boulets, 75011, Paris, France</div>
				<div className="content is-8">{!isClub && "Tennis en loisir"}</div>
				<div className="content">
					{isClub &&
						"Lorem ipsum dolor, sit amet consectetur adipisicing elit.Recusandae vero numquam ducimus cum maiores earum quam atque blanditiis quibusdam, magnam ratione! Eius ut, reprehenderit animimollitia molestias itaque aspernatur minus."}
				</div>
			</div>
		</div>
	);
};

export default CardTest;
