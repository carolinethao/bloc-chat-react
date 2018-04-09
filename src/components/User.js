import React, { Component } from 'react';

class User extends Component {
	constructor(props) {
		super(props);

		this.logIn = this.logIn.bind(this);
		this.logOut = this.logOut.bind(this);
	}

	logIn() {
		const provider = new this.props.firebase.auth.GoogleAuthProvider();
		this.props.firebase.auth().signInWithPopup(provider).then(result => {
			const user = result.user;
			this.props.setUser(user);
		});
	}

	logOut() {
		this.props.firebase.auth().signOut().then(result => {
			this.props.setUser(null);
		});
	}

	componentDidMount() {
		this.props.firebase.auth().onAuthStateChanged(user => {
			this.props.setUser(user);
		});
	}

	render() {
		return (
			<section>
				<div>
					{this.props.user}
				</div>
				<div>
					{this.props.user === 'Guest'
						? <button className="login" onClick={() => this.logIn()}>
								Log in
							</button>
						: <button className="logout" onClick={() => this.logOut()}>
								Log out
							</button>}

				</div>
			</section>
		);
	}
}

export default User;
