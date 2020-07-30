import React from "react";
import { NavLink, Link } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import authApiHandler from "./../api/authApiHandler";
import FormSignin from "../components/Forms/FormSignin";

import "../styles/NavMain.css";
import "../styles/SignInForm.css";
import "bulma/css/bulma.css";
import "bulma/css/bulma.css"; //TODO: bulma style

class NavMain extends React.Component {
	state = {
		onDisplay: false,
	};

	handleLogout = () => {
		authApiHandler
			.logout()
			.then(() => {
				this.props.context.removeUser();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	displaySignIn = () => {
		this.state.onDisplay
			? this.setState({ onDisplay: false })
			: this.setState({ onDisplay: true });
	};

	render() {
		const { context } = this.props;
		console.log("LOG IN IS DISPLAYED ? ", this.state.onDisplay);
		return (
			<div className="container-nav">
				<nav className="NavMain">
					<NavLink exact to="/">
						<h3 className="logo">Spm</h3>
					</NavLink>
					<ul className="nav-list">
						{context.isLoggedIn && (
							<React.Fragment>
								<li id="welcome-msg">
									Bonjour
									{(context.user && context.user.firstName) ||
										context.user.clubName}
								</li>
								<li>
									<NavLink to="/account">Mon compte</NavLink>
								</li>
								<li>
									<p onClick={this.handleLogout} to="/logout" className="link">
										Se déconnecter
									</p>
								</li>
							</React.Fragment>
						)}
						{!context.isLoggedIn && (
							<React.Fragment>
								<li
									onClick={this.displaySignIn}
									id="login-link"
									className="link"
								>
									Se connecter
								</li>
								<li>
									<NavLink to="/signup" id="signup-link" className="link">
										S'inscrire
									</NavLink>
								</li>
							</React.Fragment>
						)}
					</ul>
				</nav>
				<div onMouseLeave={this.displaySignIn}>
					{this.state.onDisplay && <FormSignin />}
				</div>
			</div>
		);
	}
}

export default withUser(NavMain);
