import React, { Component } from "react";

import "./../../styles/FormSignUp.css";
import "bulma/css/bulma.css";

class FormTraining extends Component {
  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;
    this.props.handleTrainingChange(this.props.number, key, value);
  };

  handleClick = (event) => {
    this.props.removeTraining(this.props.number);
  };

  render() {
    return (
      <div className="field-body">
        <div className="field">
          <label className="label">Jour</label>
          <div className="control">
            <div className="select">
              <select
                name="day"
                onChange={this.handleChange}
                value={this.props.day}
              >
                <option>Choisir...</option>
                {[
                  "lundi",
                  "mardi",
                  "mercredi",
                  "jeudi",
                  "vendredi",
                  "samedi",
                  "dimanche",
                ].map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Horaire</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="time"
              value={this.props.time}
              placeholder="19h00"
              onChange={this.handleChange}
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Durée</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="duration"
              value={this.props.duration}
              placeholder="1h30"
              onChange={this.handleChange}
              required
            />
          </div>
        </div>

        <div className="delete-btn" onClick={this.handleClick}>
          <span>Supprimer </span>
          <i className="fas fa-trash-alt"></i>
        </div>
      </div>
    );
  }
}

export default FormTraining;
