import React, { Component } from 'react';

class MessageList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			messages: [],
		};

		this.messagesRef = this.props.firebase.database().ref('messages');
		this.state.messages.sentAt = this.props.firebase.database.ServerValue.TIMESTAMP;
	}

	componentDidMount() {
		this.messagesRef.on('child_added', snapshot => {
			const message = snapshot.val();
			message.key = snapshot.key;
			this.setState({
				messages: this.state.messages.concat(message),
			});
		});
	}

	render() {
		const activeRoom = this.props.activeRoom;
		const messageList = this.state.messages
			.filter(message => message.roomId === activeRoom)
			.map(message => {
				return (
					<div className="display-message" key={message.key}>
						<li>username: {message.username}</li>
						<li>content: {message.content}</li>
						<li>received: {message.sentAt}</li><br />
					</div>
				);
			});

		return (
			<div className="room-messages">
				<ul>{messageList}</ul>
			</div>
		);
	}
}

export default MessageList;
