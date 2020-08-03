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

    this.setState({ [key]: value, number: this.props.number }, () => {
      this.props.changeField(this.state);
    });
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
          {this.props.time && !this.state.time && (
            <div className="control">
              <input
                className="input"
                type="text"
                name="time"
                value={this.state.time}
                placeholder="19h00"
                onChange={this.handleChange}
                required
              />
            </div>
          )}
          {this.state.time && (
            <div className="control">
              <input
                className="input"
                type="text"
                name="time"
                value={this.state.time}
                placeholder="19h00"
                onChange={this.handleChange}
                required
              />
            </div>
          )}
          {!this.state.time && !this.props.time && (
            <div className="control">
              <input
                className="input"
                type="text"
                name="time"
                value={this.state.time}
                placeholder="19h00"
                onChange={this.handleChange}
                required
              />
            </div>
          )}
        </div>

        <div className="field">
          <label className="label">Durée</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="duration"
              value={this.state.duration}
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
