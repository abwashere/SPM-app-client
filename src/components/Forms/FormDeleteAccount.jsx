import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import UserContext from "../Auth/UserContext";
import clubApiHandler from "./../../api/clubApiHandler";
import playerApiHandler from "./../../api/playerApiHandler";

import "bulma/css/bulma.css";

class FormDeleteAccount extends Component {
	static contextType = UserContext;
	state = { isDeleted: false };

	handleDelete = (id) => {
		console.log("handle delete triggered");

		if (this.context.user.role === "Club") {
			clubApiHandler
				.deleteClub(id)
				.then(() => {
					this.setState({ isDeleted: true });
					this.context.removeUser();
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			playerApiHandler
				.deletePlayer(id)
				.then(() => {
					this.setState({ isDeleted: true });
					this.context.removeUser();
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	render() {
		const { isDeleted } = this.state;
		const { user } = this.context;
		console.log("context user to delete", user._id, user.firstName);

		return (
			<div className="FormDeleteAccount">
				{isDeleted && <Redirect exact to="/" />}

				<React.Fragment>
					{this.props.role === "Club" && (
						<p>Etes-vous sûr⸱e de vouloir supprimer ce compte ?</p>
					)}
					{this.props.role === "Player" && (
						<p>Es-tu sûre de vouloir supprimer ce compte ?</p>
					)}
					<div className="buttons">
						<button
							onClick={() => this.handleDelete(user._id)}
							className="button is-selected"
						>
							Oui, au revoir
						</button>
						<button
							onClick={() => {
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
