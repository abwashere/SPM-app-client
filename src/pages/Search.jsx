import React, { Component } from "react";
import teamApiHandler from "./../api/teamApiHandler";
import clubApiHandler from "./../api/clubApiHandler";
/* import TeamCard from "./../components/Cards/TeamCard";
import ClubCard from "./../components/Cards/ClubCard"; */
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
		console.log("the props are : ", this.props);
		// GET TEAMS
		teamApiHandler
			.getTeams()
			.then((dbRes) => {
				console.log("all TEAMS in DB : ", dbRes);
				this.setState({ teams: dbRes.data });
			})
			.catch((err) => {
				console.error(err);
			});
		// GET CLUBS
		clubApiHandler
			.getClubs()
			.then((dbRes) => {
				console.log("all CLUBS in DB : ", dbRes);
				this.setState({ clubs: dbRes.data });
			})
			.then(() =>
				this.setState({
					teamsAndClubs: [...this.state.teams, this.state.clubs],
				})
			)
			.then(() =>
				console.log(
					"Tous les CLUB + TEAMS de la DB :",
					this.state.teamsAndCLubs
				)
			)
			.catch((err) => {
				console.error(err);
			});
	}

	setResults = (event, index) => {
		const copy = [...this.state.teamsAndCLubs];
		copy[index].teams = event.target.value;
		this.setState({ teamsAndCLubs: copy });
	};

	handleFilter = (group) => {
		// console.log("filtered group : ", group)
		this.setState({ selection: group });
	};

	handleSearch = (place) => {
		console.log("Search bar is being triggered and place is " , place);
		// this.setState({ searchValue: event.target.value });
	};

	render() {
		const filteredGroups = this.state.teamsAndCLubs
			.filter((group) => {
				if (this.state.selection === null) return true;
				return group.address.formattedAddress === this.state.selection;
			})
			.filter((group) => {
				return group.address.formattedAddress.includes(this.state.searchValue);
			});

		return (
			<React.Fragment>
				<SearchBar callback={this.handleSearch} />

				{/* <Filter callback={this.handleFilter} /> */}

				<div className="filtered-cards">
					{filteredGroups.map((group, index) => (
						<Card
							key={index}
							index={index}
							group={group}
							callback={this.setResults}
						/>
					))}
				</div>
			</React.Fragment>
		);
	}
}
export default Search;
