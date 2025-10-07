import BookingItem from "../../components/BookingItem";
import ModalBooking from "../../modal/ModalBooking";
import PageHeader from "../../components/PageHeader";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { handleCreateBooking, handleEditBooking, cancelBooking, handleFormChange, closeModals, createBooking, editBooking } from "../../store/bookingsSlice";

const BookingPage = () => {
  const dispatch = useAppDispatch();
  const { bookings, isCreateModalOpen, isEditModalOpen, formData, selectedBooking } = useAppSelector((state) => state.bookings);
  const { rooms } = useAppSelector((state) => state.rooms);

  // Create a map of roomId to roomName for easy lookup
  const roomNames = rooms.reduce(
    (acc, room) => {
      acc[room.id] = room.name;
      return acc;
    },
    {} as Record<string, string>
  );

  return (
    <main className="p-5 max-w-6xl mx-auto">
      <PageHeader
        title="Управління бронюваннями"
        buttonText="Створити бронювання"
        onButtonClick={() => dispatch(handleCreateBooking())}
      />

      <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(400px,1fr))]">
        {bookings.map((booking) => (
          <BookingItem
            key={booking.id}
            booking={booking}
            roomName={roomNames[booking.roomId] || booking.roomId}
            onEdit={(booking) => dispatch(handleEditBooking(booking))}
            onCancel={(bookingId) => dispatch(cancelBooking(bookingId))}
          />
        ))}
      </div>

      <ModalBooking
        isOpen={isCreateModalOpen}
        title="Створити бронювання"
        rooms={rooms}
        formData={formData}
        onSubmit={(data) => dispatch(createBooking(data))}
        onClose={() => dispatch(closeModals())}
        onFormChange={(field, value) => dispatch(handleFormChange({ field, value }))}
        submitButtonText="Створити"
        submitButtonColor="blue"
      />

      <ModalBooking
        isOpen={isEditModalOpen}
        title="Редагувати бронювання"
        rooms={rooms}
        formData={formData}
        onSubmit={(data) => dispatch(editBooking({ id: selectedBooking?.id || "", ...data }))}
        onClose={() => dispatch(closeModals())}
        onFormChange={(field, value) => dispatch(handleFormChange({ field, value }))}
        submitButtonText="Зберегти"
        submitButtonColor="green"
      />
    </main>
  );
};

export default BookingPage;
