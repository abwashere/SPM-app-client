import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import UserContext from "../Auth/UserContext";
import eventApiHandler from "../../api/eventApiHandler";
import sportApiHandler from "../../api/sportApiHandler";
import LocationAutoComplete from "./../LocationAutoComplete";
// import ImageWithPreview from "./ImagePreview";

import "bulma/css/bulma.css";
import "./../../styles/FormSignUp.css";

class FormCreateEditTeam extends Component {
  static contextType = UserContext;

  state = {
    teamName: "",
    coachName: "",
    address: {},
    minAge: "",
    maxAge: "",
    year: "",
    description: "",
    sportId: "",
    division: "",
    practice: "",
    trainings: [],
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
  };

  handleSubmit = (event) => {
    event.preventDefault();

    teamApiHandler
      .createTeam(this.state)
      .then((data) => {
        this.context.setUser(data);
        this.props.history.push("/"); //renvoyer sur la page de l'événement créé
      })
      .catch((error) => {
        console.log(error);
      });
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

  render() {
    let today = Date.now();
    return (
      <div className="FormSignup">
        <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">Nom de l'évènement</label>
            <div className="control">
              <input
                className="input"
                type="title"
                name="title"
                value="Session d'initiation"
                required
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="password" className="label">
              Date et heure
            </label>
            <div className="control has-icons-left">
              <input
                className="input"
                type="date"
                data-start-date={today}
                name="date"
                required
              />
              <span className="icon is-small is-left">
                <i className="fa fa-calendar-alt"></i>
              </span>
            </div>
          </div>

          <div className="field">
            <label className="label">Lieu de l'évènement</label>
            <div className="control has-icons-left">
              <LocationAutoComplete
                onSelect={this.handlePlace}
                searchIndication="Renseignez l'adresse du club"
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
            <label className="label">Sport</label>
            <div className="control has-icons-left">
              <div className="select">
                <select name="sportId">
                  <option>Sport</option>
                  {this.state.sportsList.map((sport) => (
                    <option key={sport._id} value={sport._id}>
                      {sport.sportName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="icon is-small is-left">
                <i className="fas fa-running"></i>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">Détails</label>
            <div className="control">
              <textarea
                className="textarea"
                name="description"
                placeholder="Dis-nous en plus sur l'évènement, le public attendu, la durée..."
                value="Venez découvrir le futsal !"
              ></textarea>
            </div>
          </div>

          <label className="label">Image</label>
          <div className="file has-name">
            <label className="file-label">
              <input className="file-input" type="file" name="resume" />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">Choisir un fichier…</span>
              </span>
              <span className="file-name">{this.state.image}</span>
            </label>
          </div>

          <div className="field btn-signup">
            <div className="control">
              <button className="button is-link">Créer</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(FormSignupPlayer);
