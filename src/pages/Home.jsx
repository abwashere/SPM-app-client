import React from "react";
import SearchBar from "./../components/SearchBar";
import CardTest from "./../components/Cards/CardTest";

class Home extends React.Component {
	handleSearch = (place) => {
		console.log("this is the place", place);
	};

	render() {
		return (
			<div className="ContentMain">
				<h1 className="title">Bienvenue sur Spm</h1>
				<SearchBar callback={this.handleSearch} />
				<CardTest />
			</div>
		);
	}
}

export default Home;
