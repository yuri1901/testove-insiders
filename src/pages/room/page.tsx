import { useState } from "react";

interface Room {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

const RoomPage = () => {
  const [rooms] = useState<Room[]>([
    {
      id: "1",
      name: "Переговорна А",
      description: "Велика кімната для важливих зустрічей",
      createdAt: "2024-10-01",
    },
    {
      id: "2",
      name: "Переговорна Б",
      description: "Затишна кімната для невеликих команд",
      createdAt: "2024-10-02",
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleCreateRoom = () => {
    setFormData({ name: "", description: "" });
    setShowCreateModal(true);
  };

  const handleEditRoom = (room: Room) => {
    setSelectedRoom(room);
    setFormData({ name: room.name, description: room.description });
    setShowEditModal(true);
  };

  const handleDeleteRoom = (roomId: string) => {
    if (window.confirm("Ви впевнені, що хочете видалити цю кімнату?")) {
      // Логіка видалення буде тут
      console.log("Видалення кімнати з ID:", roomId);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (showCreateModal) {
      // Логіка створення нової кімнати
      console.log("Створення нової кімнати:", formData);
    } else if (showEditModal) {
      // Логіка редагування кімнати
      console.log("Редагування кімнати:", selectedRoom?.id, formData);
    }
    closeModals();
  };

  const closeModals = () => {
    setShowCreateModal(false);
    setShowEditModal(false);
    setSelectedRoom(null);
    setFormData({ name: "", description: "" });
  };

  return (
    <main style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "30px" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "10px", color: "#333" }}>Управління переговорними кімнатами</h1>
        <button
          onClick={handleCreateRoom}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          + Створити кімнату
        </button>
      </div>

      {/* Список кімнат */}
      <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}></div>

      {/*  <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "8px",
              width: "90%",
              maxWidth: "500px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ margin: "0 0 20px 0", color: "#333" }}>{showCreateModal ? "Створити нову кімнату" : "Редагувати кімнату"}</h2>

            <form onSubmit={handleFormSubmit}>
              <div style={{ marginBottom: "20px" }}>
                <label
                  htmlFor="name"
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "500",
                    color: "#333",
                  }}
                >
                  Назва кімнати *
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "16px",
                    boxSizing: "border-box",
                  }}
                  placeholder="Введіть назву кімнати"
                />
              </div>

              <div style={{ marginBottom: "30px" }}>
                <label
                  htmlFor="description"
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "500",
                    color: "#333",
                  }}
                >
                  Опис кімнати *
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "16px",
                    boxSizing: "border-box",
                    resize: "vertical",
                  }}
                  placeholder="Введіть опис кімнати"
                />
              </div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={closeModals}
                  style={{
                    backgroundColor: "#6c757d",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "4px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  Скасувати
                </button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "4px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  {showCreateModal ? "Створити" : "Зберегти"}
                </button>
              </div>
            </form>
          </div>
        </div> */}
    </main>
  );
};

export default RoomPage;
