import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserContext from "../Auth/UserContext";
import playerApiHandler from "./../../api/playerApiHandler";
import clubApiHandler from "./../../api/clubApiHandler";

import "bulma/css/bulma.css";
import teamApiHandler from "../../api/teamApiHandler";

class FormDeleteAccount extends Component {
	static contextType = UserContext;
	state = { isAsked: true };

	handleDelete = (id) => {
    console.log("handle delete triggered");
		let user = this.context.user;
		// this.props.history.push("/");


			// 	clubApiHandler
			// 		.deleteClub(id)
			// 		.then((dbRes) => {
			// 			console.log(this.props);
			// 			console.log("db res", dbRes);
			// 		})
			// 		.catch((error) => {
			// 			console.log(error);
			// 		});
			// } else {
			/* delete player */
		// }
	};

	handleAbort = () => {
		this.setState({ isAsked: false });
	};

	render() {
		const { isAsked } = this.state;
		const { user } = this.context;
		console.log(
			"context user to delete",
			user._id,
			user.clubName,
			user.firstName
		);

		return (
			<div className="FormDeleteAccount">
				{isAsked && (
					<React.Fragment>
						<h1>Etes-tu sûr(e) de vouloir supprimer ce compte ?</h1>
						<div className="buttons has-addons">
							<button
								onClick={this.handleDelete(user._id)}
								className="button is-danger is-selected"
							>
								Oui, au revoir
							</button>
							<button
								onClick={() => {
									this.handleAbort();
									this.props.abortDelete();
								}}
								className="button is-link is-selected"
							>
								Noooo !
							</button>
						</div>
					</React.Fragment>
				)}
			</div>
		);
	}
}

export default withRouter(FormDeleteAccount);
