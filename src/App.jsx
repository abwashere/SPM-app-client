import React from "react";
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Account from "./pages/profiles/Account";
import ClubPage from "./pages/profiles/Club";
import PlayerPage from "./pages/profiles/Player";
import TeamPage from "./pages/profiles/Team";
import EventPage from "./pages/profiles/Event";

function App() {
	return (
		<div className="App">
			<NavMain />
			<Switch>
				{/* AUTHENTIFICATION ROUTES */}
				<Route exact path="/" component={Home} />
				<Route exact path="/signin" component={Signin} />
				<Route exact path="/signup" component={Signup} />
				{/* COMMON ROUTES */}
				<ProtectedRoute exact path="/account" component={Account} />
				{/* CLUBS ROUTES */}
				<Route exact path="/club/:id" component={ClubPage} />
				{/* TEAMS ROUTES */}
				<Route exact path="/team/:id" component={TeamPage} />

				{/* EVENTS ROUTES */}
				<Route exact path="/event/:id" component={EventPage} />

				{/* PLAYERS ROUTES */}
				<Route exact path="/player/:id" component={PlayerPage} />
			</Switch>
		</div>
	);
}

export default App;
