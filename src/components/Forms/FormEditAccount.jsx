import React, { Component } from "react";
import UserContext from "../Auth/UserContext";
import clubApiHandler from "../../api/clubApiHandler";
import playerApiHandler from "../../api/playerApiHandler";
import sportApiHandler from "../../api/sportApiHandler";
import LocationAutoComplete from "./../LocationAutoComplete";
import buildFormData from "../../utils/buildFormData";

import "bulma/css/bulma.css";
import "./../../styles/FormSignUp.css";
import "./../../styles/Account.css";

export class FormEditAccount extends Component {
  static contextType = UserContext;
  state = {
    sportsList: [],
    file: null,
    isUpdated: true,
    message: {},
  };
  componentDidMount() {
    let user = this.context.user;

    sportApiHandler
      .getSports()
      .then((apiRes) => {
        this.setState({ sportsList: apiRes });
      })
      .then(() => {
        this.setState({
          practice: [
            {
              sport: user.practice[0].sport,
              level: user.practice[0].level,
            },
          ],
        });
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("user edit ", this.context.user);
  }

  handleUpdate = () => {
    this.state.isUpdated
      ? this.setState({ isUpdated: false })
      : this.setState({ isUpdated: true });
  };

  handleChange = (event) => {
    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;
    const key = event.target.name;
    console.log(event.target.type);

    if (event.target.type === "file") {
      if (this.context.user.role === "Player") {
        this.setState({
          file: URL.createObjectURL(event.target.files[0]),
          picture: event.target.files[0],
        });
      } else {
        this.setState({
          file: URL.createObjectURL(event.target.files[0]),
          image: event.target.files[0],
        });
      }
    } else if (event.target.type === "select-one") {
      var stateCopy = Object.assign({}, this.state);
      stateCopy.practice[0][key] = value;
      this.setState(stateCopy);
    } else {
      this.setState({ [key]: value });
    }
  };

  handlePlace = (place) => {
    console.log(place);
    this.setState({
      location: {
        type: place.geometry.type,
        coordinates: place.geometry.coordinates,
        formattedAddress: place.place_name,
      },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let user = this.context.user;
    // console.log("le state du form edit AVANT UPDATE", this.state);

    let fd;
    // if (this.state.file) {
    fd = new FormData();
    buildFormData(fd, this.state);
    // } else {
    //   fd = this.state;
    // }

    if (user.role === "Player")
      playerApiHandler
        .updatePlayer(user._id, fd)
        .then((data) => {
          // console.log("UPDATED INFOS", data);
          this.context.setUser(data);
          this.setState({
            isUpdated: true,
            message: { success: "Les données ont bien été mises à jour." },
          });
        })
        .catch((error) => {
          this.setState({
            message: {
              failure:
                "Désolé, nous n'avons pas réussi à mettre vos données à jour.",
            },
          });
        });
    if (user.role === "Club")
      clubApiHandler
        .updateClub(user._id, fd)
        .then((data) => {
          // console.log("UPDATED INFOS", data);
          this.context.setUser(data);
          this.setState({
            isUpdated: true,
            message: { success: "Les données ont bien été mises à jour." },
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            message: {
              failure:
                "Désolé, nous n'avons pas réussi à mettre vos données à jour.",
            },
          });
        });
  };

  render() {
    let user = this.context.user;
    let role = this.context.user.role;
    return (
      <div className="FormEditAccount">
        <h2 className="subtitle">Mettre à jour mes infos personnelles</h2>
        <form
          className="form flex"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >
          {/* ----------------------------------PHOTO PART */}
          <div className="photo-edit">
            <label className="label">Image de profil</label>
            <div
              className="profile-logo-container round-box box-shadowed"
              style={{
                backgroundImage: `url(${
                  role === "Club" ? user.image : user.picture
                })`,
              }}
            ></div>

            <div className="file has-name">
              <label className="file-label">
                <input
                  className="file-input"
                  type="file"
                  name="image"
                  onClick={this.handleUpdate}
                />
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="fas fa-upload"></i>
                  </span>
                  <span className="file-label">Nouvelle image</span>
                </span>
              </label>
            </div>
            {!this.state.isUpdated && (
              <div className="preview">
                {this.state.file && <img src={this.state.file} alt="preview" />}
              </div>
            )}
          </div>

          {/* ----------------------------------INFOS PART */}
          {/* commun--- */}
          <div className="infos-edit">
            <div className="field">
              <label className="label">Email</label>
              <div className="control has-icons-left">
                <p className="email">{user.email}</p>
                {/* <input
									className="input"
									type="email"
									name="email"
									defaultValue={user.email}
								/> */}
                <span className="icon is-small is-left">
                  {" "}
                  <i className="fa fa-at"></i>
                </span>
              </div>
            </div>

            {/* ----------- */}

            <div className="field">
              {user.role === "Club" && <label className="label">Adresse</label>}
              {user.role === "Player" && <label className="label">Ville</label>}
              <div className="control has-icons-left">
                {user.role === "Club" && (
                  <LocationAutoComplete
                    onSelect={this.handlePlace}
                    placeholderContent="Indiquez ici un changement d'adresse"
                  />
                )}
                {user.role === "Player" && (
                  <LocationAutoComplete
                    onSelect={this.handlePlace}
                    placeholderContent="Modifie ta ville ici"
                  />
                )}
                <span className="icon is-small is-left">
                  <i className="fa fa-map-marker"></i>
                </span>
              </div>
            </div>
            {/* ----------- */}

            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <textarea
                  className="textarea"
                  name="description"
                  defaultValue={user.description}
                ></textarea>
              </div>
            </div>

            {/* ---club specific----------------------------------------- */}
            {user.role === "Club" && (
              <React.Fragment>
                <div className="field">
                  <label className="label">Nom du club</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="clubName"
                      defaultValue={user.clubName}
                    />
                  </div>
                </div>
                {/* ----------- */}

                <div className="field">
                  <label className="label">Site web du club</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="website"
                      defaultValue={user.website}
                    />
                  </div>
                </div>
                {/* ----------- */}
                <div className="field">
                  <label className="label">Téléphone</label>
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      type="tel"
                      name="phoneNumber"
                      minLength="10"
                      maxLength="10"
                      defaultValue={user.phoneNumber}
                    />
                    <span className="icon is-small is-left">
                      <i className="fa fa-phone"></i>
                    </span>
                  </div>
                </div>
                {/* ----------- */}

                <div className="field">
                  <label className="label">Vidéo de présentation</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="videoURL"
                      defaultValue={user.videoURL}
                    />
                  </div>
                </div>
                {/* ----------- */}

                <div className="field">
                  <label className="label">Frais d'adhésion</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="subscriptionFee"
                      defaultValue={user.subscriptionFee}
                    />
                  </div>
                </div>
                {/* ----------- */}

                <div className="field">
                  <label className="label">Année de création</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="year"
                      defaultValue={user.year}
                    />
                  </div>
                </div>
              </React.Fragment>
            )}
            {/* ---player specific ----------------------------------- */}
            {user.role === "Player" && (
              <React.Fragment>
                <div className="field">
                  <label className="label">Prénom</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="firstName"
                      defaultValue={user.firstName}
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
                      defaultValue={user.lastName}
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Ton sport</label>

                  {/* MAPPING DE TOUS LES SPORTS DE PLAYER */}

                  <div className="field-body">
                    <div className="field">
                      <div className="control has-icons-left">
                        <div className="select">
                          {user.practice &&
                            user.practice.map((practice) => (
                              <select
                                key={practice.sport._id}
                                name="sport"
                                // value={practice.sport._id}
                                onChange={this.handleChange}
                              >
                                <option>Sport</option>
                                {this.state.sportsList.map((sport) => (
                                  <option key={sport._id} value={sport._id}>
                                    {sport.sportName}
                                  </option>
                                ))}
                              </select>
                            ))}
                          <span className="icon is-small is-left">
                            <i className="fas fa-football-ball"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <div className="select">
                          <select name="level">
                            <option>{user.practice[0].level}</option>
                            <option value="débutante">débutante</option>
                            <option value="intermédiaire">intermédiaire</option>
                            <option value="expérimentée">expérimentée</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            )}

            {/* ----------------------------------------BUTTON */}
            {this.state.message.success && (
              <div className="success-message">
                {this.state.message.success}
              </div>
            )}
            {this.state.message.failure && (
              <div className="error-message">{this.state.message.failure}</div>
            )}
            <div className="field btn-signup">
              <div className="control">
                <button className="button is-link hvr-buzz-out">
                  Mettre à jour
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default FormEditAccount;
