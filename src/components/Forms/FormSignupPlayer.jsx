import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import UserContext from "../Auth/UserContext";
import authApiHandler from "../../api/authApiHandler";
import sportApiHandler from "../../api/sportApiHandler";
import LocationAutoComplete from "./../LocationAutoComplete";
import buildFormData from "../../utils/buildFormData";
import validateEmail from "../../utils/validateEmail";

import "bulma/css/bulma.css";
import "./../../styles/FormSignUp.css";

class FormSignupPlayer extends Component {
  static contextType = UserContext;

  state = {
    // role: "Player",
    // email: "tata@foo.bar",
    // password: "1234",
    // firstName: "Jane",
    // lastName: "Doe",
    // description: "Faire la fête après les matches !",
    message: [],
    sportsList: [],
    practice: [
      {
        sport: "",
        level: "",
      },
    ],
    file: null,
  };

  handleChange = (event) => {
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
    console.log("state before submit", this.state);

    if (!validateEmail(this.state.email)) {
      this.setState({
        message: { invalidMail: "Merci de renseigner un email valide." },
      });
    } else {
      let fd = new FormData();
      buildFormData(fd, this.state);

      authApiHandler
        .signupPlayer(fd)
        .then((data) => {
          console.log(data);
          this.context.setUser(data);
          this.props.history.push("/account");
        })
        .catch((error) => {
          this.setState({ message: error });
        });
    }
  };

  componentDidMount() {
    sportApiHandler
      .getSports()
      .then((apiRes) => {
        this.setState({ sportsList: apiRes });
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
      <div className="FormSignup Player">
        <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left">
              <input
                className="input"
                type="email"
                name="email"
                defaultValue={this.state.email}
                placeholder="Renseigne ton adresse mail"
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
                defaultValue={this.state.password}
                name="password"
                required
              />
              <span className="icon is-small is-left">
                <i className="fa fa-lock"></i>
              </span>
            </div>
          </div>

          <div className="field">
            <label className="label">Prénom</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="firstName"
                defaultValue={this.state.firstName}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Nom de famille</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="lastName"
                defaultValue={this.state.lastName}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Ville</label>
            <div className="control has-icons-left">
              <LocationAutoComplete
                onSelect={this.handlePlace}
                placeholderContent="Précise la ville où tu résides"
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
            <label className="label">
              Le sport que tu pratiques ou que tu souhaites pratiquer
            </label>
            <div className="field-body">
              <div className="field">
                <div className="control has-icons-left">
                  <div className="select">
                    <select name="sport">
                      <option>Sport</option>
                      {this.state.sportsList.map((sport) => (
                        <option key={sport._id} value={sport._id}>
                          {sport.sportName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="icon is-small is-left">
                    <i className="fas fa-football-ball"></i>
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="control has-icons-left">
                  <div className="select">
                    <select name="level">
                      <option>Niveau</option>
                      <option value="débutante">Débutante</option>
                      <option value="intermédiaire">Intermédiaire</option>
                      <option value="expérimentée">Expérimentée</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">Dis-nous en plus...</label>
            <div className="control">
              <textarea
                className="textarea"
                name="description"
                placeholder="Partage ta pratique du sport et ce que tu recherches en t'inscrivant."
                defaultValue={this.state.description}
              ></textarea>
            </div>
          </div>

          <label className="label">Ajoute ta photo de profil</label>
          <div className="file has-name">
            <label className="file-label">
              <input className="file-input" type="file" name="picture" />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">Choisir un fichier…</span>
              </span>
            </label>
            <div></div>
          </div>
          {this.state.file && (
            <img className="preview" src={this.state.file} alt="preview" />
          )}
          {this.state.message.existingMail && (
            <div className="error-message">
              {this.state.message.existingMail}
            </div>
          )}
          {this.state.message.invalidMail && (
            <div className="error-message">
              {this.state.message.invalidMail}
            </div>
          )}

          <div className="field btn-signup">
            <div className="control">
              <button className="button is-link">C'est fait !</button>
            </div>
          </div>
        </form>

        <div className="form-section-bottom">
          <p>Tu as déjà un compte ? </p>
          <button className="button is-light">
            <Link className="link" to="/signin">
              Connecte-toi !
            </Link>
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(FormSignupPlayer);
