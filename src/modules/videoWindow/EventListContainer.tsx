import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectEventVideo } from "../../store/slices/eventVideoSlice";
import { EventVideo, loadingEventList, markEvent, selectEventList } from "../../store/slices/eventVideoListSlice";

const EventListContainer = () => {
    const dispatch = useAppDispatch();
    const { eventList } = useAppSelector(selectEventList);
    useEffect(() => {
        dispatch(loadingEventList());

    }, [])

    const handleEventClick = (e: React.MouseEvent ) => {
        const id = Number(e.currentTarget.id)
        //const selectedEvent = eventList.find(item => item.id === id)
        //dispatch(selectEventVideo(selectedEvent));
        dispatch(markEvent(id));
    }
    const renderEvent = (event: EventVideo) => {
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
            <div key={event.id} id={event.id.toString()} className={event.marked ? 'event selected' : 'event'} onClick={handleEventClick}>
                <div>{totalTimeString}</div>
            </div>
        )
    }
    return (
        <div className="event-list-container">
            {eventList.map((event: EventVideo) => renderEvent(event))}
        </div>
    )
}

export default EventListContainer;