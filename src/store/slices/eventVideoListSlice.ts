import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import events from '../../modules/videoWindow/eventList.json';

const sortedListOfEvents = events.events.sort((a, b) => a.timestamp - b.timestamp )

export interface EventVideo {
    timestamp: number,
    id: number,
    zone: {
        top: number,
        left: number,
        height: number,
        width: number
    },
    duration: number,
    marked?: boolean | undefined
}

export interface eventVideoListState {
    eventList: EventVideo[] | []
}

const initialState: eventVideoListState = {
    eventList: []
};

// type MarkEventPayloadType = {
//     id: number
// }

export const eventVideoListSlice = createSlice({
    name: 'EvenVideoListSelector',
    initialState,
    reducers: {
        loadingEventList: (state) => {
            console.log('loadingEventList')
            state.eventList = sortedListOfEvents
        },
        markEvent: (state, PayloadAction ) => {
            console.log('PayloadAction markEvent',PayloadAction)
            const updatedEventList = sortedListOfEvents.map((item: EventVideo)  => {
                if(item.id === PayloadAction.payload) {
                    item = {...item, marked: true}
                    console.log('!!!!!!ITEM', item)
                }
                return item
            })

            console.log('updatedEventList',updatedEventList)
            state.eventList = updatedEventList
            console.log('state.eventList',state.eventList)
        }
    }
});

export const { loadingEventList, markEvent } = eventVideoListSlice.actions;

export const selectEventList = (state: RootState) => state.eventList;

export default eventVideoListSlice.reducer;