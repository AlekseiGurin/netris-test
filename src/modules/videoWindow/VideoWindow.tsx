import React from 'react';

const VideoWindow = () => {
    return (
        <div className="video-window-container">
            <video
                id="my-video"
                className="video-js"
                controls
                preload="auto"
                width="640"
                height="264"
                poster="MY_VIDEO_POSTER.jpg"
                data-setup="{}"
            >
                <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                        type="video/mp4"/>
            </video>
            <script src="https://vjs.zencdn.net/7.20.2/video.min.js"></script>
        </div>
    )
}

export default VideoWindow;