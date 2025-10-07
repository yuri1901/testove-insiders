import { useState, useEffect } from "react";
import { mockRooms, type Room } from "../mockData";
import type { Room as RoomType } from "../mockData";
const STORAGE_KEY = "rooms-data";

const loadRoomsFromStorage = (): Room[] => {
  try {
    const storedRooms = localStorage.getItem(STORAGE_KEY);
    if (storedRooms) {
      return JSON.parse(storedRooms);
    }
  } catch (error) {
    console.error("Помилка завантаження з localStorage:", error);
  }
  return mockRooms; // Повертаємо мокові дані як fallback
};

const saveRoomsToStorage = (rooms: Room[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rooms));
  } catch (error) {
    console.error("Помилка збереження в localStorage:", error);
  }
};

export const useRooms = () => {
  const [rooms, setRooms] = useState<Room[]>(() => loadRoomsFromStorage());
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    saveRoomsToStorage(rooms);
  }, [rooms]);

  const createRoom = (roomData: { name: string; description: string }) => {
    const newRoom: RoomType = {
      id: `room-${Date.now()}`,
      name: roomData.name,
      description: roomData.description,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setRooms((prev: RoomType[]) => {
      const updatedRooms = [...prev, newRoom];
      return updatedRooms;
    });
    setIsCreateModalOpen(false);
    setFormData({ name: "", description: "" });
  };

  const editRoom = (roomData: { name: string; description: string }) => {
    if (!selectedRoom) return;

    const updatedRoom: RoomType = {
      ...selectedRoom,
      name: roomData.name,
      description: roomData.description,
    };

    setRooms((prev) => {
      const updatedRooms = prev.map((room: Room) => (room.id === updatedRoom.id ? updatedRoom : room));
      return updatedRooms;
    });
    setIsEditModalOpen(false);
    setSelectedRoom(null);
    setFormData({ name: "", description: "" });
  };

  // delete room
  const deleteRoom = (roomId: string) => {
    if (window.confirm("Ви впевнені, що хочете видалити цю кімнату?")) {
      setRooms((prev) => {
        const updatedRooms = prev.filter((room) => room.id !== roomId);
        return updatedRooms;
      });
    }
  };

  // event handler
  const handleCreateRoom = () => {
    setFormData({ name: "", description: "" });
    setIsCreateModalOpen(true);
  };

  const handleEditRoom = (room: Room) => {
    setSelectedRoom(room);
    setFormData({ name: room.name, description: room.description });
    setIsEditModalOpen(true);
  };

  const handleDeleteRoom = (roomId: string) => {
    deleteRoom(roomId);
  };

  // handle change form
  const handleFormChange = (field: "name" | "description", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // send form
  const handleCreateSubmit = (data: { name: string; description: string }) => {
    if (!data.name.trim() || !data.description.trim()) {
      alert("Будь ласка, заповніть всі поля");
      return;
    }
    createRoom(data);
  };

  // send form edit
  const handleEditSubmit = (data: { name: string; description: string }) => {
    if (!data.name.trim() || !data.description.trim()) {
      alert("Будь ласка, заповніть всі поля");
      return;
    }
    editRoom(data);
  };

  // close modal window
  const closeModals = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedRoom(null);
    setFormData({ name: "", description: "" });
  };

  return {
    // data
    rooms,
    selectedRoom,
    isEditModalOpen,
    isCreateModalOpen,
    formData,

    // action
    handleCreateRoom,
    handleEditRoom,
    handleDeleteRoom,
    handleFormChange,
    handleCreateSubmit,
    handleEditSubmit,
    closeModals,
  };
};
