import React from "react";
import LocationAutoComplete from "./LocationAutoComplete";

import "bulma/css/bulma.css";

function SearchBar({ callback }) {
	function handlePlace(place) {
		// This handle is passed as a callback to the autocomplete component.
		console.log(place);
	}

	return (
		<div className="SearchBar">
			<div className="is-medium" style={{ width: "70%" }}>
				<LocationAutoComplete
					onSelect={handlePlace}
					searchIndication="Où cherchez-vous ?"
					onChange={callback}
				/>
				{/* 		<input
						className="input is-medium"
						type="text"
						onChange={callback}
						placeholder="Où cherchez-vous ?"
					/> */}
			</div>
		</div>
	);
}

export default SearchBar;
