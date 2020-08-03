import React from "react";
import FormEditAccount from "./../components/Forms/FormEditAccount";

class Account extends React.Component {
	state={}
	
	reder() {
		return (
			<div className="ContentMain">
				<h1>Mon compte</h1>
				<FormEditAccount />
			</div>
		);
	}
}

export default Account;
