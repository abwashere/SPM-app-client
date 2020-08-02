import React, { Component } from "react";

class FormTraining extends Component {
  state = {
    day: "lundi",
    time: "20h00",
    duration: "1h30",
  };

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;

    this.setState({ [key]: value }, () => {
      this.props.changeField(this.state);
    });
  };

  render() {
    return (
      <div className="field-body">
        <div className="field">
          <label className="label">Jour</label>
          <div className="control">
            <div className="select">
              <select name="day" onChange={this.handleChange}>
                <option>Choisir...</option>
                <option value="lundi">Lundi</option>
                <option value="mardi">Mardi</option>
                <option value="mercredi">Mercredi</option>
                <option value="jeudi">Jeudi</option>
                <option value="vendredi">Vendredi</option>
                <option value="samedi">Samedi</option>
                <option value="dimanche">Dimanche</option>
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
              value={this.state.time}
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
              value={this.state.duration}
              onChange={this.handleChange}
              required
            />
          </div>
        </div>
      </div>
    );
  }
}

export default FormTraining;
