import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import eventApiHandler from "../../api/eventApiHandler";
import sportApiHandler from "../../api/sportApiHandler";
import LocationAutoComplete from "./../LocationAutoComplete";
import buildFormData from "./../../utils/buildFormData";

import "bulma/css/bulma.css";
import "./../../styles/FormSignUp.css";

class FormCreateEditEvent extends Component {
  state = {
    // title: "Session d'initiation",
    // time: "18h00",
    // description: "Venez découvrir le futsal !",
    sportsList: [],
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

    let formData = new FormData();
    buildFormData(formData, this.state);

    if (this.props.match.params.mode === "create") {
      eventApiHandler
        .createEvent(formData)
        .then((data) => {
          this.props.history.push(`/event/${data._id}`);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      eventApiHandler
        .updateEvent(this.state._id, formData)
        .then((data) => {
          this.props.history.push(`/event/${data._id}`);
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

  formatDate = (date) => {
    date.slice(0, 10);
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

    if (this.props.match.params.mode === "edit") {
      eventApiHandler.getOneEvent(this.props.match.params.id).then((apiRes) => {
        this.setState(apiRes);
      });
    }
  }

  render() {
    let today = Date.now();

    return (
      <div className="FormSignup other">
        <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">Nom de l'évènement</label>
            <div className="control">
              <input
                className="input"
                type="title"
                name="title"
                defaultValue={this.state.title}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Date</label>
            <div className="control has-icons-left">
              <input
                className="input"
                type="date"
                data-start-date={today}
                name="date"
                defaultValue={this.state.date}
                required
              />
              <span className="icon is-small is-left">
                <i className="fa fa-calendar-alt"></i>
              </span>
            </div>
          </div>

          <div className="field">
            <label className="label">Horaire</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="time"
                defaultValue={this.state.time}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Lieu de l'évènement</label>
            <div className="control has-icons-left">
              <LocationAutoComplete
                onSelect={this.handlePlace}
                searchIndication="Renseignez l'adresse du club"
                // formattedAddress={this.state.formattedAddress}
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
                {this.state.sport && (
                  <select
                    name="sport"
                    value={this.state.sport._id}
                    onChange={this.handleChange}
                    required
                  >
                    <option>Sport</option>
                    {this.state.sportsList.map((sport) => (
                      <option key={sport._id} value={sport._id}>
                        {sport.sportName}
                      </option>
                    ))}
                  </select>
                )}
                {!this.state.sport && (
                  <select name="sport" required>
                    <option>Sport</option>
                    {this.state.sportsList.map((sport) => (
                      <option key={sport._id} value={sport._id}>
                        {sport.sportName}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="icon is-small is-left">
                <i className="fas fa-football-ball"></i>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">Détails</label>
            <div className="control">
              <textarea
                className="textarea"
                name="description"
                placeholder="Dites-nous en plus sur l'évènement, le public attendu, la durée..."
                defaultValue={this.state.description}
              ></textarea>
            </div>
          </div>

          <label className="label">Image</label>
          <div className="file has-name">
            <label className="file-label">
              <input className="file-input" type="file" name="image" />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">Choisir un fichier…</span>
              </span>
            </label>
          </div>
          <div>
            {this.state.file && !this.state.image && (
              <img className="preview" src={this.state.file} alt="preview" />
            )}
            {!this.state.file && this.state.image && (
              <img className="preview" src={this.state.image} alt="preview" />
            )}
            {this.state.file && this.state.image && (
              <img className="preview" src={this.state.file} alt="preview" />
            )}
          </div>

          <div className="field btn-signup">
            <div className="control">
              {this.props.match.params.mode === "create" && (
                <button className="button is-link">Créer</button>
              )}
              {this.props.match.params.mode === "edit" && (
                <button className="button is-link">Mettre à jour</button>
              )}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(FormCreateEditEvent);
