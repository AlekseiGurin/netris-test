import React from 'react';

const VideoWindow = () => {
  return (
    <div className="video-window-container">
        <video controls width="400" height="400" src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"></video>
    </div>
  )
}

export default VideoWindow;