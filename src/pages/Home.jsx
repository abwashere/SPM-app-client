import React from "react";
import SearchBar from "./../components/SearchBar";
import CardTest from "./../components/Cards/CardTest";

class Home extends React.Component {
	state = {
		searchValue: "",
	};
	
	handleSearch = (place) => {
		console.log("Search bar is being triggered and place is ", place);
		this.setState({ searchValue: place });
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
