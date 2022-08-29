import React from 'react';
import logo from './logo.svg';
import { Counter } from './modules/counter/Counter';
import './App.css';
import VideoWindow from "./modules/videoWindow/VideoWindow";
import EventListContainer from "./modules/videoWindow/EventListContainer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <VideoWindow />
        <EventListContainer />
        {/*<Counter />*/}
      </header>
    </div>
  );
}

export default App;
