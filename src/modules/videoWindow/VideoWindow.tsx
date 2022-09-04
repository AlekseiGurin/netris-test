import React, {useEffect, useRef, useState} from 'react';
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {deleteEventVideo, selectEvent, selectEventVideo} from "../../store/slices/eventVideoSlice";
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import eventList from "./eventList.json"


const VideoWindow = () => {
    const dispatch = useAppDispatch();
    const selectedEvent = useAppSelector(selectEvent)
    const rectangleStyle = selectedEvent.selectedEventVideo.zone;
    const { duration } = selectedEvent.selectedEventVideo;
    const [currentTimer, setCurrentTimer] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const timestamp = selectedEvent.selectedEventVideo && selectedEvent.selectedEventVideo.timestamp && Number((selectedEvent.selectedEventVideo.timestamp / 1000).toFixed(3));
    const isPlayingListener = (e: object) => {
        console.log('isPlaying')
        setIsPlaying(true);
    }
    const isPausedListener = (e: object) => {
        console.log('isPaused')
        setIsPlaying(false);
    }
    const playingTimeIntervalRef = useRef<NodeJS.Timeout>();
    useEffect(() => {
        const videoElement = document.getElementById('my-video') as HTMLMediaElement;
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
    },[selectedEvent]);
    useEffect(() => {
        console.log('render')
        const videoElement = document.getElementById('my-video') as HTMLMediaElement;
        videoElement.addEventListener('playing', isPlayingListener)
        videoElement.addEventListener('pause', isPausedListener)
        console.log('videoElement',videoElement);
        if (isPlaying) {
            playingTimeIntervalRef.current = setInterval(() => {
                eventList.events.forEach((item) => {
                    let sec = Math.floor(Number(item.timestamp)/1000);
                    console.log('item', item)
                    console.log('sec', sec)
                    console.log('videoElement', videoElement.currentTime)
                    if (videoElement && videoElement.currentTime > sec) {
                        console.log('green  rectangle', item)
                        dispatch(selectEventVideo(item))
                    }
                })
            },1000)
        } else {
            console.log('else')
            clearInterval(playingTimeIntervalRef.current as NodeJS.Timeout);
        }

    },[isPlaying])
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
            <script src="https://vjs.zencdn.net/7.20.2/video.min.js"></script>
        </div>
    )
}

export default VideoWindow;