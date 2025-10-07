import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { type Booking } from "../types";

const STORAGE_KEY = "bookings-data";

interface BookingsState {
  bookings: Booking[];
  isCreateModalOpen: boolean;
  isEditModalOpen: boolean;
  selectedBooking: Booking | null;
  formData: {
    roomId: string;
    date: string;
    startTime: string;
    endTime: string;
    description: string;
  };
}

const loadBookingsFromStorage = (): Booking[] => {
  try {
    const storedBookings = localStorage.getItem(STORAGE_KEY);
    if (storedBookings) {
      return JSON.parse(storedBookings);
    }
  } catch (error) {
    console.log(error);
  }
  return [];
};

const saveBookingsToStorage = (bookings: Booking[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  } catch (error) {
    console.log(error);
  }
};

const hasTimeConflict = (bookings: Booking[], newBooking: Omit<Booking, "id" | "createdAt" | "status">): boolean => {
  return bookings.some((booking) => {
    if (booking.roomId !== newBooking.roomId || booking.date !== newBooking.date || booking.status === "cancelled") {
      return false;
    }

    const existingStart = booking.startTime;
    const existingEnd = booking.endTime;
    const newStart = newBooking.startTime;
    const newEnd = newBooking.endTime;

    return newStart < existingEnd && newEnd > existingStart;
  });
};

const initialState: BookingsState = {
  bookings: loadBookingsFromStorage(),
  isCreateModalOpen: false,
  isEditModalOpen: false,
  selectedBooking: null,
  formData: {
    roomId: "",
    date: "",
    startTime: "",
    endTime: "",
    description: "",
  },
};

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    createBooking: (state, action: PayloadAction<{ roomId: string; date: string; startTime: string; endTime: string; description: string }>) => {
      if (hasTimeConflict(state.bookings, action.payload)) {
        alert("Конфлікт часу: ця кімната вже заброньована на цей час");
        return;
      }

      const newBooking: Booking = {
        id: `booking-${Date.now()}`,
        roomId: action.payload.roomId,
        date: action.payload.date,
        startTime: action.payload.startTime,
        endTime: action.payload.endTime,
        description: action.payload.description,
        status: "active",
        createdAt: new Date().toISOString().split("T")[0],
      };
      state.bookings.push(newBooking);
      saveBookingsToStorage(state.bookings);
      state.isCreateModalOpen = false;
      state.formData = { roomId: "", date: "", startTime: "", endTime: "", description: "" };
    },

    editBooking: (state, action: PayloadAction<{ id: string; roomId: string; date: string; startTime: string; endTime: string; description: string }>) => {
      const bookingIndex = state.bookings.findIndex((booking) => booking.id === action.payload.id);
      if (bookingIndex === -1) return;

      const otherBookings = state.bookings.filter((b) => b.id !== action.payload.id);
      if (hasTimeConflict(otherBookings, action.payload)) {
        alert("Конфлікт часу: ця кімната вже заброньована на цей час");
        return;
      }

      state.bookings[bookingIndex] = {
        ...state.bookings[bookingIndex],
        roomId: action.payload.roomId,
        date: action.payload.date,
        startTime: action.payload.startTime,
        endTime: action.payload.endTime,
        description: action.payload.description,
      };
      saveBookingsToStorage(state.bookings);
      state.isEditModalOpen = false;
      state.selectedBooking = null;
      state.formData = { roomId: "", date: "", startTime: "", endTime: "", description: "" };
    },

    cancelBooking: (state, action: PayloadAction<string>) => {
      const bookingIndex = state.bookings.findIndex((booking) => booking.id === action.payload);
      if (bookingIndex !== -1) {
        state.bookings[bookingIndex].status = "cancelled";
        saveBookingsToStorage(state.bookings);
      }
    },

    handleCreateBooking: (state) => {
      state.formData = { roomId: "", date: "", startTime: "", endTime: "", description: "" };
      state.isCreateModalOpen = true;
    },

    handleEditBooking: (state, action: PayloadAction<Booking>) => {
      state.selectedBooking = action.payload;
      state.formData = {
        roomId: action.payload.roomId,
        date: action.payload.date,
        startTime: action.payload.startTime,
        endTime: action.payload.endTime,
        description: action.payload.description,
      };
      state.isEditModalOpen = true;
    },

    handleFormChange: (state, action: PayloadAction<{ field: keyof BookingsState["formData"]; value: string }>) => {
      state.formData[action.payload.field] = action.payload.value;
    },

    closeModals: (state) => {
      state.isCreateModalOpen = false;
      state.isEditModalOpen = false;
      state.selectedBooking = null;
      state.formData = { roomId: "", date: "", startTime: "", endTime: "", description: "" };
    },
  },
});

export const { createBooking, editBooking, cancelBooking, handleCreateBooking, handleEditBooking, handleFormChange, closeModals } = bookingsSlice.actions;

export default bookingsSlice.reducer;
