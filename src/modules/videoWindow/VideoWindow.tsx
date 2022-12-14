import React, {useEffect, useRef, useState} from 'react';
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteEventVideo, selectEvent, selectEventVideo } from "../../store/slices/eventVideoSlice";
import { markEvent, selectEventList } from "../../store/slices/eventVideoListSlice";

const VideoWindow = () => {
    const dispatch = useAppDispatch();
    const selectedEvent = useAppSelector(selectEvent);
    const rectangleStyle = selectedEvent.selectedEventVideo.zone;
    const { duration } = selectedEvent.selectedEventVideo;
    const timestamp = selectedEvent.selectedEventVideo && selectedEvent.selectedEventVideo.timestamp && Number((selectedEvent.selectedEventVideo.timestamp / 1000).toFixed(3));
    const videoElementRef = useRef<HTMLVideoElement>(null)
    const playingTimeoutRef = useRef<NodeJS.Timeout>();
    const { eventList } = useAppSelector(selectEventList);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isSeeking, setIsSeeking] = useState(false);
    const isPlayingListener = () => {
        console.log('isPlaying')
        setIsPlaying(true);
    }
    const isPausedListener = () => {
        console.log('isPaused')
        setIsPlaying(false);
    }
    const isSeekingListener = () => {
        console.log('seeking')
        setIsSeeking(true);
    }
    const isSeekedListener = () => {
        console.log('seeked')
        setIsSeeking(false);
    }
    useEffect(()=> {
        // @ts-ignore: Object is possibly 'null'.
        videoElementRef.current.addEventListener('playing', isPlayingListener)
        // @ts-ignore: Object is possibly 'null'.
        videoElementRef.current.addEventListener('pause', isPausedListener)
        // @ts-ignore: Object is possibly 'null'.
        videoElementRef.current.addEventListener('seeked', isSeekedListener)
        // @ts-ignore: Object is possibly 'null'.
        videoElementRef.current.addEventListener('seeking', isSeekingListener)
        if (isPlaying) {
            clearTimeout(playingTimeoutRef.current as NodeJS.Timeout);
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
                const nextEvent = futureEvents[0];
                const nextEventTime = nextEvent.timestamp - totalVideoMs;
                playingTimeoutRef.current = setTimeout(() => {
                    dispatch(selectEventVideo(nextEvent))
                    dispatch(markEvent(nextEvent.id));
                }, nextEventTime)
            }
        } else {
            clearTimeout(playingTimeoutRef.current as NodeJS.Timeout);
        }
    },[isPlaying, eventList, selectedEvent, isSeeking])
    useEffect(() => {
        if (timestamp) {
            // @ts-ignore: Object is possibly 'null'.
            videoElementRef.current.currentTime = timestamp
        }
        if (timestamp && isPlaying) {
            setTimeout(() => {
                dispatch(deleteEventVideo())
                clearInterval(playingTimeoutRef.current as NodeJS.Timeout);
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
            >
                <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                        type="video/mp4"/>
            </video>
            {!!selectedEvent.selectedEventVideo.timestamp && (<div style={rectangleStyle} className='green-rectangle'/>)}
        </div>
    )
}

export default VideoWindow;