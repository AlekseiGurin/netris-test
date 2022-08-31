import React, {useEffect} from 'react';
import { useAppSelector } from "../../store/hooks";
import { selectEvent } from "../../store/slices/eventVideoSlice";

const VideoWindow = () => {

    const selectedEvent = useAppSelector(selectEvent)
    useEffect(() => {
        console.log('selectedEvent',selectedEvent)
        const video = document.getElementById('my-video') as HTMLMediaElement
        const timestamp = selectedEvent.selectedEventVideo && selectedEvent.selectedEventVideo.timestamp && Number((selectedEvent.selectedEventVideo.timestamp / 1000).toFixed(3));
        console.log('timestamp', timestamp)
        if (timestamp) {
            video.currentTime = timestamp
        }
        console.log('selectedEvent',selectedEvent)
        console.log('video',video.currentTime)

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