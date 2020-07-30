import React from "react";
import FormSignupClub from "../components/Forms/FormSignupClub";
import FormSignupPlayer from "../components/Forms/FormSignupPlayer";

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
			<div>
				<h2>Inscription</h2>

				<form>
					<p>Je suis : </p>

					<div className="control">
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
		);
	}
}

export default Signup;
