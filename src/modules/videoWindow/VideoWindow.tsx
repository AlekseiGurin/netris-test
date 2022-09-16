import React, {useEffect, useRef, useState} from 'react';
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteEventVideo, selectEvent, selectEventVideo } from "../../store/slices/eventVideoSlice";
import 'video.js/dist/video-js.css';
import { selectEventList } from "../../store/slices/eventVideoListSlice";

const VideoWindow = () => {
    const dispatch = useAppDispatch();
    const selectedEvent = useAppSelector(selectEvent);
    const rectangleStyle = selectedEvent.selectedEventVideo.zone;
    const { duration } = selectedEvent.selectedEventVideo;
    const timestamp = selectedEvent.selectedEventVideo && selectedEvent.selectedEventVideo.timestamp && Number((selectedEvent.selectedEventVideo.timestamp / 1000).toFixed(3));
    const videoElementRef = useRef<HTMLVideoElement>(null)
    const playingTimeIntervalRef = useRef<NodeJS.Timeout>();

    // TODO
    const { eventList } = useAppSelector(selectEventList);
    const [isPlaying, setIsPlaying] = useState(false);
    useEffect(()=> {
        // @ts-ignore: Object is possibly 'null'.
        videoElementRef.current.addEventListener('playing', isPlayingListener)
        // @ts-ignore: Object is possibly 'null'.
        videoElementRef.current.addEventListener('pause', isPausedListener)
        if (isPlaying) {
            playingTimeIntervalRef.current = setInterval(() => {
                eventList.forEach((item) => {
                    const ms = item.timestamp.toString();
                    const sec = (Math.floor(Number(item.timestamp)/1000)%60).toString();
                    const totalTimer = Number(`${sec}.${ms}`);
                    // @ts-ignore: Object is possibly 'null'.
                    if (videoElementRef.currentTime === totalTimer) {
                        dispatch(selectEventVideo(item))
                    }
                })
            }, 100)
        } else {
            clearInterval(playingTimeIntervalRef.current as NodeJS.Timeout);
        }
    },[isPlaying, eventList])
    const isPlayingListener = () => {
        console.log('isPlaying')
        setIsPlaying(true);
    }
    const isPausedListener = () => {
        console.log('isPaused')
        setIsPlaying(false);
    }
    // TODO

    useEffect(() => {
        if (timestamp) {
            // @ts-ignore: Object is possibly 'null'.
            videoElementRef.current.currentTime = timestamp
        }
        if (timestamp && isPlaying) {
            setTimeout(() => {
                dispatch(deleteEventVideo())
                clearInterval(playingTimeIntervalRef.current as NodeJS.Timeout);
            }, duration)
        }
    },[timestamp, duration, isPlaying])
    return (
        <div className="video-window-container">
            <video
                ref={videoElementRef}
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