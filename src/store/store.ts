import { configureStore } from "@reduxjs/toolkit";
import roomsReducer from "./roomsSlice";
import bookingsReducer from "./bookingsSlice";

export const store = configureStore({
  reducer: {
    rooms: roomsReducer,
    bookings: bookingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
