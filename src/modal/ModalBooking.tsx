import { createPortal } from "react-dom";
import { useModal } from "../hooks/useModal";

interface ModalBookingProps {
  isOpen: boolean;
  title: string;
  rooms: Array<{ id: string; name: string }>;
  formData: {
    roomId: string;
    date: string;
    startTime: string;
    endTime: string;
    description: string;
  };
  onSubmit: (data: { roomId: string; date: string; startTime: string; endTime: string; description: string }) => void;
  onClose: () => void;
  onFormChange: (field: "roomId" | "date" | "startTime" | "endTime" | "description", value: string) => void;
  submitButtonText: string;
  submitButtonColor?: "blue" | "green";
}

const ModalBooking = ({ isOpen, title, rooms, formData, onSubmit, onClose, onFormChange, submitButtonText, submitButtonColor = "blue" }: ModalBookingProps) => {
  const { handleSubmit, getSubmitButtonClasses, handleBackdropClick } = useModal({
    onSubmit,
    onClose,
    submitButtonColor,
  });

  if (!isOpen) return null;

  return createPortal(
    <section
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <header className="p-8 pb-6">
          <h2
            id="modal-title"
            className="text-2xl font-semibold text-gray-800"
          >
            {title}
          </h2>
        </header>

        <main className="px-8 pb-8">
          <form onSubmit={(e) => handleSubmit(e, formData)}>
            <div className="mb-5">
              <label
                htmlFor="roomId"
                className="block mb-2 font-medium text-gray-700"
              >
                Кімната *
              </label>
              <select
                id="roomId"
                value={formData.roomId}
                onChange={(e) => onFormChange("roomId", e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Оберіть кімнату...</option>
                {rooms.map((room) => (
                  <option
                    key={room.id}
                    value={room.id}
                  >
                    {room.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-5">
              <label
                htmlFor="date"
                className="block mb-2 font-medium text-gray-700"
              >
                Дата *
              </label>
              <input
                type="date"
                id="date"
                value={formData.date}
                onChange={(e) => onFormChange("date", e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div>
                <label
                  htmlFor="startTime"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Час початку *
                </label>
                <input
                  type="time"
                  id="startTime"
                  value={formData.startTime}
                  onChange={(e) => onFormChange("startTime", e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label
                  htmlFor="endTime"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Час закінчення *
                </label>
                <input
                  type="time"
                  id="endTime"
                  value={formData.endTime}
                  onChange={(e) => onFormChange("endTime", e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mb-5">
              <label
                htmlFor="description"
                className="block mb-2 font-medium text-gray-700"
              >
                Опис бронювання *
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => onFormChange("description", e.target.value)}
                required
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                placeholder="Введіть опис бронювання"
              />
            </div>

            <footer className="flex gap-3 justify-end mt-8">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md text-base font-medium transition-colors cursor-pointer"
              >
                Скасувати
              </button>
              <button
                type="submit"
                className={getSubmitButtonClasses()}
              >
                {submitButtonText}
              </button>
            </footer>
          </form>
        </main>
      </div>
    </section>,
    document.body
  );
};

export default ModalBooking;
