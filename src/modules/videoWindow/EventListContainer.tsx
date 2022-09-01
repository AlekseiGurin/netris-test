import React, { useState } from "react";
import eventList from "./eventList.json"
import moment from "moment";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {eventVideoSelection, selectEvent} from "../../store/slices/eventVideoSlice";
const sortedListOfEvents = eventList.events.sort((a, b) => a.timestamp - b.timestamp )

type EventType = {
    id: number,
    timestamp: number,
    duration: number
}

const EventListContainer = () => {
    console.log('sortedListOfEvents',sortedListOfEvents)
    const handleEventClick = (e: React.MouseEvent ) => {
        const id = Number(e.currentTarget.id)
        console.log('id',id)
        console.log('eventList', sortedListOfEvents)
        const selectedEvent = sortedListOfEvents.find(item => item.id === id)
        console.log('selectedEvent',selectedEvent)
        dispatch(eventVideoSelection(selectedEvent))
    }
    const renderEvent = (event: EventType) => {
        const totalMs = event.timestamp;
        let min = Math.floor(Number(totalMs)/60000).toString();
        let sec = (Math.floor(Number(totalMs)/1000)%60).toString();
        const ms = totalMs.toString().slice(-3,-1);
        if(Number(min) < 9) {
            min = `0${min}`
        };
        if(Number(sec) < 9) {
            sec = `0${sec}`
        }
        const totalTimeString = `${min} : ${sec} : ${ms}`
// console.log('totalMs',totalMs)
// console.log('min',min)
// console.log('sec',sec)
// console.log('ms',ms)
// console.log('totalTimeString',totalTimeString)
        return (
            <div key={event.id} id={event.id.toString()} className="event" onClick={handleEventClick}>
                <div>{totalTimeString}</div>
            </div>
        )
    }
    const dispatch = useAppDispatch();
    return (
        <div className="event-list-container">
            {sortedListOfEvents.map((event) => renderEvent(event))}
        </div>
    )
}

export default EventListContainer;