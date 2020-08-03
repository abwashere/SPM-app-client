import React from "react";
import FormSignupClub from "../components/Forms/FormSignupClub";
import FormSignupPlayer from "../components/Forms/FormSignupPlayer";

import "./../styles/FormSignUp.css";

class Signup extends React.Component {
	state = {};

	handleChange = (event) => {
		let key = event.target.name;
		let value = event.target.value;
		console.log("value is", value);
		this.setState({ [key]: value });
	};

	render() {
		console.log("the state is : ", this.state);
		return (
			<div className="ContentMain Signup">
				<h1 className="title">Inscription</h1>
				<div className="content">
					<p>Je suis : </p>
					<form>
						<div className="control radio-inputs flex">
							<label className="radio">
								<input
									type="radio"
									name="answer"
									value="hasChosenClub"
									onChange={this.handleChange}
								/>
								Un club ou une asso sportive
							</label>
							<label className="radio">
								<input
									type="radio"
									name="answer"
									value="hasChosenPlayer"
									onChange={this.handleChange}
								/>
								Une meuf qui veut se dépenser
							</label>
						</div>
					</form>

					{this.state.answer === "hasChosenClub" && <FormSignupClub />}
					{this.state.answer === "hasChosenPlayer" && <FormSignupPlayer />}
				</div>
			</div>
		);
	}
}

export default Signup;
