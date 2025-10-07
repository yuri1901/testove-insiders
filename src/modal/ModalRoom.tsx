import { createPortal } from "react-dom";
import { useModal } from "../hooks/useModal";
import { useState } from "react";
import type { RoomMember } from "../types";

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
  // For user management
  isEditing?: boolean;
  members?: RoomMember[];
  onAddUser?: (email: string, role: "admin" | "user") => void;
}

const ModalRoom = ({ isOpen, title, formData, onSubmit, onClose, onFormChange, submitButtonText, submitButtonColor = "blue", isEditing = false, members = [], onAddUser }: ModalRoomProps) => {
  const { handleSubmit, getSubmitButtonClasses, handleBackdropClick } = useModal({
    onSubmit,
    onClose,
    submitButtonColor,
  });

  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState<"admin" | "user">("user");

  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userEmail.trim() && onAddUser) {
      onAddUser(userEmail.trim(), userRole);
      setUserEmail("");
      setUserRole("user");
    }
  };

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

            {/* User management section - only for editing */}
            {isEditing && (
              <div className="mb-5 border-t pt-5">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Управління користувачами</h3>

                {/* Add user form */}
                <form
                  onSubmit={handleAddUserSubmit}
                  className="mb-4"
                >
                  <div className="flex gap-3">
                    <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="testuser1@gmail.com"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <select
                      value={userRole}
                      onChange={(e) => setUserRole(e.target.value as "admin" | "user")}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                      disabled={!userEmail.trim()}
                    >
                      Додати
                    </button>
                  </div>
                </form>

                {/* Current members list */}
                {members.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Поточні користувачі:</h4>
                    <div className="space-y-2">
                      {members.map((member) => (
                        <div
                          key={member.email}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded"
                        >
                          <span className="text-sm font-medium">{member.email}</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${member.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"}`}>{member.role === "admin" ? "Admin" : "User"}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

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
