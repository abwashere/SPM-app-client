import React from "react";

import "../styles/FooterMain.css";
import "bulma/css/bulma.css";

const FooterMain = () => {
	return (
		<footer className="FooterMain flex col footer">
			<div className="content has-text-centered flex col">
				<div>
					<strong id="logo-footer">Spm</strong>
				</div>

				<div className="flex">
					<div className="devs">
						<a
							href="https://www.linkedin.com/in/auderichon/"
							target="_blank"
							rel="noopener noreferrer"
							className="icon"
						>
							<span className="icon is-medium hvr-wobble-vertical">
								<i className="fab fa-linkedin"></i>
							</span>
						</a>
						<a
							href="https://github.com/auderichon"
							target="_blank"
							rel="noopener noreferrer"
							className="icon"
						>
							<span className="icon is-medium hvr-wobble-vertical">
								<i className="fab fa-github-square"></i>
							</span>
						</a>
						<span>Aude Richon | Audrey Belson </span>
						<a
							href="https://linkedin.com/in/audrey-belson"
							target="_blank"
							rel="noopener noreferrer"
							className="icon"
						>
							<span className="icon is-medium hvr-wobble-vertical">
								<i className="fab fa-linkedin"></i>
							</span>
						</a>
						<a
							href="https://github.com/abWasHere"
							className="icon"
							target="_blank"
							rel="noopener noreferrer"
						>
							<span className="icon is-medium hvr-wobble-vertical">
								<i className="fab fa-github-square"></i>
							</span>
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default FooterMain;
