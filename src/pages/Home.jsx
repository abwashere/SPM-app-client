import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import * as turf from "@turf/turf";

import teamApiHandler from "./../api/teamApiHandler";
import clubApiHandler from "./../api/clubApiHandler";

import Card from "./../components/Cards/Card";
import SearchBar from "./../components/SearchBar";
import Filter from "./../components/Filter";

import "./../styles/Home.css";

class Home extends Component {
	state = {
		teams: [],
		clubs: [],
		teamsAndClubs: [],
		searchValue: "",
		filteredPractice: null,
		filteredSport: null,
		filteredDay: null,
	};

	componentDidMount() {
		Promise.all([teamApiHandler.getTeams(), clubApiHandler.getClubs()])
			.then((dbRes) => {
				this.setState({
					teamsAndClubs: [...dbRes[0], ...dbRes[1]],
				});
			})
			// .then(() =>
			// 	console.log(
			// 		"Tous les CLUB + TEAMS de la DB :",
			// 		this.state.teamsAndClubs
			// 	)
			// )
			.catch((err) => {
				console.error(err);
			});
	}

	handleSearch = (place) => {
		this.setState({ searchValue: place });
	};

	handleFilter = (selection) => {
		// console.log("filter group is there ? ", selection);
		this.setState({ filteredDay: selection.day });
		this.setState({ filteredSport: selection.sport });
		this.setState({ filteredPractice: selection.practice });
	};

	handleBackground = () => {};

	render() {
		const {
			teamsAndClubs,
			searchValue,
			filteredPractice,
			filteredSport,
			filteredDay,
		} = this.state;

		// console.log("LE STATE: ", this.state);
		let closestGroups = [];

		if (searchValue) {
			const lgtSearch = searchValue.geometry.coordinates[0];
			const latSearch = searchValue.geometry.coordinates[1];
			const to = turf.point([lgtSearch, latSearch]);

			teamsAndClubs.forEach((elem) => {
				let lgtElem = elem.location.coordinates[0];
				let latElem = elem.location.coordinates[1];
				let from = turf.point([lgtElem, latElem]);
				let options = { units: "kilometers" };
				let distance = turf.distance(from, to, options);
				if (distance <= 20) closestGroups.push(elem);
			});
		}
		// console.log("elem in less than 20 km : ", closestGroups);

		// TODO: AJOUTER LE FILTRE DES JOURS (nesté !)
		// TODO: attention au group.sport dont il faudra peut-être retrouver l'id quand le populate fonctionnera !
		const results = closestGroups
			.filter((group) => {
				if ((!filteredDay, !filteredPractice, !filteredSport)) return true;
				if (filteredSport) return group.sport === filteredSport;
			})
			.filter((group) => {
				if (filteredPractice) return group.practice === filteredPractice;
				else return true;
			})
			.filter((group) => {
				if (filteredDay) return group.trainings.day.includes(filteredDay);
				else return true;
			});

		console.log("filtered groups ", results);
		// console.log("search value ", results);

		return (
			<div className="ContentMain">
				{/* SEARCHBAR + FILTERS--------------------- */}
				<div className="flex space-btw">
					<SearchBar callback={this.handleSearch} />
					{searchValue && <Filter callback={this.handleFilter} />}
				</div>
				{/* BACKGROUND  */}
				<div className={!searchValue ? "bg-main" : "hidden"}>
					{/* DISPLAYED CARDS ----------------------------*/}
					<div className="cards-container grid fr-5">
						{results.map((group, index) => (
							<Card key={index} index={index} elem={group} />
						))}
						{!results && <li>Loading...</li>}
					</div>

					{results.length === 0 && searchValue && (
						<p className="topo">
							Pas de clubs à l'horizon, veuillez modifier votre recherche.
						</p>
					)}

					{/* DISPLAYED CONTENT BEFORE SEARCH -------------- */}
					{!searchValue && (
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
