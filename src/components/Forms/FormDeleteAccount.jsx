import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import UserContext from "../Auth/UserContext";
import clubApiHandler from "./../../api/clubApiHandler";

import "bulma/css/bulma.css";

class FormDeleteAccount extends Component {
	static contextType = UserContext;
	state = { isAsked: true, isDeleted: false };

	handleDelete = (id) => {
		console.log("handle delete triggered");
		let user = this.context.user;
		clubApiHandler
			.deleteClub(id)
			.then((dbRes) => {
				console.log("db res in handle delete", dbRes);
				this.setState({ isDeleted: true });
				this.context.removeUser();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	handleAbort = () => {
		this.setState({ isAsked: false });
	};

	render() {
		const { isAsked, isDeleted } = this.state;
		const { user } = this.context;
		console.log(
			"context user to delete",
			user._id,
			user.clubName,
			user.firstName
		);

		return (
			<div className="FormDeleteAccount">
				{isDeleted && <Redirect to="/" />}

				<React.Fragment>
					<p>Etes-tu sûr(e) de vouloir supprimer ce compte ?</p>
					<div className="buttons">
						<button
							onClick={() => this.handleDelete(user._id)}
							className="button is-selected"
						>
							Oui, au revoir
						</button>
						<button
							onClick={() => {
								this.handleAbort();
								this.props.abortDelete();
							}}
							className="button is-warning is-selected"
						>
							Noooo !
						</button>
					</div>
				</React.Fragment>
			</div>
		);
	}
}

export default withRouter(FormDeleteAccount);
