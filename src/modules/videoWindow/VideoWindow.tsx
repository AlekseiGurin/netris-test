import React, {useEffect, useRef, useState} from 'react';
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteEventVideo, selectEvent, selectEventVideo } from "../../store/slices/eventVideoSlice";
import 'video.js/dist/video-js.css';
import { markEvent, selectEventList } from "../../store/slices/eventVideoListSlice";

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
            // @ts-ignore: Object is possibly 'null'.
            const videoCurrentTime = videoElementRef.current.currentTime.toString();
            const dot = videoCurrentTime.indexOf('.');
            const sec = +videoCurrentTime.slice(0, dot);
            const ms = videoCurrentTime.slice(dot +1, dot + 4);
            const totalVideoMs = +sec * 1000 + +ms;
            const futureEvents = eventList.filter((item) => {
                return item.timestamp > totalVideoMs
            })
            if(futureEvents.length) {
                const firstFutureEvents = futureEvents[0];
                const nextEventTime = firstFutureEvents.timestamp - totalVideoMs;
                playingTimeIntervalRef.current = setTimeout(() => {
                    dispatch(selectEventVideo(firstFutureEvents))
                    dispatch(markEvent(firstFutureEvents.id));
                }, nextEventTime)
            }
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