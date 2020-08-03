import React, { Component } from "react";

class FormTraining extends Component {
  state = {
    day: "",
    time: "",
    duration: "",
  };

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;
    this.props.handleTrainingChange(this.props.number, key, value);
    // this.setState({ [key]: value, number: this.props.number }, () => {
    //   this.props.changeField(this.state);
    // });
  };

  handleClick = (event) => {
    console.log(this.props.number);
    this.props.removeTraining(this.props.number);
  };

  updateState = () => {
    this.setState({
      day: this.props.day,
      time: this.props.time,
      duration: this.props.duration,
    });
  };

  render() {
    console.log("===============FORM TRAINING STATE", this.state);
    console.log("formtraining props", this.props);
    return (
      <div className="field-body">
        <div className="field">
          <label className="label">Jour</label>
          <div className="control">
            <div className="select">
              <select name="day" onChange={this.handleChange}>
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
                  <option
                    key={day}
                    selected={this.props.day === day}
                    value={day}
                  >
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

        <div onClick={this.handleClick}>
          Supprimer <i className="fas fa-trash-alt"></i>
        </div>
      </div>
    );
  }
}

export default FormTraining;
