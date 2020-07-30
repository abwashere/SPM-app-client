import React from "react";
import { NavLink } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import authApiHandler from "./../api/authApiHandler";

import "../styles/NavMain.css";

const NavMain = (props) => {
  const { context } = props;

  function handleLogout() {
    authApiHandler
      .logout()
      .then(() => {
        context.removeUser();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
		<nav className="NavMain">
			<NavLink exact to="/">
				<h3 className="logo">Spm</h3>
			</NavLink>
			<ul className="nav-list">
				<li>
					<NavLink to="/search">Trouver un club</NavLink>
				</li>
				{context.isLoggedIn && (
					<React.Fragment>
						<li>
							<NavLink to="/account">
								{context.user && context.user.email}
							</NavLink>
						</li>
						<li>
							<p onClick={handleLogout}>Se déconnecter</p>
						</li>
					</React.Fragment>
				)}
				{!context.isLoggedIn && (
					<React.Fragment>
						<li>
							<NavLink to="/signin">Se connecter</NavLink>
						</li>
						<li>
							<NavLink to="/signup">S'inscrire</NavLink>
						</li>
					</React.Fragment>
				)}
			</ul>
		</nav>
	);
};

export default withUser(NavMain);
