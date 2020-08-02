import React, { Component } from "react";
import * as turf from "@turf/turf";

import teamApiHandler from "./../api/teamApiHandler";
import clubApiHandler from "./../api/clubApiHandler";

import Card from "./../components/Cards/Card";
import SearchBar from "./../components/SearchBar";
import Filter from "./../components/Filter";

import "./../styles/SearchPage.css";

class Search extends Component {
	state = {
		teams: [],
		clubs: [],
		teamsAndClubs: [],
		searchValue: "",
		filteredElements: null,
	};

	componentDidMount() {
		Promise.all([teamApiHandler.getTeams(), clubApiHandler.getClubs()])
			.then((dbRes) => {
				this.setState({
					teamsAndClubs: [...dbRes[0], ...dbRes[1]],
				});
			})
			.then(() =>
				console.log(
					"Tous les CLUB + TEAMS de la DB :",
					this.state.teamsAndClubs
				)
			)
			.catch((err) => {
				console.error(err);
			});
	}
	/* setResults = (event, index) => {
		const copy = [...this.state.teamsAndClubs];
		copy[index].teams = event.target.value;
		this.setState({ teamsAndClubs: copy });
	};
	*/
	/* 
	handleFilter = (group) => {
		// console.log("filtered group : ", group)
		this.setState({ filteredElements : group });
	};
 */
	handleSearch = (place) => {
		this.setState({ searchValue: place });
	};

	render() {
		let closestGroups = [];

		if (this.state.searchValue) {
			const lgtSearch = this.state.searchValue.geometry.coordinates[0];
			const latSearch = this.state.searchValue.geometry.coordinates[1];
			const to = turf.point([lgtSearch, latSearch]);

			this.state.teamsAndClubs.forEach((elem) => {
				let lgtElem = elem.address.coordinates[0];
				let latElem = elem.address.coordinates[1];
				let from = turf.point([lgtElem, latElem]);
				let options = { units: "kilometers" };
				let distance = turf.distance(from, to, options);
				//console.log("distance", distance);
				if (distance <= 10) closestGroups.push(elem);
			});
		}
		console.log("elem in less than 10 km : ", closestGroups);

		const filteredGroups = closestGroups;
		// .filter((group) => { //TODO: filter by criterias
		// });

		console.log("filtered groups ", filteredGroups);

		return (
			<div className="ContentMain">
				<h1 className="title">Search page</h1>

				<SearchBar callback={this.handleSearch} />

				{/* <Filter callback={this.handleFilter} /> */}
				<div className="cards-container grid">
					{filteredGroups.map((group, index) => (
						<Card key={index} index={index} elem={group} />
					))}
					{!filteredGroups && <li>Loading...</li>}
				</div>
			</div>
		);
	}
}
export default Search;
