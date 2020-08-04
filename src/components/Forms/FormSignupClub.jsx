import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import UserContext from "../Auth/UserContext";
import authApiHandler from "../../api/authApiHandler";
import LocationAutoComplete from "./../LocationAutoComplete";
import buildFormData from "../../utils/buildFormData";
import validateEmail from "../../utils/validateEmail";

import "bulma/css/bulma.css";
import "./../../styles/FormSignUp.css";

class FormSignupClub extends Component {
  static contextType = UserContext;
  state = {
    role: "Club",
    email: "yo@mail.com",
    password: "1234",
    clubName: "Les Tataz",
    phoneNumber: "0123456789",
    website: "https://www.tataz.com",
    year: "2018",
    subscriptionFee: "150€ par an pour les adultes, 80€ pour les juniors",
    description: "Faire la fête après les matchs !",
    file: null,
  };

  handleChange = (event) => {
    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;
    const key = event.target.name;

    if (event.target.type === "file") {
      this.setState({
        file: URL.createObjectURL(event.target.files[0]),
        [key]: value,
      });
    } else {
      this.setState({ [key]: value });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (!validateEmail(this.state.email)) {
      console.log("email is not valid");
    } else {
      let fd = new FormData();
      buildFormData(fd, this.state);

      authApiHandler
        .signupClub(fd)
        .then((data) => {
          console.log(data);
          this.context.setUser(data);
          this.props.history.push("/account");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  handlePlace = (place) => {
    // This handle is passed as a callback to the autocomplete component.
    console.log(place);
    this.setState({
      location: {
        type: place.geometry.type,
        coordinates: place.geometry.coordinates,
        formattedAddress: place.place_name,
      },
    });
  };

  render() {
    return (
      <div className="FormSignup">
        <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left">
              <input
                className="input"
                type="email"
                name="email"
                value={this.state.email}
                placeholder="Entrez l'adresse mail de l'association"
                required
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
                value={this.state.password}
                name="password"
                required
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
                value={this.state.clubName}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Adresse administrative</label>
            <div className="control has-icons-left">
              <LocationAutoComplete
                onSelect={this.handlePlace}
                placeholderContent="Renseignez l'adresse du club"
              />
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
                value={this.state.phoneNumber}
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
                value={this.state.website}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Vidéo de présentation de votre club</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="videoURL"
                value={this.state.videoURL}
                placeholder="Lien de la vidéo, si vous en avez une"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Année de création</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="year"
                value={this.state.year}
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
                value={this.state.subscriptionFee}
                placeholder="Précisez les modalités d'inscription"
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
                value={this.state.description}
              ></textarea>
            </div>
          </div>

          <label className="label">Télécharger une image</label>
          <div className="file has-name">
            <label className="file-label">
              <input className="file-input" type="file" name="image" />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">Choisir un fichier…</span>
              </span>
              <div>
                {this.state.file && <img src={this.state.file} alt="preview" />}
              </div>
            </label>
          </div>

          <div className="field btn-signup">
            <div className="control">
              <button className="button is-link">C'est fait !</button>
            </div>
          </div>
        </form>

        <div className="form-section-bottom">
          <p>Vous avez déjà un compte ? </p>
          <button className="button is-light">
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
