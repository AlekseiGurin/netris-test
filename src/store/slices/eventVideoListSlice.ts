import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import events from '../../modules/videoWindow/eventList.json';

const sortedListOfEvents = events.events.sort((a, b) => a.timestamp - b.timestamp )

interface EventVideo {
    timestamp: number,
    id: number,
    zone: {
        top: number,
        left: number,
        height: number,
        width: number
    },
    duration: number
}

export interface eventVideoListState {
    eventList: EventVideo[] | []

}

const initialState: eventVideoListState = {
    eventList: [
        {
            timestamp: 0,
            id: 0,
            duration: 0,
            zone: {
                top: 0,
                left: 0,
                height: 0,
                width: 0
            }
        }
    ]
};

export const eventVideoListSlice = createSlice({
    name: 'EvenVideoListSelector',
    initialState,
    reducers: {
        loadingEventList: (state) => {
            state.eventList = sortedListOfEvents
        }
    }
});

export const { loadingEventList } = eventVideoListSlice.actions;

export const selectEventList = (state: RootState) => state.eventList;

export default eventVideoListSlice.reducer;