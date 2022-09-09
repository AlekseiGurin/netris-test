import React, {useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteEventVideo, selectEvent } from "../../store/slices/eventVideoSlice";
import 'video.js/dist/video-js.css';
import { loadingEventList } from "../../store/slices/eventVideoListSlice";


const VideoWindow = () => {
    const dispatch = useAppDispatch();
    const selectedEvent = useAppSelector(selectEvent);
    const rectangleStyle = selectedEvent.selectedEventVideo.zone;
    const { duration } = selectedEvent.selectedEventVideo;
    const timestamp = selectedEvent.selectedEventVideo && selectedEvent.selectedEventVideo.timestamp && Number((selectedEvent.selectedEventVideo.timestamp / 1000).toFixed(3));
    let videoElement;
    const playingTimeIntervalRef = useRef<NodeJS.Timeout>();
    useEffect(() => {
        videoElement = document.getElementById('my-video') as HTMLMediaElement;
        if (timestamp) {
            // const eventVideoElement = document.getElementById(selectedEvent.selectedEventVideo.id.toString()) as HTMLElement;
            // console.log('eventVideoElement',eventVideoElement)
            // eventVideoElement.classList.add('selected')
            videoElement.currentTime = timestamp
        }
        console.log('selectedEvent',selectedEvent)
    },[selectedEvent]);
    useEffect(() => {
        dispatch(loadingEventList());
        if (timestamp) {
            console.log('delete')
            setTimeout(() => {
                dispatch(deleteEventVideo())
                clearInterval(playingTimeIntervalRef.current as NodeJS.Timeout);
            }, duration)
        }
    },[timestamp])
    return (
        <div className="video-window-container">
            <video
                id="my-video"
                className="video-js"
                controls
                preload="auto"
                width="640"
                height="264"
                poster="../../../public/poster.png"
                data-setup="{}"
            >
                <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                        type="video/mp4"/>
            </video>
            {!!selectedEvent.selectedEventVideo.timestamp && (<div style={rectangleStyle} className='green-rectangle'/>)}
            <script src="https://vjs.zencdn.net/7.20.2/video.min.js"/>
        </div>
    )
}

export default VideoWindow;