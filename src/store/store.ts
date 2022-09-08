import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../modules/counter/counterSlice';
import eventVideoSelectorReducer from "./slices/eventVideoSlice";
import eventVideoListSlice from "./slices/eventVideoListSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    selectedEventVideo: eventVideoSelectorReducer,
    eventList: eventVideoListSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
