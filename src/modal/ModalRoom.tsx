import { createPortal } from "react-dom";
import { useModal } from "../hooks/useModal";

interface ModalRoomProps {
  isOpen: boolean;
  title: string;
  formData: {
    name: string;
    description: string;
  };
  onSubmit: (data: { name: string; description: string }) => void;
  onClose: () => void;
  onFormChange: (field: "name" | "description", value: string) => void;
  submitButtonText: string;
  submitButtonColor?: "blue" | "green";
}

const ModalRoom = ({ isOpen, title, formData, onSubmit, onClose, onFormChange, submitButtonText, submitButtonColor = "blue" }: ModalRoomProps) => {
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
                htmlFor="name"
                className="block mb-2 font-medium text-gray-700"
              >
                Назва кімнати *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => onFormChange("name", e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Введіть назву кімнати"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="description"
                className="block mb-2 font-medium text-gray-700"
              >
                Опис кімнати *
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => onFormChange("description", e.target.value)}
                required
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                placeholder="Введіть опис кімнати"
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

export default ModalRoom;
