import React from "react";
import LocationAutoComplete from "./LocationAutoComplete";

import "bulma/css/bulma.css";
import "./../styles/SearchBar.css";

const SearchBar = ({ callback }) => {
	return (
		<div className="SearchBar flex">
			<p className="label">Trouvez un club ou une équipe</p>
			<LocationAutoComplete
				onSelect={callback}
				placeholderContent="Où cherchez-vous ?"
			/>
		</div>
	);
};

export default SearchBar;
