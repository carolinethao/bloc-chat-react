import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList';
import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyA_u88deiCGlam5wAQkf0KSL64JD6j7b58",
  authDomain: "bloc-chat-1234.firebaseapp.com",
  databaseURL: "https://bloc-chat-1234.firebaseio.com",
  projectId: "bloc-chat-1234",
  storageBucket: "bloc-chat-1234.appspot.com",
  messagingSenderId: "689314273567"
};

firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <RoomList firebase = {firebase} />
      </div>
    );
  }
}

export default App;
