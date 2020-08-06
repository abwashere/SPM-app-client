import React from "react";
import { Link, Redirect } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import authApiHandler from "./../api/authApiHandler";
import FormSignin from "../components/Forms/FormSignin";

import "../styles/NavMain.css";
import "../styles/SignInForm.css";
import "bulma/css/bulma.css";

class NavMain extends React.Component {
	state = {
		onDisplay: false,
		isActive: false,
		isLoggedOut: false,
	};

	handleLogout = () => {
		authApiHandler
			.logout()
			.then(() => {
				this.setState({ isLoggedOut: true });
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

	displayMenu = () => {
		this.state.isActive
			? this.setState({ isActive: false })
			: this.setState({ isActive: true });
	};

	render() {
		const { context } = this.props;
		return (
			<div className="container-nav">
				{this.state.isLoggedOut && <Redirect to="/" />}

				<nav className="navbar" role="navigation" aria-label="main navigation">
					<div className="navbar-brand">
						{/* --------------------------- AFFICHAGE LOGO */}

						<Link
							to="/"
							onClick={() => window.location.replace("/")}
							id="logo"
							className="navbar-item bold"
						>
							Spm
						</Link>

						{/* --------------------------- AFFICHAGE RESPONSIVE BURGER */}
						<div className="navbar-end">
							<div
								role="button"
								className={`navbar-burger burger ${
									this.state.isActive && "is-active"
								} `}
								aria-label="menu"
								aria-expanded="false"
								data-target="navbarBasicExample"
								onClick={this.displayMenu}
							>
								<span aria-hidden="true"></span>
								<span aria-hidden="true"></span>
								<span aria-hidden="true"></span>
							</div>
						</div>
					</div>
					<div
						className={`navbar-menu ${
							this.state.isActive && "is-active"
						} border-round `}
						id="nav-content"
						onMouseLeave={this.displayMenu}
					>
						{/* ----------------- AFFICHAGE DES MENUS POUR USER LOGGED ID */}
						{context.isLoggedIn && (
							<div className="navbar-end">
								<p id="welcome-msg" className="navbar-item">
									Bonjour{" "}
									{(context.user && context.user.firstName) ||
										context.user.clubName}
								</p>
								<Link to="/events/all" id="all-events-link">
									<p
										className="link
										navbar-item hvr-float"
									>
										Voir les évènements
									</p>
								</Link>
								<Link to="/account">
									<p className="link navbar-item hvr-float">Mon compte</p>
								</Link>

								<p
									onClick={this.handleLogout}
									to="/logout"
									className="link navbar-item hvr-float"
								>
									Se déconnecter
								</p>
							</div>
						)}
						{/* ----------------- AFFICHAGE DES MENUS QUAND NOT LOGGED IN */}
						{!context.isLoggedIn && (
							<div className="navbar-end">
								<Link to="/events/all" id="all-events-link">
									<p
										className="link hvr-float
										navbar-item"
									>
										Voir les évènements
									</p>
								</Link>

								<div className="buttons" onClick={this.displayMenu}>
									<p
										onClick={this.displaySignIn}
										id="login-link"
										className="link button is-success is-outlined"
									>
										Se connecter
									</p>
									<p>
										<Link
											to="/signup"
											id="signup-link"
											className="link button is-success"
										>
											S'inscrire
										</Link>
									</p>
								</div>
							</div>
						)}
					</div>
				</nav>
				{/* ----------------------------- AFFICHAGE DU FORM SIGN IN */}
				<div>
					{this.state.onDisplay && <FormSignin callback={this.displaySignIn} />}
				</div>
			</div>
		);
	}
}

export default withUser(NavMain);
