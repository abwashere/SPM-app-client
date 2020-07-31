import React from "react";
import LocationAutoComplete from "./LocationAutoComplete";

import "bulma/css/bulma.css";

const SearchBar = ({ callback }) => {
	function redirectToSearchPage(event) {
		console.log("value of the input when key is pressed : ");
		event.key === "Enter" && callback(event);
	}

	return (
		<div className="SearchBar">
			<div className="is-medium" style={{ width: "70%" }}>
				<LocationAutoComplete
					onSelect={callback}
					handleKeyPress={redirectToSearchPage}
					placeholderContent="Où cherchez-vous ?"
				/>
			</div>
		</div>
	);
};

export default SearchBar;
