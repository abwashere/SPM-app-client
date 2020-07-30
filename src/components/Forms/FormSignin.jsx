import React, { Component } from "react";
import UserContext from "../Auth/UserContext";
import { withRouter } from "react-router-dom";
import authApiHandler from "../../api/authApiHandler";
import "bulma/css/bulma.css";


class FormSignin extends Component {
	static contextType = UserContext;

	state = {
		email: "",
		password: "",
	};

	handleChange = (event) => {
		const key = event.target.name;

		// You can test more if you have to handle different sorts of inputs.
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

		authApiHandler
			.signinClub(this.state)
			.then((data) => {
				if (!data) {
					authApiHandler
						.signinPlayer(this.state)
						.then((data) => {
							this.context.setUser(data);
							this.props.history.push("/");
						})
						.catch((error) => {
							console.log(error);
						});
				}
				this.context.setUser(data);
				this.props.history.push("/");
			})
			.catch((error) => {
				console.log(error);
				// Display error message here, if you set the state
			});
	};

	render() {
		return (
			<form onChange={this.handleChange} onSubmit={this.handleSubmit}>
				{/* <label htmlFor="email">Email</label>
				<input type="email" id="email" name="email" />
				<label htmlFor="password">Password</label>
				<input type="password" id="password" name="password" />
				<button>Submit</button> */}

				<div className="field">
					<label className="label">Email</label>
					<div className="control has-icons-left has-icons-right">
						<input
							className="input is-danger"
							type="email"
							placeholder="Email input"
							value="foo@bar.baz"
							name="email"
						/>
						<span className="icon is-small is-left">
							<i className="fas fa-envelope"></i>
						</span>
						<span className="icon is-small is-right">
							<i className="fas fa-exclamation-triangle"></i>
						</span>
					</div>
					<p className="help is-danger">This email is invalid</p>
				</div>

				<div className="field">
					<label className="label">Password</label>
					<div className="control has-icons-left has-icons-right">
						<input
							className="input is-success"
							type="password"
							placeholder="Text input"
							value="1234"
							name="password"
						/>
						<span className="icon is-small is-left">
							<i className="fas fa-user"></i>
						</span>
						<span className="icon is-small is-right">
							<i className="fas fa-check"></i>
						</span>
					</div>
					<p className="help is-success">This username is available</p>
				</div>
			</form>
		);
	}
}

export default withRouter(FormSignin);
