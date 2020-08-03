import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import UserContext from "../Auth/UserContext";
import teamApiHandler from "../../api/teamApiHandler";
import sportApiHandler from "../../api/sportApiHandler";
import LocationAutoComplete from "./../LocationAutoComplete";
import FormTraining from "./FormTraining";
import buildFormData from "./../../utils/buildFormData";

import "bulma/css/bulma.css";
import "./../../styles/FormSignUp.css";
// import { rhumbDistance } from "@turf/turf";

class FormCreateEditTeam extends Component {
  // static contextType = UserContext;

  state = {
    teamName: "Les braqueuses",
    coachName: "John Doe",
    minAge: "18",
    year: "1987",
    description: "On est là pour gagner !",
    division: "Régionales 2",
    trainings: [
      {
        day: "",
        time: "",
        duration: "",
      },
    ],
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

    console.log("===================STATE", this.state);
    let formData = new FormData();
    buildFormData(formData, this.state);

    teamApiHandler
      .createTeam(formData)
      .then((data) => {
        // this.context.setUser(data);
        console.log("===================data added", data);
        this.props.history.push(`/team/${data._id}`); //renvoyer sur la page de l'événement créé
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleTraining = (training) => {
    console.log(training);
    const newTraining = {
      day: training.day,
      time: training.time,
      duration: training.duration,
    };
    const index = training.number;
    const updatedTrainings = [...this.state.trainings];
    updatedTrainings.splice(index, 1, newTraining);

    this.setState({
      trainings: updatedTrainings,
    });
  };

  handleTrainingChange = (index, key, value) => {
    let updatedTrainings = this.state.trainings;
    updatedTrainings[index][key] = value;
    this.setState({ trainings: updatedTrainings });
  };

  removeTraining = (index) => {
    console.log("===============", this.state.trainings);
    const updatedTrainings = [...this.state.trainings];
    console.log("===============", updatedTrainings);
    console.log(index);
    updatedTrainings.splice(index, 1);
    console.log("===============", updatedTrainings);

    this.setState({
      trainings: updatedTrainings,
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

  handleClick = () => {
    const updatedTrainings = [...this.state.trainings];
    updatedTrainings.push({
      day: "",
      time: "",
      duration: "",
    });
    this.setState({ trainings: updatedTrainings });
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
      teamApiHandler.getOneTeam(this.props.match.params.id).then((apiRes) => {
        console.log(apiRes);
        // for (let i = 0; i < apiRes.length; i++) {
        //   let key = apiRes[i];
        //   let value = apiRes[i];
        //   this.setState({ [key]: value });
        // }
        this.setState({
          teamName: apiRes.teamName,
          time: apiRes.time,
          coachName: apiRes.coachName,
          minAge: apiRes.minAge,
          maxAge: apiRes.maxAge,
          address: apiRes.address,
          location: {
            type: apiRes.type,
            coordinates: apiRes.coordinates,
            formattedAddress: apiRes.formattedAddress,
          },
          trainings: [
            {
              day: apiRes.trainings[0].day,
              time: apiRes.trainings[0].time,
              duration: apiRes.trainings[0].duration,
            },
            {
              day: apiRes.trainings[1].day,
              time: apiRes.trainings[1].time,
              duration: apiRes.trainings[1].duration,
            },
          ],
          sport: apiRes.sport.sportName,
          description: apiRes.description,
          image: apiRes.image,
          practice: apiRes.practice,
        });
      });
    }
  }

  render() {
    let trainings = [];

    for (let i = 0; i < this.state.trainings.length; i++) {
      console.log("==============training numéro", i);
      trainings.push(
        <FormTraining
          key={i}
          number={i}
          changeField={this.handleTraining}
          removeTraining={this.removeTraining}
          day={this.state.trainings[i].day}
          time={this.state.trainings[i].time}
          duration={this.state.trainings[i].duration}
          handleTrainingChange={this.handleTrainingChange}
        />
      );
    }

    return (
      <div className="FormSignup other">
        <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">Nom de l'équipe</label>
            <div className="control">
              <input
                className="input"
                type="title"
                name="title"
                value={this.state.teamName}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Sport</label>
            <div className="control has-icons-left">
              <div className="select">
                <select name="sport" required>
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
            <label className="label">Créée en</label>
            <div className="control">
              <input
                className="input"
                type="number"
                name="year"
                value={this.state.year}
                placeholder="Année de création de l'équipe"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Nom des entraîneur⸱se⸱s</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="coachName"
                value={this.state.coachName}
                required
              />
            </div>
          </div>

          <div className="field-body">
            <div className="field">
              <label className="label">Age minimal</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  name="minAge"
                  value={this.state.minAge}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Age maximal</label>
              <div className="control">
                <input className="input" type="number" name="maxAge" />
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">Type de pratique</label>
            <div className="control">
              <div className="select">
                <select name="practice" required>
                  <option>Loisir ou compétition ?</option>
                  <option value="compétition">Compétition</option>
                  <option value="loisir">Loisir</option>
                </select>
              </div>
            </div>
          </div>

          {this.state.practice === "compétition" && (
            <div className="field">
              <label className="label">Division</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="division"
                  value={this.state.division}
                />
              </div>
            </div>
          )}
          <h3 class="inter-title">Entraînements</h3>
          <div className="field">
            <label className="label">Adresse</label>
            <div className="control has-icons-left">
              <LocationAutoComplete
                onSelect={this.handlePlace}
                searchIndication="Renseignez l'adresse du lieu d'entraînement"
              />
              <span className="icon is-small is-left">
                <i className="fa fa-map-marker"></i>
              </span>
              <span className="icon is-small is-right">
                {/* <i className="fas fa-check"></i> */}
              </span>
            </div>
          </div>

          <div className="addTraining">
            {trainings}
            <p onClick={this.handleClick}>
              Ajouter un créneau d'entraînement{" "}
              <i className="far fa-plus-square"></i>
            </p>
          </div>

          <div className="field">
            <label className="label">Plus d'infos sur l'équipe</label>
            <div className="control">
              <textarea
                className="textarea"
                name="description"
                placeholder="Dites-nous en plus sur l'équipe, l'état d'esprit, le niveau attendu..."
                value={this.state.description}
              ></textarea>
            </div>
          </div>

          <label className="label">Image (photo d'équipe, logo...)</label>
          <div className="file has-name">
            <label className="file-label">
              <input className="file-input" type="file" name="image" />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">Importer un fichier…</span>
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

export default withRouter(FormCreateEditTeam);
