import React from "react";
import { Link } from "react-router-dom";

import UserContext from "./../components/Auth/UserContext";
import FormEditAccount from "./../components/Forms/FormEditAccount";
import FormDeleteAccount from "./../components/Forms/FormDeleteAccount";
import clubApiHandler from "./../api/clubApiHandler";

import "./../styles/Account.css";

class Account extends React.Component {
	static contextType = UserContext;

	state = { displayDelete: false, clubTeams: [], clubEvents: [] };

	componentDidMount() {
		let user = this.context.user;

		clubApiHandler
			.getTeamsOfClub(user._id)
			.then((dbResTeams) => {
				console.log("teams du club:", dbResTeams);
				this.setState({ clubTeams: dbResTeams });
			})
			.catch((err) => console.log(err))
			.then(() => {
				clubApiHandler
					.getEventsOfClub(user._id)
					.then((dbResEvents) => {
						console.log("events du club:", dbResEvents);
						this.setState({ clubEvents: dbResEvents });
					})
					.catch((err) => console.log(err));
			});
	}

	handleDisplayDelete = () => {
		this.setState({ displayDelete: !this.state.displayDelete });
	};

	render() {
		const { displayDelete, clubTeams, clubEvents } = this.state;
		console.log("le state de la page account", this.state);
		let role = this.context.user.role;

		return (
			<div className="Account ContentMain">
				<h1 className="title">Mon compte</h1>

				<div className="forms flex space-btw ">
					{/*--------------------------- SECTION MODIF INFOS PERSOS */}
					<div className="edit-left col">
						{/*-------------------- edit section --------- */}
						<FormEditAccount />
						{/* ------------------delete section --------- */}
						<div className="edit-bottom">
							<button
								onClick={this.handleDisplayDelete}
								className="button is-danger is-outlined"
							>
								Supprimer mon compte
							</button>
							{displayDelete && (
								<FormDeleteAccount abortDelete={this.handleDisplayDelete} />
							)}
						</div>
					</div>

					{/*-------------- SECTION MODIF TEAMS ET EVENTS pour clubs */}
					{role === "Club" && (
						<div className="edit-right">
							{/* ajouter des liens sur les noms */}
							<p className="subtitle">Mettre à jour mes équipes</p>
							{clubTeams.length === 0 ? (
								<p>Aucun évènement créé.</p>
							) : (
								<div className="teams">
									<ul>
										{clubTeams.map((team) => (
											<li key={team._id}>
												<Link
													className="link hvr-underline-from-center"
													to={`/account/team/edit/${team._id}`}
												>
													{team.teamName}
												</Link>
											</li>
										))}
									</ul>
								</div>
							)}
							<button className="button is-success hvr-pulse-grow">
								<Link to={`/account/team/create`}>Ajouter une équipe</Link>
							</button>

							<p className="subtitle">Mettre à jour mes évènements</p>
							{clubEvents.length === 0 ? (
								<p>Aucun évènement créé.</p>
							) : (
								<div className="events">
									<ul>
										{clubEvents.map((event) => (
											<li key={event._id}>
												<Link
													className="link hvr-underline-from-center"
													to={`/account/event/edit/${event._id}`}
												>
													{event.name}
												</Link>
											</li>
										))}
									</ul>
								</div>
							)}
							<button className="button is-success hvr-pulse-grow">
								<Link to={`/account/event/create`}>Ajouter un évènement</Link>
							</button>
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default Account;
