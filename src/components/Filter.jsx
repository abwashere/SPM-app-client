import React from "react";
import sportApiHandler from "./../api/sportApiHandler";

class Filter extends React.Component {
  state = {
    onDisplay: null,
    sportsList: null,
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
    this.props.handleFilterChange(key, value);
  };

  deleteFilters = (event) => {
    this.props.handleDeleteFilters();
    this.displayFilters();
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.displayFilters();
    this.props.handleFilterSubmit();
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
							ref="form"
						>
							<div className="practice control">
								<label className="radio" htmlFor="filter-competition">
									<input
										type="radio"
										name="practice"
										id="filter-competition"
										value="compétition"
										// checked={this.props.practice === "compétition"}
									/>
									{"  "}
									Compétition
								</label>
								<label className="radio" htmlFor="filter-loisir">
									<input
										type="radio"
										name="practice"
										id="filter-loisir"
										value="loisir"
										// checked={this.props.practice === "loisir"}
									/>
									{"  "}
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
									<select name="sport" defaultValue={this.props.sport}>
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
									<select name="day" defaultValue={this.props.day}>
										<option>Jour d'entraînement</option>
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
							<div className="control flex">
								<button
									id="btn-filter-apply"
									className="button is-small is-success is-outlined"
								>
									Appliquer les filtres
								</button>
								<button
									type="button"
									className="button is-small is-outlined delete-filters"
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
