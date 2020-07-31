import React, { Component } from "react";
import teamApiHandler from "./../api/teamApiHandler";
import clubApiHandler from "./../api/clubApiHandler";
import axios from "axios";

import Card from "./../components/Cards/Card";
import SearchBar from "./../components/SearchBar";
import Filter from "./../components/Filter";

class Search extends Component {
	state = {
		teams: [],
		clubs: [],
		teamsAndClubs: [],
		selection: null,
		searchValue: "",
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
	handleFilter = (group) => {
		// console.log("filtered group : ", group)
		this.setState({ selection: group });
	};
	*/

	handleSearch = (place) => {
		console.log("Search bar place is ", place);
		this.setState({ searchValue: place.text });
	};

	handleDistance = () => {
		let longitude = this.state.searchValue.geometry.coordinates[0];
		let latitude = this.state.searchValue.geometry.coordinates[1];
		axios
			.get(
				`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.state.search}.json?proximity=${longitude},${latitude}&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
			)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => console.log(error));
	};

	render() {
		/* 		console.log("selection : ", this.state.selection);
							const filteredGroups = this.state.teamsAndClubs.forEach((group) =>
								console.log(group.address.formattedAddress)
							); */
		const filteredGroups = this.state.teamsAndClubs
			.filter((group) => {
				return group.address.formattedAddress.includes(this.state.searchValue);
			})
			.filter((group) => {
				if (this.state.selection === null) return true;
				return group.address.formattedAddress === this.state.selection;
			});

		console.log("filtered groups ", filteredGroups);

		return (
			<div className="ContentMain">
				<h1 className="title">Search page</h1>

				<SearchBar callback={this.handleSearch} />

				{/* <Filter callback={this.handleFilter} /> */}

				{/* 	<div className="filtered-cards">
					{filteredGroups.map((group, index) => (
						<Card
							key={index}
							index={index}
							group={group}
							callback={this.setResults}
						/>
					))}
				</div> */}
			</div>
		);
	}
}
export default Search;
