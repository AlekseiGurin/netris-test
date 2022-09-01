import React, {useEffect} from 'react';
import { useAppSelector } from "../../store/hooks";
import { selectEvent } from "../../store/slices/eventVideoSlice";
import eventList from "./eventList.json"


const VideoWindow = () => {

    const selectedEvent = useAppSelector(selectEvent)
    useEffect(() => {
        const videoElement = document.getElementById('my-video') as HTMLMediaElement
        const timestamp = selectedEvent.selectedEventVideo && selectedEvent.selectedEventVideo.timestamp && Number((selectedEvent.selectedEventVideo.timestamp / 1000).toFixed(3));
        if (timestamp) {
            // const eventVideoElement = document.getElementById(selectedEvent.selectedEventVideo.id.toString()) as HTMLElement;
            // console.log('eventVideoElement',eventVideoElement)
            // eventVideoElement.classList.add('selected')
            videoElement.currentTime = timestamp
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
            >
                <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                        type="video/mp4"/>
            </video>
            <script src="https://vjs.zencdn.net/7.20.2/video.min.js"></script>
        </div>
    )
}

export default VideoWindow;