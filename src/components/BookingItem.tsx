import type { Booking } from "../types";

interface BookingItemProps {
  booking: Booking;
  roomName: string;
  onEdit?: (booking: Booking) => void;
  onCancel?: (bookingId: string) => void;
}

const BookingItem = ({ booking, roomName, onEdit, onCancel }: BookingItemProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("uk-UA");
  };

  return (
    <div className={`border rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition-shadow ${booking.status === "cancelled" ? "border-red-200 bg-red-50" : "border-gray-200"}`}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-medium text-gray-800">{roomName}</h3>
        <span className={`inline-block text-sm px-3 py-1 rounded-full ${booking.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{booking.status === "active" ? "Активне" : "Скасоване"}</span>
      </div>
      <div className="space-y-2 mb-4">
        <p className="text-gray-600">
          <span className="font-medium">Дата:</span> {formatDate(booking.date)}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Час:</span> {booking.startTime} - {booking.endTime}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Опис:</span> {booking.description}
        </p>
      </div>
      <p className="text-sm text-gray-500 mb-5">Створено: {formatDate(booking.createdAt)}</p>
      {booking.status === "active" && (
        <div className="flex gap-2">
          <button
            onClick={() => onEdit?.(booking)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors cursor-pointer"
          >
            Редагувати
          </button>
          <button
            onClick={() => onCancel?.(booking.id)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors cursor-pointer"
          >
            Скасувати
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingItem;
