import React, { Component } from 'react';

class MessageList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			messages: [],
			username: '',
			sentAt: '',
			content: '',
			roomId: '',
		};

		this.handleChange = this.handleChange.bind(this);
		this.messagesRef = this.props.firebase.database().ref('messages');
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

	handleChange(e) {
		this.setState({
			content: e.target.value,
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		if (!this.state.content) {
			return;
		}
		this.setState({
			content: '',
		});
	}

	newMessage(e) {
		this.messagesRef.push({
			username: this.props.user,
			content: this.state.content,
			roomId: this.props.activeRoom.key,
			sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
		});
	}

	render() {
		const activeRoom = this.props.activeRoom.key;
		const messageList = this.state.messages
			.filter(message => message.roomId === activeRoom)
			.map(message => {
				return (
					<li className="display-message" key={message.key}>
						<div>username: {message.username}</div>
						<div>content: {message.content}</div>
					</li>
				);
			});
		return (
			<div className="room-messages">
				{this.props.activeRoom === '' || this.props.user === 'Guest'
					? ''
					: <form onSubmit={e => this.handleSubmit(e)}>
							<input
								type="text"
								name="newmessage"
								placeholder="Write your message here..."
								value={this.state.content}
								onChange={e => this.handleChange(e)}
							/>
							<button type="submit" onClick={() => this.newMessage()}>
								Send
							</button>
						</form>}

				<ul>{messageList}</ul>
			</div>
		);
	}
}

export default MessageList;
