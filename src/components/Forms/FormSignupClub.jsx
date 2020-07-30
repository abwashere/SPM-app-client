import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserContext from "../Auth/UserContext";
import authApiHandler from "../../api/authApiHandler";
import LocationAutoComplete from "./../LocationAutoComplete";

import "bulma/css/bulma.css";

class FormSignupClub extends Component {
	static contextType = UserContext;

	state = {
		role: "",
		email: "",
		password: "",
		email: "",
		clubName: "",
		address: "",
		phoneNumber: "",
		image: "",
		website: "",
		foundedYear: "",
		description: "",
	};

	handleChange = (event) => {
		const value =
			event.target.type === "file"
				? event.target.files[0]
				: event.target.type === "checkbox"
				? event.target.checked
				: event.target.value;

		const key = event.target.name;

		this.setState({ [key]: value });
		console.log("inputed : ", value);
	};

	handleSubmit = (event) => {
		event.preventDefault();

		const fd = new FormData();
		for (let key in this.state) {
			fd.append(key, this.state[key]);
		}

		authApiHandler
			.signupClub(fd)
			.then((data) => {
				this.context.setUser(data);
				this.props.history.push("/");
			})
			.catch((error) => {
				console.log(error);
			});
	};
	handleImage = (event) => {
		this.setState({
			avatar: event.target.files[0],
			// URL temporaire qu'on peut inserer dans une balise <img  src={urlTemporaire}/>
			// preview avant de soumettre le <form> au backend.
			tmpAvatar: URL.createObjectURL(event.target.files[0]),
		});
	};

	handlePlace = (place) => {
		// This handle is passed as a callback to the autocomplete component.
		console.log(place);
	};

	render() {
		const {
			role,
			email,
			clubName,
			address,
			phoneNumber,
			image,
			website,
			foundedYear,
			description,
			password,
		} = this.state;

		return (
			<form onChange={this.handleChange} onSubmit={this.handleSubmit}>
				{/* 
adresse
téléphone
email
password 

photo du club
site web du club
année de création
frais d’adhésion (text input)
description */}
				<div className="field">
					<label className="label">Nom du club</label>
					<div className="control">
						<input className="input" type="text" value={clubName} />
					</div>
				</div>

				<div className="field">
					<label className="label">Adresse administrative</label>
					<p>Adresse actuelle : {address}.</p>
					<div className="control has-icons-left has-icons-right">
						<LocationAutoComplete onSelect={this.handlePlace} />
						<span className="icon is-small is-left">
							<i className="fa fa-map-marker"></i>
						</span>
						<span className="icon is-small is-right">
							{/* <i className="fas fa-check"></i> */}
						</span>
					</div>
				</div>

				<div className="field">
					<label className="label">Email</label>
					<div className="control has-icons-left has-icons-right">
						<input className="input" type="email" value={email} />
					</div>
				</div>

				<div className="field">
					<label className="label">Subject</label>
					<div className="control">
						<div className="select">
							<select>
								<option>Select dropdown</option>
								<option>With options</option>
							</select>
						</div>
					</div>
				</div>

				<div className="field">
					<label className="label">Message</label>
					<div className="control">
						<textarea className="textarea" placeholder="Textarea"></textarea>
					</div>
				</div>

				<div className="field">
					<div className="control">
						<label className="checkbox">
							<input type="checkbox" />I agree to the{" "}
							<a href="#">terms and conditions</a>
						</label>
					</div>
				</div>

				<div className="field">
					<div className="control">
						<label className="radio">
							<input type="radio" name="question" />
							Yes
						</label>
						<label className="radio">
							<input type="radio" name="question" />
							No
						</label>
					</div>
				</div>

				<div className="field is-grouped">
					<div className="control">
						<button className="button is-link">Submit</button>
					</div>
					<div className="control">
						<button className="button is-link is-light">Cancel</button>
					</div>
				</div>
			</form>
		);
	}
}

export default withRouter(FormSignupClub);
