// modules
import React from "react";
import { Switch, Route } from "react-router-dom";
// auth routes
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Signup from "./pages/Signup";
// profile pages
import ClubPage from "./pages/profiles/Club";
import PlayerPage from "./pages/profiles/Player";
import TeamPage from "./pages/profiles/Team";
import EventPage from "./pages/profiles/Event";
// common routes
import Home from "./pages/Home";
import Account from "./pages/Account";
import EventsList from "./pages/EventsList";
import NotFound from "./pages/NotFound";
// private club routes
import Event_CreateEdit from "./pages/club_pages/EventCreateEdit";
import Team_CreateEdit from "./pages/club_pages/TeamCreateEdit";
// partials
import NavMain from "./components/NavMain";
import FooterMain from "./components/FooterMain";

//----------------------

function App() {

	return (
		<div className="App">
			<NavMain />
			<div className="w-1pc-padding">
				<Switch>
					{/* AUTHENTIFICATION ROUTES */}
					<Route exact path="/" component={Home} />
					{/* <Route exact path="/search/:recherche?" component={Home} /> */}
					<Route exact path="/signup" component={Signup} />
					{/* PROFILES ROUTES */}
					<Route exact path="/club/:id" component={ClubPage} />
					<Route exact path="/team/:id" component={TeamPage} />
					<Route exact path="/event/:id" component={EventPage} />
					<Route exact path="/player/:id" component={PlayerPage} />
					{/* CLUB PRIVATE ROUTES */}
					<ProtectedRoute
						exact
						path="/account/team/:mode(create|edit)/:id?"
						component={Team_CreateEdit}
					/>
					<ProtectedRoute
						exact
						path="/account/event/:mode(create|edit)/:id?"
						component={Event_CreateEdit}
					/>
					{/* COMMON ROUTES */}
					<ProtectedRoute exact path="/account" component={Account} />
					<Route exact path="/events/all" component={EventsList} />
					<Route path="*" component={NotFound} />
				</Switch>
			</div>

			<FooterMain />
		</div>
	);
}

export default App;
