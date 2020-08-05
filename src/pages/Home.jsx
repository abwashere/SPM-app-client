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
    closestGroups: [],
    filteredResults: [],
    practice: null,
    sport: null,
    day: null,
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
            return team.sport._id === this.state.sport;
          } else {
            return true;
          }
        })
        .filter((team) => {
          if (this.state.practice) {
            return team.practice === this.state.practice;
          } else {
            return true;
          }
        })
        .filter((team) => {
          if (this.state.day) {
            const dayTeam = team.trainings.filter((training) => {
              console.log(training.day);
              return training.day === this.state.day;
            });
            console.log(dayTeam);
            return dayTeam;
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

  handleBackground = () => {};

  render() {
    return (
      <div className="ContentMain">
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
