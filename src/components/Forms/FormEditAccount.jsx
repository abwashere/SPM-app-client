import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserContext from "../Auth/UserContext";
import authApiHandler from "./../../api/authApiHandler";

import "bulma/css/bulma.css";

export class FormEditAccount extends Component {
	static contextType = UserContext;
	state = {};
	/* handleChange = (event) => {
		const key = event.target.name;
		const value =
			event.target.type === "file"
				? event.target.files[0]
				: event.target.type === "checkbox"
				? event.target.checked
				: event.target.value;

		this.setState({ [key]: value });
	};

	handleSubmit = (event) => {
		event.preventDefault();
		console.log("sign in submitted");

		authApiHandler
			.updatePlayer(this.state)
			.then((dataPlayer) => {
				this.context.setUser(dataPlayer);
				this.props.callback();
			})
			.catch((error) => {
				console.log(error);
			});
	}; */
	render() {
		console.log("le state du form edit", this.state);

		return ( 
			<div className="FormEditAccount">
				{/* -----------------PHOTO PART */}
				{/* -----------------INFOS PART */}
				form d'édition
			</div>
		);
	}
}

export default FormEditAccount;
