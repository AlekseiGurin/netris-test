import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../store/store';
import eventList from "../../modules/videoWindow/eventList.json";
import {EventVideoState} from "./eventVideoSlice";
//import { fetchCount } from './counterAPI';

const sortedListOfEvents = eventList.events.sort((a, b) => a.timestamp - b.timestamp )

export interface EvenVideoListState {
    eventList?: []
};

const initialState: EvenVideoListState = {
    eventList: []
};

export const eventVideoSelectorSlice = createSlice({
    name: 'EvenVideoListSelector',
    initialState,
    reducers: {
        loadingEventList: (state, PayloadAction) => {

        }
    }
});
