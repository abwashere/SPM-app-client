import React from "react";
import sportApiHandler from "./../api/sportApiHandler";

class Filter extends React.Component {
  state = {
    onDisplay: null,
    sportsList: null,
    practice: null,
    sport: null,
    day: null,
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

  displayFilters = () => {
    this.state.onDisplay
      ? this.setState({ onDisplay: false })
      : this.setState({ onDisplay: true });
  };

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;
    this.setState({ [key]: value });
  };

  deleteFilters = (event) => {
    console.log("effacer les filtres");
    this.setState({
      practice: null,
      sport: null,
      day: null,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.displayFilters();
    let practices = this.state.practice;
    let sports = this.state.sport;
    let days = this.state.day;
    let selection = [];
    if (practices) selection.practice = practices;
    if (sports) selection.sport = sports;
    if (days) selection.day = days;
    console.log(typeof selection.pratice);

    this.props.callback(selection);
  };

  render() {
    if (!this.state.sportsList) return <p>is loading...</p>;
    else
      return (
        <div className="Filter flex">
          {!this.state.onDisplay && (
            <button
              onClick={this.displayFilters}
              id="btn-filter-open"
              className="button"
              aria-haspopup="true"
              aria-controls="dropdown-menu"
            >
              <span>Filtrer</span>
              <span className="icon is-small">
                <i className="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          )}

          {this.state.onDisplay && (
            <form
              className="filters"
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
            >
              <div className="practice control">
                <label className="radio" htmlFor="filter-competition">
                  <input
                    type="radio"
                    name="practice"
                    id="filter-competition"
                    value="compétition"
                  />
                  Compétition
                </label>
                <label className="radio" htmlFor="filter-loisir">
                  <input
                    type="radio"
                    name="practice"
                    id="filter-loisir"
                    value="loisir"
                  />
                  Loisir
                </label>
                {/* FIXME: */}
                {/* <label className="radio" htmlFor="filter-all">
									<input
										type="radio"
										name="practice"
										id="filter-all"
										value={["compétion", "loisir"]}
									/>
									Les 2
								</label> */}
              </div>
              <div className="control">
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
              </div>
              <div className="control">
                <div className="select">
                  <select name="day">
                    <option>Jour d'entrainement</option>
                    <option>lundi</option>
                    <option>mardi</option>
                    <option>mercredi</option>
                    <option>jeudi</option>
                    <option>vendredi</option>
                    <option>samedi</option>
                    <option>dimanche</option>
                  </select>
                </div>
              </div>
              <div className="control flex">
                <button
                  id="btn-filter-apply"
                  className="button is-small is-dark"
                >
                  Appliquer les filtres
                </button>
                <button
                  type="button"
                  className="button is-small is-dark delete-filters"
                  onClick={this.deleteFilters}
                >
                  Effacer les filtres
                </button>
              </div>
            </form>
          )}
        </div>
      );
  }
}

export default Filter;
