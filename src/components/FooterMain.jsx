import React from "react";
import { Link } from "react-router-dom";

import "../styles/FooterMain.css";

const FooterMain = () => {
	return (
		<footer className="FooterMain flex">
			<div className="flex col">created by </div>
			<div className="flex col">
				<div className="admin-profile-link">
					<Link to="https://www.linkedin.com/in/auderichon/" target="_blank">
						Aude Richon | logo github
					</Link>
				</div>
				<div className="admin-profile-link">
					<Link
						to="https://linkedin.com/in/audrey-belson-28382958"
						target="_blank"
					>
						Audrey Belson | logo github
					</Link>
				</div>
			</div>
		</footer>
	);
};

export default FooterMain;
