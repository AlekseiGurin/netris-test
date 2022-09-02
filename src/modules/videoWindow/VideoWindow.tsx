import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteEventVideo, selectEvent } from "../../store/slices/eventVideoSlice";
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import eventList from "./eventList.json"


const VideoWindow = () => {
    const dispatch = useAppDispatch();
    const selectedEvent = useAppSelector(selectEvent)
    const rectangleStyle = selectedEvent.selectedEventVideo.zone;
    const { duration } = selectedEvent.selectedEventVideo;
    const videoRef = React.useRef(null);
    const playerRef = React.useRef(null);
    const videoJsOptions = {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
            src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            type: 'video/mp4'
        }]
    };

    useEffect(() => {
        const videoElement = document.getElementById('my-video') as HTMLMediaElement
        const timestamp = selectedEvent.selectedEventVideo && selectedEvent.selectedEventVideo.timestamp && Number((selectedEvent.selectedEventVideo.timestamp / 1000).toFixed(3));
        if (timestamp) {
            // const eventVideoElement = document.getElementById(selectedEvent.selectedEventVideo.id.toString()) as HTMLElement;
            // console.log('eventVideoElement',eventVideoElement)
            // eventVideoElement.classList.add('selected')
            videoElement.currentTime = timestamp
            let playPromise = videoElement.play();
            if (playPromise !== undefined) {
                playPromise.then(function() {
                    setTimeout(() => {
                        dispatch(deleteEventVideo())
                    }, duration)
                }).catch(function(error) {
                    console.log('video error')
                });
            }

        }
        console.log('selectedEvent',selectedEvent)
        console.log('video',videoElement.currentTime)
    },[selectedEvent]);
    useEffect(() => {
        // console.log('render')
        // const video = document.getElementById('my-video')
        // console.log(video.currentTime)
    })
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
                autoPlay
            >
                <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                        type="video/mp4"/>
            </video>
            {!!selectedEvent.selectedEventVideo.timestamp && (<div style={rectangleStyle} className='green-rectangle'/>)}
            <script src="https://vjs.zencdn.net/7.20.2/video.min.js"></script>
        </div>
    )
}

export default VideoWindow;