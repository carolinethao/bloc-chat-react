import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
import * as firebase from 'firebase';

const config = {
	apiKey: 'AIzaSyA_u88deiCGlam5wAQkf0KSL64JD6j7b58',
	authDomain: 'bloc-chat-1234.firebaseapp.com',
	databaseURL: 'https://bloc-chat-1234.firebaseio.com',
	projectId: 'bloc-chat-1234',
	storageBucket: 'bloc-chat-1234.appspot.com',
	messagingSenderId: '689314273567',
};

firebase.initializeApp(config);

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeRoom: '',
			user: null,
		};
	}

	setActiveRoom(room) {
		this.setState({ activeRoom: room });
	}

	setUser(user) {
		this.setState({ user: user });
	}

	render() {
		return (
			<div className="App">
				<User
					firebase={firebase}
					setUser={this.setUser.bind(this)}
					user={this.state.user ? this.state.user.displayName : 'Guest'}
				/>
				<RoomList
					firebase={firebase}
					activeRoom={this.setActiveRoom.bind(this)}
				/>
				<section className="active-chat-room">
					<h1>{this.state.activeRoom.name}</h1>

					<MessageList
						firebase={firebase}
						activeRoom={this.state.activeRoom}
						user={this.state.user ? this.state.user.displayName : 'Guest'}
					/>
				</section>
			</div>
		);
	}
}

export default App;
