import React from "react";
import { Link } from "react-router-dom";

import "../styles/FooterMain.css";
import "bulma/css/bulma.css";

const FooterMain = () => {
	return (
		<footer className="FooterMain flex col footer">
			<div className="content has-text-centered flex col">
				<div>
					<strong id="logo-footer">Spm</strong>
				</div>

				<div className="flex" >
					<span>created by Aude Richon</span>
					<a href="https://www.linkedin.com/in/auderichon/" target="_blank">
						<span className="icon is-medium">
							<i className="fab fa-linkedin"></i>
						</span>
					</a>
					<a href="https://github.com/auderichon" target="_blank">
						<span className="icon is-medium">
							<i className="fab fa-github-square"></i>
						</span>
					</a>
					<span> and Audrey Belson </span>
					<a href="https://linkedin.com/in/audrey-belson" target="_blank">
						<span className="icon is-medium">
							<i className="fab fa-linkedin"></i>
						</span>
					</a>
					<a
						href="https://github.com/abWasHere"
						className="icon"
						target="_blank"
					>
						<span className="icon is-medium">
							<i className="fab fa-github-square"></i>
						</span>
					</a>
				</div>
			</div>
		</footer>
	);
};

export default FooterMain;
