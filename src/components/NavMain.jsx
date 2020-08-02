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
		return (
			<div className="container-nav">
				<nav
					className="NavMain navbar"
					role="navigation"
					aria-label="main navigation"
				>
					<div className="navbar-brand">
						<NavLink exact to="/" className="logo navbar-item">
							Spm
						</NavLink>

						<div
							role="button"
							className="navbar-burger burger"
							aria-label="menu"
							aria-expanded="false"
							data-target="navbarBasicExample"
						>
							<span aria-hidden="true"></span>
							<span aria-hidden="true"></span>
							<span aria-hidden="true"></span>
						</div>
					</div>

					<div className="navbar-menu">
						{context.isLoggedIn && (
							<div class="navbar-end">
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
						{!context.isLoggedIn && (
							<div class="navbar-end">
								<div class="buttons">
									<p
										onClick={this.displaySignIn}
										id="login-link"
										className="link button is-light"
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
				<div onMouseLeave={this.displaySignIn}>
					{this.state.onDisplay && <FormSignin />}
				</div>
			</div>
		);
	}
}

export default withUser(NavMain);

/* 
<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
    </a>

    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item">
        Home
      </a>

      <a class="navbar-item">
        Documentation
      </a>

      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          More
        </a>

        <div class="navbar-dropdown">
          <a class="navbar-item">
            About
          </a>
          <a class="navbar-item">
            Jobs
          </a>
          <a class="navbar-item">
            Contact
          </a>
          <hr class="navbar-divider">
          <a class="navbar-item">
            Report an issue
          </a>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light">
            Log in
          </a>
        </div>
      </div>
    </div>
  </div>
</nav>

*/
