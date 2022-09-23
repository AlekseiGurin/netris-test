import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface EventVideoState {
    selectedEventVideo: {
        timestamp: number,
        id: number,
        duration: number,
        zone: {
            top: number,
            left: number,
            height: number,
            width: number
        }
    }
}

const initialState: EventVideoState = {
    selectedEventVideo: {
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
};

export const eventVideoSelectorSlice = createSlice({
    name: 'eventVideoSelector',
    initialState,
    reducers: {
        selectEventVideo: (state, PayloadAction) => {
            state.selectedEventVideo = PayloadAction.payload;
        },
        deleteEventVideo: (state) => {
            state.selectedEventVideo = {
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
        }
    }
});

export const { selectEventVideo, deleteEventVideo } = eventVideoSelectorSlice.actions;
export const selectEvent = (state: RootState) => state.selectedEventVideo;
export default eventVideoSelectorSlice.reducer;