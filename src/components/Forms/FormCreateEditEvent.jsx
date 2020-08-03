import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import UserContext from "../Auth/UserContext";
import eventApiHandler from "../../api/eventApiHandler";
import sportApiHandler from "../../api/sportApiHandler";
import LocationAutoComplete from "./../LocationAutoComplete";
// import ImageWithPreview from "./ImagePreview";

import "bulma/css/bulma.css";
import "./../../styles/FormSignUp.css";

class FormCreateEditEvent extends Component {
  // static contextType = UserContext;

  state = {
    title: "Session d'initiation",
    time: "18h00",
    description: "Venez découvrir le futsal !",
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

    function buildFormData(formData, data, parentKey) {
      if (
        data &&
        typeof data === "object" &&
        !(data instanceof Date) &&
        !(data instanceof File)
      ) {
        Object.keys(data).forEach((key) => {
          buildFormData(
            formData,
            data[key],
            parentKey ? `${parentKey}[${key}]` : key
          );
        });
      } else {
        const value = data == null ? "" : data;

        formData.append(parentKey, value);
      }
    }

    console.log("===================STATE", this.state);
    let formData = new FormData();
    buildFormData(formData, this.state);

    eventApiHandler
      .createEvent(formData)
      .then((data) => {
        // this.context.setUser(data);
        console.log("===================data added", data);
        this.props.history.push("/account");
      })
      .catch((error) => {
        console.log(error);
      });
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
        console.log(apiRes);

        this.setState({
          title: apiRes.title,
          date: this.formatDate(apiRes.date),
          time: apiRes.time,
          address: apiRes.address,
          location: {
            type: apiRes.type,
            coordinates: apiRes.coordinates,
            formattedAddress: apiRes.formattedAddress,
          },
          sport: apiRes.sport.sportName,
          description: apiRes.description,
          image: apiRes.image,
        });
      });
    }
  }

  render() {
    let today = Date.now();
    console.log(this.state);

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
                value={this.state.title}
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
                value={this.state.date}
                required
              />
              <span className="icon is-small is-left">
                <i className="fa fa-calendar-alt"></i>
              </span>
            </div>
          </div>

          <div className="field">
            <label className="label">Heure</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="time"
                value={this.state.time}
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
                value={this.state.description}
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
              <div>
                {this.state.file && !this.state.image && (
                  <img src={this.state.file} alt="preview" />
                )}
                {!this.state.file && this.state.image && (
                  <img src={this.state.image} alt="preview" />
                )}
                {this.state.file && this.state.image && (
                  <img src={this.state.file} alt="preview" />
                )}
              </div>
            </label>
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
