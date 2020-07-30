import React from "react";
import { Link } from "react-router-dom";

import "../styles/FooterMain.css";
import "bulma/css/bulma.css";

const FooterMain = () => {
	return (
		<footer className="FooterMain flex">
			<div className="flex col">created by </div>
			<div className="flex col">
				<div className="admin-profile-link">
					<Link to="https://www.linkedin.com/in/auderichon/" target="_blank">
						Aude Richon | missing github
					</Link>
				</div>
				<div className="admin-profile-link">
					<Link
						to="https://linkedin.com/in/audrey-belson"
						target="_blank"
					>
						Audrey Belson | missing github
					</Link>
				</div>
			</div>
		</footer>
	);
};

export default FooterMain;
