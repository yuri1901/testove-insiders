import RoomItem from "../../components/RoomItem";
import { useRooms } from "../../hooks/useRooms";
import ModalRoom from "../../modal/ModalRoom";

const RoomPage = () => {
  const { rooms, isCreateModalOpen, isEditModalOpen, formData, handleCreateRoom, handleEditRoom, handleDeleteRoom, handleFormChange, handleCreateSubmit, handleEditSubmit, closeModals } = useRooms();

  return (
    <>
      <main className="p-5 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl mb-3 text-gray-800 font-semibold">Управління переговорними кімнатами</h1>
          <button
            onClick={handleCreateRoom}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md text-base font-medium transition-colors cursor-pointer"
          >
            + Створити кімнату
          </button>
        </div>

        <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
          {rooms.map((room) => (
            <RoomItem
              key={room.id}
              room={room}
              onEdit={handleEditRoom}
              onDelete={handleDeleteRoom}
            />
          ))}
        </div>
      </main>

      {/* Універсальна модалка для створення */}
      <ModalRoom
        isOpen={isCreateModalOpen}
        title="Створити нову кімнату"
        formData={formData}
        onSubmit={handleCreateSubmit}
        onClose={closeModals}
        onFormChange={handleFormChange}
        submitButtonText="Створити"
        submitButtonColor="blue"
      />

      {/* Універсальна модалка для редагування */}
      <ModalRoom
        isOpen={isEditModalOpen}
        title="Редагувати кімнату"
        formData={formData}
        onSubmit={handleEditSubmit}
        onClose={closeModals}
        onFormChange={handleFormChange}
        submitButtonText="Зберегти"
        submitButtonColor="green"
      />
    </>
  );
};

export default RoomPage;
