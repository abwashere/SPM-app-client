import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserContext from "../Auth/UserContext";
import authApiHandler from "../../api/authApiHandler";
import "bulma/css/bulma.css";


class FormSignupClub extends Component {
  static contextType = UserContext;

  state = {
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const value =
      event.target.type === "file"
        ? event.target.files[0]
        : event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    const key = event.target.name;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    authApiHandler
      .signupClub(this.state)
      .then((data) => {
        this.context.setUser(data);
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
			/*   <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
        <button>Submit</button>
      </form> */

			<form onChange={this.handleChange} onSubmit={this.handleSubmit}>
				<div className="field">
					<label className="label">Name</label>
					<div className="control">
						<input className="input" type="text" placeholder="Text input" />
					</div>
				</div>

				<div className="field">
					<label className="label">Username</label>
					<div className="control has-icons-left has-icons-right">
						<input
							className="input is-success"
							type="text"
							placeholder="Text input"
							value="bulma"
						/>
						<span className="icon is-small is-left">
							<i className="fas fa-user"></i>
						</span>
						<span className="icon is-small is-right">
							<i className="fas fa-check"></i>
						</span>
					</div>
					<p className="help is-success">This username is available</p>
				</div>

				<div className="field">
					<label className="label">Email</label>
					<div className="control has-icons-left has-icons-right">
						<input
							className="input is-danger"
							type="email"
							placeholder="Email input"
							value="hello@"
						/>
						<span className="icon is-small is-left">
							<i className="fas fa-envelope"></i>
						</span>
						<span className="icon is-small is-right">
							<i className="fas fa-exclamation-triangle"></i>
						</span>
					</div>
					<p className="help is-danger">This email is invalid</p>
				</div>

				<div className="field">
					<label className="label">Subject</label>
					<div className="control">
						<div className="select">
							<select>
								<option>Select dropdown</option>
								<option>With options</option>
							</select>
						</div>
					</div>
				</div>

				<div className="field">
					<label className="label">Message</label>
					<div className="control">
						<textarea className="textarea" placeholder="Textarea"></textarea>
					</div>
				</div>

				<div className="field">
					<div className="control">
						<label className="checkbox">
							<input type="checkbox" />I agree to the{" "}
							<a href="#">terms and conditions</a>
						</label>
					</div>
				</div>

				<div className="field">
					<div className="control">
						<label className="radio">
							<input type="radio" name="question" />
							Yes
						</label>
						<label className="radio">
							<input type="radio" name="question" />
							No
						</label>
					</div>
				</div>

				<div className="field is-grouped">
					<div className="control">
						<button className="button is-link">Submit</button>
					</div>
					<div className="control">
						<button className="button is-link is-light">Cancel</button>
					</div>
				</div>
			</form>
		);
  }
}

export default withRouter(FormSignupClub);
