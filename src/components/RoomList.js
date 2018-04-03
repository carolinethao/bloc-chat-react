import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoomName: '',
			name: '',
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }

  handleChange(e) {
    this.setState({ newRoomName: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.newRoomName) {
			return;
		};
		e.target.reset();
  }

  createRoom() {
    this.roomsRef.push({
      name: this.state.newRoomName
    });
  }

	selectRoom(key) {
		this.props.activeRoom(key);
	}

  render() {
    return (
      <section className="rooms">
      <ul>
      {
        this.state.rooms.map(room => {
						return (
							<li key={room.key} onClick={e => this.selectRoom(room, e)}>{room.name}</li>
						);
					})}
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <input type="text" name="newroom" placeholder="New Room" value={this.state.newRoom} onChange={(e) => this.handleChange(e)} />
            <button type="submit" onClick={() => this.createRoom()}>Create Room</button>
          </form>
      </ul>
      </section>
    );
  }
}

export default RoomList;
