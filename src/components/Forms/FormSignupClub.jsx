import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import UserContext from "../Auth/UserContext";
import authApiHandler from "../../api/authApiHandler";
import LocationAutoComplete from "./../LocationAutoComplete";
// import ImageWithPreview from "./ImagePreview";

import "bulma/css/bulma.css";
import "./../../styles/FormSignUpClub.css";

class FormSignupClub extends Component {
	static contextType = UserContext;

	state = {
		role: "Club",
		email: "",
		password: "",
		email: "",
		clubName: "",
		address: "",
		phoneNumber: "",
		image: "",
		tmpImage: "",
		website: "",
		foundedYear: "",
		subscriptionFee: "",
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
		return (
			<div className="FormSignupClub">
				<form onChange={this.handleChange} onSubmit={this.handleSubmit}>
					<div className="field">
						<label className="label">Email</label>
						<div className="control has-icons-left">
							<input
								className="input"
								type="email"
								name="email"
								value="toto@foo.bar"
							/>
							<span className="icon is-small is-left">
								<i className="fa fa-at"></i>
							</span>
						</div>
					</div>
					<div className="field">
						<label htmlFor="password" className="label">
							Choisir un mot de passe
						</label>
						<div className="control has-icons-left">
							<input
								className="input"
								type="password"
								placeholder="Entrez un mot de passe"
								name="password"
							/>
							<span className="icon is-small is-left">
								<i className="fa fa-lock"></i>
							</span>
						</div>
					</div>
					<div className="field">
						<label className="label">Nom du club</label>
						<div className="control">
							<input
								className="input"
								type="text"
								name="clubName"
								defaultValue="Les TATAZ"
							/>
						</div>
					</div>

					<div className="field">
						<label className="label">Adresse administrative</label>
						<div className="control has-icons-left">
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
						<label className="label">Téléphone</label>
						<div className="control has-icons-left">
							<input
								className="input"
								type="tel"
								name="phoneNumber"
								pattern="[0-9]{10}"
								minLength="10"
								maxLength="10"
								defaultValue="0123456789"
							/>
							<span className="icon is-small is-left">
								<i className="fa fa-phone"></i>
							</span>
						</div>
					</div>

					<div className="field">
						<label className="label">Site web du club</label>
						<div className="control">
							<input
								className="input"
								type="text"
								name="website"
								defaultValue="tataz.com"
							/>
						</div>
					</div>
					<div className="field">
						<label className="label">Année de création</label>
						<div className="control">
							<input
								className="input"
								type="text"
								name="foundedYear"
								defaultValue="tataz.com"
							/>
						</div>
					</div>
					<div className="field">
						<label className="label">Frais d'adhésion</label>
						<div className="control">
							<input
								className="input"
								type="text"
								name="subscriptionFee"
								defaultValue="tataz.com"
							/>
						</div>
					</div>

					<div className="field">
						<label className="label">Quelques précisions sur le club</label>
						<div className="control">
							<textarea
								className="textarea"
								name="description"
								placeholder="Objectifs, ambitions, besoins, politique de recrutement... "
								value="Faire la fête après les matchs !"
							></textarea>
						</div>
					</div>

						<label className="label">Télécharger une image</label>
					<div class="file has-name">
						<label class="file-label">
							<input class="file-input" type="file" name="resume" />
							<span class="file-cta">
								<span class="file-icon">
									<i class="fas fa-upload"></i>
								</span>
								<span class="file-label">Choose a file…</span>
							</span>
							<span class="file-name">{this.state.image}</span>
						</label>
					</div>

					<div className="field" id="btn-signup">
						<div className="control">
							<button className="button is-link">C'est fait !</button>
						</div>
					</div>
				</form>

				<div className="form-section-bottom">
					<p>Vous avez déjà un compte ? </p>
					<button class="button is-light">
						<Link className="link" to="/signin">
							Connectez-vous !
						</Link>
					</button>
				</div>
			</div>
		);
	}
}

export default withRouter(FormSignupClub);
