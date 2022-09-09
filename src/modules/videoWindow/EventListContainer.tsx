import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectEventVideo } from "../../store/slices/eventVideoSlice";
import { selectEventList } from "../../store/slices/eventVideoListSlice";

type EventType = {
    id: number,
    timestamp: number,
    duration: number
}

const EventListContainer = () => {
    const dispatch = useAppDispatch();
    const { eventList } = useAppSelector(selectEventList);
    const [isPlaying, setIsPlaying] = useState(false);
    let videoElement: HTMLMediaElement ;
    const playingTimeIntervalRef = useRef<NodeJS.Timeout>();
    useEffect(()=> {
        videoElement = document.getElementById('my-video') as HTMLMediaElement;
        videoElement.addEventListener('playing', isPlayingListener)
        videoElement.addEventListener('pause', isPausedListener)
        if (isPlaying) {
            playingTimeIntervalRef.current = setInterval(() => {
                eventList.forEach((item) => {
                    const ms = item.timestamp.toString();
                    const sec = (Math.floor(Number(item.timestamp)/1000)%60).toString();
                    const totalTimer = Number(`${sec}.${ms}`);
                        if (videoElement.currentTime === totalTimer) {
                            dispatch(selectEventVideo(item))
                        }
                    })
            }, 100)
        } else {
            clearInterval(playingTimeIntervalRef.current as NodeJS.Timeout);
        }
    },[isPlaying])
    const isPlayingListener = () => {
        console.log('isPlaying')
        setIsPlaying(true);
    }
    const isPausedListener = () => {
        console.log('isPaused')
        setIsPlaying(false);
    }

    const handleEventClick = (e: React.MouseEvent ) => {
        const id = Number(e.currentTarget.id)
        const selectedEvent = eventList.find(item => item.id === id)
        dispatch(selectEventVideo(selectedEvent))
    }
    const renderEvent = (event: EventType) => {
        const totalMs = event.timestamp;
        let min = Math.floor(Number(totalMs)/60000).toString();
        let sec = (Math.floor(Number(totalMs)/1000)%60).toString();
        const ms = totalMs.toString().slice(-3,-1);
        if(Number(min) < 9) {
            min = `0${min}`
        }
        if(Number(sec) < 9) {
            sec = `0${sec}`
        }
        const totalTimeString = `${min} : ${sec} : ${ms}`
        return (
            <div key={event.id} id={event.id.toString()} className="event" onClick={handleEventClick}>
                <div>{totalTimeString}</div>
            </div>
        )
    }
    return (
        <div className="event-list-container">
            {eventList.map((event) => renderEvent(event))}
        </div>
    )
}

export default EventListContainer;