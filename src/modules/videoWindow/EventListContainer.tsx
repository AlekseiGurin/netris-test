import React from "react";
import eventList from "./eventList.json"

const arrayEvents = eventList.events

const EventListContainer = () => {
    console.log('arrayEvents',arrayEvents)
    return (
        <div className="event-list-container">
            {arrayEvents.map((event) => (
                <div key={event.id} className="event">
                    <div>{`id: ${event.id}`}</div>
                    <div>{`timestamp: ${event.timestamp}`}</div>
                    <div>{`duration:${event.duration}`}</div>
                </div>
            )) }
        </div>
    )
}

export default EventListContainer;