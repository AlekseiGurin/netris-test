import React, { useState } from "react";
import eventList from "./eventList.json"
import moment from "moment";
const sortedListOfEvents = eventList.events.sort((a, b) => a.timestamp - b.timestamp )

type EventType = {
    id: number,
    timestamp: number,
    duration: number
}
const handleEventClick = (e: React.MouseEvent ) => {
    console.log('event',e)
    console.log('currentTarget',e.currentTarget)
}
const renderEvent = (event: EventType) => {
const totalMs = event.timestamp;
const min = Math.floor(Number(totalMs)/60000);
const sec = Math.floor(Number(totalMs)/1000);
const ms = totalMs.toString().slice(-3)
const totalTimeString = `${min} : ${sec} : ${ms}`
// console.log('totalMs',totalMs)
// console.log('min',min)
// console.log('sec',sec)
// console.log('ms',ms)
// console.log('totalTimeString',totalTimeString)
    return (
        <div key={event.id} id={event.id.toString()} className="event" onClick={handleEventClick}>
            <div>{`id: ${event.id}`}</div>
            <div>{`timestamp: ${totalTimeString}`}</div>
            <div>{`duration: ${event.duration}`}</div>
        </div>
    )
}
const EventListContainer = () => {
    //console.log('sortedListOfEvents',sortedListOfEvents)
    return (
        <div className="event-list-container">
            {sortedListOfEvents.map((event) => renderEvent(event))}
        </div>
    )
}

export default EventListContainer;