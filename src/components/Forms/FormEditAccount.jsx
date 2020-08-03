import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserContext from "../Auth/UserContext";
import authApiHandler from "./../../api/authApiHandler";

import "bulma/css/bulma.css";

export class FormEditAccount extends Component {
	static contextType = UserContext;
	state = {
		firstName: "",
		lastName: "",
		sportsList: [],
		practice: [
			{
				sport: "",
				level: "",
			},
		],
		phoneNumber: "",
		website: "",
		year: "",
		subscriptionFee: "",
		description: "",
		email: "",
		clubName: "",
		file: null,
	};
	/* handleChange = (event) => {
		const value =
			event.target.type === "file" ? event.target.files[0] : event.target.value;
		const key = event.target.name;

		if (event.target.type === "file") {
			this.setState({
				file: URL.createObjectURL(event.target.files[0]),
				picture: event.target.files[0],
			});
		} else {
			this.setState({ [key]: value });
		}
	};

	handleSubmit = (event) => {
		event.preventDefault();
		console.log(this.state);

		let fd = new FormData();
		buildFormData(fd, this.state);

		authApiHandler
			.signupPlayer(fd)
			.then((data) => {
				console.log(data);
				this.context.setUser(data);
				this.props.history.push("/");
			})
			.catch((error) => {
				console.log(error);
			});
	};
 */
	render() {
		console.log("le state du form edit", this.state);
		let user = this.context.user;

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
