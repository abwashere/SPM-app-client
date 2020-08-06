import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import * as turf from "@turf/turf";

import teamApiHandler from "./../api/teamApiHandler";
import clubApiHandler from "./../api/clubApiHandler";

import Card from "./../components/Cards/Card";
import SearchBar from "./../components/SearchBar";
import Filter from "./../components/Filter";
import Map from "./../components/Map";
import { Marker, Popup } from "react-mapbox-gl";

import "./../styles/Home.css";

class Home extends Component {
	state = {
		teamsAndClubs: [],
		searchValue: "",
		closestGroups: [],
		filteredResults: [],
		practice: null,
		sport: null,
		day: null,
		selectedElem: null,
		showCard: false,
		showMap: true,
	};

	handleSearch = (place) => {
		let closestGroups = [];

		const lgtSearch = place.geometry.coordinates[0];
		const latSearch = place.geometry.coordinates[1];
		const to = turf.point([lgtSearch, latSearch]);

		this.state.teamsAndClubs.forEach((elem) => {
			let lgtElem = elem.location.coordinates[0];
			let latElem = elem.location.coordinates[1];
			let from = turf.point([lgtElem, latElem]);
			let options = { units: "kilometers" };
			let distance = turf.distance(from, to, options);
			if (distance <= 20) closestGroups.push(elem);
		});

		this.props.history.replace(`/search?place=${place.place_name}`);

		if (
			this.state.filteredResults.length === 0 ||
			(this.state.practice === "" &&
				this.state.day === "" &&
				this.state.sport === "")
		) {
			this.setState({
				searchValue: place,
				closestGroups,
				filteredResults: closestGroups,
			});
		} else {
			const search = new Promise((res, rej) => {
				this.setState({ searchValue: place, closestGroups });
			});

			search.then(() => {
				let filteredResults = this.handleFilterSubmit();
				this.setState({ filteredResults });
			});
		}
	};

	handleFilterChange = (key, value) => {
		this.setState({ [key]: value });
	};

	handleFilterSubmit = () => {
		if (this.state.day || this.state.practice || this.state.sport) {
			const results = this.state.closestGroups;

			const filteredResults = results
				.filter((group) => {
					return !group.role;
				})
				.filter((team) => {
					if (this.state.sport) {
						this.props.history.push(
							`/search?place=${this.state.searchValue.place_name}&sport=${this.state.sport}`
						);
						return team.sport._id === this.state.sport;
					} else {
						return true;
					}
				})
				.filter((team) => {
					if (this.state.practice) {
						this.props.history.push(
							`/search?place=${this.state.searchValue.place_name}&practice=${this.state.practice}`
						);
						return team.practice === this.state.practice;
					} else {
						return true;
					}
				})
				.filter((team) => {
					if (this.state.day) {
						this.props.history.push(
							`/search?place=${this.state.searchValue.place_name}&training_day=${this.state.day}`
						);
						return team.trainings.some((training) => {
							return training.day.includes(this.state.day);
						});
					} else {
						return true;
					}
				});

			this.setState({ filteredResults });
		}
	};

	handleDeleteFilters = () => {
		this.setState({
			practice: null,
			sport: null,
			day: null,
			filteredResults: this.state.closestGroups,
		});
	};

	showCard = (element) => {
		this.setState({
			selectedElem: element,
			showCard: true,
		});
	};

	handleMap = () => {
		this.setState({ showMap: !this.state.showMap });
	};

	componentDidMount() {
		Promise.all([teamApiHandler.getTeams(), clubApiHandler.getClubs()])
			.then((dbRes) => {
				this.setState({
					teamsAndClubs: [...dbRes[0], ...dbRes[1]],
				});
			})
			.catch((err) => {
				console.error(err);
			});
	}

	// handleBackground = () => {};

	render() {
		console.log("le state ======", this.state);

		return (
			<div className="ContentMain Home">
				{/* SEARCHBAR + FILTERS--------------------- */}
				<div className="flex space-btw">
					<SearchBar callback={this.handleSearch} />
					{this.state.searchValue && (
						<Filter
							callback={this.handleFilter}
							handleFilterChange={this.handleFilterChange}
							handleDeleteFilters={this.handleDeleteFilters}
							handleFilterSubmit={this.handleFilterSubmit}
							day={this.state.day}
							sport={this.state.sport}
							practice={this.state.pratice}
						/>
					)}
				</div>
				{/* BACKGROUND  */}
				<div className={!this.state.searchValue ? "bg-main" : "hidden"}>
					{/* DISPLAYED MAP ----------------------------*/}
					{this.state.searchValue && (
						<div>
							<div className="flex above-map">
								<label className="switch">
									<input
										type="checkbox"
										checked={this.state.showMap}
										onChange={this.handleMap}
									/>
									<span className="slider round"></span>
								</label>
								<p>Afficher la carte</p>
							</div>
							{this.state.showMap && (
								<div id="map">
									<Map
										style="mapbox://styles/mapbox/streets-v11"
										containerStyle={{
											height: "100%",
											width: "100%",
										}}
										center={this.state.searchValue.center}
									>
										{this.state.filteredResults.map((result, index) => {
											const loc = result.location.coordinates;
											if (loc.length > 0) {
												return (
													<Marker
														key={result._id}
														index={index}
														coordinates={[
															result.location.coordinates[0],
															result.location.coordinates[1],
														]}
														anchor="bottom"
														onClick={() => this.showCard(result)}
													>
														<i className="fas fa-map-marker-alt"></i>
													</Marker>
												);
											}
										})}
										{this.state.showCard && (
											<Popup
												coordinates={[
													this.state.selectedElem.location.coordinates[0],
													this.state.selectedElem.location.coordinates[1],
												]}
												offset={{
													"bottom-left": [12, -38],
													bottom: [0, -38],
													"bottom-right": [-12, -38],
												}}
											>
												{this.state.selectedElem.teamName && (
													<div>
														<p className="bold">
															Equipe :{" "}
															<Link to={`/team/${this.state.selectedElem._id}`}>
																<span className="green">
																	{this.state.selectedElem.teamName}
																</span>
															</Link>
														</p>
														<Link to={`/team/${this.state.selectedElem._id}`}>
															<img
																className="logo-map"
																src={this.state.selectedElem.image}
																alt="logo"
															/>
														</Link>
													</div>
												)}
												{this.state.selectedElem.clubName && (
													<div>
														<p className="bold">
															Club :{" "}
															<Link to={`/club/${this.state.selectedElem._id}`}>
																<span className="green">
																	{this.state.selectedElem.clubName}
																</span>
															</Link>
														</p>
														<Link to={`/club/${this.state.selectedElem._id}`}>
															<img
																className="logo-map"
																src={this.state.selectedElem.image}
																alt="logo"
															/>
														</Link>
													</div>
												)}

												{this.state.selectedElem.sport && (
													<p>
														Sport : {this.state.selectedElem.sport.sportName}
													</p>
												)}
											</Popup>
										)}
									</Map>
								</div>
								/* {this.state.showCard ? (
                <Card elem={this.state.selectedElem} />
              ) : null}*/
							)}
						</div>
					)}

					{/* DISPLAYED CARDS ----------------------------*/}
					<div className="cards-container grid fr-5">
						{this.state.filteredResults.map((group, index) => (
							<Card key={group._id} index={index} elem={group} />
						))}
						{!this.state.filteredResults && <li>Loading...</li>}
					</div>

					{this.state.filteredResults.length === 0 &&
						this.state.searchValue && (
							<p className="topo">
								Pas de clubs à l'horizon, veuillez modifier votre recherche.
							</p>
						)}

					{/* DISPLAYED CONTENT BEFORE SEARCH -------------- */}
					{!this.state.searchValue && (
						<div className="presentation-content bordered-round flex col">
							<div className="title-container">
								<h1 className="title">
									Tous les sports pour toutes les femmes, partout !
								</h1>
								<h2 className="subtitle">
									Clubs amateurs pour sportives tous niveaux, sports collectifs
									ou individuels en club
								</h2>
								<div className="topo">Women players only</div>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}
}
export default withRouter(Home);
