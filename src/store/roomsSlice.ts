import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { type Room } from "../types";

const STORAGE_KEY = "rooms-data";

interface RoomsState {
  rooms: Room[];
  isEditModalOpen: boolean;
  isCreateModalOpen: boolean;
  selectedRoom: Room | null;
  formData: {
    name: string;
    description: string;
  };
}

const loadRoomsFromStorage = (): Room[] => {
  try {
    const storedRooms = localStorage.getItem(STORAGE_KEY);
    if (storedRooms) {
      const rooms = JSON.parse(storedRooms);
      return rooms.map((room: any) => ({
        ...room,
        members: room.members || [],
      }));
    }
  } catch (error) {
    console.log(error);
  }
  return [];
};

const saveRoomsToStorage = (rooms: Room[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rooms));
  } catch (error) {
    console.log(error);
  }
};

const initialState: RoomsState = {
  rooms: loadRoomsFromStorage(),
  isEditModalOpen: false,
  isCreateModalOpen: false,
  selectedRoom: null,
  formData: {
    name: "",
    description: "",
  },
};

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    // create room
    createRoom: (state, action: PayloadAction<{ name: string; description: string; createdBy: string }>) => {
      const newRoom: Room = {
        id: `room-${Date.now()}`,
        name: action.payload.name,
        description: action.payload.description,
        createdAt: new Date().toISOString().split("T")[0],
        members: [
          {
            email: action.payload.createdBy,
            role: "admin",
            addedAt: new Date().toISOString(),
            addedBy: action.payload.createdBy,
          },
        ],
      };
      state.rooms.push(newRoom);
      saveRoomsToStorage(state.rooms);
      state.isCreateModalOpen = false;
      state.formData = { name: "", description: "" };
    },

    // edit room
    editRoom: (state, action: PayloadAction<{ name: string; description: string }>) => {
      if (!state.selectedRoom) return;

      const roomIndex = state.rooms.findIndex((room) => room.id === state.selectedRoom!.id);
      if (roomIndex !== -1) {
        state.rooms[roomIndex] = {
          ...state.rooms[roomIndex],
          name: action.payload.name,
          description: action.payload.description,
        };
        saveRoomsToStorage(state.rooms);
      }
      state.isEditModalOpen = false;
      state.selectedRoom = null;
      state.formData = { name: "", description: "" };
    },

    // delete room
    deleteRoom: (state, action: PayloadAction<string>) => {
      if (window.confirm("Ви впевнені, що хочете видалити цю кімнату?")) {
        state.rooms = state.rooms.filter((room) => room.id !== action.payload);
        saveRoomsToStorage(state.rooms);
      }
    },

    // nandle modal
    handleCreateRoom: (state) => {
      state.formData = { name: "", description: "" };
      state.isCreateModalOpen = true;
    },

    handleEditRoom: (state, action: PayloadAction<Room>) => {
      state.selectedRoom = action.payload;
      state.formData = { name: action.payload.name, description: action.payload.description };
      state.isEditModalOpen = true;
    },

    handleDeleteRoom: (state, action: PayloadAction<string>) => {
      if (window.confirm("Ви впевнені, що хочете видалити цю кімнату?")) {
        state.rooms = state.rooms.filter((room) => room.id !== action.payload);
        saveRoomsToStorage(state.rooms);
      }
    },

    // change form
    handleFormChange: (state, action: PayloadAction<{ field: "name" | "description"; value: string }>) => {
      state.formData[action.payload.field] = action.payload.value;
    },

    // send create form
    handleCreateSubmit: (state, action: PayloadAction<{ name: string; description: string; createdBy: string }>) => {
      if (!action.payload.name.trim() || !action.payload.description.trim()) {
        alert("Будь ласка, заповніть всі поля");
        return;
      }

      const newRoom: Room = {
        id: `room-${Date.now()}`,
        name: action.payload.name,
        description: action.payload.description,
        createdAt: new Date().toISOString().split("T")[0],
        members: [
          {
            email: action.payload.createdBy,
            role: "admin",
            addedAt: new Date().toISOString(),
            addedBy: action.payload.createdBy,
          },
        ],
      };
      state.rooms.push(newRoom);
      saveRoomsToStorage(state.rooms);
      state.isCreateModalOpen = false;
      state.formData = { name: "", description: "" };
    },

    // send edit form
    handleEditSubmit: (state, action: PayloadAction<{ name: string; description: string }>) => {
      if (!action.payload.name.trim() || !action.payload.description.trim()) {
        alert("Будь ласка, заповніть всі поля");
        return;
      }

      if (!state.selectedRoom) return;

      const roomIndex = state.rooms.findIndex((room) => room.id === state.selectedRoom!.id);
      if (roomIndex !== -1) {
        state.rooms[roomIndex] = {
          ...state.rooms[roomIndex],
          name: action.payload.name,
          description: action.payload.description,
        };
        saveRoomsToStorage(state.rooms);
      }
      state.isEditModalOpen = false;
      state.selectedRoom = null;
      state.formData = { name: "", description: "" };
    },

    // Room members management
    addRoomMember: (state, action: PayloadAction<{ roomId: string; email: string; role: "admin" | "user"; addedBy: string }>) => {
      const room = state.rooms.find((r) => r.id === action.payload.roomId);
      if (room) {
        // Check if member already exists
        const existingMember = room.members.find((m) => m.email === action.payload.email);
        if (!existingMember) {
          room.members.push({
            email: action.payload.email,
            role: action.payload.role,
            addedAt: new Date().toISOString(),
            addedBy: action.payload.addedBy,
          });
          saveRoomsToStorage(state.rooms);
        }
      }
    },

    updateRoomMemberRole: (state, action: PayloadAction<{ roomId: string; email: string; role: "admin" | "user" }>) => {
      const room = state.rooms.find((r) => r.id === action.payload.roomId);
      if (room) {
        const member = room.members.find((m) => m.email === action.payload.email);
        if (member) {
          member.role = action.payload.role;
          saveRoomsToStorage(state.rooms);
        }
      }
    },

    removeRoomMember: (state, action: PayloadAction<{ roomId: string; email: string }>) => {
      const room = state.rooms.find((r) => r.id === action.payload.roomId);
      if (room) {
        room.members = room.members.filter((m) => m.email !== action.payload.email);
        saveRoomsToStorage(state.rooms);
      }
    },

    // close modal
    closeModals: (state) => {
      state.isCreateModalOpen = false;
      state.isEditModalOpen = false;
      state.selectedRoom = null;
      state.formData = { name: "", description: "" };
    },
  },
});

export const { createRoom, editRoom, deleteRoom, handleCreateRoom, handleEditRoom, handleDeleteRoom, handleFormChange, handleCreateSubmit, handleEditSubmit, addRoomMember, updateRoomMemberRole, removeRoomMember, closeModals } = roomsSlice.actions;

export default roomsSlice.reducer;
