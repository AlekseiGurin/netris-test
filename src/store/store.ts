import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import eventVideoSelectorReducer from "./slices/eventVideoSlice";
import eventVideoListSlice from "./slices/eventVideoListSlice";

export const store = configureStore({
  reducer: {
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
