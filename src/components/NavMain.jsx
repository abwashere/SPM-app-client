import React from "react";
import { NavLink } from "react-router-dom";
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

	displayMenu = () => {
		this.state.isActive
			? this.setState({ isActive: false })
			: this.setState({ isActive: true });
	};

	render() {
		const { context } = this.props;
		return (
			<div className="container-nav">
				<nav
					className="NavMain navbar"
					role="navigation"
					aria-label="main navigation"
				>
					<div className="navbar-brand">
						{/* --------------------------- AFFICHAGE LOGO */}

						<NavLink exact to="/" id="logo" className="navbar-item bold">
							Spm
						</NavLink>

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
						className={`navbar-menu ${this.state.isActive && "is-active"} `}
						id="nav-content"
					>
						{/* ----------------- AFFICHAGE DES MENUS POUR USER LOGGED ID */}
						{context.isLoggedIn && (
							<div className="navbar-end">
								<p id="welcome-msg" className="navbar-item">
									Bonjour{" "}
									{(context.user && context.user.firstName) ||
										context.user.clubName}
								</p>
								<p className="navbar-item">
									<NavLink to="/account">Mon compte</NavLink>
								</p>

								<p
									onClick={this.handleLogout}
									to="/logout"
									className="link button is-normal"
								>
									Se déconnecter
								</p>
							</div>
						)}
						{/* ----------------- AFFICHAGE DES MENUS QUAND NOT LOGGED IN */}
						{!context.isLoggedIn && (
							<div className="navbar-end">
								<div
									className="buttons"
									onClick={() => {
										this.displayMenu();
										this.displaySignIn();
									}}
								>
									<p
										onClick={this.displaySignIn}
										id="login-link"
										className="link button is-success is-outlined"
									>
										Se connecter
									</p>
									<p>
										<NavLink
											to="/signup"
											id="signup-link"
											className="link button is-primary"
										>
											S'inscrire
										</NavLink>
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

/* 
<nav className="navbar" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <a className="navbar-item" href="https://bulma.io">
      <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
    </a>

    <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" className="navbar-menu">
    <div className="navbar-start">
      <a className="navbar-item">
        Home
      </a>

      <a className="navbar-item">
        Documentation
      </a>

      <div className="navbar-item has-dropdown is-hoverable">
        <a className="navbar-link">
          More
        </a>

        <div className="navbar-dropdown">
          <a className="navbar-item">
            About
          </a>
          <a className="navbar-item">
            Jobs
          </a>
          <a className="navbar-item">
            Contact
          </a>
          <hr className="navbar-divider">
          <a className="navbar-item">
            Report an issue
          </a>
        </div>
      </div>
    </div>

    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
          <a className="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a className="button is-light">
            Log in
          </a>
        </div>
      </div>
    </div>
  </div>
</nav>

*/
