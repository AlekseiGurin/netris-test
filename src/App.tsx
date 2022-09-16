import React from 'react';
import VideoWindow from "./modules/videoWindow/VideoWindow";
import EventListContainer from "./modules/videoWindow/EventListContainer";

function App() {
  return (
    <main className="App">
        <VideoWindow />
        <EventListContainer />
    </main>
  );
}

export default App;
