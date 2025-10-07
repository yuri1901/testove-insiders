import RoomItem from "../../components/RoomItem";
import ModalRoom from "../../modal/ModalRoom";
import PageHeader from "../../components/PageHeader";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { handleCreateRoom, handleEditRoom, handleDeleteRoom, handleFormChange, handleCreateSubmit, handleEditSubmit, closeModals, addRoomMember } from "../../store/roomsSlice";
import { useAuthContext } from "../../context/ContextAuth";

const RoomPage = () => {
  const dispatch = useAppDispatch();
  const { rooms, isCreateModalOpen, isEditModalOpen, formData, selectedRoom } = useAppSelector((state) => state.rooms);
  const { currentUser } = useAuthContext();

  return (
    <>
      <main className="p-5 max-w-6xl mx-auto">
        <PageHeader
          title="Управління переговорними кімнатами"
          buttonText="Створити кімнату"
          onButtonClick={() => dispatch(handleCreateRoom())}
        />

        <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
          {rooms.map((room) => (
            <RoomItem
              key={room.id}
              room={room}
              onEdit={(room) => dispatch(handleEditRoom(room))}
              onDelete={(roomId) => dispatch(handleDeleteRoom(roomId))}
            />
          ))}
        </div>
      </main>

      <ModalRoom
        isOpen={isCreateModalOpen}
        title="Створити нову кімнату"
        formData={formData}
        onSubmit={(data) => dispatch(handleCreateSubmit({ ...data, createdBy: currentUser?.email || "" }))}
        onClose={() => dispatch(closeModals())}
        onFormChange={(field, value) => dispatch(handleFormChange({ field, value }))}
        submitButtonText="Створити"
        submitButtonColor="blue"
      />

      <ModalRoom
        isOpen={isEditModalOpen}
        title="Редагувати кімнату"
        formData={formData}
        onSubmit={(data) => dispatch(handleEditSubmit(data))}
        onClose={() => dispatch(closeModals())}
        onFormChange={(field, value) => dispatch(handleFormChange({ field, value }))}
        submitButtonText="Зберегти"
        submitButtonColor="green"
        isEditing={true}
        members={selectedRoom?.members || []}
        onAddUser={(email, role) => {
          dispatch(
            addRoomMember({
              roomId: selectedRoom?.id || "",
              email,
              role,
              addedBy: currentUser?.email || "",
            })
          );
        }}
      />
    </>
  );
};

export default RoomPage;
