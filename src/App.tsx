import React from 'react';
import VideoWindow from "./modules/videoWindow/VideoWindow";
import EventListContainer from "./modules/videoWindow/EventListContainer";

function App() {
  return (
    <div className="App">
        <VideoWindow />
        <EventListContainer />
    </div>
  );
}

export default App;
